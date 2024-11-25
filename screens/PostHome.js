import * as React from "react";
import { useEffect, useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Platform, StyleSheet, View } from "react-native";
import { Color } from "../GlobalStyles";
import PostList from "../components/PostList";
import { useAuth } from "../components/AuthProvider";
import Header from "../components/Header";

const PostHome = ({ route }) => {
  const { getSession, getUser } = useAuth();
  const { tab } = route?.params;
  const [usersession, setUsersession] = useState();
  const [userInfo, setUserInfo] = useState();
  const [isShowSearch, setIsShowSearch] = useState(false);

  useEffect(() => {
    getSession().then((data) => {
      setUsersession(data);
    });
    getUser().then((user) => {
      setUserInfo(user);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        tab={tab}
        userInfo={userInfo}
        isHideList={!isShowSearch}
        isShowSearch={isShowSearch}
        setIsShowSearch={setIsShowSearch}
      />    

      <View style={{flex:1,marginBottom:Platform.OS == "ios" ? -35 : 0}}>
      <PostList
        tab={tab}
        isProfile={false}
        isShowSearch={isShowSearch}
        usersession={usersession}
        userInfo={usersession?.user_info} />
        </View>  
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    // height:"120%",
    overflow: "hidden",
    // justifyContent: 'center',
    // alignItems: "center",
    backgroundColor: Color.colorGray_100,
    // borderColor:'blue',
    // borderWidth:2
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

export default PostHome;
