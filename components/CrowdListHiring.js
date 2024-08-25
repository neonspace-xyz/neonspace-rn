import * as React from "react";
import { StyleSheet, View, FlatList, RefreshControl, ActivityIndicator, Dimensions, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import { useFocusEffect } from '@react-navigation/core';
import { Color } from "../GlobalStyles";
import { getRandomNumber, getRandomTimestamp, logout } from "../Utils";
import { API_URL, IMG_PROFILE } from "../Constant";
import { useAuth } from "./AuthProvider";
import CrowdSectionHiring from "./CrowdSectionHiring";
import PopupOption from "./PopupOption";
import ButtonFAB from "./ButtonFAB";

const CrowdListHiring = ({ tab, isProfile, usersession, userInfo }) => {
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
    try {
      let url = `/crowdsource/hiring/list?page=${page}`//&user=${userInfo.user_id};
      let resp = await api.get(url);
      let jobs = resp.data.jobs;

      let _jobs = [];
      let _users = {};
      for (const job of jobs) {
        if (_users[job.user_id]) continue;

        let otherUser = await getOtherUser(job.user_id);
        if(!otherUser) continue;
        _users[job.user_id] = {
          name: otherUser.name,
          screen_name: otherUser.screen_name,
          profile_image: otherUser.profile_image,
        };
      }

      for (const job of jobs) {
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
          datetime: job.posted_at,
          itemLikes: itemLikes
        }
        _jobs.push(item);
      }
      setItems(_jobs);
    } catch (error) {
      if (error.isSessionExpired) {
        await logout(navigation);
      } else {
        console.error("HiringList-fetchItems-error", error)
      }
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
          screen_name: `@username${j}`,
          image: IMG_PROFILE[getRandomNumber(0, 4)],
          bio: `Founder at ChainCredit. #DYOR ${j}`,
        })
      }
      let view = getRandomNumber(0, 2);
      data.push({
        id: i,
        fullname: `Name${i}`,
        screen_name: '@FimoTex96172',//`@username${i}`,
        image: IMG_PROFILE[getRandomNumber(0, 4)],
        title: `Title${i}`,
        company: `Company${i}`,
        location: `Location${i}`,
        salary_range: `80k-120k`,
        description: 'Are you passionate about lorem ipsum tect Neonrabbits team is hiring a marketing lead who’s able to launch branding & marketing initiatives with strategic partners, and source new partnerships lorem ipsum.\n\nAbout\n\nBrinc is a global lorem ipsum I’m so excited to be on this app and in this community! I love Neonrabbits!! I’m so excited to be on this app and in this community! I love Neonrabbits!! I’m so excited to be on this app and in this community! I’m so excited to be on this app and in this community! I love Neonrabbits!! I’m so excited to be on this app and in this community! I love Neonrabbits!! I’m so excited to be on this app and in this community! I love Neonrabbits!! I’m so excited to be on this app and in this community! I love Neonrabbits!!',
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

  const handleDelete = async () => {
    if (!userInfo) return;
    try {
      let item = items[selectedItemIndex];
      let url = API_URL + `/crowdsource/hiring/delete`;
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
