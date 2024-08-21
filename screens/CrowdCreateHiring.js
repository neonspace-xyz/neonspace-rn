import * as React from "react";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View, Pressable, Dimensions, Alert } from "react-native";
import { Color, FontSize, FontFamily, StyleHeaderView, StyleHeaderImg, StyleHeaderTitle, Padding, Border } from "../GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import CrowdSectionHiring from "../components/CrowdSectionHiring";
import { useAuth } from "../components/AuthProvider";
import PopupOption from "../components/PopupOption";
import { TextInput } from "react-native-gesture-handler";

const CrowdCreateHiring = () => {
  const route = useRoute();
  const { tab, item } = route.params;
  const navigation = useNavigation();

  const { getUser } = useAuth();
  const windowDimensions = Dimensions.get('window');
  const [userInfo, setUserInfo] = useState();
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    getUser().then((data) => {
      setUserInfo(data);
    });
  }, []);

  const handleMore = (event, index) => {
    if (selectedItemIndex == index) {
      setSelectedItemIndex(null);
      return;
    }
    const { pageY, pageX } = event.nativeEvent;
    const menuWidth = 190; // Adjust based on your menu width
    let newLeft = pageX;
    let newTop = pageY + 10; // Position the menu below the button

    if (newLeft + menuWidth > windowDimensions.width) {
      newLeft = windowDimensions.width - menuWidth;
    }

    setMenuPosition({ top: newTop, left: newLeft });
    setSelectedItemIndex(index);
  };

  const handleEdit = () => {
    // navigation.navigate('EditScreen', { item });
    setSelectedItemIndex(null);
  };

  const handleDelete = () => {
    console.log(`Deleting item ${selectedItemIndex}`);
    setSelectedItemIndex(null);
  };

  const confirmDelete = () => {
    Alert.alert(
      "Delete the post",
      "Are you sure you want to delete the post?",
      [
        {
          text: "No",
          onPress: () => setSelectedItemIndex(null),
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: handleDelete
        }
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={StyleHeaderView}>
        <Pressable
          onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/back.png")}
            style={StyleHeaderImg}
          />
        </Pressable>
        <Text style={[StyleHeaderTitle]}>
          {item ? "Edit Hiring" : "Create Hiring"}
        </Text>
      </View>
      <View style={styles.frame}>
        <View style={styles.frameParent}>
          <TextInput
            style={[styles.typeYourPostHere]}
            placeholder="Type your post here"
            placeholderTextColor={Color.colorGray_500}
            // value={message}
            // onChangeText={(text) => onChangeMessage(text)}
            // multiline={true}
            // numberOfLines={numberOfLines}
            // scrollEnabled={message.split('\n').length > 4}
          />
        </View>
      </View>
      <CrowdSectionHiring
        tab={tab}
        isDetail={true}
        index={0}
        item={item}
        userInfo={userInfo}
        onPress={() => handleDetail(item)}
        onMore={handleMore}
      />
      <PopupOption
        showEdit={true}
        selectedItemIndex={selectedItemIndex}
        menuPosition={menuPosition}
        handleEdit={handleEdit}
        handleDelete={confirmDelete}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
    justifyContent: 'flex-start',
    alignItems: "center",
    backgroundColor: Color.colorGray_200,
  },
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
});

export default CrowdCreateHiring;
