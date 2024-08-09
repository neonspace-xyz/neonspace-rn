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

const SearchBar = ({ tab, backButton }) => {
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = useState('');

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

  return (
    <>
      <StatusBar backgroundColor={Color.colorGray_100} barStyle="light-content" />
      <View style={styles.header}>
        {backButton ? <Pressable
          onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/back.png")}
            style={styles.headerImage}
          />
        </Pressable> : <></>}
        <TextInput
          style={styles.searchInput}
          placeholder="Search by X handle"
          placeholderTextColor={Color.colorGray_500}
          value={searchValue}
          onChangeText={(text) => setSearchValue(text)}
        />
        <Pressable
          onPress={() => navigation.push(`ChatList${tab}`, { tab })}>
          <Image
            source={require("../assets/ic_chat.png")}
            style={styles.headerImage}
          />
        </Pressable>
        {/* </View> */}
      </View>
    </>
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
    // marginTop: 60,
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    backgroundColor: Color.colorGray_100,
  },
  containerList: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: Color.colorGray_200,
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

export default SearchBar;
