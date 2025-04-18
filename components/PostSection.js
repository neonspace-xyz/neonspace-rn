import React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles";
import { formatPostTimestamp, getFormattedPostTimestamp, getRandomNumber } from "../Utils";
import { useNavigation } from "@react-navigation/core";

const PostSection = ({ tab, isDetail, item, onPress }) => {
  const navigation = useNavigation();
  let { timeFormat, dateFormat } = isDetail ? formatPostTimestamp(item?.datetime) : { timeFormat: "", dateFormat: "" }

  return (
    <Pressable index={item?.id} onPress={() => isDetail ? null : onPress()}>
      <View style={styles.frameParent}>
        <View style={styles.frameFlexBox}>
          <Image
            style={styles.frameChild}
            contentFit="cover"
            source={item.image}
          />
          <View style={[styles.frameGroup, styles.frameFlexBox]}>
            <View style={styles.frameFlexBox}>
              <Text style={[styles.name, styles.nameTypo]}>{item?.name}</Text>
              <Text style={[styles.endlessmeee, styles.nameTypo]}>
                {item?.username}
              </Text>
            </View>
            <Image
              style={styles.frameItem}
              contentFit="cover"
              source={require("../assets/ic_dot_white.png")}
            />
            <Text style={[styles.txtDateTime, styles.txtDefault]}>{getFormattedPostTimestamp(item?.datetime)}</Text>
          </View>
        </View>
        <Text style={[styles.imSoExcited, styles.imSoExcitedSpaceBlock]}>
          {item?.text}
        </Text>
        <View style={[styles.frameContainer, isDetail ? styles.imSoExcitedSpaceBlock : styles.imSoExcitedSpaceBlock2]}>
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
                  onPress={() => navigation.push(`PostLikeList${tab}`, { tab, itemLikes: item?.itemLikes })}
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
    </Pressable >
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
  },
  frameFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  frameChild: {
    width: 32,
    height: 32,
    marginRight: 8
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
  heartSvgrepoCom1Parent: {
    marginLeft: 16,
  },
  text1: {
    textAlign: "right",
    marginLeft: 4,
  },
});

export default PostSection;
