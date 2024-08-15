import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Mint from './screens/Mint';
import Main from './screens/Main';
import PostHome from './screens/PostHome';
import PostDetail from './screens/PostDetail';
import MyProfile from './screens/MyProfile';
import EditProfile from './screens/EditProfile';
import Verified from './screens/Verified';
import OtherProfile from './screens/OtherProfile';
import MyAssets from './screens/MyAssets';
import PostLikeList from './screens/PostLikeList';
import ChatList from './screens/ChatList';
import ChatView from './screens/ChatView';
import NotificationList from './screens/NotificationList';
import Wallet from './screens/Wallet';
import ReferralCode from './screens/ReferralCode';
import { AuthProvider } from './components/AuthProvider';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();

  const defaultOption = {
    headerTitleAlign: 'center',
    headerBackVisible: false
  };

  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator>
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
          {/* <Stack.Screen
            name="PostHome"
            component={PostHome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PostDetaila"
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

          <Stack.Screen
            name="MyProfile"
            component={MyProfile}
            options={{ headerShown: false }}
          />

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
            options={{ headerShown: false }} />

          <Stack.Screen
            name="MyAssets"
            component={MyAssets}
            options={{ headerShown: false }} /> */}

        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}

export default StackNavigator