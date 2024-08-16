import * as React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import VerifiedListSection from "./VerifiedListSection";

const VerifiedList = ({ tab, data }) => {

  return (
    <View style={[styles.containerList]}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <VerifiedListSection
              tab={tab}
              item={item}
            />
          )
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerList: {
    flex: 1,
    width: "100%",
    backgroundColor: Color.colorGray_200,
  },
});

export default VerifiedList;
