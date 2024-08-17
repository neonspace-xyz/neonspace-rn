import * as React from "react";
import { StyleSheet, View, FlatList, RefreshControl, ActivityIndicator, TouchableOpacity, Text, Dimensions, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import { useFocusEffect } from '@react-navigation/core';
import { Color } from "../GlobalStyles";
import PostSection from "../components/PostSection";
import { convertTimestamp, getRandomNumber, getRandomTimestamp, logout } from "../Utils";
import { IMG_PROFILE } from "../Constant";
import { useAuth } from "./AuthProvider";
import { Image } from "expo-image";

const PostList = ({ tab, isProfile, usersession, userInfo, isShowSearch, isShowCreate }) => {
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
            screen_name: `@${userInfo.screen_name}`,
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

  const handleMore = (event, index) => {
    if(selectedItemIndex == index) {
      setSelectedItemIndex(null);
      return;
    }
    const { pageY, pageX } = event.nativeEvent;
    // Adjust menu position to stay within screen bounds
    const menuWidth = 190; // Adjust based on your menu width
    const menuHeight = 81; // Adjust based on your menu height
    let newLeft = pageX;
    let newTop = pageY - 100; // Position the menu below the button
    let windowHeight = windowDimensions.height - 100;

    if (newLeft + menuWidth > windowDimensions.width) {
      newLeft = windowDimensions.width - menuWidth;
    }

    if (pageY + menuHeight > windowHeight) {
      newTop = pageY - 220;
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

  const handleEdit = () => {
    const selectedItem = items[selectedItemIndex];
    // navigation.navigate('EditScreen', { item: selectedItem });
    setSelectedItemIndex(null);
  };

  return (
    <View style={[isProfile ? styles.containerListProfile : styles.containerList, isShowSearch && { display: "none" }]}>
      <FlatList
        ref={flatListRef}
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
        renderItem={({ item, index }) => {
          return (
            <PostSection
              tab={tab}
              isDetail={false}
              index={index}
              userInfo={usersession.user_info}
              item={item}
              onPress={() => handleDetail(item)}
              onMore={handleMore}
            />
          )
        }}
      />
      {selectedItemIndex !== null && (
        <View style={[styles.optionsMenu, { top: menuPosition.top + 10, left: menuPosition.left }]}>
          <TouchableOpacity style={styles.optionItem} onPress={handleEdit}>
            <Text style={styles.optionText}>Edit</Text>
            <Image source={require('../assets/ic_edit_white.png')} style={styles.optionIcon} />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.optionItem} onPress={confirmDelete}>
            <Text style={styles.optionText}>Delete</Text>
            <Image source={require('../assets/ic_trash_white.png')} style={styles.optionIcon} />
          </TouchableOpacity>
        </View>
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
    height: "55%",
    alignItems: "center",
    backgroundColor: Color.colorGray_200,
  },
  flat: {
    width: "100%"
  },
  optionsMenu: {
    width: 160,
    position: 'absolute',
    backgroundColor: Color.colorDarkslategray_100,
    borderRadius: 5,
    borderColor: Color.colorDarkslategray_100,
    borderWidth: 1,
    shadowColor: Color.colorDarkslategray_100,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 1,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  optionText: {
    fontSize: 16,
    color: Color.darkInk
  },
  optionIcon: {
    width: 20,
    height: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
  },
});

export default PostList;
