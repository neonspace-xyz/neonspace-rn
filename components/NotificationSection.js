import React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { FontSize, FontFamily, Color, Border, Padding, getFontFamily } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/core";

const NotificationSection = ({ item }) => {
  return (
    <Pressable index={item?.id}>
      <View style={[styles.frameSpaceBlock]}>
        <View style={styles.bellWrapper}>
          <Image
            style={[styles.bellIcon, styles.circleImage]}
            contentFit="cover"
            source={item.image}
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
                style={[styles.notificationTitleHere]}
              >
                {item?.title}
              </Text>

              {
                (item?.eventtype == "job_created" ||
                item?.eventtype == "event_created" ||
                item?.eventtype == "quest_created") ?
              <Image
                style={styles.frameChildLayout}
                contentFit="cover"
                source={require("../assets/ic_dot_3.png")}
              /> : <></>}
            </View>
            <Text
              style={[styles.notificationDetailsAnd]}
            >
              {item?.description}
            </Text>
          </View>
          <Text style={[styles.today238Pm]}>
            {item?.datetime}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  frameSpaceBlock: {
    overflow: "hidden",
    marginTop: 16,
    marginHorizontal: 12,
    paddingHorizontal: Padding.p_xs,
    paddingVertical: Padding.p_sm,
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorDarkslategray_400,
    alignSelf: "stretch",
    flexDirection: "row",
    overflow: "hidden",
  },
  bellWrapper: {
    borderRadius: Border.br_5xs,
    backgroundColor: Color.transparent,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  bellIcon: {
    width: 50,
    height: 50,
  },
  circleImage: {
    borderRadius: 25, // Half of the width and height
    overflow: 'hidden',
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
    fontFamily: getFontFamily("500"),
    fontSize: FontSize.labelLarge_size,
    color: Color.darkInk,
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
    fontWeight: "400",
    fontFamily: getFontFamily("400"),
    textAlign: "left",
    alignSelf: "stretch",
    color: Color.darkInk,
  },
  today238Pm: {
    fontSize: FontSize.size_xs,
    marginTop: 14,
    fontWeight: "400",
    fontFamily: getFontFamily("400"),
    color: Color.darkInk,
    textAlign: "left",
    alignSelf: "stretch",
  },
});

export default NotificationSection;
