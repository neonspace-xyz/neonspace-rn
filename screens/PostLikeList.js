import * as React from "react";
import { useLayoutEffect } from "react";
import { Image } from "expo-image";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import { Color, styleHeaderTitle, styleHeaderBack, styleHeaderBackIcon } from "../GlobalStyles";
import PostLikeSection from "../components/PostLikeSection";

const PostLikeList = () => {
  const route = useRoute();
  const items = route.params?.itemLikes ? route.params?.itemLikes : [];
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={styleHeaderTitle}>Liked by</Text>
      ),
      headerLeft: () => (
        <View style={styleHeaderBack}>
          <Pressable onPress={() => { navigation.goBack(); }}>
            <Image
              style={styleHeaderBackIcon}
              contentFit="cover"
              source={require("../assets/ic_back_white.png")}
            />
          </Pressable>
        </View>
      ),
      headerStyle: {
        backgroundColor: Color.colorGray_100
      },
    })
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.containerList]}>
        <FlatList
          style={styles.flat}
          data={items}
          renderItem={({ item }) => {
            return (
              <PostLikeSection
                item={item}
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
