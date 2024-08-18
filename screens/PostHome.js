import * as React from "react";
import { useEffect, useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, View, Pressable, Alert } from "react-native";
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import PostCreate from "../components/PostCreate";
import PostList from "../components/PostList";
import { useAuth } from "../components/AuthProvider";
import Header from "../components/Header";

const PostHome = ({ route }) => {
  const { getSession } = useAuth();
  const { tab } = route?.params;
  const [usersession, setUsersession] = useState();
  const [isShowCreate, setIsShowCreate] = useState(false);
  const [isShowSearch, setIsShowSearch] = useState(false);

  useEffect(() => {
    getSession().then((data) => {
      setUsersession(data);
    });
  }, []);

  const doPostCreate = () => {
    setIsShowCreate(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        tab={tab}
        isHideList={!isShowSearch}
        isShowSearch={isShowSearch}
        setIsShowSearch={setIsShowSearch}
      />
      <PostList
        tab={tab}
        isProfile={false}
        usersession={usersession}
        userInfo={usersession?.user_info}
        isShowSearch={isShowSearch}
        isShowCreate={isShowCreate} />

      {isShowCreate && (
        <PostCreate
          usersession={usersession}
          setIsShowCreate={setIsShowCreate} />
      )}
      {!isShowCreate && (
        <View style={styles.containerFAB}>
          <Pressable style={styles.FAB} onPress={doPostCreate}>
            <Icon name="add" size={45} color={Color.colorBlack} />
          </Pressable>
        </View>
      )}
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

export default PostHome;
