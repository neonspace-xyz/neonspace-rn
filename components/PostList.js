import * as React from "react";
import { StyleSheet, View, FlatList, RefreshControl, ActivityIndicator, Dimensions, Alert, Modal, Text, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import { useFocusEffect } from '@react-navigation/core';
import { FontSize, Color, getFontFamily } from "../GlobalStyles";
import PostSection from "../components/PostSection";
import { convertTimestamp, getRandomNumber, logout } from "../Utils";
import { IMG_PROFILE } from "../Constant";
import { useAuth } from "./AuthProvider";
import PopupOption from "./PopupOption";
import ButtonFAB from "./ButtonFAB";
import PostCreate from "./PostCreate";
import EmptyView from "./EmptyView";
import { useRefresh } from "./RefreshProvider";

const PostList = ({ tab, isProfile, usersession, userInfo, isShowSearch }) => {
  const { api } = useAuth();
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { refreshTrigger } = useRefresh();
  const windowDimensions = Dimensions.get('window');
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const flatListRef = useRef(null);

  const [isShowCreate, setIsShowCreate] = useState(false);
  const [isDeletingPost, setIsDeletingPost] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      fetchItems();
    }, [])
  );

  useEffect(() => {
    fetchItems();
  }, [userInfo, refreshTrigger]);

  const fetchItems = async () => {
    if (!userInfo) return;
    setLoadingMore(true);
    try {
      let url = isProfile ?
        `/user/getPost?userId=${userInfo.user_id}&page=${page}` :
        `/user/getAllPosts`;
      console.log(`PostList-fetchItems-url`, url)
      let resp = await api.get(url);
      let posts = isProfile ? resp.data.posts : resp.data;
      let _posts = [];
      for (const key in posts) {
        if (Object.hasOwnProperty.call(posts, key)) {
          let itemLikes = [];
          const post = posts[key];
          for (let j = 0; j < post.users_liked.length; j++) {
            itemLikes.push({
              name: post.users_liked[j].name,
              username: post.users_liked[j].screen_name,
              image: post.users_liked[j].profile_image,
              bio: post.users_liked[j].bio,
            })
          }

          let item = {
            id: key,
            user_id: post.user_id,
            name: post.name,
            screen_name: `@${post.screen_name}`,
            image: post.profile_image,
            user_id: post.user_id,
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
      console.log(eror)
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
    if (selectedItemIndex != null) {
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
    setSelectedItemIndex(null);
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
    let newTop = pageY - 140; // Position the menu below the button
    if(isProfile) {
      newTop = pageY - 100;
    }
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

  const handleDelete = async () => {
    console.log("PostList-handleDelete-selectedItemIndex", selectedItemIndex);
    setIsDeletingPost(true);
    try {
      // Get the post to delete
      const postToDelete = items[selectedItemIndex];

      // Call delete API
      const url = `/user/deletePost?postId=${postToDelete.post_id}`;
      await api.post(url);

      // Update items state by filtering out the deleted post
      setItems(currentItems =>
        currentItems.filter(item => item.post_id !== postToDelete.post_id)
      );

      // Clear selected item
      setSelectedItemIndex(null);

    } catch (error) {
      if (error.isSessionExpired) {
        await logout(navigation);
      } else {
        console.error("PostList-handleDelete-error", error);
        console.log("PostList-handleDelete-error", error.data);
        Alert.alert(
          "Error",
          "Failed to delete post. Please try again."
        );
      }
    } finally {
      setIsDeletingPost(false);
    }
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

  const Content = () => {
    return (
      <>
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
              onRefresh={onRefresh}
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
      {!isShowSearch && !isShowCreate && usersession?.user_info?.user_id == userInfo?.user_id && (
        <ButtonFAB
          isTab={false}
          isProfile={isProfile}
          doCreate={doCreate}
        />
      )}

      <Modal
        transparent={true}
        visible={isDeletingPost}
        animationType="fade"
      >
        <View style={styles.loadingModalContainer}>
          <View style={styles.loadingModalContent}>
            <ActivityIndicator size="large" color={Color.darkInk} />
            <Text style={styles.loadingText}>Deleting post...</Text>
          </View>
        </View>
      </Modal>
      </>
    )
  }

  return (
    <View style={{
      flex:1, 
      //borderColor:'red', borderWidth:2, 
      // marginBottom:Platform.OS == "ios" ? -35 : 0
      }}>
      <Content/>
    </View>
  );
};

const styles = StyleSheet.create({
  containerList: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    backgroundColor: Color.colorGray_200,
    // borderColor:'red',
    // borderWidth:2,
  },
  containerListProfile: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: Color.colorGray_200,
  },
  flat: {
    width: "100%",
    // borderColor:'red',
    // borderWidth:2,
  },
  loadingModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loadingModalContent: {
    backgroundColor: Color.colorDarkslategray_400,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  loadingText: {
    color: Color.darkInk,
    marginTop: 10,
    fontSize: FontSize.size_sm,
    fontFamily: getFontFamily("500"),
    fontWeight: "500",
  },
});

export default PostList;
