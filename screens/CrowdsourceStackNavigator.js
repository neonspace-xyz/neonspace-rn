import React from 'react';
// import { createStackNavigator } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CrowdsourceView from './CrowdsourceView';


const Stack = createNativeStackNavigator();

function CrowdsourceStackNavigator() {

  const dataToSend = { tab: 5 };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CrowdsourceView5" component={CrowdsourceView} initialParams={dataToSend} />
      {/* <Stack.Screen name="PostDetail1" component={PostDetail} initialParams={dataToSend} />
      <Stack.Screen name="PostLikeList1" component={PostLikeList} initialParams={dataToSend} />
      <Stack.Screen name="ChatList1" component={ChatList} initialParams={dataToSend} />
      <Stack.Screen name="ChatView1" component={ChatView} initialParams={dataToSend} />
      <Stack.Screen name="OtherProfile1" component={OtherProfile} initialParams={dataToSend} />
      <Stack.Screen name="Verified1" component={Verified} /> */}
    </Stack.Navigator>
  );
}

export default CrowdsourceStackNavigator;
