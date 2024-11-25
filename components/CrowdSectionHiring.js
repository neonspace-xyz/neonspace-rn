import React, { useState } from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable, TouchableOpacity } from "react-native";
import { FontSize, FontFamily, Color, Border, Padding, getFontFamily } from "../GlobalStyles";
import { formatPostTimestamp, getFormattedPostTimestamp, truncateString } from "../Utils";
import { useNavigation } from "@react-navigation/core";

const CrowdSectionHiring = ({ tab, isDetail, index, userInfo, item, onPress, onMore }) => {
  const navigation = useNavigation();
  let { timeFormat, dateFormat } = isDetail ? formatPostTimestamp(item?.datetime) : { timeFormat: "", dateFormat: "" }

  return (
    <View style={styles.frame} index={`hiring${item?.id}`} >
      <Pressable onPress={() => isDetail ? null : onPress()}>
        <View style={styles.frameParent}>
          <View style={styles.frameFlexBox}>
            <Image
              style={styles.frameChild}
              contentFit="cover"
              source={item.image}
            />
            <View style={[styles.frameFlexBox]}>
              <View style={styles.frameFlexBox}>
                <Text style={[styles.name, styles.nameTypo]}>{item?.fullname}</Text>
                <Text style={[styles.endlessmeee]}>
                  @{item?.screen_name}
                </Text>
              </View>
              <Image
                style={styles.frameItem}
                contentFit="cover"
                source={require("../assets/ic_dot_white.png")}
              />
              <Text style={[styles.txtDateTime]}>{getFormattedPostTimestamp(item?.datetime)}</Text>
            </View>
            {userInfo?.user_id == item?.user_id && (
              <TouchableOpacity onPress={(event) => onMore(event, index)} style={styles.viewImgMore}>
                <Image
                  style={styles.imgMore}
                  contentFit="cover"
                  source={require("../assets/ic_more_white.png")}
                />
              </TouchableOpacity>
            )}
          </View>
          {/* Added Title, Company, Location, and Detail */}
          <View style={styles.detailsContainer}>
            <View style={styles.titleDetailContainer}>
              <Text style={[styles.titleText]}>{item?.title}</Text>
              <Text style={[styles.detailText]}>{item?.salary_range}</Text>
            </View>
            <Text style={[styles.companyText, styles.textStyle]}>{item?.company}</Text>
            <Text style={[styles.locationText, styles.textStyle]}>{item?.location}</Text>
          </View>

          <Text style={[styles.imSoExcited, styles.imSoExcitedSpaceBlock]}>
            {isDetail ? item?.description : truncateString(item?.description, 150)}
          </Text>
          <View style={[styles.frameContainer, isDetail ? styles.imSoExcitedSpaceBlock1 : styles.imSoExcitedSpaceBlock2]}>
            {isDetail ? (
              <>
                <View style={styles.frameFlexBox}>
                  <Text style={styles.pmTypo}>{timeFormat}</Text>
                  <Image
                    style={styles.frameItem}
                    contentFit="cover"
                    source={require("../assets/ic_dot_gray.png")}
                  />
                  <Text style={[styles.text, styles.pmTypo]}>{dateFormat}</Text>
                </View>
                <View style={styles.frameViewFlexBox}>
                  <View style={styles.frameViewFlexBox}>
                    <Image
                      style={styles.eyeSvgrepoCom11}
                      contentFit="cover"
                      source={require("../assets/ic_eye.png")}
                    />
                    <Text style={[styles.text1, styles.txtDefault]}>{item?.view}</Text>
                  </View>
                  <Pressable
                    style={[styles.heartSvgrepoCom1Parent, styles.frameViewFlexBox]}
                    onPress={() => navigation.push(`PostLike${tab}`, { tab, itemLikes: item?.itemLikes })}
                  >
                    <Image
                      style={styles.eyeSvgrepoCom11}
                      contentFit="cover"
                      source={require("../assets/ic_heart_fill.png")}
                    />
                    <Text style={[styles.text1, styles.txtDefault]}>{item?.like}</Text>
                  </Pressable>
                </View>
              </>
            ) : (
              <View style={[styles.frameViewFlexBox, {}]}>
                <Pressable
                  style={[styles.heartSvgrepoCom1Parent, styles.frameViewFlexBox]}
                >
                  <Image
                    style={styles.eyeSvgrepoCom11}
                    contentFit="cover"
                    source={item.like == 0 ? require("../assets/ic_heart_empty.png") : require("../assets/ic_heart_fill.png")}
                  />
                  <Text style={[styles.text1, styles.txtDefault]}>{item.like}</Text>
                </Pressable>
              </View>
            )}
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
    marginTop: 16,
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
    fontFamily: getFontFamily("500"),
    color: Color.darkInk,
    textAlign: "left",
  },
  nameTypo: {
    color: Color.darkInk,
    fontFamily: FontFamily.clashGrotesk,
    textAlign: "left",
  },
  endlessmeee: {
    color: Color.darkInk,
    fontFamily: getFontFamily("400"),
    fontWeight: "400",
    marginLeft: 6,
    textAlign: "left",
    fontSize: FontSize.labelLarge_size,
  },
  imSoExcited: {
    fontSize: FontSize.size_sm,
    textAlign: "left",
    color: Color.darkInk,
    fontFamily: getFontFamily("400"),
    fontWeight: 400
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
    fontFamily: getFontFamily("400"),
    fontWeight: 400
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
    fontSize: FontSize.size_xs,
    color: Color.darkInk,
    fontFamily: getFontFamily("400"), fontWeight:400
  },
  txtDefault: {
    fontSize: FontSize.size_xs,
    color: Color.darkInk,
    fontFamily: getFontFamily("400"),
    fontWeight: 400
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
    fontFamily: getFontFamily("400"),
    fontWeight: 400,
    color: Color.darkInk,
  },
  titleText: {
    fontSize: FontSize.size_sm,
    fontFamily: getFontFamily("600"),
    fontWeight: 600,
    color: Color.darkInk,
  },
  detailText: {
    fontSize: FontSize.size_sm,
    fontFamily: getFontFamily("600"),
    fontWeight: 600,
    color: Color.darkInk,
  },
  companyText: {
    marginTop: 4,
  },
  locationText: {
    marginTop: 4,
    opacity:0.6
  },
});

export default CrowdSectionHiring;
