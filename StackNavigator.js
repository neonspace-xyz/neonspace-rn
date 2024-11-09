import React, { useState, useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Mint from './screens/Mint';
import Main from './screens/Main';
import ReferralCode from './screens/ReferralCode';
import { AuthProvider } from './components/AuthProvider';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View, Modal, Pressable, Alert, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontSize, Color, getFontFamily } from './GlobalStyles';
import { LoadingProvider } from './components/LoadingContext';
import { shortenAddress } from './Utils';
import { useAuth } from './components/AuthProvider';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();
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
    )
  };

  const CustomDrawerContent = (props) => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [userInfo, setUserInfo] = useState();
    const { getUser, getSession } = useAuth();

    useEffect(() => {
      getSession().then((session) => {
        if (session?.user_info) {
          setUserInfo(session.user_info);
        }
        getUser().then((user) => {
          setUserInfo(user);
        });
      });
    }, []);

    return (
      <SafeAreaView style={styles.drawerContent}>
          <TouchableOpacity
            style={[styles.svgrepoLayout]}
            onPress={() => {
              props.navigation.closeDrawer()
            }}
          >
            <Image
              style={[styles.icon1, styles.iconLayout]}
              contentFit="cover"
              source={require("./assets/ic_close_white.png")}
            />
          </TouchableOpacity>
        <View style={styles.drawerSection}>
          <TouchableOpacity
            style={styles.userInfoSection}
            onPress={() => {
              navigation.navigate('Profile', {
                screen: 'MyProfile4',
                params: {
                  tab: '4',
                  user: userInfo,
                  reset: true,
                },
              });
            }}
          >
            <Image
              style={[styles.myProfileItem]}
              contentFit="cover"
              source={userInfo?.profile_image ? { uri: userInfo.profile_image } : require("./assets/photo.png")}
            />
            <Text style={styles.userInfoText}>{userInfo?.name || "Loading..."}</Text>
            <Text style={styles.userInfoText}>{userInfo?.screen_name ? `@${userInfo.screen_name}` : "Loading..."}</Text>
            <Text style={styles.userInfoText}>{userInfo?.wallet_address ? shortenAddress(userInfo.wallet_address) : '0x00'}</Text>
          </TouchableOpacity>

          <View style={{ marginTop: 50 }}>
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
                  isFullBio: true,
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
            setModalVisible(false);
          }}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={modalStyles.centeredView}>
              <TouchableWithoutFeedback>
                <View style={modalStyles.modalView}>
                  <Text style={modalStyles.title}>Please choose{"\n"}Crowdsource type</Text>

                  <View style={{ alignSelf: "center", gap: 10, width: "100%" }}>
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
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </SafeAreaView>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer linking={linking}>
        <AuthProvider>
          <LoadingProvider>
            <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
              <Drawer.Screen name="DrawerMain" component={StackNavigatorComponent} options={{ headerShown: false }} />
            </Drawer.Navigator>
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
  drawerMenu: {
    color: "white", fontWeight: "900", marginTop: 20
  },
  drawerContent: {
    flex: 1,
    backgroundColor: Color.colorDarkslategray_400,
  },
  drawerSection: {
    paddingLeft:24,
    paddingTop:10
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

  userInfoSection: {
    borderRadius: 10,
    // Add subtle highlight effect
    backgroundColor: Color.colorDarkslategray_300,
  },

  userInfoText: {
    color: "white",
    marginTop: 4,
    fontFamily: getFontFamily("400"),
    fontSize: FontSize.labelLarge_size,
  },
  svgrepoLayout: {
    width: '100%',
    alignItems:'flex-end',
    marginTop:10,
    paddingRight:10,
    // borderWidth:2,
    // borderColor:'red'
  },
  icon1:{
    width:32,
    height:32
  }
});

export default StackNavigator;
