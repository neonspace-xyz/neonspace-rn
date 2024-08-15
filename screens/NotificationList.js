import * as React from "react";
import { useEffect, useState, useRef } from "react";
import moment from "moment";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import EventSource from 'react-native-event-source';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/core';
import { StyleSheet, View, Pressable, TextInput, FlatList, RefreshControl, ActivityIndicator, StatusBar } from "react-native";
import { API_URL } from "../Constant";
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import { getRandomNumber, getRandomTimestamp } from "../Utils";
import NotificationSection from "../components/NotificationSection";

const NotificationList = ({ route }) => {
  const navigation = useNavigation();
  const { tab } = route.params;

  const [items, setItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchItems, setSearchItems] = useState([]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isShowSearch, setIsShowSearch] = useState(false);

  const textInputRef = useRef(null);
  const handleBlurTextInput = () => {
    if (textInputRef.current) {
      setSearchValue("");
      textInputRef.current.blur();
      setIsShowSearch(!isShowSearch);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchItems();
      fetchSearchItems();
    }, [])
  );

  useEffect(() => {
    getItems();
  }, [])

  useEffect(() => {
    const eventSource = new EventSource(`${API_URL}/event/stream`);

    eventSource.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      console.log("newData", newData)
      // setData((prevData) => [...prevData, newData]);
    };

    eventSource.onerror = (error) => {
      console.error('SSE error:', error);
      eventSource.close(); // Close the connection on error
    };

    return () => {
      eventSource.close(); // Clean up the connection when the component unmounts
    };
  }, []);

  const getItems = async () => {
  };

  const fetchItems = async () => {
    let data = [];
    for (let i = 1; i < getRandomNumber(); i++) {
      data.push({
        id: i,
        title: `Notification title here${i}`,
        description: `Notification details and information here${i}`,
        datetime: moment(getRandomTimestamp(7)).format("DD/MM/YYYY h:mm A"),
      });
    }
    setItems(data);
  };

  const fetchSearchItems = async () => {
    let data = [];
    for (let i = 1; i < getRandomNumber(); i++) {
      data.push({
        id: i,
        title: `Notification title here${i}`,
        description: `Notification details and information here${i}`,
        datetime: moment(getRandomTimestamp(7)).format("DD/MM/YYYY h:mm A"),
      });
    }
    setSearchItems(data);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchItems(); // Fetch fresh data
    setRefreshing(false);
  };

  const onLoadMore = () => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true);
      fetchItems(); // Fetch more data
      setLoadingMore(false);
    }
  };

  const handleDetail = (item) => {
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Color.colorGray_100} barStyle="light-content" />
      <View style={styles.header}>
        <Pressable
          style={[styles.headerIcon, !isShowSearch && { display: "none" }]}
          onPress={() => handleBlurTextInput()}>
          <Image
            source={require("../assets/ic_back_white.png")}
            style={styles.headerImageBack}
          />
        </Pressable>
        <TextInput
          ref={textInputRef}
          style={styles.searchInput}
          placeholder="Search by X handle"
          placeholderTextColor={Color.colorGray_500}
          value={searchValue}
          onChangeText={(text) => {
            setSearchValue(text);
            fetchSearchItems();
          }}
          onFocus={() => {
            setSearchItems([]);
            setIsShowSearch(!isShowSearch);
          }}
        />
        <Pressable
          style={[styles.headerIcon, isShowSearch && { display: "none" }]}
          onPress={() => navigation.navigate(`ChatList${tab}`)}>
          <Image
            source={require("../assets/ic_chat.png")}
            style={styles.headerImageChat}
          />
        </Pressable>
      </View>
      {/* {!isShowCreate && (
        <View style={styles.containerFAB}>
          <Pressable style={styles.FAB} onPress={doPostCreate}>
            <Icon name="add" size={45} color={Color.colorBlack} />
          </Pressable>
        </View>
      )} */}
      <View style={[styles.containerListSearch, !isShowSearch && { display: "none" }]}>
        <FlatList
          style={styles.flat}
          data={searchItems}
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
              <NotificationSection
                isDetail={false}
                item={item}
                onPress={() => handleDetail(item)}
              />
            )
          }}
        />
      </View>
      <View style={[styles.containerList, isShowSearch && { display: "none" }]}>
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
              <NotificationSection
                isDetail={false}
                item={item}
                onPress={() => handleDetail(item)}
              />
            )
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: Color.colorGray_100,
  },
  header: {
    marginTop: 30,
    height: 68,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    backgroundColor: Color.colorGray_100,
  },
  headerIcon: {
    marginTop: 10,
  },
  containerListSearch: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: Color.colorGray_200,
    zIndex: 1
  },
  containerList: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: Color.colorGray_200,
  },
  flat: {
    width: "100%"
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginTop: 16,
    backgroundColor: Color.colorGray_200,
    borderRadius: 5,
    paddingLeft: 10,
    color: Color.darkInk,
    textAlign: "left",
    fontFamily: FontFamily.clashGrotesk,
    fontWeight: "500",
    fontSize: FontSize.labelLarge_size,
  },
  headerImageBack: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  headerImageChat: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  containerFAB: {
    position: 'absolute',
    zIndex: 1,
    bottom: 30,
    right: 30,
  },
  FAB: {
    backgroundColor: Color.darkInk, // Adjust color as needed
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default NotificationList;
