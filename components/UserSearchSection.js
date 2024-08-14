import React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles";

const UserSearchSection = ({ isDetail, item, onPress }) => {

  return (
    <Pressable index={item?.id} onPress={() => isDetail ? null : onPress()}>
      <View style={[styles.ellipseGroup, styles.ellipseSpaceBlock]}>
        <Image
          style={[styles.frameChild, styles.frameChildLayout]}
          contentFit="cover"
          source={item.profile_image}
        />
        <View style={styles.frameGroup}>
          <View style={styles.nameParentFlexBox}>
            <Text style={[styles.name, styles.nameTypo]}>{item.name}</Text>
            <Text style={[styles.endlessmeee, styles.nameTypo]}>
              {item.screen_name}
            </Text>
          </View>
          <View style={[styles.nameOfNftParent, styles.nameParentFlexBox]}>
            <Text style={[styles.nameOfNft, styles.nameTypo]}>
              Name of NFT
            </Text>
            <Image
              style={styles.frameItem}
              contentFit="cover"
              source={require("../assets/ic_dot_white.png")}
            />
            <Text style={[styles.price04Eth, styles.nameTypo]}>
              Price: {item.price} ETH
            </Text>
          </View>
        </View>
      </View>
    </Pressable >
  );
};

const styles = StyleSheet.create({
  ellipseGroup: {
    overflow: "hidden",
    marginTop: 16,
    marginHorizontal: 12,
    paddingHorizontal: Padding.p_xs,
    paddingVertical: Padding.p_sm,
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorDarkslategray_400,
  },
  ellipseSpaceBlock: {
    paddingVertical: Padding.p_sm,
    paddingHorizontal: Padding.p_xs,
    flexDirection: "row",
  },
  frameChildLayout: {
    width: 32,
    height: 32,
  },
  frameChild: {
    height: 32,
  },
  frameGroup: {
    marginLeft: 10,
    flex: 1,
  },
  nameParentFlexBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontWeight: "500",
    fontSize: FontSize.labelLarge_size,
    textAlign: "left",
  },
  nameTypo: {
    textAlign: "left",
    color: Color.darkInk,
    fontFamily: FontFamily.clashGrotesk,
  },
  endlessmeee: {
    marginLeft: 6,
    fontSize: FontSize.labelLarge_size,
    textAlign: "left",
  },
  price04Eth: {
    fontSize: FontSize.size_xs,
    marginLeft: 10,
  },
  nameOfNft: {
    fontSize: FontSize.size_sm,
  },
  nameOfNftParent: {
    marginTop: 2,
    alignSelf: "stretch",
  },
  frameItem: {
    width: 3,
    height: 3,
    marginLeft: 10,
  },
});

export default UserSearchSection;
