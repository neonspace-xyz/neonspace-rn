import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Mint from './screens/Mint';
import Main from './screens/Main';
import PostDetail from './screens/PostDetail';
import PostLikedBy from './screens/PostLikedBy';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();

  const defaultOption = {
    headerTitleAlign: 'center',
    headerBackVisible: false
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
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
        <Stack.Screen
          name="PostDetail"
          component={PostDetail}
        />
        <Stack.Screen
          name="PostLikedBy"
          component={PostLikedBy}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator