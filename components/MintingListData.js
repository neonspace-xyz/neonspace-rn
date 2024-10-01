import React, { useState } from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable, TouchableOpacity } from "react-native";
import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles";
import { formatPostTimestamp, getFormattedPostTimestamp, truncateString } from "../Utils";
import { useNavigation } from "@react-navigation/core";

const MintingListData = ({ tab, isDetail, index, userInfo, item, onPress, onMore }) => {
  const navigation = useNavigation();
  let { timeFormat, dateFormat } = isDetail ? formatPostTimestamp(item?.datetime) : { timeFormat: "", dateFormat: "" }

  return (
    <View style={styles.frame}>
      <Pressable index={`hiring${item?.id}`} onPress={() => isDetail ? null : onPress()}>
        <View style={styles.frameParent}>
          <View style={styles.frameFlexBox}>
            <View style={[styles.frameFlexBox]}>
              <View style={styles.frameFlexBox}>
                <Text style={[styles.name, styles.nameTypo]}>{item?.fullname}</Text>
                <Text style={[styles.endlessmeee, styles.nameTypo]}>
                  {item?.from} minted {item?.to} bio
                </Text>
              </View>             
            </View>
          </View>          
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  frame: {
    width: "100%"
  },
  frameParent: {
    overflow: "hidden",
    width: "95%",
    marginTop: 10,
    marginHorizontal: 12,
    paddingHorizontal: Padding.p_xs,
    paddingVertical: Padding.p_sm,
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorDarkslategray_400,
  },
  frameFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  frameChild: {
    width: 32,
    height: 32,
    marginRight: 8,
    borderRadius: 50
  },
  frameContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  name: {
    fontWeight: "500",
    textAlign: "left",
    fontSize: FontSize.labelLarge_size,
  },
  nameTypo: {
    color: Color.darkInk,
    fontFamily: FontFamily.clashGrotesk,
    textAlign: "left",
  },
  endlessmeee: {
    marginLeft: 6,
    textAlign: "left",
    fontSize: FontSize.labelLarge_size,
  },
  imSoExcited: {
    fontSize: FontSize.size_sm,
    textAlign: "left",
    color: Color.darkInk,
    fontFamily: FontFamily.clashGrotesk,
  },
  imSoExcitedSpaceBlock: {
    marginTop: 8,
    alignSelf: "stretch",
  },
  imSoExcitedSpaceBlock1: {
    marginTop: 16,
    alignSelf: "stretch",
  },
  imSoExcitedSpaceBlock2: {
    marginTop: 16,
    alignSelf: "stretch",
    justifyContent: "flex-end",
  },
  pmTypo: {
    color: Color.colorGray_400,
    fontSize: FontSize.size_xs,
    textAlign: "left",
    fontFamily: FontFamily.clashGrotesk,
  },
  frameItem: {
    width: 3,
    height: 3,
    marginLeft: 12,
  },
  text: {
    marginLeft: 12,
  },
  frameViewFlexBox: {
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  eyeSvgrepoCom11: {
    width: 14,
    height: 14,
    overflow: "hidden",
  },
  txtDateTime: {
    marginLeft: 12,
    textAlign: "left",
  },
  txtDefault: {
    fontSize: FontSize.size_xs,
    color: Color.darkInk,
    fontFamily: FontFamily.clashGrotesk,
  },
  viewImgMore: {
    width: 25,
    height: 30,
    justifyContent: "center",
    marginLeft: 'auto',
  },
  imgMore: {
    width: 25,
    height: 25,
    marginLeft: 'auto',
  },
  heartSvgrepoCom1Parent: {
    marginLeft: 16,
  },
  text1: {
    textAlign: "right",
    marginLeft: 4,
  },
  detailsContainer: {
    marginTop: 12,
    marginBottom: 8,
  },
  titleDetailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textStyle: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.clashGrotesk,
    color: Color.darkInk,
  },
  titleText: {
    fontWeight: "bold",
  },
  detailText: {
    fontWeight: "bold",
  },
  companyText: {
    marginTop: 4,
  },
  locationText: {
    marginTop: 4,
  },
});

export default MintingListData;
