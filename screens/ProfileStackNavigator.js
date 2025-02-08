import React from 'react';
// import { createStackNavigator } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostHome from './PostHome';
import PostDetail from './PostDetail';
import PostLike from './PostLike';
import ChatList from './ChatList';
import ChatView from './ChatView';
import OtherProfile from './OtherProfile';
import Verified from './Verified';
import Wallet from './Wallet';
import MyAssets from './MyAssets';
import MyProfile from './MyProfile';
import EditProfile from './EditProfile';
import Experience from './Experience';
import ExperienceForm from './ExperienceForm';
import SkillForm from './SkillForm';
import Skill from './Skill';
import CrowdDetailHiring from './CrowdDetailHiring';
import CrowdDetailEvent from './CrowdDetailEvent';
import CrowdDetailQuest from './CrowdDetailQuest';
import CrowdCreateHiring from './CrowdCreateHiring';
import CrowdCreateEvent from './CrowdCreateEvent';
import CrowdCreateQuest from './CrowdCreateQuest';
import EditProfilePicture from './EditProfilePicture';

const Stack = createNativeStackNavigator();

function ProfileStackNavigator() {

  const dataToSend = { tab: 4 };
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyProfile4" component={MyProfile} initialParams={dataToSend} />
      <Stack.Screen name="EditProfile4" component={EditProfile} initialParams={dataToSend} />
      <Stack.Screen name="EditProfilePicture4" component={EditProfilePicture} initialParams={dataToSend} />
      
      <Stack.Screen name="Verified4" component={Verified} initialParams={dataToSend} />
      <Stack.Screen name="OtherProfile4" component={OtherProfile} initialParams={dataToSend} />

      <Stack.Screen name="PostDetail4" component={PostDetail} initialParams={dataToSend} />
      <Stack.Screen name="PostLike4" component={PostLike} initialParams={dataToSend} />

      <Stack.Screen name="ChatList4" component={ChatList} initialParams={dataToSend} />
      <Stack.Screen name="ChatView4" component={ChatView} initialParams={dataToSend} />

      <Stack.Screen name="Experience4" component={Experience} initialParams={dataToSend} />
      <Stack.Screen name="ExperienceForm4" component={ExperienceForm} initialParams={dataToSend} />

      <Stack.Screen name="Skill4" component={Skill} initialParams={dataToSend} />
      <Stack.Screen name="SkillForm4" component={SkillForm} initialParams={dataToSend} />

      <Stack.Screen name="CrowdDetailHiring4" component={CrowdDetailHiring} initialParams={dataToSend} />
      <Stack.Screen name="CrowdDetailEvent4" component={CrowdDetailEvent} initialParams={dataToSend} />
      <Stack.Screen name="CrowdDetailQuest4" component={CrowdDetailQuest} initialParams={dataToSend} />
      <Stack.Screen name="CrowdCreateHiring4" component={CrowdCreateHiring} initialParams={dataToSend} />
      <Stack.Screen name="CrowdCreateEvent4" component={CrowdCreateEvent} initialParams={dataToSend} />
      <Stack.Screen name="CrowdCreateQuest4" component={CrowdCreateQuest} initialParams={dataToSend} />
      


      {/* <Stack.Screen name="MyAssets3" component={MyAssets} initialParams={dataToSend} />       */}
    </Stack.Navigator>
  );
}

export default ProfileStackNavigator;
