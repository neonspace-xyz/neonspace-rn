import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, RefreshControl, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/core';
import { Color, FontFamily, FontSize, getFontFamily, Padding } from "../GlobalStyles";
import { getRandomNumber, getRandomTimestamp, shortenAddress } from "../Utils";
import { IMG_PROFILE } from "../Constant";
import * as WebBrowser from 'expo-web-browser';

const NFTList = ({ tab, itemsData }) => {
  const navigation = useNavigation();
  const [items, setItems] = useState(itemsData);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [isShowCreate, setIsShowCreate] = useState(false);
  const [url, setUrl] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      fetchItems();
    }, [])
  );

  useEffect(() => {
    getChats();
  }, [])

  useEffect(() => {
    openLink();
  }, [url])

  const openLink = async () => {
    if (url == '') return;
    await WebBrowser.openBrowserAsync(url);
  }

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
      console.error("NFTList", error)
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

  const Accordion = ({ title, image, children }) => {
    const [expanded, setExpanded] = useState(false);

    return (
      <View style={styles.accordionContainer}>
        <TouchableOpacity onPress={() => setExpanded(!expanded)}
          style={styles.accordionHeader}>

          <View style={{ flexDirection: "row" }}>
            <Image
              style={styles.rectangleIcon}
              contentFit="cover"
              source={image}
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
            <Accordion title={item.name} image={item.token_ids[0].image}>

              {item.token_ids.map((item2, index) => (
                <TouchableOpacity style={styles.rectangleFlexBox} key={index} onPress={() => {
                  let url = `https://testnets.opensea.io/assets/sepolia/${item.contract_address}/${item2.token_id}`;
                  // let url = `https://testnets.opensea.io/assets/sepolia/0x063aa9f317f3c90a2c35c516bdb926ad346a07b7/131`;
                  // console.log(url)
                  // navigation.push(`Webview${tab}`, { tab, url: url });

                  setUrl(url);
                }}>
                  <Image
                    style={styles.nftIcon}
                    contentFit="cover"
                    source={item2.image}
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
                      fontSize: FontSize.labelLarge_size,
                      fontFamily: getFontFamily("500"),
                    }}>
                      {item2.name}
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
                        fontFamily: getFontFamily("400"),
                        fontWeight: "400"
                      }}>{`Token Standard: `}</Text>
                      <Text style={{

                        lineHeight: 12,
                        fontSize: FontSize.size_xs,
                        textAlign: "left",
                        color: Color.darkInk,
                        fontFamily: getFontFamily("600"),
                        fontWeight: "600"

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
                        fontFamily: getFontFamily("400"),
                        fontWeight: "400"
                      }}>Contract Address: </Text>
                      <Text style={{
                        lineHeight: 12,
                        fontSize: FontSize.size_xs,
                        textAlign: "left",
                        color: Color.darkInk,
                        fontFamily: getFontFamily("600"),
                        textDecorationLine: "underline",
                        fontWeight: "600"
                      }}>
                        {shortenAddress(item.contract_address)}
                      </Text>
                    </View>

                  </View>
                </TouchableOpacity>
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
    alignSelf: "center",
    // justifyContent:"ce",
    width: 14,
    height: 7,
    marginLeft: 8,
  },
  accordionHeader: {
    justifyContent: "space-between",
    padding: 15,
    gap: 10,
    textAlign: "center",
    flexDirection: "row",
    width: "100%",
    backgroundColor: Color.colorDarkslategray_100,
    // borderWidth: 1,
    // borderColor: '#ddd',
  },
  accordionTitle: {
    paddingLeft: 10,
    fontSize: FontSize.size_lg,
    fontFamily: getFontFamily("500"),
    fontWeight: '500',
    color: "white",
    alignSelf: "center"
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
    flex: 1,
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
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
  rectangleFlexBox: {
    padding: 5,
    alignItems: "center",
    flexDirection: "row",
    gap: 10
  }
});

export default NFTList;
