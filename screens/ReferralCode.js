import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ReferralCodeScreen = () => {
    const navigation = useNavigation();

  const [referralCode, setReferralCode] = useState('7hR4f3PHxk9H@4tK');

  const handleVerify = async() => {
    // Handle the referral code verification here
    console.log('Referral code entered:', referralCode);

    const response = await fetch("https://dev-api.neonspace.xyz/user/verify?inviteCode="+referralCode);
    const json = await response.json();
    if(json.valid){
        navigation.replace("Login")
    }
  };

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
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.verifyButtonText}>Verify</Text>
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
