import * as React from "react";
import { StyleSheet, View, FlatList, RefreshControl, ActivityIndicator, Dimensions, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import { useFocusEffect } from '@react-navigation/core';
import { Color } from "../GlobalStyles";
import { convertTimestamp, getRandomNumber, getRandomTimestamp, logout } from "../Utils";
import { IMG_PROFILE } from "../Constant";
import { useAuth } from "./AuthProvider";
import CrowdSectionHiring from "./CrowdSectionHiring";
import PopupOption from "./PopupOption";
import ButtonFAB from "./ButtonFAB";

const CrowdListHiring = ({ tab, isProfile, usersession, userInfo }) => {
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

  const fetchItemsNew = async () => {
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

  const fetchItems = async () => {
    let data = [];
    for (let i = 1; i < getRandomNumber(); i++) {
      let like = getRandomNumber(0, 7);
      let itemLikes = [];
      for (let j = 0; j < like; j++) {
        itemLikes.push({
          name: `Name${j}`,
          screen_name: `@username${j}`,
          image: IMG_PROFILE[getRandomNumber(0, 4)],
          bio: `Founder at ChainCredit. #DYOR ${j}`,
        })
      }
      let view = getRandomNumber(0, 2);
      data.push({
        id: i,
        name: `Name${i}`,
        screen_name: '@FimoTex96172',//`@username${i}`,
        image: IMG_PROFILE[getRandomNumber(0, 4)],
        title: `Title${i}`,
        company: `Company${i}`,
        location: `Location${i}`,
        salary: `80k-120k`,
        detail: 'Are you passionate about lorem ipsum tect Neonrabbits team is hiring a marketing lead who’s able to launch branding & marketing initiatives with strategic partners, and source new partnerships lorem ipsum.\n\nAbout\n\nBrinc is a global lorem ipsum I’m so excited to be on this app and in this community! I love Neonrabbits!! I’m so excited to be on this app and in this community! I love Neonrabbits!! I’m so excited to be on this app and in this community! I’m so excited to be on this app and in this community! I love Neonrabbits!! I’m so excited to be on this app and in this community! I love Neonrabbits!! I’m so excited to be on this app and in this community! I love Neonrabbits!! I’m so excited to be on this app and in this community! I love Neonrabbits!! ',
        view: view,
        like: like,
        datetime: getRandomTimestamp(30),
        itemLikes: itemLikes
      });
    }
    setItems(data);
  };

  const handleDetail = (item) => {
    navigation.push(`CrowdDetailHiring${tab}`, { tab, item });
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
  
  const handleEdit = () => {
    navigation.push(`CrowdCreateHiring${tab}`, { tab, item: items[selectedItemIndex] });
    setSelectedItemIndex(null);
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
    navigation.push(`CrowdCreateHiring${tab}`, { tab });
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
        ListFooterComponent={() =>
          loadingMore && <ActivityIndicator style={{ marginVertical: 20 }} />
        }
        renderItem={({ item, index }) => {
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
        }}
      />
      <PopupOption
        showEdit={true}
        selectedItemIndex={selectedItemIndex}
        menuPosition={menuPosition}
        handleEdit={handleEdit}
        handleDelete={confirmDelete}
      />
      {usersession?.user_info?.user_id == userInfo?.user_id && (
        <ButtonFAB
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
    height: "55%",
    alignItems: "center",
    backgroundColor: Color.colorGray_200,
  },
  flat: {
    width: "100%"
  },
});

export default CrowdListHiring;
