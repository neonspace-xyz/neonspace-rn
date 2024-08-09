import * as React from "react";
import { useLayoutEffect } from "react";
import { Image } from "expo-image";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Color, FontSize, Border, FontFamily, Padding, styleHeaderTitle, styleHeaderBack, styleHeaderBackIcon, StyleHeaderView, StyleHeaderImg, StyleHeaderTitle } from "../GlobalStyles";
import PostSection from "../components/PostSection";
import { SafeAreaView } from "react-native-safe-area-context";

const PostDetail = () => {
  const route = useRoute();
  const { tab, item } = route.params;
  const navigation = useNavigation();

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerTitle: () => (
  //       <Text style={styleHeaderTitle}>Post details</Text>
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
          Post Details
        </Text>
      </View>
      <PostSection
        tab={tab}
        isDetail={true}
        item={item}
      />
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
  save1Typo: {
    textAlign: "center",
    fontSize: FontSize.labelLarge_size,
    color: Color.colorCornflowerblue_100,
    fontFamily: FontFamily.clashGrotesk,
    fontWeight: "500",
  },
});

export default PostDetail;
