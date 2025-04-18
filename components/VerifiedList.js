import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Pressable, TextInput, TouchableOpacity, FlatList, RefreshControl, ActivityIndicator, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/Ionicons';
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import PostSection from "./PostSection";
import { getRandomNumber, getRandomTimestamp } from "../Utils";
import PostCreate from "./PostCreate";
import { IMG_PROFILE } from "../Constant";
import VerifiedListSection from "./VerifiedListSection";

const VerifiedList = ({ tab }) => {
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = useState('');
  const [items, setItems] = useState([]);
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

  const doPostCreate = () => {
    console.log('Floating button pressed');
  };

  useEffect(() => {
    getChats();
  }, [])

  const getChats = async () => {
  };

  const fetchItems = async () => {
    let data = [];
    for (let j = 0; j < getRandomNumber(); j++) {
      data.push({
        name: `Name${j}`,
        username: `@username${j}`,
        image: IMG_PROFILE[getRandomNumber(0, 4)],
        bio: `Founder at ChainCredit. #DYOR ${j}`,
      })
    }
    setItems(data);
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

  return (
    <View style={[styles.containerList]}>
      <FlatList
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
            <VerifiedListSection
              tab={tab}
              item={item}
            />
          )
        }}
      />
      {/* {isShowCreate && (
        <PostCreate
          setIsShowCreate={setIsShowCreate} />
      )} */}
    </View>
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
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: Color.colorGray_100,
  },
  containerList: {
    flex: 1,
    width: "100%",
    // height: "60%",
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

export default VerifiedList;
