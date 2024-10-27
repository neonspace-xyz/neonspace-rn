import * as React from "react";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View, Pressable, Dimensions, TouchableOpacity, Alert } from "react-native";
import { Color, FontSize, FontFamily, StyleHeaderView, StyleHeaderImg, StyleHeaderTitle, StyleContent } from "../GlobalStyles";
import PostSection from "../components/PostSection";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../components/AuthProvider";
import PopupOption from "../components/PopupOption";

const PostDetail = () => {
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
          Post Details
        </Text>
      </View>
      <PopupOption
        showEdit={false}
        selectedItemIndex={selectedItemIndex}
        menuPosition={menuPosition}
        handleDelete={confirmDelete}
      />
      <View style={StyleContent}>
        <PostSection
          tab={tab}
          isDetail={true}
          index={0}
          userInfo={userInfo}
          item={item}
          onMore={handleMore}
        />
      </View>
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
    backgroundColor: Color.colorGray_100,
  },
  save1Typo: {
    textAlign: "center",
    fontSize: FontSize.labelLarge_size,
    color: Color.colorCornflowerblue_100,
    fontFamily: FontFamily.clashGrotesk,
    fontWeight: "500",
  },
  optionsMenu: {
    width: 160,
    position: 'absolute',
    backgroundColor: Color.colorDarkslategray_100,
    borderRadius: 5,
    borderColor: Color.colorDarkslategray_100,
    borderWidth: 1,
    shadowColor: Color.colorDarkslategray_100,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 1,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  optionText: {
    fontSize: 16,
    color: Color.darkInk
  },
  optionIcon: {
    width: 20,
    height: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
  },
});

export default PostDetail;
