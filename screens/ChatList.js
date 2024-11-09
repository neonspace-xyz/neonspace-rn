import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Pressable, TextInput, FlatList, RefreshControl, ActivityIndicator, StatusBar, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useRoute } from '@react-navigation/core';
import { Color, FontFamily, FontSize, getFontFamily } from "../GlobalStyles";
import { logout } from "../Utils";
import PostCreate from "../components/PostCreate";
import ChatSection from "../components/ChatSection";
import UserSearchSection from "../components/UserSearchSection";
import { useAuth } from "../components/AuthProvider";
import EmptyView from "../components/EmptyView";

const ChatList = () => {
  const { api } = useAuth();
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

  useEffect(() => {
    getItems();
  }, [])

  const getItems = async () => {
  };

  const fetchItems = async () => {
    setLoadingMore(true);
    try {
      let url = `/chat/history?page=${page}`;
      let resp = await api.get(url);
      let _data = [];
      for (let item of resp.data) {
        let mess = item.last_message.message;
        item['last_message']['message'] = JSON.parse(mess);
        _data.push(item);
      }
      setItems(_data);
    } catch (error) {
      if (error.isSessionExpired) {
        await logout(navigation);
      } else {
        console.error("ChatList-fetchItems-error", error)
      }
    } finally {
      setLoadingMore(false);
    }
  }

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
        if (resp.data) {
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
    console.log('Going to chat list : ', item)
    navigation.push(`ChatView${tab}`, {
      tab: tab,
      userInfo: {
        to: item,
        user_id: item.user_id
      }
    });
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
          }}
          onFocus={() => {
            setSearchItems([]);
            setIsShowSearch(!isShowSearch);
          }}
          onSubmitEditing={fetchSearchItems}
        />
      </View>
      <View style={[styles.containerListSearch, !isShowSearch && { display: "none" }]}>
        <FlatList
          style={[styles.flat, !isShowSearch && { display: "none" }]}
          data={searchItems}
          ListEmptyComponent={() => {
            return <EmptyView loadingMore={loadingMore} />
          }}
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
          ListEmptyComponent={() => {
            return <EmptyView loadingMore={loadingMore} />
          }}
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
    fontFamily: getFontFamily("500"),
    fontWeight: "500",
    fontSize: FontSize.labelLarge_size,
  },
  headerImage: {
    width: 30,
    height: 30,
  },
});

export default ChatList;
