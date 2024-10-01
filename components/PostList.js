import * as React from "react";
import { StyleSheet, View, FlatList, RefreshControl, ActivityIndicator, Dimensions, Alert, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import { useFocusEffect } from '@react-navigation/core';
import { Color } from "../GlobalStyles";
import PostSection from "../components/PostSection";
import { convertTimestamp, getRandomNumber, logout } from "../Utils";
import { IMG_PROFILE } from "../Constant";
import { useAuth } from "./AuthProvider";
import PopupOption from "./PopupOption";
import ButtonFAB from "./ButtonFAB";
import PostCreate from "./PostCreate";
import EmptyView from "./EmptyView";

const PostList = ({ tab, isProfile, usersession, userInfo }) => {
  const { api } = useAuth();
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

  const [isShowCreate, setIsShowCreate] = useState(false);

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
    } finally {
      setLoadingMore(false);
    }
  }

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

  const handleDetail = (item) => {
    if (isShowCreate) return;
    console.log(`PostDetail${tab}`)
    navigation.push(`PostDetail${tab}`, { tab, item });
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
    let newTop = pageY - 110; // Position the menu below the button
    let windowHeight = windowDimensions.height - 100;

    if (newLeft + menuWidth > windowDimensions.width) {
      newLeft = windowDimensions.width - menuWidth;
    }

    if (pageY + menuHeight > windowHeight) {
      newTop = pageY - 220;
    }

    if (isProfile) {
      newTop = newTop - (windowDimensions.height / 2) + 100;
    }

    setMenuPosition({ top: newTop, left: newLeft });
    setSelectedItemIndex(index);
  };

  const handleDelete = () => {
    console.log(`Deleting item ${selectedItemIndex}`);
    setSelectedItemIndex(null);
  };

  const confirmDelete = () => {
    Alert.alert(
      "Delete the post",
      "Are you sure you want to delete the post?",
      [
        {
          text: "No",
          onPress: () => setSelectedItemIndex(null),
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: handleDelete
        }
      ],
      { cancelable: true }
    );
  };

  const doCreate = () => {
    setIsShowCreate(true);
  }

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
        }}
      />
      <PopupOption
        showEdit={false}
        selectedItemIndex={selectedItemIndex}
        menuPosition={menuPosition}
        handleDelete={confirmDelete}
      />
      {isShowCreate && (
        <Modal
        visible={isShowCreate}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsShowCreate(false)}
      >
        <PostCreate
          usersession={usersession}
          setIsShowCreate={setIsShowCreate} />
        </Modal>
      )}
      {!isShowCreate && usersession?.user_info?.user_id == userInfo?.user_id && (
        <ButtonFAB
          isTab={false}
          isProfile={isProfile}
          doCreate={doCreate}
        />
      )}


      
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
    height: "100%",
    alignItems: "center",
    backgroundColor: Color.colorGray_200,
  },
  flat: {
    width: "100%"
  },
});

export default PostList;
