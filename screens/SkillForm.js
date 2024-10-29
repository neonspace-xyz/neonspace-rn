import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch, TouchableOpacity, Pressable, Image, ScrollView } from 'react-native';
import { Color, FontSize, getFontFamily, StyleContent, Padding, Margin } from '../GlobalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import { Alert } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { Border } from '../GlobalStyles';
const SkillForm = ({ route }) => {
  const action = route.params?.action;
  const skill = route.params?.skill;
  const id = route.params?.id;
  const navigation = useNavigation();
  const [isCurrentRole, setIsCurrentRole] = useState(false);
  const toggleSwitch = () => setIsCurrentRole(previousState => !previousState);

  const deleteSkill = () => {
    Alert.alert("Delete skill", "Are you sure you want to delete this skill?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: () => console.log("Skill deleted") }
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
            <TextInput style={styles.input} placeholder={action === "new" ? "Input new skill" : skill} placeholderTextColor="#ccc" />
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
        style={[styles.gradientBorder]}
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
            onPress={() => { }}
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
    padding: 20,
    backgroundColor: '#1b1b1b',
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
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#3a3a3a',
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
