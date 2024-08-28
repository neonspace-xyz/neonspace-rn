import * as React from "react";
import { Image } from "expo-image";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import { Color, StyleHeaderView, StyleHeaderImg, StyleHeaderTitle } from "../GlobalStyles";
import PostLikeSection from "../components/PostLikeSection";
import { SafeAreaView } from "react-native-safe-area-context";
import PostLikeList from "../components/PostLikeList";

const PostLike = () => {
  const route = useRoute();
  const { tab, itemLikes } = route.params;
  const navigation = useNavigation();

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
      <PostLikeList
        tab={tab}
        itemLikes={itemLikes} />
      {/* <View style={[styles.containerList]}>
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
      </View> */}
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

export default PostLike;
