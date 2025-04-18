import React, { useEffect, useState } from 'react';
import { Image } from "expo-image";
import { Alert, View, TextInput, Modal, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";
import { Component_Max_Width, REFERAL_CODE as REFERRAL_CODE, TWITTER_OAUTH } from "../Constant";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from '../Constant';

const Login = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [oauthToken, setOauthToken] = useState('');
  const [oauthVerifier, setOAuthVerifier] = useState('');

  const doLogin = async () => {
    console.log("doLogin-called");
    try {
      setLoading(true);
      const _oauthToken = await getTwitterRequestToken();
      console.log("doLogin-token", _oauthToken);
      if (_oauthToken) {
        console.log("link", `${TWITTER_OAUTH}${_oauthToken}`)

        setModalVisible(true);
        setOauthToken(_oauthToken);
        // openOAuthURL(_oauthToken);
        // navigation.replace("Mint");
      }
      else {
        Alert.alert("Login Failed", "Failed to get oauth token");
      }
    } catch (error) {
      console.error("doLogin-error", error);
      Alert.alert("Login Failed", error);
    } finally {
      setLoading(false);
    }
  };

  const getTwitterRequestToken = async () => {
    try {
      console.log("getTwitterRequestToken-called");
      const resp = await axios.get(`${API_URL}/twitter/requestToken`);
      console.log("getTwitterRequestToken-status", resp.status);
      console.log("getTwitterRequestToken-data", resp.data);
      if (resp.status === 200 && resp?.data?.oauth_token) {
        return resp.data.oauth_token;
      }
    } catch (error) {
      console.error("getTwitterRequestToken-error", error);
    }
    return null;
  };

  const getTwitterAccessToken = async (oauthToken, oauthVerifer) => {
    try {
      console.log("getTwitterAccessToken-called");
      const body = {
        "oauth_token": oauthToken,
        "oauth_verifier": oauthVerifer,
        "referral_code": REFERRAL_CODE
      }
      console.log("getTwitterAccessToken-body", body);
      const resp = await axios.post(`${API_URL}/twitter/accessToken`, body);

      console.log("getTwitterAccessToken-status", resp.status);
      console.log("getTwitterAccessToken-data", resp.data);
      if (resp.status === 200 && resp?.data) {
        let accessToken = resp.data;
        AsyncStorage.setItem("usersession", JSON.stringify(accessToken));
        navigation.replace("Mint");
      }
      else {
        Alert.alert("Login Failed", "Failed to get access token");
      }
    } catch (error) {
      Alert.alert("Login Failed", "Failed to get access token");
      console.error("getTwitterAccessToken-error", error);
      return null;
    }
  };

  // useEffect(() => {
  //   const handleOpenURL = async (event) => {
  //     const { url } = event;
  //     console.log('URL received:', url);

  //     // Check if the URL matches the expected callback pattern
  //     if (url.startsWith('neonspacexyz://twitter/callback')) {
  //       // Parse the URL and extract the oauth_token and oauth_verifier
  //       const regex = /[?&]([^=#]+)=([^&#]*)/g;
  //       let params = {};
  //       let match;
  //       while ((match = regex.exec(url))) {
  //         params[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);
  //       }

  //       const { oauth_token, oauth_verifier } = params;

  //       if (oauth_token && oauth_verifier) {
  //         console.log("fallback", oauth_token, oauth_verifier);
  //         await getTwitterAccessToken(oauth_token, oauth_verifier);
  //       } else {
  //         Alert.alert('Login Failed', 'OAuth token or verifier not found!');
  //       }
  //     } else {
  //       Alert.alert('Login Failed', 'Unrecognized URL callback!');
  //     }
  //   };

  //   // Listen for URL callback
  //   Linking.addEventListener('url', handleOpenURL);

  //   // Cleanup the event listener on unmount
  //   return () => {
  //     Linking.removeEventListener('url', handleOpenURL);
  //   };
  // }, []);

  const openOAuthURL = async (oauthToken) => {
    try {
      const url = `${TWITTER_OAUTH}${oauthToken}`;
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        console.error("Don't know how to open URI: " + url);
      }
    } catch (error) {
      console.error("openOAuthURL", error);
    }
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.imgBackground}
        contentFit="cover"
        source={require("../assets/group-872.png")}
      />
      <Text style={[styles.txtTitle, styles.txtStyle]}>
        Neonrabbits
      </Text>
      <Text style={[styles.txtDesc, styles.txtStyle]}>
        Neonrabbits are connecting the dots of their lives, and always on
        adventure together at Neonspace
      </Text>
      <Image
        style={[styles.imgLogo]}
        contentFit="cover"
        source={require("../assets/ic_logo.png")}
      />
      <TouchableOpacity
        style={[styles.button]}
        onPress={doLogin}
      // onPress={() => navigation.replace("Mint")}
      >
        <Text style={[styles.buttonLabel, styles.txtStyle]}>
          Login with X
        </Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Enter OAuth Verifier</Text>
            <TextInput
              style={styles.input}
              placeholder="OAuth Verifier"
              value={oauthVerifier}
              onChangeText={setOAuthVerifier}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButton}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setModalVisible(false);
                getTwitterAccessToken(oauthToken, oauthVerifier)
              }}>
                <Text style={styles.confirmButton}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: Color.colorGray_100,
  },
  imgBackground: {
    height: "100%",
    width: "100%",
  },
  txtStyle: {
    textAlign: "center",
    color: Color.darkInk,
    fontFamily: FontFamily.clashGrotesk,
  },
  txtTitle: {
    top: 140,
    fontSize: FontSize.size_13xl,
    fontWeight: "600",
    position: "absolute",
  },
  txtDesc: {
    top: 199,
    fontSize: FontSize.size_sm,
    position: "absolute",
    width: "80%",
    maxWidth: Component_Max_Width,
  },
  imgLogo: {
    marginTop: -111,
    top: "50%",
    width: 222,
    height: 222,
    position: "absolute",
  },
  button: {
    position: "absolute",
    top: "75%",
    borderRadius: Border.br_5xs,
    borderStyle: "solid",
    borderColor: Color.colorDeeppink,
    borderWidth: 3,
    width: "90%",
    maxWidth: Component_Max_Width,
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_xs,
    backgroundColor: Color.colorGray_100,
  },
  buttonLabel: {
    fontSize: FontSize.labelLarge_size,
    lineHeight: 24,
    fontWeight: "600",
    color: Color.darkInk,
    fontFamily: FontFamily.clashGrotesk,
  },

  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    fontSize: 16,
    color: 'red',
  },
  confirmButton: {
    fontSize: 16,
    color: 'green',
  },
});

export default Login;
