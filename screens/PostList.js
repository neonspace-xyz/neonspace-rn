import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Pressable, TextInput, TouchableOpacity, FlatList, RefreshControl, ActivityIndicator, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/Ionicons';
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import PostSection from "../components/PostSection";
import { getRandomNumber, getRandomTimestamp } from "../Utils";
import PostCreate from "../components/PostCreate";
import { IMG_PROFILE } from "../Constant";

const Home = () => {
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = useState('');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isShowCreate, setIsShowCreate] = useState(false);
  const [isShowSearch, setIsShowSearch] = useState(false);

  const textInputRef = useRef(null);
  const handleBlurTextInput = () => {
    if (textInputRef.current) {
      setIsShowSearch(!isShowSearch);
      textInputRef.current.blur();
    }
  };


  useFocusEffect(
    React.useCallback(() => {
      fetchItems();
    }, [])
  );

  const doPostCreate = () => {
    setIsShowCreate(true);
  };

  useEffect(() => {
    getChats();
  }, [])

  const getChats = async () => {
  };

  const fetchItems = async () => {
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
        datetime: getRandomTimestamp(),
        itemLikes: itemLikes
      });
    }
    setItems(data);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchItems(); // Fetch fresh data
    setRefreshing(false);
  };

  const onLoadMore = () => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true);
      fetchItems(); // Fetch more data
      setLoadingMore(false);
    }
  };

  const handleDetail = (item) => {
    if (isShowCreate) return;
    navigation.navigate("PostDetail", { item });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Color.colorGray_100} barStyle="light-content" />
      <View style={styles.header}>
        <Pressable
          style={!isShowSearch && { display: "none" }}
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
          onChangeText={(text) => setSearchValue(text)}
          onFocus={() => setIsShowSearch(!isShowSearch)}
        />
        <Pressable
          style={isShowSearch && { display: "none" }}
          onPress={() => navigation.navigate("ChatList")}>
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
      </View>
      <View style={[styles.containerList, isShowSearch && { display: "none" }]}>
        <FlatList
          data={items}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              title="Pull to refresh"
              titleColor={Color.darkInk}
              colors={[Color.darkInk]}
              tintColor={Color.darkInk}
            />
          }
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() =>
            loadingMore && <ActivityIndicator style={{ marginVertical: 20 }} />
          }
          renderItem={({ item }) => {
            return (
              <PostSection
                isDetail={false}
                item={item}
                onPress={() => handleDetail(item)}
              />
            )
          }}
        />
      </View>
      {isShowCreate && (
        <PostCreate
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
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: Color.colorGray_100,
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
  searchInput: {
    flex: 1,
    height: 40,
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

export default Home;
