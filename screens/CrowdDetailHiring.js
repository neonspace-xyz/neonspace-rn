import * as React from "react";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View, Pressable, Dimensions, Alert } from "react-native";
import { Color, FontSize, FontFamily, StyleHeaderView, StyleHeaderImg, StyleHeaderTitle } from "../GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import CrowdSectionHiring from "../components/CrowdSectionHiring";
import { useAuth } from "../components/AuthProvider";
import PopupOption from "../components/PopupOption";

const CrowdDetailHiring = () => {
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
          Hiring
        </Text>
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
  save1Typo: {
    textAlign: "center",
    fontSize: FontSize.labelLarge_size,
    color: Color.colorCornflowerblue_100,
    fontFamily: FontFamily.clashGrotesk,
    fontWeight: "500",
  },
});

export default CrowdDetailHiring;
