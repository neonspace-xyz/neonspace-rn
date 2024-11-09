import { React, useEffect, useState } from "react";
import { StyleSheet, StatusBar, View, ActivityIndicator, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Color, FontSize, getFontFamily } from "../GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../components/SearchBar";
import { useAuth } from "../components/AuthProvider";
import ProfileDetail2 from "../components/ProfileDetail2";

const OtherProfile = () => {
  console.log("OtherProfile : ")
  const route = useRoute();
  const { tab, user } = route.params;
  const [usersession, setUsersession] = useState();
  const [userInfo, setUserInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { getSession, getOtherUser } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;
      setIsLoading(true);
      try {
        const [sessionData, userData] = await Promise.all([
          getSession(),
          getOtherUser(user.user_id)
        ]);
        setUsersession(sessionData);
        setUserInfo(userData);
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Color.colorGray_100} barStyle="light-content" />
      <SearchBar
        tab={tab}
        backButton={true}
      />

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Color.darkInk} />
          <Text style={styles.loadingText}>Loading Profile...</Text>
        </View>
      ) : userInfo ? (
        <ProfileDetail2
          tab={tab}
          userInfo={userInfo}
          usersession={usersession?.user_info}
          isShowSearch={false}
        />
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
    backgroundColor: Color.colorGray_100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.colorGray_100,
  },
  loadingText: {
    marginTop: 10,
    color: Color.darkInk,
    fontSize: FontSize.size_sm,
    fontFamily: getFontFamily("500"),
    fontWeight: "500",
  }
});

export default OtherProfile;
