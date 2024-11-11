import React, { useState, useCallback, useEffect, useContext } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { Color } from "../GlobalStyles";
import PostList from "../components/PostList";
import { useAuth } from "../components/AuthProvider";
import Header from "../components/Header";
import ProfileDetail from "../components/ProfileDetail";
import { useFocusEffect } from "@react-navigation/core";

const MyProfile = ({ route }) => {
  const { tab } = route?.params;
  const { getSession, getUser } = useAuth();
  const [usersession, setUsersession] = useState();
  const [userInfo, setUserInfo] = useState();
  const [isShowSearch, setIsShowSearch] = useState(false);

  // useEffect(() => {
  //   console.log("get my profile data")
  //   getSession().then((data) => {
  //     setUsersession(data);
  //   });
  //   getUser().then((user) => {
  //     setUserInfo(user);
  //   });
  // }, []);

  useFocusEffect(
    useCallback(() => {
      getSession().then((data) => {
        setUsersession(data);
      });
      getUser().then((user) => {
        setUserInfo(user);
      });
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        tab={tab}
        userInfo={userInfo}
        isHideList={!isShowSearch}
        isShowSearch={isShowSearch}
        setIsShowSearch={setIsShowSearch}
      />

      {/* <KeyboardAvoidingView      
      behavior="padding" keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    > */}
      <ProfileDetail
        tab={tab}
        userInfo={userInfo}
        isShowSearch={isShowSearch} />
      {/* <PostList
        tab={tab}
        isProfile={true}
        usersession={usersession}
        userInfo={userInfo} /> */}
      {/* </KeyboardAvoidingView> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
    // justifyContent: 'center',
    // alignItems: "center",
    backgroundColor: Color.colorGray_100,
  },
  containerFAB: {
    position: 'absolute',
    zIndex: 1,
    bottom: 30,
    right: 50,
  },
  FAB: {
    backgroundColor: Color.darkInk, // Adjust color as needed
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default MyProfile;
