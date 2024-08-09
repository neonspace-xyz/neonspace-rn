import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Pressable, TextInput, FlatList, RefreshControl, ActivityIndicator, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useRoute } from '@react-navigation/core';
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import { formatChatListTime, getRandomNumber, getRandomTimestamp } from "../Utils";
import PostCreate from "../components/PostCreate";
import { IMG_PROFILE } from "../Constant";
import ChatSection from "../components/ChatSection";
import moment from "moment";
import UserSearchSection from "../components/UserSearchSection";

const ChatList = () => {
  const route = useRoute();
  const { tab } = route.params;
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = useState('');
  const [items, setItems] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isShowCreate, setIsShowCreate] = useState(false);
  const [isShowSearch, setIsShowSearch] = useState(false);

  const textInputRef = useRef(null);
  const handleBlurTextInput = () => {
    if (textInputRef.current) {
      setSearchValue("");
      setIsShowSearch(!isShowSearch);
      textInputRef.current.blur();
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchItems();
      fetchSearchItems();
    }, [])
  );

  const doPostCreate = () => {
    console.log('Floating button pressed');
  };

  useEffect(() => {
    getItems();
  }, [])

  const getItems = async () => {
  };

  const fetchItems = async () => {
    let data = [];
    for (let i = 1; i < getRandomNumber(); i++) {
      data.push({
        id: i,
        name: `Name${i}`,
        username: `@username${i}`,
        image: IMG_PROFILE[getRandomNumber(0, 4)],
        text: `recent text message view here if the text is too${i}`,
        datetime: formatChatListTime(getRandomTimestamp(14)),
      });
    }
    setItems(data);
  };

  const fetchSearchItems = async () => {
    let data = [];
    for (let i = 1; i < getRandomNumber(1, 20); i++) {
      data.push({
        id: i,
        name: `Name${i}`,
        username: `@username${i}`,
        image: IMG_PROFILE[getRandomNumber(0, 4)],
        nft: `Name of NFT${i}`,
        price: getRandomNumber(0.01, 1.00),
      });
    }
    setSearchItems(data);
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
    navigation.push(`ChatView${tab}`, { tab, item });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Color.colorGray_100} barStyle="light-content" />
      <View style={styles.header}>
        <Pressable
          style={[styles.headerIcon]}
          onPress={() => isShowSearch ? handleBlurTextInput() : navigation.goBack()}>
          <Image
            source={require("../assets/ic_back_white.png")}
            style={styles.headerImage}
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
            fetchSearchItems();
          }}
          onFocus={() => {
            setSearchItems([]);
            setIsShowSearch(!isShowSearch);
          }}
        />
      </View>
      <View style={[styles.containerListSearch, !isShowSearch && { display: "none" }]}>
        <FlatList
          style={styles.flat}
          data={searchItems}
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
              <UserSearchSection
                item={item}
                onPress={() => handleDetail(item)}
              />
            )
          }}
        />
      </View>
      <View style={[styles.containerList, isShowSearch && { display: "none" }]}>
        <FlatList
          style={styles.flat}
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
              <ChatSection
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
  flat: {
    width: "100%",
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: Color.colorGray_200,
    borderRadius: 5,
    paddingLeft: 10,
    marginLeft: 10,
    color: Color.darkInk,
    textAlign: "left",
    fontFamily: FontFamily.clashGrotesk,
    fontWeight: "500",
    fontSize: FontSize.labelLarge_size,
  },
  headerImage: {
    width: 30,
    height: 30,
  },
});

export default ChatList;
