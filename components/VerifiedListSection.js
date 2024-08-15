import React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/core";

const VerifiedListSection = ({ tab, item }) => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => { navigation.push(`OtherProfile${tab}`, { tab, id:item.user_id }); }}>
      <View index={item?.id} style={[styles.frameParent]}>
        <Image
          style={styles.frameChild}
          contentFit="cover"
          source={item.profile_image}
        />
        <View style={styles.frameGroup}>
          <View style={[styles.nameParent, styles.topNavFlexBox]}>
            <Text style={[styles.name, styles.nameTypo]}>{item.name}</Text>
            <Text style={[styles.endlessmeee, styles.nameTypo]}>
              @{item.screen_name}
            </Text>
          </View>
          <Text style={[styles.bioHere, styles.nameTypo]}>{item.name}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  frameParent: {
    overflow: "hidden",
    marginTop: 16,
    marginHorizontal: 12,
    paddingHorizontal: Padding.p_xs,
    paddingVertical: Padding.p_sm,
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorDarkslategray_400,
    alignItems: "center",
    alignSelf: "stretch",
    flexDirection: "row",
  },
  frameChild: {
    width: 32,
    height: 32,
    borderRadius: 50
  },
  frameGroup: {
    marginLeft: 10,
    flex: 1,
  },
  topNavFlexBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontWeight: "500",
    fontSize: FontSize.labelLarge_size,
  },
  endlessmeee: {
    marginLeft: 6,
    fontSize: FontSize.labelLarge_size,
  },
  nameParent: {
    alignItems: "center",
  },
  bioHere: {
    fontSize: FontSize.size_sm,
    marginTop: 2,
    alignSelf: "stretch",
    textAlign: "left",
  },
  nameTypo: {
    textAlign: "left",
    color: Color.darkInk,
    fontFamily: FontFamily.clashGrotesk,
  },
});

export default VerifiedListSection;
