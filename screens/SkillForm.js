import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch, TouchableOpacity, Pressable, Image, ScrollView, Modal } from 'react-native';
import { Color, FontSize, getFontFamily, StyleContent, Padding, Margin } from '../GlobalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import { Alert } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { Border } from '../GlobalStyles';
import { API_URL } from '../Constant';
import { useAuth } from '../components/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SkillForm = ({ route }) => {
  const { api, getOtherUser } = useAuth();

  const action = route.params?.action;
  const id = route.params?.id;
  const navigation = useNavigation();
  const [isCurrentRole, setIsCurrentRole] = useState(false);
  const toggleSwitch = () => setIsCurrentRole(previousState => !previousState);

  const [skill, setSkill] = useState(route.params?.skill);
  const [description, setDescription] = useState(route.params?.description);

  const saveSkill = async () => {
    if(skill == '' || description == '') return;
    const skillData = {
      skill,
      description
    };
    if(action === "edit"){
      skillData.id = id;
    }
    
    try {
      let url = action === "new" ? (API_URL + `/user/newSkill`) :  (API_URL + `/user/updateSkill`) ;
      let response = await api.post(url, skillData);
      if (response.status == 200) {
        Alert.alert('Success', 'Skill saved successfully');
        await AsyncStorage.setItem("reset", "true")
        navigation.goBack();
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Failed to save skill');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while saving skill');
    }
  };
  const deleteSkill = () => {
    Alert.alert("Delete skill", "Are you sure you want to delete this skill?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: async() => {
        try {
          let url = action === "edit" ? API_URL + `/user/deleteSkill` : '';
          let response = await api.post(url, {id});
    
          if (response.status == 200) {
            Alert.alert('Success', 'Skill successfully deleted');
            await AsyncStorage.setItem("reset", "true")
            navigation.goBack();
          } else {
            const errorData = await response.json();
            Alert.alert('Error', errorData.message || 'Failed to save skill');
          }
        } catch (error) {
          Alert.alert('Error', 'An error occurred while deleting skill');
        }
      } }
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/back.png")}
            style={styles.headerImage}
          />
        </Pressable>

        <Text style={
          [styles.title]
          // {flexGrow:1, color:"white", textAlign:"center", paddingTop:10, alignItems:"center"}
        }>Skill</Text>
        <View style={styles.headerImage}>
        </View>
      </View>

      <ScrollView style={[styles.scrollView, StyleContent, { paddingTop: 4, marginBottom: -100 }]} contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder={action === "new" ? "Input new skill" : skill} placeholderTextColor="#ccc" 
              value={skill}
              onChangeText={setSkill}
            />
            <TextInput style={styles.input} placeholder={action === "new" ? "Input new description" : description} placeholderTextColor="#ccc" 
              value={description}
              onChangeText={setDescription}
            />
          </View>
          {action === "new" ? <></> : <TouchableOpacity style={styles.deleteButton} onPress={() => deleteSkill(id)}>
            <Text style={styles.deleteButtonText}>Delete skill</Text>
          </TouchableOpacity>}          
        </View>
      </ScrollView>
      <LinearGradient
        colors={['#FC00A7', '#65EDE3']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradientBorder, {          
          marginBottom:10,
        }]}
      >
        <View style={{
          backgroundColor: Color.colorGray_100,
          borderRadius: Border.br_5xs,
          borderTopLeftRadius: Border.br_5xs,
          borderTopRightRadius: Border.br_5xs,
          width: '100%',
        }}>
          <Pressable
            style={[styles.topUpWalletWrapper]}
            onPress={() => {saveSkill() }}
          >
            <Text style={[styles.topUpWallet]}>
              Save
            </Text>
          </Pressable>
        </View>
      </LinearGradient>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.colorGray_100,
    width: "100%",
    height: "100%",
    flex: 1
  },
  formContainer: {
    padding: 5,
    backgroundColor: '#000000',
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 10,
  },
  scrollContent: {
    alignItems: 'stretch',  // Ensures children fill the width
    paddingTop: 20,    // Adds space at the top and bottom
  },
  inputContainer: {
    marginBottom: 5,
    flex: 1,
    gap:10
  },
  label: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    backgroundColor: Color.colorDimgray_100,
    color: '#fff',
    padding: 10,    
    borderRadius: 4,
  },
  description: {
    height: 100,
    textAlignVertical: 'top',
  },
  charCount: {
    textAlign: 'right',
    color: '#ccc',
    marginTop: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 20,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  header: {
    width: "100%",
    flexDirection: 'row',
    padding: Padding.p_base,
    backgroundColor: Color.colorGray_100,
    alignItems: 'center',
    height: 60,
  },
  headerImage: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: FontSize.labelLarge_size,
    flexGrow: 1,
    textAlign: "center",
    paddingTop: 3,
    alignItems: "center",
    color: Color.darkInk,
    fontWeight: "600",
    fontFamily: getFontFamily("600")
  },
  // Send Confirm
  gradientBorder: {
    marginHorizontal: 10,
    padding: 2,
    borderRadius: 8,
    backgroundColor: Color.colorGray_100,
  },
  topUpWalletWrapper: {
    backgroundColor: Color.colorGray_100,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Padding.p_4xs_8,
    paddingHorizontal: Padding.p_base,
    borderRadius: Border.br_5xs,
    width: '100%',
  },
  topUpWallet: {
    textAlign: 'left',
    fontSize: FontSize.labelLarge_size,
    color: Color.darkInk,
    fontFamily: getFontFamily("500"),
    fontWeight: "500",
  },
});

export default SkillForm;
