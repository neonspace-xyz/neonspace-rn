import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Mint from './screens/Mint';
import Main from './screens/Main';
import PostHome from './screens/PostHome';
import PostDetail from './screens/PostDetail';
import PostLikeList from './screens/PostLikeList';
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
          name="PostHome"
          component={PostHome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PostDetail"
          component={PostDetail}
        />
        <Stack.Screen
          name="PostLikeList"
          component={PostLikeList}
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