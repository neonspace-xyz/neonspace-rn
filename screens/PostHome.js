import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, View, Pressable, TextInput, FlatList, StatusBar, Alert } from "react-native";
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import { getRandomNumber, getRandomTimestamp } from "../Utils";
import PostCreate from "../components/PostCreate";
import { IMG_PROFILE } from "../Constant";
import PostList from "../components/PostList";
import UserSearchSection from "../components/UserSearchSection";
import { useAuth } from "../components/AuthProvider";

const PostHome = ({ route }) => {
  const { api, getSession } = useAuth();
  const { tab } = route?.params;
  const navigation = useNavigation();
  const [usersession, setUsersession] = useState();
  const [searchValue, setSearchValue] = useState('');
  const [searchItems, setSearchItems] = useState([]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isShowCreate, setIsShowCreate] = useState(false);
  const [isShowSearch, setIsShowSearch] = useState(false);

  useEffect(() => {
    getSession().then((data) => {
      setUsersession(data);
    });
  }, []);

  const textInputRef = useRef(null);
  const handleBlurTextInput = () => {
    if (textInputRef.current) {
      setSearchValue("");
      textInputRef.current.blur();
      setIsShowSearch(!isShowSearch);
    }
  };

  const doPostCreate = () => {
    setIsShowCreate(true);
  };

  const fetchSearchItems = async () => {
    if (searchValue == '') return;
    let data = [];
    try {
      let url = `/twitter/getUser`;
      let body = {
        "screen_name": searchValue
      };
      let resp = await api.post(url, body);
      if (resp.data) {
        let user = resp.data;
        url = `/user/getUser?userId=${user.id}`;
        resp = await api.get(url);
        if(resp.data) {
          data.push(resp.data);
        }
      }
    } catch (error) {
      Alert.alert("User not found");
      console.error("fetchSearchItems", error)
    } finally {
      setSearchItems(data);
    }
  };

  const handleDetail = (item) => {
    if (isShowCreate) return;
    setIsShowSearch(false);
    setSearchValue('');
    navigation.navigate(`OtherProfile${tab}`, { tab, userInfo: item });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchSearchItems(); // Fetch fresh data
    setRefreshing(false);
  };

  const onLoadMore = async () => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true);
      await fetchSearchItems(); // Fetch more data
      setLoadingMore(false);
    }
  };

  const fetchSearchItemsDummy = async () => {
    let data = [];
    for (let i = 1; i < getRandomNumber(); i++) {
      let like = getRandomNumber(0, 7);
      let itemLikes = [];
      for (let j = 0; j < like; j++) {
        itemLikes.push({
          name: `Name${j}`,
          username: `@username${j}`,
          image: IMG_PROFILE[getRandomNumber(0, 4)],
          bio: `Founder at ChainCredit. #DYOR ${j}`,
        })
      }
      data.push({
        id: i,
        name: `Name${i}`,
        username: `@username${i}`,
        image: IMG_PROFILE[getRandomNumber(0, 4)],
        text: 'I’m so excited to be on this app and in this community! I love Neonrabbits!! I’m so excited to be on this app and in this community! I love Neonrabbits!! I’m so excited to be on this app and in this community! I love Neonrabbits!! I’m so excited to be on this app and in this comm...',
        view: getRandomNumber(0, 100),
        like: like,
        datetime: getRandomTimestamp(30),
        itemLikes: itemLikes
      });
    }
    setSearchItems(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Color.colorGray_100} barStyle="light-content" />
      <View style={styles.header}>
        <Pressable
          style={[styles.headerIcon, !isShowSearch && { display: "none" }]}
          onPress={() => handleBlurTextInput()}>
          <Image
            source={require("../assets/ic_back_white.png")}
            style={styles.headerImageBack}
          />
        </Pressable>
        <TextInput
          ref={textInputRef}
          style={styles.searchInput}
          placeholder="Search by X handle"
          placeholderTextColor={Color.colorGray_500}
          value={searchValue}
          onChangeText={(text) => {
            setSearchValue(text);
          }}
          onFocus={() => {
            if (!isShowSearch) {
              setSearchItems([]);
              setIsShowSearch(!isShowSearch);
            }
          }}
          onSubmitEditing={fetchSearchItems}
        />
        <Pressable
          style={[styles.headerIcon, isShowSearch && { display: "none" }]}
          onPress={() => navigation.navigate(`ChatList${tab}`, { tab })}>
          <Image
            source={require("../assets/ic_chat.png")}
            style={styles.headerImageChat}
          />
        </Pressable>
      </View>
      {!isShowCreate && (
        <View style={styles.containerFAB}>
          <Pressable style={styles.FAB} onPress={doPostCreate}>
            <Icon name="add" size={45} color={Color.colorBlack} />
          </Pressable>
        </View>
      )}
      <View style={[styles.containerListSearch, !isShowSearch && { display: "none" }]}>
        <FlatList
          style={[styles.flat, !isShowSearch && { display: "none" }]}
          data={searchItems}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={refreshing}
          //     onRefresh={onRefresh}
          //     title="Pull to refresh"
          //     titleColor={Color.darkInk}
          //     colors={[Color.darkInk]}
          //     tintColor={Color.darkInk}
          //   />
          // }
          // onEndReached={onLoadMore}
          // onEndReachedThreshold={0.1}
          // ListFooterComponent={() =>
          //   loadingMore && <ActivityIndicator style={{ marginVertical: 20 }} />
          // }
          renderItem={({ item }) => {
            return (
              <UserSearchSection
                item={item}
                onPress={() => handleDetail(item)}
              />
              // <PostSection
              // tab={tab}
              //   isDetail={false}
              //   item={item}
              //   onPress={() => handleDetail(item)}
              // />
            )
          }}
        />
      </View>
      <PostList
        userInfo={usersession?.user_info}
        tab={tab}
        isProfile={false}
        isShowSearch={isShowSearch}
        isShowCreate={isShowCreate} />
      {isShowCreate && (
        <PostCreate
          usersession={usersession}
          setIsShowCreate={setIsShowCreate} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: Color.colorGray_100,
  },
  header: {
    marginTop: 30,
    height: 68,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    backgroundColor: Color.colorGray_100,
  },
  headerIcon: {
    marginTop: 10,
  },
  containerListSearch: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: Color.colorGray_200,
    zIndex: 1
  },
  containerList: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: Color.colorGray_200,
  },
  flat: {
    width: "100%"
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginTop: 16,
    backgroundColor: Color.colorGray_200,
    borderRadius: 5,
    paddingLeft: 10,
    color: Color.darkInk,
    textAlign: "left",
    fontFamily: FontFamily.clashGrotesk,
    fontWeight: "500",
    fontSize: FontSize.labelLarge_size,
  },
  headerImageBack: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  headerImageChat: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  containerFAB: {
    position: 'absolute',
    zIndex: 1,
    bottom: 30,
    right: 30,
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
