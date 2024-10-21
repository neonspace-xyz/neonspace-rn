import * as React from "react";
import { Color } from "../GlobalStyles";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import PostStackNavigator from './PostStackNavigator';
import WalletStackNavigator from "./WalletStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";
import { TouchableOpacity } from "react-native";
import NotificationStackNavigator from "./NotificationStackNavigator";
import CrowdsourceStackNavigator from "./CrowdsourceStackNavigator";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from "expo-image";

const Main = () => {
  // Create the bottom tab navigator
  const Tab = createBottomTabNavigator();
  const Drawer = createDrawerNavigator();
  
  const CustomDrawerContent = (props) => (
    <SafeAreaView style={styles.drawerContent}>
      <View style={styles.drawerSection}>
        <Text style={{color:"white"}}>Name</Text>
        <Text style={{color:"white"}}>@endlessmeeee</Text>
        <Text style={{color:"white"}}>Wallet Address: 0xe...dhv</Text>

        <View style={{marginTop:20}}>
          <Text style={{color:"white"}}>Post Crowdsource</Text>
          <Text style={{color:"white"}}>My Full Bio</Text>
          <Text style={{color:"white"}}>Wallet</Text>
        </View>
      </View>
    </SafeAreaView>
  );

  const TabNavigatorComponent = () => (
    <Tab.Navigator

      screenOptions={({ route }) => ({
        tabBarButton: (props) => (
          <TouchableOpacity
            {...props}
            onPress={() => {
              props.onPress();
            }}
          />
        ),
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Notification') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'Wallet') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Crowdsource') {
            iconName = focused ? 'logo-usd' : 'logo-usd';
          } 

          return <Icon name={iconName} size={size} color={color} />;
        },
        headerShown: false,

        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: Color.colorGray_100, paddingBottom: 5 },
        tabBarLabelStyle: { fontSize: 10 },
        // tabBarActiveTintColor: 'tomato',
        // tabBarInactiveTintColor: 'gray',
        // tabBarStyle: {
        //   backgroundColor: Color.colorDarkslategray_400, // Change this to your desired background color
        // }
      })}
    >
      <Tab.Screen name="Home" component={PostStackNavigator}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            navigation.navigate('Home', {
              screen: 'PostList1',
              params: {
                reset: true,
              },
            });
          }
        })} />
        <Tab.Screen name="Crowdsource" component={CrowdsourceStackNavigator}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            navigation.navigate('Crowdsource', {
              screen: 'CrowdsourceView5',
              params: {
                reset: true,
              },
            });
          }
        })} />
      <Tab.Screen name="Notification" component={NotificationStackNavigator}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            navigation.navigate('Notification', {
              screen: 'Notification2',
              params: {
                reset: true,
              },
            });
          }
        })} />
      <Tab.Screen name="Wallet" component={WalletStackNavigator}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            navigation.navigate('Wallet', {
              screen: 'MyAssets3',
              params: {
                reset: true,
              },
            });
          }
        })} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            navigation.navigate('Profile', {
              screen: 'MyProfile4',
              params: {
                reset: true,
              },
            });
          }
        })} />
    </Tab.Navigator>
  );

  return (
    <Tab.Navigator

      screenOptions={({ route }) => ({
        tabBarButton: (props) => (
          <TouchableOpacity
            {...props}
            onPress={() => {
              props.onPress();
            }}
          />
        ),
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            return <Image
              style={{width:32, height:32, opacity:focused? 1 : 0.32}}
              source={require('../assets/icon-home.png')}
            />
          } 
          else if (route.name === 'Notification') {
            return <Image
              style={{width:32, height:32, opacity:focused? 1 : 0.32}}
              source={require('../assets/icon-notification.png')}
            />
          } else if (route.name === 'Wallet') {
            return <Image
              style={{width:32, height:32, opacity:focused? 1 : 0.32}}
              source={require('../assets/icon-wallet.png')}
            />
          } else if (route.name === 'Profile') {
            return <Image
              style={{width:32, height:32, opacity:focused? 1 : 0.32}}
              source={require('../assets/icon-profile.png')}
            />
          } else if (route.name === 'Crowdsource') {
            return <Image
              style={{width:32, height:32, opacity:focused? 1 : 0.32}}
              source={require('../assets/icon-crowdsource.png')}
            />
          } 
          // return <Icon name={iconName} size={size} color={color} />;
          // return <Text>TESTS</Text>
        },
        headerShown: false,

        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: Color.colorGray_100, 
        borderTopColor: 'transparent'
        // height: 50
        // paddingTop:12,
        // paddingBottom:24,
        // paddingLeft:26,
        // paddingRight:24
        
         },
        tabBarLabelStyle: { fontSize: 10 },
        // tabBarActiveTintColor: 'tomato',
        // tabBarInactiveTintColor: 'gray',
        // tabBarStyle: {
        //   backgroundColor: Color.colorDarkslategray_400, // Change this to your desired background color
        // }
      })}
    >
      <Tab.Screen name="Home" component={PostStackNavigator}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            navigation.navigate('Home', {
              screen: 'PostList1',
              params: {
                reset: true,
              },
            });
          }
        })} />
        <Tab.Screen name="Crowdsource" component={CrowdsourceStackNavigator}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            navigation.navigate('Crowdsource', {
              screen: 'CrowdsourceView5',
              params: {
                reset: true,
              },
            });
          }
        })} />
      <Tab.Screen name="Notification" component={NotificationStackNavigator}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            navigation.navigate('Notification', {
              screen: 'Notification2',
              params: {
                reset: true,
              },
            });
          }
        })} />
      <Tab.Screen name="Wallet" component={WalletStackNavigator}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            navigation.navigate('Wallet', {
              screen: 'MyAssets3',
              params: {
                reset: true,
              },
            });
          }
        })} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            navigation.navigate('Profile', {
              screen: 'MyProfile4',
              params: {
                reset: true,
              },
            });
          }
        })} />
    </Tab.Navigator>
  )
};


const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    padding: 16,
    backgroundColor: Color.colorDarkslategray_100,
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
});

export default Main;
