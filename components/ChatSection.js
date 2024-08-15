import React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles";
import { formatChatListTime } from "../Utils";
import moment from "moment";

const ChatSection = ({ isDetail, item, onPress }) => {

  return (
    <Pressable index={item?.id} onPress={() => isDetail ? null : onPress()}>
      <View style={styles.frameParent}>
        <Image
          style={[styles.svgrepoIconLayout]}
          contentFit="cover"
          source={item.to.profile_image}
        />
        <View style={styles.frameGroup}>
          <View style={[styles.frameContainer, styles.nameParentFlexBox]}>
            <View style={styles.nameParentFlexBox}>
              <Text style={[styles.name, styles.thuClr]}>{item.to.name}</Text>
              <Text style={[styles.endlessmeee, styles.thuClr]}>
                @{item.to.screen_name}
              </Text>
            </View>
            <Text style={[styles.thu, styles.thuClr]}>{formatChatListTime(moment(item?.last_message?.timestamp))}</Text>
          </View>
          <Text style={styles.recentTextMessage} numberOfLines={1}>
            {item.last_message.message.content}
          </Text>
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
    flexDirection: "row",
    alignSelf: "stretch",
  },
  svgrepoIconLayout: {
    width: 32,
    height: 32,
    borderRadius: 50
  },
  frameGroup: {
    marginLeft: 10,
    flex: 1,
  },
  frameContainer: {
    justifyContent: "space-between",
    alignSelf: "stretch",
    flexDirection: "row",
  },
  nameParentFlexBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    textAlign: "left",
    fontWeight: "500",
    color: Color.darkInk,
    fontSize: FontSize.labelLarge_size,
  },
  thuClr: {
    color: Color.darkInk,
    fontFamily: FontFamily.clashGrotesk,
  },
  endlessmeee: {
    marginLeft: 6,
    textAlign: "left",
    fontSize: FontSize.labelLarge_size,
    color: Color.darkInk,
  },
  thu: {
    fontSize: FontSize.size_xs,
    textAlign: "left",
  },
  recentTextMessage: {
    fontSize: FontSize.size_sm,
    marginTop: 2,
    textAlign: "left",
    color: Color.darkInk,
    fontFamily: FontFamily.clashGrotesk,
    alignSelf: "stretch",
    overflow: "hidden",
  },
});

export default ChatSection;
