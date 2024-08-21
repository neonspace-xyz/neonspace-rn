import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CrowdsourceView from './CrowdsourceView';
import CrowdDetailHiring from './CrowdDetailHiring';
import CrowdDetailEvent from './CrowdDetailEvent';
import CrowdDetailQuest from './CrowdDetailQuest';
import CrowdCreateHiring from './CrowdCreateHiring';
import PostLikeList from './PostLikeList';
import ChatList from './ChatList';
import ChatView from './ChatView';
import OtherProfile from './OtherProfile';
import Verified from './Verified';


const Stack = createNativeStackNavigator();

function CrowdsourceStackNavigator() {

  const dataToSend = { tab: 5 };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CrowdsourceView5" component={CrowdsourceView} initialParams={dataToSend} />
      <Stack.Screen name="CrowdDetailHiring5" component={CrowdDetailHiring} initialParams={dataToSend} />
      <Stack.Screen name="CrowdDetailEvent5" component={CrowdDetailEvent} initialParams={dataToSend} />
      <Stack.Screen name="CrowdDetailQuest5" component={CrowdDetailQuest} initialParams={dataToSend} />
      <Stack.Screen name="CrowdCreateHiring5" component={CrowdCreateHiring} initialParams={dataToSend} />
      <Stack.Screen name="PostLikeList5" component={PostLikeList} initialParams={dataToSend} />
      <Stack.Screen name="ChatList5" component={ChatList} initialParams={dataToSend} />
      <Stack.Screen name="ChatView5" component={ChatView} initialParams={dataToSend} />
      <Stack.Screen name="OtherProfile5" component={OtherProfile} initialParams={dataToSend} />
      <Stack.Screen name="Verified5" component={Verified} />
    </Stack.Navigator>
  );
}

export default CrowdsourceStackNavigator;
