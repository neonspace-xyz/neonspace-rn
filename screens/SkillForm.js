import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch, TouchableOpacity, Pressable, Image, ScrollView } from 'react-native';
import { Color, FontSize, getFontFamily, StyleContent } from '../GlobalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';

const SkillForm = () => {
  const navigation = useNavigation();
  const [isCurrentRole, setIsCurrentRole] = useState(false);
  const toggleSwitch = () => setIsCurrentRole(previousState => !previousState);

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

      <ScrollView style={[styles.scrollView, StyleContent]} contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Tokenomics" placeholderTextColor="#ccc" />
          </View>
          <TouchableOpacity style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Delete expertise</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingVertical: 20,    // Adds space at the top and bottom
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
    // marginTop: 60,
    width: "100%",
    // flex:1,
    flexDirection: 'row',
    // alignSelf:"flex-",
    padding: 14,
    backgroundColor: Color.colorGray_100,
  },
  headerImage: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: FontSize.labelLarge_size,
    // marginLeft: 14,
    // flex: 1,
    flexGrow: 1,
    textAlign: "center",
    paddingTop: 3,
    alignItems: "center",
    color: Color.darkInk,
    fontWeight: "600",
    fontFamily: getFontFamily("600")
  }
});

export default SkillForm;
