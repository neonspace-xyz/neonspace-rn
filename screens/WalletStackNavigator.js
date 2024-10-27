import React from 'react';
// import { createStackNavigator } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Wallet from './Wallet';
import MyAssets from './MyAssets';
import QrCamera from './QrCamera';
import Webview from '../components/Webview';
import PostDetail from './PostDetail';
import PostLike from './PostLike';
import ChatList from './ChatList';
import ChatView from './ChatView';
import OtherProfile from './OtherProfile';
import Verified from './Verified';

const Stack = createNativeStackNavigator();

function WalletStackNavigator() {
  const dataToSend = { tab: 3 };
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Wallet3" component={Wallet} initialParams={dataToSend} /> */}
      <Stack.Screen name="MyAssets3" component={MyAssets} initialParams={dataToSend} />
      <Stack.Screen name="QrCamera3" component={QrCamera} initialParams={dataToSend} />
      <Stack.Screen name="Webview3" component={Webview} initialParams={dataToSend} />
      

      <Stack.Screen name="PostDetail3" component={PostDetail} initialParams={dataToSend} />
      <Stack.Screen name="PostLike3" component={PostLike} initialParams={dataToSend} />
      <Stack.Screen name="ChatList3" component={ChatList} initialParams={dataToSend} />
      <Stack.Screen name="ChatView3" component={ChatView} initialParams={dataToSend} />
      <Stack.Screen name="OtherProfile3" component={OtherProfile} initialParams={dataToSend} />
      <Stack.Screen name="Verified3" component={Verified} />
    </Stack.Navigator>
  );
}

export default WalletStackNavigator;
