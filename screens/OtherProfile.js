import { React, useEffect, useState } from "react";
import { StyleSheet, StatusBar } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Color } from "../GlobalStyles";
import PostList from "../components/PostList";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../components/SearchBar";
import OtherProfileDetail from "../components/OtherProfileDetail";
import { useAuth } from "../components/AuthProvider";
import ProfileDetail2 from "../components/ProfileDetail2";

const OtherProfile = () => {
  const route = useRoute();
  const { tab, user } = route.params;
  const [isShowCreate, setIsShowCreate] = useState(false);
  const [isShowSearch, setIsShowSearch] = useState(false);
  const [usersession, setUsersession] = useState();
  const [userInfo, setUserInfo] = useState();

  const { getSession, getOtherUser } = useAuth();

  useEffect(() => {
    if (!user) return;
    getSession().then((data) => {
      setUsersession(data);
    });
    setUserInfo(user)
    getOtherUser(user.user_id).then((user) => {
      setUserInfo(user)
    });
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      {/* <Header2
        tab={tab}
        isHideList={false}
        isShowSearch={isShowSearch}
        setIsShowSearch={setIsShowSearch}
      /> */}
      <StatusBar backgroundColor={Color.colorGray_100} barStyle="light-content" />

      <SearchBar
        tab={tab}
        backButton={true} />

      {userInfo &&
        <>
          <ProfileDetail2
            tab={tab}
            userInfo={userInfo}
            usersession={usersession?.user_info}
            isShowSearch={isShowSearch} />
          {/* <OtherProfileDetail
            tab={tab}
            userInfo={userInfo}
            isShowSearch={isShowSearch} /> */}

          {/* <PostList
            tab={tab}
            isProfile={true}
            usersession={usersession}
            userInfo={userInfo}
            isShowSearch={isShowSearch}
            isShowCreate={isShowCreate} /> */}
        </>
      }
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
    // flexDirection: "column",
    // alignItems: "center",
    backgroundColor: Color.colorGray_100,
  }
});

export default OtherProfile;
