import * as React from "react";
import { useLayoutEffect } from "react";
import { Image } from "expo-image";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Color, FontSize, Border, FontFamily, Padding, styleHeaderTitle, styleHeaderBack, styleHeaderBackIcon } from "../GlobalStyles";
import PostSection from "../components/PostSection";

const PostDetail = () => {
  const route = useRoute();
  const item = route.params?.item;
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={styleHeaderTitle}>Post details</Text>
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
      <PostSection
        isDetail={true}
        item={item}
      />
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
  }
});

export default PostDetail;
