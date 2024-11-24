import React, { useEffect, useRef, useState } from 'react'
import { Image, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, View, TextInput, Platform, BackHandler, Alert, ActivityIndicator } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/core';
import ChatSectionBubble from '../components/ChatSectionBubble';
import ChatSectionBubbleSelf from '../components/ChatSectionBubbleSelf';
import { Border, Color, FontFamily, FontSize, StyleContent, StyleHeaderImg, StyleHeaderTitle, StyleHeaderView } from '../GlobalStyles';
import { getRandomNumber, getRandomTimestamp, logout } from '../Utils';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CHAT_OFFSET, WS_URL } from '../Constant';
import { useAuth } from '../components/AuthProvider';

const ChatDetail = () => {
  const { getSession, getOtherUser } = useAuth();
  const route = useRoute();
  const { tab, userInfo } = route.params;
  const scrollViewRef = useRef(null);
  const navigation = useNavigation();
  const [userInfo2, setUserInfo2] = useState();
  const [usersession, setUsersession] = useState();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loadingSend, setLoadingSend] = useState(false);
  const [socket, setSocket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const numberOfLines = Platform.select({
    ios: 4, // Set numberOfLines to 4 on iOS
    android: input ? Math.min(4, input.split('\n').length) : 1, // Let it be undefined on Android to allow multiline
  });

  useEffect(() => {
    getSession().then((user) => {
      setUsersession(user);
    });
  }, []);

  useEffect(() => {
    console.log('Getting user info')
    console.log(userInfo)
    setIsLoading(true);

    if (userInfo?.to?.user_id) {
      console.log('Setting user info because to field is provided')
      setUserInfo2(userInfo.to);
      getOtherUser(userInfo.to.user_id).then((user) => {
        setUserInfo2(user);
        setIsLoading(false);
      })
    }
    else if (userInfo?.user_id) {
      console.log('Setting user info because user_id field is provided')
      setUserInfo2(userInfo);
      getOtherUser(userInfo.user_id).then((user) => {
        setUserInfo2(user);
        setIsLoading(false);
      })
    } else {
      setIsLoading(false);
      return;
    }
  }, [userInfo]);

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
    if (!usersession?.jwt_token) return;
    // console.log("to", userInfo.user_id);
    // console.log("token", usersession.jwt_token);
    // console.log("offset", CHAT_OFFSET);
    console.log(`Connecting chat to ${WS_URL}/chat/start?to=${userInfo2?.user_id}&token=${usersession.jwt_token}&offset=${CHAT_OFFSET}`)
    const ws = new WebSocket(`${WS_URL}/chat/start?to=${userInfo2?.user_id}&token=${usersession.jwt_token}&offset=${CHAT_OFFSET}`);

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (e) => {
      console.log(`ChatDetail-onmessage-e.data`, e.data)
      let newMessage = JSON.parse(e.data);
      let _message = JSON.parse(newMessage.message);
      newMessage['message'] = _message;
      setMessages((preaMessages) => [...preaMessages, newMessage]);
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
      Alert.alert("Disconnected");
    };

    setSocket(ws);

    // return () => ws.close();
  }, [usersession]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);


  const sendMessage = async () => {
    if (input == '') {
      return;
    }
    if (socket && input.trim()) {
      const message = { content: input, timestamp: new Date() };
      socket.send(JSON.stringify(message));
      setInput('');
    }
  }

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={Color.darkInk} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <View style={StyleHeaderView}>
        <Pressable
          onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/back.png")}
            style={StyleHeaderImg}
          />
        </Pressable>
        <Text style={[StyleHeaderTitle]}>
          {userInfo2?.name ? userInfo2?.name : "Name"}
          {`\n`}
          {userInfo2?.screen_name ? `@${userInfo2?.screen_name}` : "@endlessmee"}
        </Text>
        <Pressable
          onPress={() => { navigation.push(`OtherProfile${tab}`, { tab, user: userInfo2 }); }}>
          {userInfo2?.profile_image ? (
            <Image
              source={{ uri: userInfo2.profile_image }}
              style={StyleHeaderImg}
            />
          ) : (
            <Image
              source={require("../assets/ellipse-2.png")}
              style={StyleHeaderImg}
            />
          )}
        </Pressable>
      </View>

      <KeyboardAvoidingView behavior="padding" style={[StyleContent]}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
          onLayout={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        >
          {messages?.length > 0 ? messages?.map((item, index) => {
            // Check if the message is from the current user (usersession)
            const isFromMe = item?.from === usersession?.user_info?.user_id;

            if (isFromMe) {
              return (<ChatSectionBubbleSelf key={index} item={item} />)
            } else {
              return (<ChatSectionBubble key={index} item={item} />)
            }
          }) : (
            <View style={styles.container_empty}>
              <Text style={[styles.startChatting]}>
                Start chatting
              </Text>
              <Text
                style={[styles.clickOnThe]}
              >{`Start chatting with your new friend`}</Text>
            </View>
          )}
        </ScrollView>
        <View style={styles.parentInput}>
          <View style={styles.subParentInput}>
            <TextInput
              style={styles.chatInput}
              placeholder="Type here..."
              placeholderTextColor={Color.colorGray_400}
              value={input}
              onChangeText={(text) => setInput(text)}
              multiline={true}
              numberOfLines={numberOfLines}
              scrollEnabled={input.split('\n').length > 4}
            />
            <Pressable onPress={sendMessage}>
              <Image
                style={[styles.btnSendChat, loadingSend && styles.buttonDisable]}
                source={require("../assets/ic_back_white.png")}
              />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
    width: "100%",
    overflow: "hidden",
    justifyContent: 'flex-start',
    alignItems: "center",
    backgroundColor: Color.colorGray_100,
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
    color: Color.darkInk,
    width: 327,
  },
  clickOnTheTypo: {
    marginTop: 20,
  },
  scrollView: {
    width: "100%",
    // height:"100%",
    // height:"80%",
    paddingTop: 20,
    // borderColor:"red",
    // borderWidth:1
  },

  parentInput: {
    // borderColor:"red",
    // borderWidth:1,
    width: "100%",
    // height:"20%",
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
    width: "90%",
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
  loadingContainer: {
    justifyContent: 'center',
  },
});

export default ChatDetail;