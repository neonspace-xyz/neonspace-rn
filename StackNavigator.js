import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Mint from './screens/Mint';
import Main from './screens/Main';
import PostDetail from './screens/PostDetail';
import PostLikedBy from './screens/PostLikedBy';
import MyProfile from './screens/MyProfile';
import { StatusBar } from 'expo-status-bar';
import { Color } from './GlobalStyles';
import EditProfile from './screens/EditProfile';
import Verified from './screens/Verified';
import OtherProfile from './screens/OtherProfile';
import MyAssets from './screens/MyAssets';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();

  const defaultOption = {
    headerTitleAlign: 'center',
    headerBackVisible: false
  };
  return (
    <NavigationContainer>
      <Stack.Navigator>

        {/* <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Mint"
          component={Mint}
          options={{ headerShown: false }}
        /> */}
        {/* <Stack.Screen
          name="PostDetail"
          component={PostDetail}
        />
        <Stack.Screen
          name="PostLikedBy"
          component={PostLikedBy}
        />

        <Stack.Screen
          name="MyProfile"
          component={MyProfile}
        /> */}
        
        {/* <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="OtherProfile"
          component={OtherProfile}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="Verified"
          component={Verified}
          options={{ headerShown: false }} /> */}

        <Stack.Screen
          name="MyAssets"
          component={MyAssets}
          options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator