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

const Stack = createNativeStackNavigator();

function WalletStackNavigator() {

  const dataToSend = { tab: 3 };
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Wallet3" component={Wallet} initialParams={dataToSend} />
      <Stack.Screen name="MyAssets3" component={MyAssets} initialParams={dataToSend} />
      {/* <Stack.Screen name="PostDetail1" component={PostDetail} initialParams={dataToSend} />
      <Stack.Screen name="PostLikeList1" component={PostLikeList} initialParams={dataToSend} />
      <Stack.Screen name="ChatList1" component={ChatList} initialParams={dataToSend} />
      <Stack.Screen name="ChatView1" component={ChatView} initialParams={dataToSend} />
      <Stack.Screen name="OtherProfile1" component={OtherProfile} initialParams={dataToSend} />
      <Stack.Screen name="Verified1" component={Verified} /> */}
    </Stack.Navigator>
  );
}

export default WalletStackNavigator;
