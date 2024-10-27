import * as React from "react";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View, Pressable, Alert, Platform, KeyboardAvoidingView, TouchableOpacity, Button } from "react-native";
import { Color, FontSize, FontFamily, StyleHeaderView, StyleHeaderImg, StyleHeaderTitle, Padding, Border, getFontFamily, StyleContent } from "../GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../components/AuthProvider";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { API_URL, Component_Max_Width, MAX_CHAR_DETAIL } from "../Constant";
import { formatEventTime } from "../Utils";
import api from "../utils/ApiHandler";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const CrowdCreateEvent = () => {
  const route = useRoute();
  const { tab, item, isDetail } = route.params;
  const navigation = useNavigation();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log(date)
    console.warn("A date has been picked: ", date);
    handleInputChange("date", date)
    hideDatePicker();
  };

  const { getUser } = useAuth();
  const [userInfo, setUserInfo] = useState();

  const scrollViewRef = React.useRef(null);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState(item);
  const numberOfLines = Platform.select({
    ios: 4, // Set numberOfLines to 4 on iOS
    android: input?.detail ? Math.min(4, input?.detail?.split('\n').length) : 1, // Let it be undefined on Android to allow multiline
  });

  useEffect(() => {
    getUser().then((data) => {
      setUserInfo(data);
    });
  }, []);

  const handleInputChange = (name, value) => {
    setInput({
      ...input,
      [name]: value,
    });
  };


  const handleSave = async () => {
    try {
      if (!userInfo) return;
      setLoading(true);
      console.log("input", input);
      // input['date'] = "2020-12-09T16:09:53+00:00";

      let url = API_URL + `/crowdsource/event/new`;
      if (input.id) {
        url = API_URL + `/crowdsource/event/edit`;
      }
      const resp = await api.post(url, input);
      if (resp.status == 200) {
        Alert.alert("Your post has been published successfully!")
        if (input.id && isDetail) {
          navigation.pop(1);
        } {
          navigation.goBack();
        }
        setLoading(false);
      }
    } catch (error) {
      Alert.alert("Failed", error.message);
      console.error('Event-handleSave', error);
    } finally {
      setLoading(false);
    }
  };

  const doSave = () => {
    Alert.alert(
      "Save",
      "Are you sure you want to save?",
      [
        {
          text: "No",
          // onPress: () => setSelectedItemIndex(null),
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: handleSave
        }
      ],
      { cancelable: true }
    );
  };

  const onChangeDetail = (input) => {
    if (input.length == MAX_CHAR_DETAIL) return;
    handleInputChange('description', input)
  }

  let input2Ref = null;
  let input3Ref = null;
  let input4Ref = null;
  let input5Ref = null;
  
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
          Event
          {/* {item ? "Edit Event" : "Create Event"} */}
        </Text>
      </View>
      <KeyboardAvoidingView behavior="padding" style={[StyleContent, { width: "100%", flex: 1 }]}>
        <ScrollView
          style={styles.frame}
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
          onLayout={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        >
          <View style={styles.frameParent}>
            <View style={styles.frameChild}>
              <Text style={styles.txtTitle}>Event Name</Text>
              <TextInput
                style={[styles.textInput]}
                placeholder="Event Name"
                placeholderTextColor={Color.colorGray_500}
                value={input?.name}
                onChangeText={(value) => handleInputChange('name', value)}
                returnKeyType="next"
                onSubmitEditing={() => {
                  if (input2Ref) {
                    input2Ref.focus();
                  }
                }}
              />
            </View>
            <View style={styles.frameChild}>
              <Text style={styles.txtTitle}>Host</Text>
              <TextInput
                style={[styles.textInput]}
                placeholder="Host"
                placeholderTextColor={Color.colorGray_500}
                value={input?.host}
                onChangeText={(value) => handleInputChange('host', value)}
                ref={(ref) => { input2Ref = ref; }}
                returnKeyType="next"
                onSubmitEditing={() => {
                  if (input3Ref) {
                    input3Ref.focus();
                  }
                }}
              />
            </View>
            <View style={styles.frameChild}>
              <Text style={styles.txtTitle}>Location</Text>
              <TextInput
                style={[styles.textInput]}
                placeholder="Location"
                placeholderTextColor={Color.colorGray_500}
                value={input?.location}
                onChangeText={(value) => handleInputChange('location', value)}
                ref={(ref) => { input3Ref = ref; }}
                returnKeyType="next"
                onSubmitEditing={() => {
                  if (input4Ref) {
                    input4Ref.focus();
                  }
                }}
              />
            </View>
            <View style={styles.frameChild}>
              <Text style={styles.txtTitle}>Date</Text>

              <TextInput
                style={[styles.textInput]}
                 placeholder="Date"
                placeholderTextColor={Color.colorGray_500}
                value={formatEventTime(input?.date)}
                onChangeText={(value) => handleInputChange('date', value)}
                onFocus={showDatePicker} 
                // readOnly={true}
              />
              {/* <Button 
                title=""
                style={[styles.textInput]}
                placeholder="Date"
                placeholderTextColor={Color.colorGray_500}
                value={formatEventTime(input?.date)}
                onChangeText={(value) => handleInputChange('date', value)}
                onPress={showDatePicker} 
                disabled={true}
              /> */}
            </View>
            <View style={styles.frameChild}>
              <Text style={styles.txtTitle}>Event Link</Text>
              <TextInput
                style={[styles.textInput]}
                placeholder="Event Link"
                placeholderTextColor={Color.colorGray_500}
                value={input?.event_link}
                onChangeText={(value) => handleInputChange('event_link', value)}
                ref={(ref) => { input4Ref = ref; }}
                returnKeyType="next"
                onSubmitEditing={() => {
                  if (input5Ref) {
                    input5Ref.focus();
                  }
                }}
              />
            </View>
            <View style={styles.frameChild}>
              <Text style={styles.txtTitle}>Event intro</Text>
              <View style={styles.frameDetail}>
                <TextInput
                  style={[styles.textDetail]}
                  placeholder="Event intro"
                  placeholderTextColor={Color.colorGray_500}
                  value={input?.description}
                  onChangeText={(text) => onChangeDetail(text)}
                  multiline={true}
                  numberOfLines={numberOfLines}
                  scrollEnabled={input?.description?.split('\n').length > 4}
                  ref={(ref) => { input5Ref = ref; }}
                />
                <View style={styles.frameSubDetail}>
                  <Text style={styles.textSubDetailLeft}>The post preview will show the first 280 letters</Text>
                  <Text style={styles.textSubDetailRight}>{input?.detail?.length}/{MAX_CHAR_DETAIL - 1}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.viewSave}
              disabled={loading}
              onPress={doSave}
            >
              <View style={[styles.btnSave, styles.buttonEnable]}>
                <Text style={[styles.buttonLabel, styles.buttonLabelEnable]}>
                  {loading ? "Saving" : "Save"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
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
    backgroundColor: Color.colorGray_100,
  },
  frame: {
    width: "100%",
    height: "100%"
  },
  frameParent: {
    overflow: "hidden",
    width: "100%",
  },
  frameChild: {
    marginTop: 16,
    marginHorizontal: Padding.p_base,
  },
  txtTitle: {
    fontSize: FontSize.labelLarge_size,
    fontFamily: FontFamily.clashGrotesk,
    color: Color.darkInk,
  },
  textInput: {
    marginTop: 8,
    paddingHorizontal: Padding.p_xs,
    paddingVertical: Padding.p_sm,
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorDarkslategray_400,
    color: Color.darkInk,
    fontSize: FontSize.labelLarge_size,
    fontWeight: "400",
    fontFamily: getFontFamily("400"),
  },
  frameDetail: {
    marginTop: 8,
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorDarkslategray_400,
  },
  textDetail: {
    height: 150,
    textAlign: "left",
    alignSelf: "stretch",
    paddingHorizontal: Padding.p_xs,
    paddingVertical: Padding.p_sm,
    color: Color.darkInk,
    fontSize: FontSize.labelLarge_size,
    fontWeight: "400",
    fontFamily: getFontFamily("400"),
  },
  frameSubDetail: {
    paddingHorizontal: Padding.p_xs,
    marginBottom: Padding.p_sm,
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  textSubDetailLeft: {
    color: Color.colorGray_700,
    fontSize: FontSize.size_xs,
    fontWeight: "400",
    fontFamily: getFontFamily("400"),
  },
  textSubDetailRight: {
    color: Color.colorGray_700,
    fontSize: FontSize.size_xs,
    fontWeight: "400",
    fontFamily: getFontFamily("400"),
  },
  viewSave: {
    paddingHorizontal: Padding.p_base,
  },
  btnSave: {
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
  buttonDisable: {
    opacity: 0.45,
    color: Color.colorGray_400,
  },
  buttonEnable: {
    borderWidth: 3,
    borderColor: Color.colorDeeppink,
    color: Color.darkInk,
  },
  buttonLabel: {
    lineHeight: 24,
    textAlign: "center",
    fontWeight: "600",
    fontFamily: getFontFamily("600"),
    fontSize: FontSize.labelLarge_size,
  },
  buttonLabelEnable: {
    color: Color.darkInk,
  },
  buttonLabelDisable: {
    color: Color.colorGray_400,
  }
});

export default CrowdCreateEvent;
