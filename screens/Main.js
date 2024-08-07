import * as React from "react";
import { Color } from "../GlobalStyles";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import PostHome from './PostHome';
import NotificationList from './NotificationList';
import Wallet from './Wallet';


const Main = () => {
  // Create the bottom tab navigator
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
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
      <Tab.Screen name="Home" component={PostHome} />
      <Tab.Screen name="Notification" component={NotificationList} />
      <Tab.Screen name="Wallet" component={Wallet} />
      <Tab.Screen name="Profile" component={PostHome} />
    </Tab.Navigator>
  );
};

export default Main;
