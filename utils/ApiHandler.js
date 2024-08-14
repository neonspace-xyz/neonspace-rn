import axios from 'axios';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../Constant';

const api = axios.create({
  baseURL: API_URL,
});

// Request Interceptor
api.interceptors.request.use(
  async config => {
    try {
      let usersession = await AsyncStorage.getItem('usersession');
      usersession = JSON.parse(usersession)
      if (usersession) {
        let token = usersession.jwt_token;
        console.log("token", token)
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
    console.error("axios-error.response", error.response.data.error)
    if (
      error.response.status === 500 &&
      (error.response.data.error === 'ExpiredSignature' || error.response.data.error === 'Session expired')
    ) {
      // Handle the error in the component level
      return Promise.reject({ ...error, isSessionExpired: true });
    }

    return Promise.reject(error);
  }
);

export default api;