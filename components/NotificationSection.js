import React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles";
import { formatPostTimestamp, getFormattedPostTimestamp, getRandomNumber } from "../Utils";
import { useNavigation } from "@react-navigation/core";

const NotificationSection = ({ item, onPress }) => {
  const navigation = useNavigation();

  return (
    <Pressable index={item?.id}>
      <View style={[styles.frameSpaceBlock]}>
        <View style={styles.bellWrapper}>
          <Image
            style={styles.bellIcon}
            contentFit="cover"
            source={require("../assets/ic_bell.png")}
          />
        </View>
        <View style={styles.frameContainer}>
          <View style={styles.frameView}>
            <View
              style={[
                styles.notificationTitleHereParent,
                styles.bottomNavFlexBox,
              ]}
            >
              <Text
                style={[styles.notificationTitleHere, styles.notificationClr]}
              >
                {item?.title}
              </Text>
              <Image
                style={styles.frameChildLayout}
                contentFit="cover"
                source={require("../assets/ic_dot_3.png")}
              />
            </View>
            <Text
              style={[styles.notificationDetailsAnd, styles.notificationClr]}
            >
              {item?.description}
            </Text>
          </View>
          <Text style={[styles.today238Pm, styles.notificationClr]}>
            {item?.datetime}
          </Text>
        </View>
      </View>
    </Pressable >
  );
};

const styles = StyleSheet.create({
  frameSpaceBlock: {
    marginTop: 12,
    width: 362,
    paddingVertical: Padding.p_sm,
    paddingHorizontal: Padding.p_xs,
    backgroundColor: Color.colorDarkslategray_400,
    borderRadius: Border.br_3xs,
    alignSelf: "stretch",
    flexDirection: "row",
    overflow: "hidden",
  },
  bellWrapper: {
    borderRadius: Border.br_5xs,
    backgroundColor: Color.colorTurquoise,
    paddingHorizontal: Padding.p_4xs_8,
    paddingVertical: Padding.p_7xs_5,
    alignItems: "center",
    flexDirection: "row",
  },
  bellIcon: {
    width: 17,
    height: 24,
  },
  frameContainer: {
    marginLeft: 10,
    flex: 1,
  },
  frameView: {
    alignSelf: "stretch",
  },
  notificationTitleHereParent: {
    alignSelf: "stretch",
  },
  bottomNavFlexBox: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  notificationTitleHere: {
    textAlign: "left",
    fontWeight: "500",
    fontSize: FontSize.labelLarge_size,
  },
  notificationClr: {
    color: Color.darkInk,
    fontFamily: FontFamily.clashGrotesk,
  },
  frameChildLayout: {
    height: 8,
    width: 8,
  },
  notificationDetailsAnd: {
    fontSize: FontSize.size_sm,
    marginTop: 4,
    textAlign: "left",
    alignSelf: "stretch",
  },
  today238Pm: {
    fontSize: FontSize.size_xs,
    marginTop: 14,
    textAlign: "left",
    alignSelf: "stretch",
  },
});

export default NotificationSection;
