import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Mint from './screens/Mint';
import Main from './screens/Main';
import ReferralCode from './screens/ReferralCode';
import { AuthProvider } from './components/AuthProvider';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();

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

        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}

export default StackNavigator