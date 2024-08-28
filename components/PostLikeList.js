import * as React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Color } from "../GlobalStyles";
import PostLikeSection from "./PostLikeSection";

const PostLikeList = ({ tab, itemLikes }) => {

  return (
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
  );
};

const styles = StyleSheet.create({
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
