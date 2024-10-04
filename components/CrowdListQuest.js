import * as React from "react";
import { StyleSheet, View, FlatList, RefreshControl, ActivityIndicator, Dimensions, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import { useFocusEffect } from '@react-navigation/core';
import { Color } from "../GlobalStyles";
import { getRandomNumber, getRandomTimestamp, logout } from "../Utils";
import { API_URL, IMG_PROFILE } from "../Constant";
import { useAuth } from "./AuthProvider";
import CrowdSectionQuest from "./CrowdSectionQuest";
import PopupOption from "./PopupOption";
import ButtonFAB from "./ButtonFAB";
import EmptyView from "./EmptyView";

const CrowdListQuest = ({ tab, isProfile, usersession, userInfo }) => {
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
    try {
      let url = `/crowdsource/quest/list?page=${page}`//&user=${userInfo.user_id};
      let resp = await api.get(url);
      let _items = resp.data.events;

      let data = [];
      let _users = {};
      // for (const _item of _items) {
      //   if (_users[_item.user_id]) continue;

      //   let otherUser = await getOtherUser(_item.user_id);
      //   if (!otherUser) continue;
      //   _users[_item.user_id] = {
      //     name: otherUser.name,
      //     screen_name: otherUser.screen_name,
      //     profile_image: otherUser.profile_image,
      //   };
      // }

      for (const _item of _items) {
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

        // let _user = _users[_item.user_id];

        let item = {
          id: _item.id,
          fullname: "Dummy",//_user?.name,
          screen_name: "Dummy",//`@${_user?.screen_name}`,
          image: "",//_user?.profile_image,
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
        data.push(item);
      }
      setItems(data);
    } catch (error) {
      if (error.isSessionExpired) {
        await logout(navigation);
      } else {
        console.error("QuestList-fetchItems-error", error)
      }
    } finally {
      setLoadingMore(false);
    }
  }

  const fetchItemsa = async () => {
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
      let view = getRandomNumber(0, 100);
      data.push({
        id: i,
        fullname: `Name${i}`,
        screen_name: '@FimoTex96172',//`@username${i}`,
        image: IMG_PROFILE[getRandomNumber(0, 4)],
        name: `Title${i}`,
        company: `Company${i}`,
        link: 'https://neonrabbits.io',
        description: 'Event details lorem ipsum neonrabbits team is hiring a marketing lead who’s able to launch branding & marketing initiatives with strategic part lorem ipsum long text here example lorem ipsum.',
        view: view,
        like: like,
        datetime: getRandomTimestamp(30),
        itemLikes: itemLikes
      });
    }
    setItems(data);
  };

  const handleDetail = (item) => {
    navigation.push(`CrowdDetailQuest${tab}`, { tab, item });
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
    navigation.push(`CrowdCreateQuest${tab}`, { tab, item: items[selectedItemIndex] });
    setSelectedItemIndex(null);
  };

  const handleDelete = async () => {
    if (!userInfo) return;
    try {
      let item = items[selectedItemIndex];
      let url = API_URL + `/crowdsource/quest/delete`;
      let body = {
        id: item.id
      }
      let resp = await api.post(url, body);
      if (resp.status == 200) {
        Alert.alert("Your post has been deleted!");
        fetchItems();
      }
    } catch (error) {
      if (error.isSessionExpired) {
        await logout(navigation);
      } else {
        console.error("handleDelete-error", error)
      }
    } finally {
      setSelectedItemIndex(null);
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
    navigation.push(`CrowdCreateQuest${tab}`, { tab });
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
          isTab={true}
          isProfile={false}
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

export default CrowdListQuest;
