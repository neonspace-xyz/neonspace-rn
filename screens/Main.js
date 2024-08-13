import * as React from "react";
import { Color } from "../GlobalStyles";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import PostStackNavigator from './PostStackNavigator';
import NotificationList from './NotificationList';
import Wallet from './Wallet';
import MyProfile from './MyProfile';
import WalletStackNavigator from "./WalletStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";
import { TouchableOpacity } from "react-native";
import { CommonActions, useFocusEffect, useNavigation } from "@react-navigation/core";
import NotificationStackNavigator from "./NotificationStackNavigator";

const Main = () => {
  // Create the bottom tab navigator
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();

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
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Notification') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'Wallet') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: Color.colorDarkslategray_400, // Change this to your desired background color
        }
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
              screen: 'Wallet3',
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
};

export default Main;
