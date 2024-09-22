import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Pressable, TextInput, StatusBar, Alert, FlatList, Text } from "react-native";
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import { useAuth } from "./AuthProvider";
import UserSearchSection from "./UserSearchSection";

const WalletHeader = ({ tab, isHideList, isShowSearch, setIsShowSearch }) => {
  const { api } = useAuth();
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = useState('');
  const [searchItems, setSearchItems] = useState([]);

  const textInputRef = useRef(null);
  const handleBlurTextInput = () => {
    if (textInputRef.current) {
      setSearchValue("");
      textInputRef.current.blur();
      setIsShowSearch(!isShowSearch);
    }
  };

  const fetchSearchItems = async () => {
    if (searchValue == '') return;
    let data = [];
    try {
      let url = `/twitter/getUser`;
      let body = {
        "screen_name": searchValue
      };
      let resp = await api.post(url, body);
      if (resp.data) {
        let user = resp.data;
        url = `/user/getUser?userId=${user.id}`;
        resp = await api.get(url);
        if (resp.data) {
          data.push(resp.data);
        }
      }
    } catch (error) {
      Alert.alert("User not found");
      console.error("fetchSearchItems", error)
    } finally {
      setSearchItems(data);
    }
  };

  const handleDetail = (item) => {
    if (isHideList) return;
    setIsShowSearch(false);
    setSearchValue('');
    navigation.navigate(`OtherProfile${tab}`, { tab, user: item });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Color.colorGray_100} barStyle="light-content" />
      <View style={styles.header}>
      <Image
            // source={require("../assets/ic_chat.png")}
            style={styles.headerImageChat}
          />
        <Text style={styles.headerText}>Wallet</Text>
        <Pressable
          style={[styles.headerIcon, isShowSearch && { display: "none" }]}
          onPress={() => navigation.navigate(`QrCamera${tab}`, { tab })}>
          <Image
            source={require("../assets/qr.png")}
            style={styles.headerImageQR}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // height:"100%",
    backgroundColor: Color.colorGray_100,
    paddingVertical: 10,
    // borderColor:"blue",
    // borderWidth:2,
    zIndex:2
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
    flexGrow:1,
    color:"white",
    textAlign:"center",
    fontFamily: FontFamily.helvetica,
  },
  headerIcon: {
  },
  searchInput: {
    flex: 1,
    height: 40,
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
    height: 45,
    marginLeft: 10,
  },
  headerImageQR: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  containerListSearch: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: Color.colorGray_200,
    zIndex: 1
  },
  flat: {
    width: "100%"
  },
});

export default WalletHeader;
