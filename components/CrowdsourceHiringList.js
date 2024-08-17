import * as React from "react";
import { StyleSheet, View, FlatList, RefreshControl, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/core';
import { Color } from "../GlobalStyles";
import PostSection from "./PostSection";
import { convertTimestamp, getRandomNumber, getRandomTimestamp, logout } from "../Utils";
import { IMG_PROFILE } from "../Constant";
import { useAuth } from "./AuthProvider";

const CrowdsourceHiringList = ({ userInfo, tab, isProfile, isShowSearch, isShowCreate }) => {
  const { api } = useAuth();
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
    fetchItems();
  }, [userInfo]);

  const fetchItems = async () => {
    if (!userInfo) return;
    try {
      let url = `/user/getPost?userId=${userInfo.user_id}&page=${page}`;
      let resp = await api.get(url);
      let posts = resp.data.posts;

      let _posts = [];
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
    } catch (error) {
      if (error.isSessionExpired) {
        await logout(navigation);
      } else {
        console.error("PostList-fetchItems-error", error)
      }
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
    setPage(1);
    fetchItems();
    setRefreshing(false);
  };

  const onLoadMore = () => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true);
      let _page = page;
      setPage(_page++);
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
    height: "55%",
    alignItems: "center",
    backgroundColor: Color.colorGray_200,
  },
  flat: {
    width: "100%"
  },
});

export default CrowdsourceHiringList;
