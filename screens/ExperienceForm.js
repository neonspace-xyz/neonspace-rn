import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch, TouchableOpacity, Pressable, Image, ScrollView, Alert, Modal } from 'react-native';
import { Color, FontSize, getFontFamily, StyleContent } from '../GlobalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAuth } from '../components/AuthProvider';
import { API_URL } from '../Constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExperienceForm = ({route}) => {
  const { action, tab, experience } = route.params;
  const { api, getOtherUser } = useAuth();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const [id, setId] = useState(experience?.id);
  const [role, setRole] = useState(experience?.role);
  const [company, setCompany] = useState(experience?.company);
  const [employmentType, setEmploymentType] = useState(experience?.employment_type);
  const [location, setLocation] = useState(experience?.location);
  const [description, setDescription] = useState(experience?.description);
  const [isCurrentRole, setIsCurrentRole] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const toggleSwitch = () => setIsCurrentRole(previousState => !previousState);

  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setStartDate(currentDate);
    setShowStartDatePicker(false);
  };

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setEndDate(currentDate);
    setShowEndDatePicker(false);
  };

  const deleteExperience = () => {
    Alert.alert("Delete experience", "Are you sure you want to delete this experience?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: async() => {
        try {
          let url = action === "edit" ? API_URL + `/user/deleteExperience` : '';
          let response = await api.post(url, {id});
    
          if (response.status == 200) {
            Alert.alert('Success', 'Experience successfully deleted');
            await AsyncStorage.setItem("reset", "true")
            navigation.goBack();
          } else {
            const errorData = await response.json();
            Alert.alert('Error', errorData.message || 'Failed to save experience');
          }
        } catch (error) {
          Alert.alert('Error', 'An error occurred while deleting experience');
        }
      } }
    ]);
  }

  // const deleteExperience = async () => {
  //   try {
  //     let url = action == "edit" ? API_URL + `/user/deleteExperience` : '';
  //     let response = await api.post(url, {id});

  //     if (response.status == 200) {
  //       Alert.alert('Success', 'Experience successfully deleted');
  //       setModalVisible(false)
  //       await AsyncStorage.setItem("reset", "true")
  //       navigation.goBack();
  //     } else {
  //       const errorData = await response.json();
  //       Alert.alert('Error', errorData.message || 'Failed to save experience');
  //     }
  //   } catch (error) {
  //     Alert.alert('Error', 'An error occurred while deleting experience');
  //   }
  // }

  const saveExperience = async () => {
    const experienceData = {
      id: action === "edit" ? id : "",
      role,
      company,
      employment_type: employmentType,
      location,
      start_date: startDate ? startDate.toLocaleDateString("en-CA")+"T00:00:00Z" : "",
      end_date: endDate ? endDate.toLocaleDateString("en-CA")+"T00:00:00Z" : "",
      description,
    };
    try {
      let url = action === "new" ? API_URL + `/user/newExperience` :  API_URL + `/user/updateExperience` ;
      let response = await api.post(url, experienceData);

      if (response.status == 200) {
        Alert.alert('Success', 'Experience saved successfully');
        await AsyncStorage.setItem("reset", "true")
        navigation.goBack();
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Failed to save experience');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while saving experience');
    }
  };

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
            <TextInput style={styles.input} placeholder="Name" placeholderTextColor="#ccc" value={role}
              onChangeText={setRole}/>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Company/Project Name</Text>
            <TextInput style={styles.input} placeholder="Name" placeholderTextColor="#ccc"  value={company}
              onChangeText={setCompany} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Employment Type</Text>
            <TextInput style={styles.input} placeholder="Name" placeholderTextColor="#ccc"  value={employmentType}
              onChangeText={setEmploymentType} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Location</Text>
            <TextInput style={styles.input} placeholder="APAC" placeholderTextColor="#ccc"  value={location}
              onChangeText={setLocation} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Start Date</Text>
            <Pressable onPress={() => setShowStartDatePicker(true)}>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#ccc"
                value={startDate.toISOString().split('T')[0]} // Display date in YYYY-MM-DD format
                editable={false}
              />
            </Pressable>
            {showStartDatePicker && (
              <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                onChange={onStartDateChange}
              />
            )}
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
            <Pressable onPress={() => setShowEndDatePicker(true)}>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#ccc"
                value={endDate.toISOString().split('T')[0]}
                editable={false}
              />
            </Pressable>
            {showEndDatePicker && (
              <DateTimePicker
                value={endDate}
                mode="date"
                display="default"
                onChange={onEndDateChange}
              />
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.description]}
              placeholder="Lorem ipsum"
              placeholderTextColor="#ccc"
              multiline
              maxLength={1000}
              value={description}
              onChangeText={setDescription}
            />
            <Text style={styles.charCount}>30/1000</Text>
          </View>

          {action === "edit" &&
          <LinearGradient
              colors={['#ff0000', '#ff0000']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.gradientBorder, styles.buttonSendConfirm, {height:40}]}

            >
              <Pressable
                style={[{
                  backgroundColor: Color.colorGray_100,
                  height: 40, borderRadius: 8,
                  flex: 1, alignItems: 'center', justifyContent: 'center'
                }]}
                onPress={() => {
                  deleteExperience()
                }}
              >
                <Text style={[styles.buttonLabel]}>Delete Experience</Text>
              </Pressable>
            </LinearGradient> }

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
                onPress={saveExperience}
              >
                <Text style={[styles.buttonLabel]}>Save</Text>
              </Pressable>
            </LinearGradient>
        </View>

        <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Delete Experience</Text>
                
                <Text>Are you sure?</Text>
                <View style={[styles.modalButtons, {marginTop:20}]}>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text style={styles.cancelButton}>No</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    deleteExperience()
                  }}>
                    <Text style={styles.confirmButton}>Yes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
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
    marginTop: 20,
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

export default ExperienceForm;
