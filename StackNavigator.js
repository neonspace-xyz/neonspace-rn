import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Mint from './screens/Mint';
import Main from './screens/Main';
import ReferralCode from './screens/ReferralCode';
import { AuthProvider } from './components/AuthProvider';
import { createDrawerNavigator } from '@react-navigation/drawer';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  // const Drawer = createDrawerNavigator();
  const linking = {
    prefixes: ['exp://192.168.1.4:8081'],
    config: {
      screens: {
        Login: 'twitter/callback',
      },
    },
  };

  
  return (
    <NavigationContainer linking={linking}>
      <AuthProvider>
        {/* <Drawer.Navigator initialRouteName="Home"> */}
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

          </Stack.Navigator>
        {/* </Drawer.Navigator> */}
      </AuthProvider>
    </NavigationContainer>
  );
}

export default StackNavigator