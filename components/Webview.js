import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable, StatusBar } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Padding, FontSize, Color, FontFamily, Border } from "../GlobalStyles";
import PostList from "./PostList";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "./SearchBar";
import ProfileDetail from "./ProfileDetail";
import TokenList from "./TokenList";
import NFTList from "./NFTList";
import { useAuth } from "./AuthProvider";
import React, { useEffect, useState } from "react";
import { shortenAddress } from "../Utils";
import WebView from "react-native-webview";

const Webview = () => {
  const route = useRoute();
  const { url } = route.params;
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
    <StatusBar backgroundColor={Color.colorGray_100} barStyle="light-content" />
    
      <View style={styles.header}>
          <Pressable
            onPress={() => navigation.goBack()}>
            <Image
              source={require("../assets/back.png")}
              style={styles.headerImage}
            />
          </Pressable>          
      </View>   

      <WebView 
        source={{ uri: url }} 
        style={{ marginTop: 20 }} 
      />
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    // marginTop: 60,
    width: "100%",
    // flex:1,
    flexDirection: 'row',
    // alignSelf:"flex-",
    padding: 14,
    backgroundColor: Color.colorGray_100,
  },
  headerImage: {
    width: 30,
    height: 30,
  },
});

export default Webview;
