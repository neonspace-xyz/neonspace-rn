import * as React from "react";
import { useEffect, useState, useRef, useCallback } from "react";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Pressable, TextInput, StatusBar, Alert, FlatList, ActivityIndicator } from "react-native";
import { Color, FontFamily, FontSize, getFontFamily } from "../GlobalStyles";
import { useAuth } from "../components/AuthProvider";
import UserSearchSection from "./UserSearchSection";
import EmptyView from "./EmptyView";
import debounce from 'lodash.debounce';

const Header = ({ tab, isHideList, isShowSearch, setIsShowSearch, userInfo }) => {
  const { api } = useAuth();
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = useState('');
  const [emptyText, setEmptyText] = useState('');
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

   // Function to fetch search items
  const fetchSearchItems = useCallback(async() => {
    if (searchValue == '') return;
    let data = [];
    setLoadingMore(true);
    setEmptyText('');
    try {
      let url = `/twitter/getUser`;
      let body = {
        "screen_name": searchValue
      };
      console.log("Header-search-url", url)
      console.log("Header-search-input", body)
      let resp = await api.post(url, body);
      if (resp.data) {
        let user = resp.data;
        console.log("Header-search-resp", user);
        url = `/user/getUser?userId=${user.id}`;

        try {
          resp = await api.get(url);
          if (resp.data) {
            console.log("user : ", resp.data)
            data.push(resp.data);
          }
        } catch (e) {
          if(e.response.data.error) setEmptyText(e.response.data.error);
          console.error("fetchSearchItems-getUser", e.response.data.error)
        }
      }
    } catch (error) {
      // Alert.alert("User not found");
      console.error("fetchSearchItems", error?.message)
    } finally {
      setSearchItems(data);
      setLoadingMore(false);
    }
  }, [searchValue]);

  const debouncedFetchSearchItems = useCallback(debounce(fetchSearchItems, 500), [fetchSearchItems]);

   // Trigger debounced function when searchValue changes
   useEffect(() => {
    if (searchValue) {
      debouncedFetchSearchItems();
    }
    // Cleanup the debounce on unmount
    return () => debouncedFetchSearchItems.cancel();
  }, [searchValue, debouncedFetchSearchItems]);

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
        <Pressable
          onPress={() => navigation.openDrawer()} >
        {userInfo?.profile_image ? (
            <Image
              style={[styles.myProfileItem]}
              contentFit="cover"
              source={userInfo.profile_image}              
            />
          ) : (
            <Image
              style={[styles.myProfileItem]}
              contentFit="cover"
              source={require("../assets/photo.png")}
            />
          )}
        </Pressable>
        
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
            console.log("onchange text")
            debouncedFetchSearchItems();
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
            return <EmptyView loadingMore={loadingMore} text={emptyText} />
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
    backgroundColor: Color.colorGray_100,
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
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
    fontFamily: getFontFamily("500"),
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
    marginTop: 10,
    backgroundColor: Color.colorGray_200,
    zIndex: 1
  },
  flat: {
    width: "100%"
  },
  myProfileItem: {
    width: 32,
    height: 32,
    margin: 10,
    borderRadius: 50
  },
});

export default Header;
