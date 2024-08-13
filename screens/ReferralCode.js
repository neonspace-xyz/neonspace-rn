import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../ApiHandler';
import { API_URL, REFERAL_CODE } from '../Constant';

const ReferralCodeScreen = () => {
  const navigation = useNavigation();
  const [preparing, setPreparing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [referralCode, setReferralCode] = useState(REFERAL_CODE);

  const handleVerify = async () => {
    try {
      setLoading(true);
      // Handle the referral code verification here
      console.log('Referral code entered:', referralCode);

      const response = await fetch(`${API_URL}/user/verify?inviteCode=${referralCode}`);
      const json = await response.json();
      if (json.valid) {
        navigation.replace("Login");
      }
    } catch (error) {
      console.error("handleVerify", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        setPreparing(true);
        let usersession = await AsyncStorage.getItem("usersession");
        usersession = JSON.parse(usersession);

        if (usersession != 'undefined' && usersession != null) {
          let url = `/user/getUser?userId=${usersession.user_info.user_id}`;
          let resp = await api.get(url);
          let data = resp.data;
          if (data?.owned_nfts?.length == 0) {
            navigation.navigate("Mint");
          }
          else {
            navigation.replace("Mint");
          }
        }
      } catch (error) {
        console.log('error:', error);
      } finally {
        setPreparing(false);
      }
    };
    checkLoginStatus();
  }, []);

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
      <TouchableOpacity
        style={styles.verifyButton}
        onPress={handleVerify}
        disabled={loading || preparing}
      >
        <Text style={styles.verifyButtonText}>{loading ? "Verifing" : "Verify"}</Text>
      </TouchableOpacity>
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
  verifyButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#22222A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#444450',
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
