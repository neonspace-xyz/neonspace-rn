import * as React from "react";
import { useLayoutEffect } from "react";
import { Image } from "expo-image";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import { Color, styleHeaderTitle, styleHeaderBack, styleHeaderBackIcon, FontSize, FontFamily, StyleHeaderView, StyleHeaderImg, StyleHeaderTitle } from "../GlobalStyles";
import PostLikeSection from "../components/PostLikeSection";
import { SafeAreaView } from "react-native-safe-area-context";

const PostLikeList = () => {
  const route = useRoute();
  const { tab, itemLikes } = route.params;
  const navigation = useNavigation();

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerTitle: () => (
  //       <Text style={styleHeaderTitle}>Liked by</Text>
  //     ),
  //     headerLeft: () => (
  //       <View style={styleHeaderBack}>
  //         <Pressable onPress={() => { navigation.goBack(); }}>
  //           <Image
  //             style={styleHeaderBackIcon}
  //             contentFit="cover"
  //             source={require("../assets/ic_back_white.png")}
  //           />
  //         </Pressable>
  //       </View>
  //     ),
  //     headerStyle: {
  //       backgroundColor: Color.colorGray_100
  //     },
  //   })
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={StyleHeaderView}>
        <Pressable
          onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/back.png")}
            style={StyleHeaderImg}
          />
        </Pressable>
        <Text style={[StyleHeaderTitle]}>
          Liked By
        </Text>
      </View>
      <View style={[styles.containerList]}>
        <FlatList
          style={styles.flat}
          data={itemLikes}
          renderItem={({ item }) => {
            return (
              <PostLikeSection
                tab={tab}
                item={item}
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
    justifyContent: 'flex-start',
    alignItems: "center",
    backgroundColor: Color.colorGray_200,
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

export default PostLikeList;
