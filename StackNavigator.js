import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Mint from './screens/Mint';
import Main from './screens/Main';
import PostList from './screens/PostList';
import PostDetail from './screens/PostDetail';
import PostLikedBy from './screens/PostLikedBy';
import ChatList from './screens/ChatList';
import ChatView from './screens/ChatView';
import NotificationList from './screens/NotificationList';
import Wallet from './screens/Wallet';

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
          name="PostList"
          component={PostList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PostDetail"
          component={PostDetail}
        />
        <Stack.Screen
          name="PostLikedBy"
          component={PostLikedBy}
        />
        <Stack.Screen
          name="ChatList"
          component={ChatList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChatView"
          component={ChatView}
        />
        <Stack.Screen
          name="NotificationList"
          component={NotificationList}
        />
        <Stack.Screen
          name="Wallet"
          component={Wallet}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator