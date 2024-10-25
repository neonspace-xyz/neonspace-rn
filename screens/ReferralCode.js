import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Alert, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../utils/ApiHandler';
import { API_URL, REFERAL_CODE } from '../Constant';
import { logout } from '../Utils';
import { LinearGradient } from 'expo-linear-gradient';
import { useLoading } from '../components/LoadingContext';
import { useAuth } from '../components/AuthProvider';

const ReferralCodeScreen = () => {
  const { api, getOtherUser } = useAuth();
  const navigation = useNavigation();
  const [preparing, setPreparing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [referralCode, setReferralCode] = useState(REFERAL_CODE);
  const { showLoading, hideLoading } = useLoading();

  const handleVerify = async () => {
    try {
      setLoading(true);
      showLoading();
      // Handle the referral code verification here
      const response = await api.get(`${API_URL}/user/verify?inviteCode=${referralCode}`);
      // const json = await response.json();
      if (response.data.valid) {
        navigation.replace("Main");
      }
    } catch (error) {
      console.error("handleVerify", error);
      Alert.alert('Verification Error', 'Invalid referral code').catch(err => console.log(err));
    } finally {
      setLoading(false);
      hideLoading();
    }
  };

  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     try {
  //       setPreparing(true);
  //       // await AsyncStorage.removeItem('usersession');
  //       let usersession = await AsyncStorage.getItem("usersession");
  //       usersession = JSON.parse(usersession);

  //       if (usersession != 'undefined' && usersession != null) {
  //         try {
  //           let url = `/user/getUser?userId=${usersession.user_info.user_id}`;
  //           let resp = await api.get(url);
  //           let data = resp.data;
  //           if (data?.owned_nfts?.length == 0) {
  //             navigation.navigate("Mint");
  //           }
  //           else {
  //             navigation.replace("Main");
  //           }
  //         } catch (err) {
  //           if (err.isSessionExpired) {
  //             await logout(navigation);
  //           } else {
  //             console.error("checkLoginStatus-getUser-error", err)
  //           }
  //         }
  //       }
  //     } catch (error) {
  //       console.error('checkLoginStatus-error:', error);
  //     } finally {
  //       setPreparing(false);
  //     }
  //   };
  //   checkLoginStatus();
  // }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.instructionText}>Please enter your referral code:</Text>
      <TextInput
        style={styles.input}
        placeholder="Referral code"
        placeholderTextColor="#6D6D6D"
        value={referralCode}
        onChangeText={setReferralCode}
      />
      <LinearGradient
        colors={['#FC00A7', '#65EDE3']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBorder}
      >
        <View style={styles.buttonInner}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleVerify}
            disabled={loading || preparing}
          >

            <Text style={styles.buttonText}>{loading ? "Verifing" : "Verify"}</Text>

          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1A29',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  instructionText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#6D6D6D',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#000000',
    color: '#FFFFFF',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttonInner: {
    width: 150,
    backgroundColor: '#1c1c1c', // Warna background tombol
    borderRadius: 10,
  },
  buttonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  gradientBorder: {
    padding: 2, // Lebar border gradien
    borderRadius: 10,
  },
  gradientBackground: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  verifyButton: {
    // width: '80%',
    // height: 50,
    // backgroundColor: '#22222A',
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderRadius: 5,
    // borderWidth: 1,
    // borderColor: '#444450',
    borderRadius: 10,
    overflow: 'hidden',
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    textAlign: 'center',
  },
});

export default ReferralCodeScreen;
