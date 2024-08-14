import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import { Border, Color, FontFamily, FontSize } from "../GlobalStyles";
import moment from "moment";

const ChatSectionBubbleSelf = ({ item }) => {
  return (
    <LinearGradient
      style={styles.container}
      start={{ x: 0, y: 0.5 }} // Left side
      end={{ x: 1, y: 0.5 }}   // Right side
      colors={[Color.gradientLeft, Color.gradientRight]}
    >
      <Text style={styles.textMessage}>
        {item?.message?.content ? item?.message?.content : "Description here, this is a description and example of the text that may appear here, no need to truncate, the full text will be displayed over here. Description here, this is a description and example of the text that may appear here, truncate after the second line for example."}
      </Text>
      <Text style={styles.textTime}>
        {item?.timestamp ? moment(item?.timestamp).format('hh:mm a') : moment(new Date()).format('hh:mm a')}
      </Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    marginTop: 0,
    marginLeft: 80,
    padding: 8,
    borderRadius: Border.br_5xs,
    backgroundColor: Color.colorMediumslateblue,
  },
  textMessage: {
    width: "100%",
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.helvetica,
    color: Color.colorGray_300,
  },
  textTime: {
    width: "100%",
    textAlign: "right",
    marginTop: 8,
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.helvetica,
    color: Color.colorGray_400,
  }
});

export default ChatSectionBubbleSelf;