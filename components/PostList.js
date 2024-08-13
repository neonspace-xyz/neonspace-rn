import * as React from "react";
import { StyleSheet, View, FlatList, RefreshControl, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import { useFocusEffect } from '@react-navigation/core';
import { Color } from "../GlobalStyles";
import PostSection from "../components/PostSection";
import { convertTimestamp, getRandomNumber, getRandomTimestamp, getSession, logout } from "../Utils";
import { API_URL, IMG_PROFILE } from "../Constant";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PostList = ({ usersession, tab, isProfile, isShowSearch, isShowCreate }) => {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      fetchItems();
    }, [])
  );

  useEffect(() => {
    getItems();
  }, [])

  const getItems = async () => {
    let data = await AsyncStorage.getItem('posts');
    data = JSON.parse(data);
    setItems(data);
  };

  const fetchItems = async () => {
    if(!usersession) return;
    try {
      let token = usersession.jwt_token;
      let userInfo = usersession.user_info;
      let url = API_URL + `/user/getPost?userId=${userInfo.user_id}&page=${page}`;
      const resp = await axios.get(url,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      if (resp.status == 200) {
        if (resp?.data?.posts) {
          let _posts = [];
          let posts = resp?.data?.posts;
          for (const key in posts) {
            if (Object.hasOwnProperty.call(posts, key)) {
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

              const post = posts[key];
              let item = {
                id: key,
                name: userInfo.name,
                username: `@${userInfo.screen_name}`,
                image: userInfo.profile_image,
                text: post.post,
                view: getRandomNumber(0, 100),
                like: like,
                datetime: convertTimestamp(post.published_timestamp),
                itemLikes: itemLikes
              }
              _posts.push(item);
            }
          }
          setItems(_posts);
          await AsyncStorage.setItem('posts', JSON.stringify(_posts));
        }
      }
      else {
        Alert.alert("Failed load posts");
      }
    } catch (error) {
      console.error('Post-fetchItems', error);
    }
  }

  const fetchItemsDummy = async () => {
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
    navigation.push(`PostDetail${tab}`, { tab, item });
  };

  return (
    <View style={[isProfile ? styles.containerListProfile : styles.containerList, isShowSearch && { display: "none" }]}>
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
            <PostSection
              tab={tab}
              isDetail={false}
              item={item}
              onPress={() => handleDetail(item)}
            />
          )
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerList: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: Color.colorGray_200,
  },
  containerListProfile: {
    width: "100%",
    height: "40%",
    alignItems: "center",
    backgroundColor: Color.colorGray_200,
  },
  flat: {
    width: "100%"
  },
});

export default PostList;
