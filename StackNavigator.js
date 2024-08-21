import React, { useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Mint from './screens/Mint';
import Main from './screens/Main';
import ReferralCode from './screens/ReferralCode';
import { AuthProvider } from './components/AuthProvider';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color } from './GlobalStyles';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();
  const [userInfo, setUserInfo] = useState();

  const linking = {
    prefixes: ['exp://192.168.1.4:8081'],
    config: {
      screens: {
        Login: 'twitter/callback',
      },
    },
  };
  const StackNavigatorComponent = () => {
    
    return (
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
  )};

  const CustomDrawerContent = (props) => {
    
    const navigation = useNavigation();

    return (
    <SafeAreaView style={styles.drawerContent}>
      <View style={styles.drawerSection}>

        {userInfo?.profile_image ? (
          <Image
            style={[styles.myProfileItem]}
            contentFit="cover"
            source={userInfo.profile_image}
          />
        ) : (
          <Image
            style={[styles.myProfileItem]}
            contentFit="cover"
            source={require("./assets/photo.png")}
          />
        )}

        <Text style={{color:"white"}}>Name</Text>
        <Text style={{color:"white"}}>@endlessmeeee</Text>
        <Text style={{color:"white"}}>Wallet Address: 0xe...dhv</Text>

        <View style={{marginTop:50}}>
          <TouchableOpacity>
            <Text style={styles.drawerMenu}>Post Crowdsource</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.drawerMenu}>My Full Bio</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Profile', {
              screen: 'MyProfile4',
              params: {
                reset: true,
              },
            })
          }
          }>
            <Text style={styles.drawerMenu}>Wallet</Text>
          </TouchableOpacity>
        </View>
        {/* <Text style={styles.title}>Custom Drawer</Text>
        <Button title="Home" onPress={() => props.navigation.navigate('Home')} />
        <Button title="Profile" onPress={() => props.navigation.navigate('Profile')} /> */}
      </View>
    </SafeAreaView>
  )};

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer linking={linking}>
        <AuthProvider>
          {/* {StackNavigatorComponent()} */}
          {/* <StackNavigatorComponent/> */}
          <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="DrawerMain" component={StackNavigatorComponent} options={{ headerShown: false }} />
          </Drawer.Navigator>
          {/* <Stack.Navigator>
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

          </Stack.Navigator> */}
        </AuthProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  drawerMenu:{
    color:"white", fontWeight: "900", marginTop: 20
  },
  drawerContent: {
    flex: 1,
    padding: 16,
    backgroundColor: Color.colorDarkslategray_100,
  },
  drawerSection: {
    marginVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  myProfileItem: {
    width: 90,
    height: 90,
    // margin: 10,
    borderRadius: 50
  },
});


export default StackNavigator