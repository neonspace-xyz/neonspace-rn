import * as React from "react";
import { useEffect, useState } from "react";
import moment from "moment";
// import EventSource from 'react-native-event-source';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/core';
import { StyleSheet, View, FlatList, RefreshControl, ActivityIndicator } from "react-native";
import { API_URL, WS_URL } from "../Constant";
import { Color } from "../GlobalStyles";
import { getRandomNumber, getRandomTimestamp } from "../Utils";
import NotificationSection from "../components/NotificationSection";
import Header from "../components/Header";
import EmptyView from "../components/EmptyView";
import EventSource from "react-native-sse";
import api from "../utils/ApiHandler";

const NotificationList = ({ route }) => {
  const { tab } = route.params;
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isShowSearch, setIsShowSearch] = useState(false);

  const addItem = (newItem) => {
    // Use the spread operator to create a new array with the existing items and the new item
    setItems(prevItems => [newItem, ...prevItems]);
  };

  const getNotification = async () => {
    let url = `${API_URL}/event/stream`
    let resp = await api.get(url);

    let data = [];
    for (let i = 0; i < resp.data.events.length; i++) {
      let event = resp.data.events[i]
      let momentDate = moment(event.created_at)
      const isToday = momentDate.isSame(moment(), 'day');

      let eventType = ""
      let notificationTitle = ""
      if (event.event_type == "user_inserted") {
        notificationTitle = `New User`
        eventType = `${event.payload.user.name} joined the community`
      }
      else if (event.event_type == "post_inserted") {
        notificationTitle = `New Post`
        eventType = `${event.payload.user.name} created a new post`
      }
      else if (event.event_type == "post_updated") {
        notificationTitle = `Post Updated`
        eventType = "Updaed a post"
      }
      data.push({
        id: i,
        title: notificationTitle,
        name: event.payload.user.name,
        description: `${eventType}`,
        datetime: isToday ? `Today ${momentDate.format("h:mm A")}` : momentDate.format("DD/MM/YYYY h:mm A"),
        image: event.payload.user.profile_image_url,
      });
    }
    setItems(data);
  }

  useEffect(() => {
    getNotification()
  })
  /*
  useEffect(() => {
    console.log("Consume notification")
    const eventSource = new EventSource(`${API_URL}/event/stream`);

    eventSource.onmessage = (event) => {
      console.log("notif-event", event);
      const newData = JSON.parse(event.data);
      console.log("notif-newData", newData)
      setData((prevData) => [...prevData, newData]);
    };

    eventSource.onerror = (error) => {
      console.error('notif-SSE error:', error);
      eventSource.close(); // Close the connection on error
    };

    return () => {
      console.log("notif-close");
      eventSource.close(); // Clean up the connection when the component unmounts
    };
  }, []);
  */

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

  const onRefresh = async () => {
    //setRefreshing(true);
    //await fetchItems(); // Fetch fresh data
    //setRefreshing(false);
  };

  const onLoadMore = () => {
    if (!loadingMore && hasMore) {
      //setLoadingMore(true);
      //fetchItems(); // Fetch more data
      //setLoadingMore(false);
    }
  };

  const handleDetail = (item) => {
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        tab={tab}
        isHideList={false}
        isShowSearch={isShowSearch}
        setIsShowSearch={setIsShowSearch}
      />
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
          ListEmptyComponent={() => {
            return <EmptyView loadingMore={loadingMore} />
          }}
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
    // justifyContent: 'center',
    // alignItems: "center",
    backgroundColor: Color.colorGray_100,
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
});

export default NotificationList;
