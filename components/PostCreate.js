import React, { useState } from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable, TextInput, Platform, KeyboardAvoidingView, Alert, TouchableOpacity } from "react-native";
import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles";
import { API_URL, Component_Max_Width, POST_MAX_CHAR } from "../Constant";
import axios from "axios";

const PostCreate = ({ usersession, setIsShowCreate }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const numberOfLines = Platform.select({
    ios: 4, // Set numberOfLines to 4 on iOS
    android: message ? Math.min(4, message.split('\n').length) : 1, // Let it be undefined on Android to allow multiline
  });

  const doHideModal = () => {
    if (loading) return;
    setMessage('');
    setIsShowCreate(false);
  }

  const doPost = async () => {
    try {
      if (!usersession) return;
      setLoading(true);

      let token = usersession.jwt_token;
      let userInfo = usersession.user_info;
      let url = API_URL + `/user/createPost`;
      let body = {
        "post": message
      }
      const resp = await axios.post(url, body,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      console.log("url", url);
      console.log("body", body);
      console.log("resp.data", resp.data);
      if (resp.status == 200) {
        Alert.alert("Your post has been published successfully!")
        setLoading(false);
        doHideModal();
      }
    } catch (error) {
      Alert.alert("Failed", error.message);
      console.error('Post-doPost', error);
    } finally {
      setLoading(false);
    }
  }

  const onChangeMessage = (input) => {
    if (input.length == POST_MAX_CHAR) return;
    setMessage(input);
  }

  return (
    <KeyboardAvoidingView
      style={[styles.postModalParent, styles.bottomNavPosition]}
      behavior="padding" keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <View style={styles.postModal}>
        <View style={[styles.frameParent9, styles.parentFlexBox]}>
          <View style={styles.ellipseParent}>
            <Image
              style={[styles.frameChild, styles.svgrepoLayout]}
              contentFit="cover"
              source={require("../assets/ellipse-1.png")}
            />
            <View style={styles.frameContainer}>
              <Text style={[styles.name, styles.timeClr]}>{usersession.user_info.name}</Text>
              <Text style={[styles.endlessmeee, styles.timeClr]}>
                @{usersession.user_info.screen_name}
              </Text>
            </View>
          </View>
          <Pressable
            style={[styles.frameChild, styles.svgrepoLayout]}
            onPress={doHideModal}
          >
            <Image
              style={[styles.icon1, styles.iconLayout]}
              contentFit="cover"
              source={require("../assets/ic_close_white.png")}
            />
          </Pressable>
        </View>
        <View style={styles.typeYourPostContainer}>
          <TextInput
            style={[styles.typeYourPostHere]}
            placeholder="Type your post here"
            placeholderTextColor={Color.colorGray_500}
            value={message}
            onChangeText={(text) => onChangeMessage(text)}
            multiline={true}
            numberOfLines={numberOfLines}
            scrollEnabled={message.split('\n').length > 4}
          />
        </View>
        <View
          style={[
            styles.thePostPreviewWillShowTheParent,
            styles.parentFlexBox,
          ]}
        >
          <Text style={[styles.thePostPreview, styles.postClr]}>
            The post preview will show the first 280 letters
          </Text>
          <Text style={[styles.thePostPreview, styles.postClr]}>{message?.length}/500</Text>
        </View>
        <TouchableOpacity
          disabled={loading}
          onPress={() => message.length > 0 && doPost()}
        >
          <View style={[styles.btnPost, message.length == 0 ? styles.buttonDisable : styles.buttonEnable]}>
            <Text style={[styles.buttonLabel, message.length == 0 ? styles.buttonLabelDisable : styles.buttonLabelEnable]}>
              {loading ? "Posting" : "Post"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        disabled={loading}
        onPress={() => message.length > 0 && doHideModal()}
      >
        <Text style={[styles.btnSaveAsDraft, message.length == 0 ? styles.buttonDisable : styles.buttonSaveAsDraftEnable]}>
          Save as draft
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  postModalParent: {
    shadowColor: "rgba(0, 0, 0, 0.08)",
    shadowRadius: 24,
    elevation: 24,
    borderTopLeftRadius: Border.br_5xs,
    borderTopRightRadius: Border.br_5xs,
    height: 375,
    paddingTop: Padding.p_xl,
    paddingBottom: Padding.p_13xl,
    backgroundColor: Color.colorDarkslategray_400,
    paddingHorizontal: Padding.p_sm,
  },
  bottomNavPosition: {
    bottom: 0,
    alignItems: "center",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    position: "absolute",
    width: "100%",
  },
  postModal: {
    backgroundColor: Color.colorDarkslategray_400,
    borderRadius: Border.br_3xs,
    width: "100%",
    maxWidth: Component_Max_Width,
    overflow: "hidden",
  },
  frameParent9: {
    alignSelf: "stretch",
  },
  parentFlexBox: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  ellipseParent: {
    alignItems: "center",
    flexDirection: "row",
  },
  svgrepoLayout: {
    width: 32,
    height: 32,
  },
  frameContainer: {
    marginLeft: 12,
    alignItems: "center",
    flexDirection: "row",
  },
  name: {
    textAlign: "left",
    fontWeight: "500",
    fontSize: FontSize.labelLarge_size,
  },
  endlessmeee: {
    marginLeft: 6,
    textAlign: "left",
    fontSize: FontSize.labelLarge_size,
  },
  timeClr: {
    color: Color.darkInk,
    fontFamily: FontFamily.clashGrotesk,
  },
  frameChild: {
    height: 32,
  },
  icon1: {
    overflow: "hidden",
  },
  iconLayout: {
    height: "100%",
    width: "100%",
  },
  typeYourPostContainer: {
    marginTop: 12,
  },
  typeYourPostHere: {
    height: 150,
    fontSize: FontSize.size_sm,
    textAlign: "left",
    alignSelf: "stretch",
    overflow: "hidden",
    color: Color.darkInk,
    fontFamily: FontFamily.clashGrotesk,
  },
  postClr: {
    color: Color.colorGray_700,
    fontFamily: FontFamily.clashGrotesk,
  },
  thePostPreviewWillShowTheParent: {
    marginTop: 12,
    alignSelf: "stretch",
  },
  thePostPreview: {
    textAlign: "right",
    fontSize: FontSize.size_xs,
  },
  btnPost: {
    borderRadius: Border.br_5xs,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_xs,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxWidth: Component_Max_Width,
    flexDirection: "row",
    height: 54,
    marginTop: 12,
    backgroundColor: Color.colorGray_100,
  },
  btnSaveAsDraft: {
    width: "100%",
    maxWidth: Component_Max_Width,
    marginTop: 12,
    fontFamily: FontFamily.clashGrotesk,
    textAlign: "left",
    fontWeight: "500",
    fontSize: FontSize.labelLarge_size,
  },
  buttonDisable: {
    opacity: 0.45,
    color: Color.colorGray_400,
  },
  buttonEnable: {
    borderWidth: 3,
    borderColor: Color.colorDeeppink,
    color: Color.darkInk,
  },
  buttonSaveAsDraftEnable: {
    color: Color.darkInk,
  },
  buttonLabel: {
    lineHeight: 24,
    textAlign: "center",
    fontWeight: "600",
    fontSize: FontSize.labelLarge_size,
  },
  buttonLabelEnable: {
    color: Color.darkInk,
  },
  buttonLabelDisable: {
    color: Color.colorGray_400,
  }
});

export default PostCreate;
