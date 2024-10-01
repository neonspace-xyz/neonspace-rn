import React, { useState } from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable, TouchableOpacity } from "react-native";
import { FontSize, FontFamily, Color, Border, Padding, getFontFamily } from "../GlobalStyles";
import { formatPostTimestamp, getFormattedPostTimestamp } from "../Utils";
import { useNavigation } from "@react-navigation/core";
import { useAuth } from "./AuthProvider";

const PostSection = ({ tab, isDetail, index, userInfo, item, onPress, onMore }) => {
  const navigation = useNavigation();
  const { api } = useAuth();
  const [likes, setLikes] = useState(item?.like);
  const [isLikedByUser, setIsLikedByUser] = useState(item.liked_by_user);
  let { timeFormat, dateFormat } = isDetail ? formatPostTimestamp(item?.datetime) : { timeFormat: "", dateFormat: "" }


  const toggleLike = async (item) => {
    console.log(`Trigger toggle like for item ${item.post_id}`)
    let url = `/user/toggleLikesForPost`;
    let body = {
      post_id: item.post_id
    }
    let resp = await api.post(url, body);
    if (resp.status == 200) {
      setIsLikedByUser(!isLikedByUser)
      if (!isLikedByUser) {
        setLikes(likes + 1)
      } else {
        setLikes(likes - 1)
      }
    }
  }
  return (
    <View style={styles.frame} index={`post${item?.id}`}>
      <Pressable  onPress={() => isDetail ? null : onPress()}>
        <View style={styles.frameParent}>
          <View style={styles.frameFlexBox}>
            <Image
              style={styles.frameChild}
              contentFit="cover"
              source={item.image}
            />
            <View style={[styles.frameFlexBox]}>
              <View style={styles.frameFlexBox}>
                <Text style={[styles.name]}>{item?.name}</Text>
                <Text style={[styles.endlessmeee, styles.nameTypo]}>
                  {item?.screen_name}
                </Text>
              </View>
              <Image
                style={styles.frameItem}
                contentFit="cover"
                source={require("../assets/ic_dot_white.png")}
              />
              <Text style={[styles.txtDefault]}>{getFormattedPostTimestamp(item?.datetime)}</Text>
            </View>
            {`@${userInfo?.screen_name}` == item?.screen_name && (
              <TouchableOpacity onPress={(event) => onMore(event, index)} style={styles.viewImgMore}>
                <Image
                  style={styles.imgMore}
                  contentFit="cover"
                  source={require("../assets/ic_more_white.png")}
                />
              </TouchableOpacity>
            )}
          </View>
          <Text style={[styles.imSoExcited, styles.imSoExcitedSpaceBlock]}>
            {item?.text}
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
                      source={!isLikedByUser ? require("../assets/ic_heart_empty.png") : require("../assets/ic_heart_fill.png")}
                    />
                    <Text style={[styles.text1, styles.txtDefault]}>{likes}</Text>
                  </Pressable>
                </View>
              </>
            ) : (
              <View style={[styles.frameViewFlexBox, {}]}>
                <Pressable
                  style={[styles.heartSvgrepoCom1Parent, styles.frameViewFlexBox]}
                  onPress={() => toggleLike(item)}
                >
                  <Image
                    style={styles.eyeSvgrepoCom11}
                    contentFit="cover"
                    source={!isLikedByUser ? require("../assets/ic_heart_empty.png") : require("../assets/ic_heart_fill.png")}
                  />
                  <Text style={[styles.text1, styles.txtDefault]}>{likes}</Text>
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
    fontFamily: getFontFamily("500"),
    textAlign: "left",
    fontSize: FontSize.labelLarge_size,
    color: Color.darkInk,
  },
  endlessmeee: {
    fontWeight: "400",
    fontFamily: getFontFamily("400"),
    marginLeft: 6,
    textAlign: "left",
    fontSize: FontSize.labelLarge_size,
    color: Color.darkInk,
  },
  imSoExcited: {
    fontSize: FontSize.size_sm,
    textAlign: "left",
    color: Color.darkInk,
    fontWeight: "400",
    fontFamily: getFontFamily("400"),
  },
  imSoExcitedSpaceBlock: {
    marginTop: 16,
    alignSelf: "stretch",
  },
  imSoExcitedSpaceBlock1: {
    alignSelf: "stretch",
  },
  imSoExcitedSpaceBlock2: {
    alignSelf: "stretch",
    justifyContent: "flex-end",
  },
  pmTypo: {
    color: Color.colorGray_400,
    fontSize: FontSize.size_xs,
    textAlign: "left",
    fontFamily: getFontFamily("400"),
    fontWeight: "400"
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
    paddingVertical: 5,
    paddingRight: 2,
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
    marginLeft: 12,
    textAlign: "left",
    fontWeight: "400",
    fontSize: FontSize.size_xs,
    color: Color.darkInk,
    fontFamily: getFontFamily("400"),
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
});

export default PostSection;
