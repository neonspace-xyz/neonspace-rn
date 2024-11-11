import React, { createContext, useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from '../Constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../Utils';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const navigation = useNavigation();
  const api = axios.create({
    baseURL: API_URL,
  });

  api.interceptors.request.use(
    async config => {
      try {
        let usersession = await AsyncStorage.getItem('usersession');
        usersession = JSON.parse(usersession)
        if (usersession) {
          let token = usersession.jwt_token;
          if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
          }
          config.headers['Content-Type'] = 'application/json';
          config.headers['Accept'] = 'application/json';
        }
      } catch (error) {
        console.error('Error reading token from AsyncStorage', error);
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  api.interceptors.response.use(
    response => response,
    error => {
      //console.error("axios-error.response",  error)
      if (
        error.response.status === 500 &&
        (error.response.data.error === 'ExpiredSignature' || error.response.data.error === 'Session expired')
      ) {
        setIsAuthenticated(false);
        try {
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }]
          });
        } catch (e) { }
        // Handle the error in the component level
        return Promise.reject({ ...error, isSessionExpired: true });
      }

      return Promise.reject(error);
    }
  );

  const getSession = async () => {
    let _usersession = await AsyncStorage.getItem("usersession");
    if (_usersession == null) {
      await logout(navigation);
      return;
    }
    _usersession = JSON.parse(_usersession);
    return _usersession
  }

  let lastCalled = 0;

  const getUser = async () => {
    const now = Date.now();
    const cooldown = 30000;
    let reset = await AsyncStorage.getItem("reset");

    if ((now - lastCalled < cooldown) && (reset == "false")) {
      //console.log("wait at least 30 second.");
      let user = await AsyncStorage.getItem("user");
      return JSON.parse(user);
    }

    lastCalled = now;

    try {
      let _usersession = await getSession();
      let url = `/user/getUser?userId=${_usersession.user_info.user_id}`;
      let resp = await api.get(url);
      await AsyncStorage.setItem("user", JSON.stringify(resp.data));
      await AsyncStorage.setItem("reset", "false");
      return resp.data
    } catch (err) {
      let user = await AsyncStorage.getItem("user");
      return JSON.parse(user);
    }
  }

  const getOtherUser = async (id) => {
    try {
      console.debug("getOtherUser-id", id);
      let url = `/user/getUser?userId=${id}`;
      let resp = await api.get(url);
      // console.debug("getOtherUser-resp", resp.data);
      return resp.data
    } catch (err) {
      console.error("getOtherUser-error", err);
    }
    return null;
  }

  return (
    <AuthContext.Provider value={{ api, isAuthenticated, getUser, getOtherUser, getSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
