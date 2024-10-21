import React, { useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Mint from './screens/Mint';
import Main from './screens/Main';
import ReferralCode from './screens/ReferralCode';
import { AuthProvider } from './components/AuthProvider';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {Button, Image, StyleSheet, Text, TouchableOpacity, View, Modal, Pressable, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Color, getFontFamily} from './GlobalStyles';
import { LoadingProvider } from './components/LoadingContext';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();
  const [userInfo, setUserInfo] = useState();

  const linking = {
    prefixes: ['exp://192.168.1.4:8081'],
    config: {
      screens: {
        Login: 'twitter/callback',
      },
    },
  };
  const StackNavigatorComponent = () => {
    
    return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ReferralCode"
        component={ReferralCode}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Mint"
        component={Mint}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }} />

    </Stack.Navigator>
  )};

  const CustomDrawerContent = (props) => {
    
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    return (
    <SafeAreaView style={styles.drawerContent}>
      <View style={styles.drawerSection}>

        {userInfo?.profile_image ? (
          <Image
            style={[styles.myProfileItem]}
            contentFit="cover"
            source={userInfo.profile_image}
          />
        ) : (
          <Image
            style={[styles.myProfileItem]}
            contentFit="cover"
            source={require("./assets/photo.png")}
          />
        )}

        <Text style={{color:"white"}}>Name</Text>
        <Text style={{color:"white"}}>@endlessmeeee</Text>
        <Text style={{color:"white"}}>Wallet Address: 0xe...dhv</Text>

        <View style={{marginTop:50}}>
          <TouchableOpacity onPress={() => {
            setModalVisible(true)
          }
          }>
            <Text style={styles.drawerMenu}>Post Crowdsource</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Profile', {
              screen: 'MyProfile4',
              params: {
                reset: true,
              },
            });
          }
          }>
            <Text style={styles.drawerMenu}>My Full Bio</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Wallet', {
              screen: 'MyAssets3',
              params: {
                reset: true,
              },
            });
          }
          }>
            <Text style={styles.drawerMenu}>Wallet</Text>
          </TouchableOpacity>
        </View>
        {/* <Text style={styles.title}>Custom Drawer</Text>
        <Button title="Home" onPress={() => props.navigation.navigate('Home')} />
        <Button title="Profile" onPress={() => props.navigation.navigate('Profile')} /> */}
      </View>

      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>

            <Text style={modalStyles.title}>Please choose{"\n"}Crowdsource type</Text>

            <View style={{alignSelf:"center", gap:10, width:"100%"}}>
            <TouchableOpacity style={modalStyles.button} onPress={() => {
              navigation.navigate('Crowdsource', {
                screen: 'CrowdCreateHiring5',
                params: {
                  reset: true,
                },
              });
              setModalVisible(false);
            }
            }>
              <Text style={modalStyles.buttonText}>Hiring</Text>
            </TouchableOpacity>

            <TouchableOpacity style={modalStyles.button} onPress={() => {
              navigation.navigate('Crowdsource', {
                screen: 'CrowdCreateEvent5',
                params: {
                  reset: true,
                },
              });
              setModalVisible(false);
            }
            }>
              <Text style={modalStyles.buttonText}>Event</Text>
            </TouchableOpacity>

            <TouchableOpacity style={modalStyles.button} onPress={() => {
              navigation.navigate('Crowdsource', {
                screen: 'CrowdCreateQuest5',
                params: {
                  reset: true,
                },
              });
              setModalVisible(false);
            }
            }>
              <Text style={modalStyles.buttonText}>Quest</Text>
            </TouchableOpacity>
            </View>
            {/*<Pressable*/}
            {/*    style={[modalStyles.button, modalStyles.buttonClose]}*/}
            {/*    onPress={() => setModalVisible(!modalVisible)}>*/}
            {/*  <Text style={modalStyles.textStyle}>Hide Modal</Text>*/}
            {/*</Pressable>*/}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )};
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer linking={linking}>
        <AuthProvider>
        <LoadingProvider>
          {/* {StackNavigatorComponent()} */}
          {/* <StackNavigatorComponent/> */}
          <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="DrawerMain" component={StackNavigatorComponent} options={{ headerShown: false }} />
          </Drawer.Navigator>
          {/* <Stack.Navigator>
            <Stack.Screen
              name="ReferralCode"
              component={ReferralCode}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Mint"
              component={Mint}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Main"
              component={Main}
              options={{ headerShown: false }} />

          </Stack.Navigator> */}
          </LoadingProvider>
        </AuthProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: Color.colorGray_100, // Dark background color
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    fontFamily: getFontFamily("600"),
    color: '#FFFFFF', // White text color
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    // borderWidth: 2,
    // borderColor:"red",
    backgroundColor: Color.colorDarkslategray_400, // Button color
    paddingVertical: 15,
    paddingHorizontal: 100,
    // marginBottom: 10,
    borderRadius: 10,
    width: '100%',
    height: 54,
    alignItems: 'center',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: getFontFamily("600"),
    color: '#FFFFFF', // White text color
  },
});


const styles = StyleSheet.create({
  drawerMenu:{
    color:"white", fontWeight: "900", marginTop: 20
  },
  drawerContent: {
    flex: 1,
    padding: 16,
    backgroundColor: Color.colorDarkslategray_400,
  },
  drawerSection: {
    marginVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  myProfileItem: {
    width: 90,
    height: 90,
    // margin: 10,
    borderRadius: 50
  },

});


export default StackNavigator