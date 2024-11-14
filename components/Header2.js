import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Pressable, TextInput, StatusBar, Alert, FlatList, ActivityIndicator } from "react-native";
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import { useAuth } from "./AuthProvider";
import UserSearchSection from "./UserSearchSection";
import EmptyView from "./EmptyView";

const Header2 = ({ tab, isHideList, isShowSearch, setIsShowSearch }) => {
  const { api } = useAuth();
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = useState('');
  const [searchItems, setSearchItems] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);

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
    setLoadingMore(true);
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
      setLoadingMore(false);
    }
  };

  const handleDetail = (item) => {
    console.log("Going to other profile from header2 : ", item)
    if (isHideList) return;
    setIsShowSearch(false);
    setSearchValue('');
    navigation.navigate(`OtherProfile${tab}`, { tab, user: item });
  };

  return (
    <View style={styles.container}>
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
          }}
          onFocus={() => {
            if (!isShowSearch) {
              setSearchItems([]);
              setIsShowSearch(!isShowSearch);
            }
          }}
          onSubmitEditing={fetchSearchItems}
        />
        <Pressable
          style={[styles.headerIcon, isShowSearch && { display: "none" }]}
          onPress={() => navigation.navigate(`ChatList${tab}`, { tab })}>
          <Image
            source={require("../assets/ic_chat.png")}
            style={styles.headerImageChat}
          />
        </Pressable>
      </View>

      <View style={[styles.containerListSearch, !isShowSearch && { display: "none" }]}>
        <FlatList
          style={[styles.flat, !isShowSearch && { display: "none" }]}
          data={searchItems}
          ListEmptyComponent={() => {
            return <EmptyView loadingMore={loadingMore} />
          }}
          ListFooterComponent={() =>
            loadingMore && <ActivityIndicator style={{ marginVertical: 20 }} />
          }
          renderItem={({ item }) => {
            return (
              <UserSearchSection
                item={item}
                onPress={() => handleDetail(item)}
              />
            )
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
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
  containerListSearch: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: Color.colorGray_200,
    zIndex: 1
  },
  flat: {
    width: "100%"
  },
});

export default Header2;
