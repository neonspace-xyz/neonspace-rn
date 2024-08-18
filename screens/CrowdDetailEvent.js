import * as React from "react";
import { Image } from "expo-image";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Color, FontSize, FontFamily, StyleHeaderView, StyleHeaderImg, StyleHeaderTitle } from "../GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import CrowdSectionEvent from "../components/CrowdSectionEvent";

const CrowdDetailEvent = () => {
  const route = useRoute();
  const { tab, item } = route.params;
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
          Event
        </Text>
      </View>
      <CrowdSectionEvent
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

export default CrowdDetailEvent;
