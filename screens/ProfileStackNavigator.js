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

const Stack = createNativeStackNavigator();

function ProfileStackNavigator() {

  const dataToSend = { tab: 4 };
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyProfile4" component={MyProfile} initialParams={dataToSend} />
      <Stack.Screen name="EditProfile4" component={EditProfile} initialParams={dataToSend} />
      <Stack.Screen name="Verified4" component={Verified} initialParams={dataToSend} />
      <Stack.Screen name="OtherProfile4" component={OtherProfile} initialParams={dataToSend} />

      <Stack.Screen name="PostDetail4" component={PostDetail} initialParams={dataToSend} />
      <Stack.Screen name="PostLikeList4" component={PostLikeList} initialParams={dataToSend} />

      <Stack.Screen name="ChatList4" component={ChatList} initialParams={dataToSend} />
      <Stack.Screen name="ChatView4" component={ChatView} initialParams={dataToSend} />

      {/* <Stack.Screen name="MyAssets3" component={MyAssets} initialParams={dataToSend} />       */}
    </Stack.Navigator>
  );
}

export default ProfileStackNavigator;
