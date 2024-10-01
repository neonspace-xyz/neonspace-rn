import * as React from "react";
import { StyleSheet, View, FlatList, RefreshControl, ActivityIndicator, Dimensions, Alert, TouchableOpacity, Text } from "react-native";
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
import EmptyView from "./EmptyView";
import MintingListData from "./MintingListData";

const MintingList = ({ tab, isProfile, usersession, userInfo }) => {
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
      setItems([
        {
          from:"Hao",
          to:"Budi"
        },
        {
          from:"Andi",
          to:"Chei"
        },
        
      ])
    } catch (error) {
      if (error.isSessionExpired) {
        await logout(navigation);
      } else {
        console.error("HiringList-fetchItems-error", error)
      }
    } finally {
      setLoadingMore(false);
    }
  }

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

  
  const TabButtons = () => {
    const [selectedTab, setSelectedTab] = useState('Collected');
    return (
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedTab === 'Collected' && styles.selectedButton
          ]}
          onPress={() => setSelectedTab('Collected')}
        >
          <Text style={styles.text}>Collected</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.button,
            selectedTab === 'Holders' && styles.selectedButton
          ]}
          onPress={() => setSelectedTab('Holders')}
        >
          <Text style={styles.text}>Holders</Text>
        </TouchableOpacity>
      </View>
    );
  }


  return (
    <View style={[isProfile ? styles.containerListProfile : styles.containerList]}>
      <TabButtons/>
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
            <MintingListData
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
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#575767', // Border color similar to the image
    paddingVertical: 5,
    marginHorizontal: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.colorDarkslategray_100, // Darker background for selected button
  },
  selectedButton: {
    backgroundColor: Color.colorBlack, // Background color for unselected button
  },
  text: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
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

export default MintingList;
