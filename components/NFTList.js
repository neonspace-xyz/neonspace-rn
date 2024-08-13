import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable, TextInput, TouchableOpacity, FlatList, RefreshControl, ActivityIndicator, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/Ionicons';
import { Color, FontFamily, FontSize, Padding } from "../GlobalStyles";
import PostSection from "./PostSection";
import { getRandomNumber, getRandomTimestamp } from "../Utils";
import PostCreate from "./PostCreate";
import { IMG_PROFILE } from "../Constant";

const NFTList = () => {
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

  useEffect(() => {
    getChats();
  }, [])

  const getChats = async () => {
  };

  const fetchItems = async () => {
    let data = [];
    for (let i = 1; i < getRandomNumber(); i++) {
      let like = getRandomNumber(0,7);
      let itemLikes = [];
      for (let j = 0; j < like; j++) {
        itemLikes.push({
          name: `Name${j}`,
          username: `@username${j}`,
          image: IMG_PROFILE[getRandomNumber(0,4)],
          bio: `Founder at ChainCredit. #DYOR ${j}`,
        })
      }
      data.push({
        id: i,
        name: `Name${i}`,
        username: `@username${i}`,
        image: IMG_PROFILE[getRandomNumber(0,4)],
        text: 'I’m so excited to be on this app and in this community! I love Neonrabbits!! I’m so excited to be on this app and in this community! I love Neonrabbits!! I’m so excited to be on this app and in this community! I love Neonrabbits!! I’m so excited to be on this app and in this comm...',
        view: getRandomNumber(0,100),
        like: like,
        datetime: getRandomTimestamp(),
        itemLikes: itemLikes
      });
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

  const handleDetail = (item) => {
    navigation.navigate("PostDetail", { item });
  };

  const Accordion = ({ title, children }) => {
    const [expanded, setExpanded] = useState(false);
  
    return (
      <View style={styles.accordionContainer}>
        <TouchableOpacity onPress={() => setExpanded(!expanded)} 
          style={styles.accordionHeader}>

          <View style={{flexDirection:"row"}}>
            <Image
                style={styles.rectangleIcon}
                contentFit="cover"
                source={require("../assets/rectangle-photo.png")}
              />
            <Text style={styles.accordionTitle}>{title}</Text>
          </View>
          <Image
            style={styles.frameInner}
            contentFit="cover"
            source={expanded ? require("../assets/up.png") : require("../assets/down.png")}
          />
        </TouchableOpacity>
        {expanded && (
          <View style={styles.accordionContent}>
            {children}
          </View>
        )}
      </View>
    );
  };

  const nftData = [
    {
      imageSrc: require("../assets/rectangle-photo.png"),
      title: "Neonrabbits #287",
      tokenStandard: "ERC721",
      contractAddress: "0xe...dhv",
    },
    {
      imageSrc: require("../assets/rectangle-photo.png"),
      title: "Neonrabbits #288",
      tokenStandard: "ERC721",
      contractAddress: "0xe...dhv",
    },
    // Add more items as needed
  ];

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
            <Accordion title="Section 1">
              
              {nftData.map((item, index) => (
              <View style={styles.rectangleFlexBox} key={index}>
                <Image
                  style={styles.nftIcon}
                  contentFit="cover"
                  source={require("../assets/rectangle-photo.png")}
                />
                <View style={{
                  justifyContent: "center",
                  flex: 1
                }}>
                  <Text style={{
                    alignSelf: "stretch",
                    fontWeight: "500",
                    textAlign: "left",
                    color: Color.darkInk,
                    fontFamily: FontFamily.clashGrotesk,
                  }}>
                    Neonrabbits #287
                  </Text>
                  
                  <View style={{
                    marginTop: 2,
                    alignSelf: "stretch",
                    flexDirection: "row",
                  }}>
                    <Text style={{
                      lineHeight: 12,
                      fontSize: FontSize.size_xs,
                      textAlign: "left",
                      color: Color.darkInk,
                      fontFamily: FontFamily.clashGrotesk,
                    }}>{`Token Standard: `}</Text>
                    <Text style={{
                      
                      lineHeight: 12,
                      fontSize: FontSize.size_xs,
                      textAlign: "left",
                      color: Color.darkInk,
                      fontFamily: FontFamily.clashGrotesk,
                    
                    }}>ERC721</Text>
                  </View>
                  
                  <View style={{
                    marginTop: 2,
                    alignSelf: "stretch",
                    flexDirection: "row",
                  }}>
                    <Text style={{
                      lineHeight: 12,
                      fontSize: FontSize.size_xs,
                      textAlign: "left",
                      color: Color.darkInk,
                      fontFamily: FontFamily.clashGrotesk,
                    }}>Contract Address:</Text>
                    <Text style={{
                      lineHeight: 12,
                      fontSize: FontSize.size_xs,
                      textAlign: "left",
                      color: Color.darkInk,
                      fontFamily: FontFamily.clashGrotesk,
                    }}>
                      0xe...dhv
                    </Text>
                  </View>

                </View>
              </View>
              ))}
            </Accordion>
          )
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  accordionContainer: {
    // marginBottom: 10,
    // alignItems: "center",
  },
  frameInner: {
    alignSelf:"center",
    // justifyContent:"ce",
    width: 14,
    height: 7,
    marginLeft: 8,
  },
  accordionHeader: {
    justifyContent: "space-between",
    padding:15,
    gap:10,
    textAlign:"center",
    flexDirection: "row",
    width:"100%",
    backgroundColor: Color.colorDarkslategray_100,
    // borderWidth: 1,
    // borderColor: '#ddd',
  },
  accordionTitle: {
    paddingLeft:10,
    fontSize: 16,
    fontWeight: 'bold',
    color:"white",
    alignSelf:"center"
  },
  rectangleIcon: {
    height: 36,
    width: 36,
  },

  nftIcon: {
    height: 48,
    width: 48,
  },
  accordionContent: {
    padding: 10,
    backgroundColor: Color.colorDarkslategray_400,
    // borderWidth: 1,
    // borderColor: '#ddd',
    // borderTopWidth: 0,
    // borderRadius: 5,
  },
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
    flex:1,
    width: "100%",
    paddingLeft:10,
    paddingRight:10,
    paddingTop:10,
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
  rectangleFlexBox:{
    padding:5,
    alignItems: "center",
    flexDirection: "row",
    gap:10
  }
});

export default NFTList;
