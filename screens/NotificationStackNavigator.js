import React from 'react';
// import { createStackNavigator } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostHome from './PostHome';
import PostDetail from './PostDetail';
import PostLikeList from './PostLikeList';
import ChatList from './ChatList';
import ChatView from './ChatView';
import OtherProfile from './OtherProfile';
import Verified from './Verified';
import Wallet from './Wallet';
import MyAssets from './MyAssets';
import MyProfile from './MyProfile';
import EditProfile from './EditProfile';
import NotificationList from './NotificationList';

const Stack = createNativeStackNavigator();

function NotificationStackNavigator() {

  const dataToSend = { tab: 2 };
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Notification2" component={NotificationList} initialParams={dataToSend} />
      <Stack.Screen name="ChatList2" component={ChatList} initialParams={dataToSend} />
      <Stack.Screen name="ChatView2" component={ChatView} initialParams={dataToSend} />

      {/* <Stack.Screen name="MyAssets3" component={MyAssets} initialParams={dataToSend} />       */}
    </Stack.Navigator>
  );
}

export default NotificationStackNavigator;
