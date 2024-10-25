import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable, TextInput, TouchableOpacity, FlatList, RefreshControl, ActivityIndicator, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/Ionicons';
import { Color, FontFamily, FontSize, getFontFamily, Padding } from "../GlobalStyles";
import PostSection from "./PostSection";
import { getRandomNumber, getRandomTimestamp } from "../Utils";
import PostCreate from "./PostCreate";
import { IMG_PROFILE } from "../Constant";
import EmptyView from "./EmptyView";

const TokenList = ({ itemsData }) => {
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = useState('');
  const [items, setItems] = useState([{}, {}]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [isShowCreate, setIsShowCreate] = useState(false);

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     header: () =>
  //       <>
  //         <SafeAreaView style={styles.header}>
  //           <View style={styles.header}>
  //             <TextInput
  //               style={styles.searchInput}
  //               placeholder="Search by X handle"
  //               placeholderTextColor={Color.colorGray_500}
  //               value={searchValue}
  //               onChangeText={(text) => setSearchValue(text)}
  //             />
  //             <Image
  //               source={require("../assets/ic_chat.png")}
  //               style={styles.headerImage}
  //             />
  //           </View>
  //         </SafeAreaView>
  //       </>,
  //   });
  // }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      fetchItems();
    }, [])
  );

  useEffect(() => {
    getChats();
  }, [])

  const getChats = async () => {
  };

  const fetchItems = async () => {
    let data = [];
    setLoadingMore(true);
    try {
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
        data.push({
          id: i,
          name: `Name${i}`,
          username: `@username${i}`,
          image: IMG_PROFILE[getRandomNumber(0, 4)],
          text: 'I’m so excited to be on this app and in this community! I love Neonrabbits!! I’m so excited to be on this app and in this community! I love Neonrabbits!! I’m so excited to be on this app and in this community! I love Neonrabbits!! I’m so excited to be on this app and in this comm...',
          view: getRandomNumber(0, 100),
          like: like,
          datetime: getRandomTimestamp(),
          itemLikes: itemLikes
        });
      }
      // setItems(data);
    } catch (error) {
      console.error("TokenList-error", error)
    } finally {
      setLoadingMore(false);
    }
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
    navigation.navigate("PostDetail", { item });
  };

  return (
    <View style={[styles.containerList]}>
      <FlatList
        data={items}
        style={[{
          //borderWidth:2, borderColor:'yellow',
          paddingLeft: 10, paddingRight: 10, paddingTop: 10
        }]}
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
            <View style={styles.ellipseFlexBox}>
              <Image
                style={styles.frameItem}
                contentFit="cover"
                source={require("../assets/photo.png")}
              />
              <View style={{ justifyContent: "center", flex: 1 }}>
                <Text style={{
                  fontWeight: "500",
                  fontFamily: getFontFamily("500"),
                  textAlign: "left",
                  color: Color.darkInk,
                  alignSelf: "stretch",
                  fontSize: FontSize.labelLarge_size,
                }}>
                  Bitcoin
                </Text>
                <Text style={{
                  fontWeight: "400",
                  fontFamily: getFontFamily("400"),
                  opacity: 0.7,
                  textAlign: "left",
                  color: Color.darkInk,
                  alignSelf: "stretch",
                  fontSize: FontSize.labelLarge_size,
                }}>
                  0.02 Bitcoin
                </Text>
              </View>
              <Text style={{
                textAlign: "right",
                fontWeight: "500",
                fontFamily: getFontFamily("500"),
                color: Color.darkInk,
                fontSize: FontSize.labelLarge_size,
              }}>$100</Text>
            </View>
          )
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  frameItem: {
    height: 32,
    width: 32,
  },
  ellipseFlexBox: {
    paddingVertical: Padding.p_xs,
    paddingHorizontal: Padding.p_xl,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
    gap: 10
    // borderColor:"red",
    // borderWidth:2
  },
  container: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: Color.colorGray_100,
  },
  header: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: Color.colorGray_100,
  },
  containerList: {
    width: "100%",
    height: "60%",
    // alignItems: "center",
    backgroundColor: Color.colorGray_200,
    // borderColor:"red",
    // borderWidth:5

  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: Color.colorGray_200,
    borderRadius: 5,
    paddingLeft: 10,
    marginRight: 10,
    color: Color.darkInk,
    textAlign: "left",
    fontFamily: FontFamily.clashGrotesk,
    fontWeight: "500",
    fontSize: FontSize.labelLarge_size,
  },
  headerImage: {
    width: 30,
    height: 30,
  },
  containerFloating: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  floatingButton: {
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

export default TokenList;
