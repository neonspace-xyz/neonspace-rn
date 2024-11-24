import * as React from "react";
import { StyleSheet, View, FlatList, RefreshControl, ActivityIndicator, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import { useFocusEffect } from '@react-navigation/core';
import { Color } from "../GlobalStyles";
import { convertTimestamp, getRandomNumber, logout } from "../Utils";
import { IMG_PROFILE } from "../Constant";
import { useAuth } from "./AuthProvider";
import EmptyView from "./EmptyView";
import MintingListData from "./MintingListData";

const ProfileListLikes = ({ tab, isProfile, usersession, userInfo }) => {
  const { api, getOtherUser } = useAuth();
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const windowDimensions = Dimensions.get('window');
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const flatListRef = useRef(null);

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
    setLoadingMore(true);
    let likes = [];
    try {
      let _likes = await getLikes();
      // let _likes = await getItems('post');
      likes = [...likes, ..._likes];

      // let _likes = await getItems('hiring');
      // likes = [...likes, ..._likes];

      // _likes = await getItems('event');
      // likes = [...likes, ..._likes];

      // _likes = await getItems('quest');
      // likes = [...likes, ..._likes];

      likes.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

      setItems(likes);
    } catch (error) {
      if (error.isSessionExpired) {
        await logout(navigation);
      } else {
        console.error("ListLikes-fetchItems-error", error)
      }
    } finally {
      setLoadingMore(false);
    }
  }
  const getLikes = async () => {
    console.log(`getLikes-userInfo`, userInfo.user_id);
    let result = [];
    url = `/user/likes?userId=${userInfo.user_id}`;
    let resp = await api.get(url);
    let posts = resp.data.liked_posts;
    for (const post of posts) {
      result.push({
        type: 'like',
        item_type: 'post',
        from: userInfo.screen_name,
        to: post.user_info.username,
        screen_name: `@${post.user_info.username}`,
        image: post.user_info.profile_image_url,
        post_id: post.id,
      });
    }
    return result;
  }

  const handleDetail = (item) => {
    if (item.item_type == 'post') {
      navigation.push(`PostDetail${tab}`, { tab, item });
    }
    else if (item.item_type == 'hiring') {
      navigation.push(`CrowdDetailHiring${tab}`, { tab, item });
    }
    else if (item.item_type == 'event') {
      navigation.push(`CrowdDetailEvent${tab}`, { tab, item });
    }
    else if (item.item_type == 'quest') {
      navigation.push(`CrowdDetailQuest${tab}`, { tab, item });
    }
  };

  const onScroll = async () => {
    if (selectedItemIndex) {
      setSelectedItemIndex(null);
    }
  }

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

  const handleMore = (event, index) => {
    if (selectedItemIndex == index) {
      setSelectedItemIndex(null);
      return;
    }
    const { pageY, pageX } = event.nativeEvent;

    const menuWidth = 190; // Adjust based on your menu width
    const menuHeight = 81; // Adjust based on your menu height
    let newLeft = pageX;
    let newTop = pageY - 150; // Position the menu below the button
    let windowHeight = windowDimensions.height - 100;

    if (newLeft + menuWidth > windowDimensions.width) {
      newLeft = windowDimensions.width - menuWidth;
    }

    if (pageY + menuHeight > windowHeight) {
      newTop = pageY - 280;
    }

    if (isProfile) {
      newTop = newTop - (windowDimensions.height / 2) + 100;
    }

    setMenuPosition({ top: newTop, left: newLeft });
    setSelectedItemIndex(index);
  };

  return (
    <View style={[isProfile ? styles.containerListProfile : styles.containerList]}>
      <FlatList
        ref={flatListRef}
        style={styles.flat}
        data={items}
        onScroll={onScroll}
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
        renderItem={({ item, index }) => {
          console.log('like-item', item);
          // console.log('l-datetime', index, item.id, item.datetime, item.item_type);
          return <MintingListData
            tab={tab}
            isDetail={false}
            index={index}
            item={item}
            userInfo={userInfo}
            onPress={() => handleDetail(item)}
            onMore={handleMore}
          />
          return <></>
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

export default ProfileListLikes;
