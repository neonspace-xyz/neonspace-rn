import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch, TouchableOpacity, Pressable, Image, ScrollView } from 'react-native';
import { Color, FontSize, getFontFamily, StyleContent } from '../GlobalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import { LinearGradient } from 'expo-linear-gradient';

const ExperienceForm = () => {
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
        }>Experience</Text>


        <View style={styles.headerImage}>

        </View>
      </View>

      <ScrollView style={[styles.scrollView, StyleContent]} contentContainerStyle={styles.scrollContent}>

        <View style={styles.formContainer}>



          <View style={styles.inputContainer}>
            <Text style={styles.label}>Title</Text>
            <TextInput style={styles.input} placeholder="Name" placeholderTextColor="#ccc" />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Company/Project Name</Text>
            <TextInput style={styles.input} placeholder="Name" placeholderTextColor="#ccc" />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Employment Type</Text>
            <TextInput style={styles.input} placeholder="Name" placeholderTextColor="#ccc" />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Location</Text>
            <TextInput style={styles.input} placeholder="APAC" placeholderTextColor="#ccc" />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Start Date</Text>
            <TextInput style={styles.input} placeholder="Input link" placeholderTextColor="#ccc" />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.label}>Current role</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isCurrentRole ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isCurrentRole}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>End Date</Text>
            <TextInput
              style={styles.input}
              placeholder="Input link"
              placeholderTextColor="#ccc"
              editable={!isCurrentRole} // Disable End Date input if "Current role" is active
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.description]}
              placeholder="Lorem ipsum"
              placeholderTextColor="#ccc"
              multiline
              maxLength={1000}
            />
            <Text style={styles.charCount}>30/1000</Text>
          </View>
          {/* <TouchableOpacity style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Delete experience</Text>
          </TouchableOpacity> */}

          <LinearGradient
              colors={['#ff0000', '#ff0000']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.gradientBorder, styles.buttonSendConfirm]}

            >
              <Pressable
                style={[{
                  backgroundColor: Color.colorGray_100,
                  height: 54, borderRadius: 8,
                  flex: 1, alignItems: 'center', justifyContent: 'center'
                }]}
              >
                <Text style={[styles.buttonLabel]}>Delete Experience</Text>
              </Pressable>
            </LinearGradient>

          <LinearGradient
              colors={['#FC00A7', '#65EDE3']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.gradientBorder, styles.buttonSendConfirm]}

            >
              <Pressable
                style={[{
                  backgroundColor: Color.colorGray_100,
                  height: 54, borderRadius: 8,
                  flex: 1, alignItems: 'center', justifyContent: 'center'
                }]}
              >
                <Text style={[styles.buttonLabel]}>Save</Text>
              </Pressable>
            </LinearGradient>
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
    padding: 5,
    backgroundColor: '#02030b',
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
  },
  gradientBorder: {
    padding: 2, // Lebar border gradien
    borderRadius: 8,
  },
  buttonSendConfirm: {
    marginTop: 50,
    alignSelf: "stretch",
  },
  
  buttonLabel: {
    lineHeight: 24,
    fontFamily: getFontFamily("600"),
    fontWeight: "600",
    fontSize: FontSize.labelLarge_size,
    textAlign: "center",
    color: Color.darkInk,
  },
});

export default ExperienceForm;
