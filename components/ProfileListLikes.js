import * as React from "react";
import { StyleSheet, View, FlatList, RefreshControl, ActivityIndicator, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import { useFocusEffect } from '@react-navigation/core';
import { Color } from "../GlobalStyles";
import { convertTimestamp, getRandomNumber, logout } from "../Utils";
import { IMG_PROFILE } from "../Constant";
import { useAuth } from "./AuthProvider";
import CrowdSectionHiring from "./CrowdSectionHiring";
import EmptyView from "./EmptyView";
import CrowdSectionEvent from "./CrowdSectionEvent";
import CrowdSectionQuest from "./CrowdSectionQuest";
import PostSection from "./PostSection";

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
      // let _likes = await getItems('post');
      // likes = [...likes, ..._likes];

      let _likes = await getItems('hiring');
      likes = [...likes, ..._likes];

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

  const getItems = async (type) => {
    let result = [];
    try {
      let url = '';
      let page = 1;
      if (type == 'post') {
        url = `/user/getPost?userId=${userInfo.user_id}&page=${page}`;
        let resp = await api.get(url);
        let data = resp.data.posts;

        let _items = [];
        for (const key in data) {
          if (Object.hasOwnProperty.call(data, key)) {
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

            const post = data[key];
            let item = {
              item_type: 'post',
              id: key,
              name: userInfo.name,
              screen_name: `@${userInfo.screen_name}`,
              image: userInfo.profile_image,
              post_id: post.post_id,
              text: post.post,
              view: post.views,
              like: post.likes,
              liked_by_user: post.liked_by_user,
              datetime: convertTimestamp(post.published_timestamp),
              itemLikes: itemLikes
            }
            result.push(item);
          }
        }
      }
      else if (type == 'hiring') {
        url = `/crowdsource/hiring/list?page=${page}`;
        let resp = await api.get(url);
        let data = resp.data.jobs;

        let _items = [];
        let _users = {};
        for (const job of data) {
          if (_users[job.user_id]) continue;

          let otherUser = await getOtherUser(job.user_id);
          if (!otherUser) continue;
          _users[job.user_id] = {
            name: otherUser.name,
            screen_name: otherUser.screen_name,
            profile_image: otherUser.profile_image,
          };
        }

        for (const job of data) {
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

          let _user = _users[job.user_id];
          let item = {
            item_type: 'hiring',
            id: job.id,
            fullname: _user?.name,
            screen_name: `@${_user?.screen_name}`,
            image: _user?.profile_image,
            user_id: job.user_id,
            title: job.title,
            company: job.company,
            location: job.location,
            salary_range: job.salary_range,
            description: job.description,
            view: getRandomNumber(0, 100),
            like: like,
            datetime: job.created_at,
            itemLikes: itemLikes
          }
          result.push(item);
        }
      }
      else if (type == 'event') {
        url = `/crowdsource/event/list?page=${page}`;
        let resp = await api.get(url);
        let data = resp.data.events;

        let _items = [];
        let _users = {};
        for (const _item of data) {
          if (_users[_item.owner_id]) continue;

          let otherUser = await getOtherUser(_item.owner_id);
          if (!otherUser) continue;
          _users[_item.owner_id] = {
            name: otherUser.name,
            screen_name: otherUser.screen_name,
            profile_image: otherUser.profile_image,
          };
        }

        for (const _item of data) {
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

          let _user = _users[_item.owner_id];
          let item = {
            item_type: 'event',
            id: _item.id,
            fullname: _user?.name,
            screen_name: `@${_user?.screen_name}`,
            image: _user?.profile_image,
            user_id: _item.owner_id,
            name: _item.name,
            host: _item.host,
            location: _item.location,
            date: _item.date,
            event_link: _item.event_link,
            description: _item.description,
            view: getRandomNumber(0, 100),
            like: like,
            datetime: _item.created_at,
            itemLikes: itemLikes
          }
          result.push(item);
        }
      }
      else if (type == 'quest') {
        url = `/crowdsource/quest/list?page=${page}`;
        let resp = await api.get(url);
        let data = resp.data.events;

        let _items = [];
        let _users = {};
        for (const _item of data) {
          if (_users[_item.user_id]) continue;

          let otherUser = await getOtherUser(_item.user_id);
          if (!otherUser) continue;
          _users[_item.user_id] = {
            name: otherUser.name,
            screen_name: otherUser.screen_name,
            profile_image: otherUser.profile_image,
          };
        }

        for (const _item of data) {
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

          let _user = _users[_item.user_id];

          let item = {
            item_type: 'quest',
            id: _item.id,
            fullname: _user?.name,
            screen_name: `@${_user?.screen_name}`,
            image: _user?.profile_image,
            user_id: _item.user_id,
            name: _item.name,
            company: _item.company,
            link: _item.link,
            description: _item.description,
            view: getRandomNumber(0, 100),
            like: like,
            datetime: _item.created_at,
            itemLikes: itemLikes
          }
          result.push(item);
        }
      }
    } catch (error) {
      console.error("getItems", error)
    } finally {
      return result;
    }
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
          // console.log('l-datetime', index, item.id, item.datetime, item.item_type);
          if (item.item_type == 'post') {
            return (
              <PostSection
                tab={tab}
                isDetail={false}
                index={index}
                item={item}
                userInfo={usersession?.user_info}
                onPress={() => handleDetail(item)}
                onMore={handleMore}
              />
            )
          }
          else if (item.item_type == 'hiring') {
            return (
              <CrowdSectionHiring
                tab={tab}
                isDetail={false}
                index={index}
                item={item}
                userInfo={userInfo}
                onPress={() => handleDetail(item)}
                onMore={handleMore}
              />
            )
          }
          else if (item.item_type == 'event') {
            return (
              <CrowdSectionEvent
                tab={tab}
                isDetail={false}
                index={index}
                item={item}
                userInfo={userInfo}
                onPress={() => handleDetail(item)}
                onMore={handleMore}
              />
            )
          }
          else if (item.item_type == 'quest') {
            return (
              <CrowdSectionQuest
                tab={tab}
                isDetail={false}
                index={index}
                item={item}
                userInfo={userInfo}
                onPress={() => handleDetail(item)}
                onMore={handleMore}
              />
            )
          }
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
