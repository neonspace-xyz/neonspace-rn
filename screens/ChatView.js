import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Image, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, View, TextInput, Alert, Platform, BackHandler } from 'react-native'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/core';
import ChatSectionBubble from '../components/ChatSectionBubble';
import ChatSectionBubbleSelf from '../components/ChatSectionBubbleSelf';
import { Border, Color, FontFamily, FontSize, StyleButtonBack, StyleButtonBackIcon, styleHeaderBack, styleHeaderBackIcon, StyleTextTitle } from '../GlobalStyles';
import { getRandomNumber, getRandomTimestamp } from '../Utils';

const ChatDetail = () => {
  const route = useRoute();
  const chat = route.params?.chat;

  const scrollViewRef = useRef(null);
  const navigation = useNavigation();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loadingSend, setLoadingSend] = useState(false);
  const numberOfLines = Platform.select({
    ios: 4, // Set numberOfLines to 4 on iOS
    android: message ? Math.min(4, message.split('\n').length) : 1, // Let it be undefined on Android to allow multiline
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View>
          <Text style={StyleTextTitle} numberOfLines={1}>{chat?.name ? chat?.name : "Name"}</Text>
          <Text style={StyleTextTitle} numberOfLines={1}>{chat?.username ? chat?.username : "@endlessmee"}</Text>
        </View>
      ),
      headerLeft: () => (
        <View style={styleHeaderBack}>
          <Pressable onPress={() => { navigation.goBack(); }}>
            <Image
              style={styleHeaderBackIcon}
              contentFit="cover"
              source={require("../assets/ic_back_white.png")}
            />
          </Pressable>
        </View>
      ),
      headerRight: () => (
        <View>
          {/* <Pressable onPress={() => { navigation.navigate("ChatInfo", { chat }); }}> */}
          <Image
            style={styles.menuIcon}
            contentFit="cover"
            // source={{ uri: chat?.image_url }}
            source={require("../assets/ellipse-2.png")}
          />
          {/* </Pressable> */}
        </View>
      ),
      headerStyle: {
        backgroundColor: Color.colorGray_100
      },
    })
  }, []);

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  useFocusEffect(
    React.useCallback(() => {
      getChatHistory();
    }, [])
  );

  const getChatHistory = async () => {
    let roles = ["user", "ai"];
    let data = [];
    for (let i = 1; i < getRandomNumber(20, 40); i++) {
      data.push({
        id: i,
        role: roles[getRandomNumber(0,1)],
        message: `recent text message view here if the text is too${i}`,
        time: getRandomTimestamp(2)
      });
    }
    setMessages(data);
  }

  const sendMessage = async () => {
    if (message == '') {
      return;
    }
    const newMessage = message;
    setMessage('');
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        onLayout={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
        {messages?.length > 0 ? messages?.map((item, index) => {
          console.log("item", item);
          if (item?.role == 'user') {
            return (<ChatSectionBubbleSelf key={index} item={item} />)
          }
          else {
            return (<ChatSectionBubble key={index} item={item} />)
          }
        }) : (
          <View style={styles.container_empty}>
            <Image
              style={styles.speechBubble1Icon}
              contentFit="cover"
              source={require("../assets/ic_trophy.png")}
            />
            <Text style={[styles.startChatting]}>
              Start chatting
            </Text>
            <Text
              style={[styles.clickOnThe]}
            >{`Click on the text box below to begin.`}</Text>
            <Text
              style={[styles.clickOnThe, styles.clickOnTheTypo]}
            >{`Be sure to indicate whether the message was sent by you, [name], or if it’s just a prompt for us to understand more about the context or situation.`}</Text>
          </View>
        )}
      </ScrollView>
      <View style={styles.parentInput}>
        <View style={styles.subParentInput}>
          <TextInput
            style={styles.chatInput}
            placeholder="Type here..."
            placeholderTextColor={Color.colorGray_400}
            value={message}
            onChangeText={(text) => setMessage(text)}
            multiline={true}
            numberOfLines={numberOfLines}
            scrollEnabled={message.split('\n').length > 4}
          />
          {/* <Pressable onPress={sendMessage}>
            <Image
              style={[styles.btnSendChat, loadingSend && styles.buttonDisable]}
              source={require("../assets/ic_back_white.png")}
            />
          </Pressable> */}
        </View>
      </View>
    </KeyboardAvoidingView>
  )
};

const styles = StyleSheet.create({
  menuIcon: {
    width: Platform.OS == "ios" ? 32 : 34,
    height: Platform.OS == "ios" ? 32 : 34,
    borderRadius: 16,
    borderWidth: 1,
    width: 30,
    height: 30,
    // borderColor: Color.colorDarkslategray_400
  },
  container: {
    flex: 1,
    backgroundColor: Color.colorGray_200,
    overflow: "hidden",
    justifyContent: 'center',
    alignItems: "center",
    width: "100%",
  },
  scrollView: {
    width: "100%",
    paddingTop: 16,
  },
  container_empty: {
    justifyContent: 'center',
    alignItems: "center",
    width: "100%",
  },
  speechBubble1Icon: {
    width: 200,
    height: 200,
    marginTop: 40,
  },
  startChatting: {
    marginTop: 40,
    fontWeight: "700",
    fontSize: FontSize.size_5xl,
    fontFamily: FontFamily.helvetica,
    color: Color.lightInk,
  },
  clickOnThe: {
    marginTop: 24,
    opacity: 0.6,
    textAlign: "center",
    fontFamily: FontFamily.helvetica,
    fontSize: FontSize.size_sm,
    color: Color.colorDarkslategray_400,
    width: 327,
  },
  clickOnTheTypo: {
    marginTop: 20,
  },
  parentInput: {
    width: "100%",
    // borderTopWidth: 1,
    // borderTopColor: "#dddddd",
    backgroundColor: Color.colorGray_100
  },
  subParentInput: {
    flexDirection: "row",
    alignItems: "top",
    paddingTop: 0,
    paddingBottom: Platform.OS == "ios" ? 8 : 16,
    margin: 16,
    marginBottom: Platform.OS == "ios" ? 40 : 0,
  },
  chatInput: {
    width: "100%",
    // minHeight: 30,
    maxHeight: 80,
    padding: 8,
    borderRadius: Border.br_9xs,
    fontFamily: FontFamily.helvetica,
    backgroundColor: Color.colorGray_200,
    color: Color.darkInk
  },
  btnSendChat: {
    width: 28,
    height: 28,
    marginLeft: 8
  },
  buttonDisable: {
    opacity: 0.5
  },
});

export default ChatDetail;