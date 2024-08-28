import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import StackNavigator from "./StackNavigator";
import { Color } from "./GlobalStyles";
import { useEffect } from "react";
import { AuthProvider } from "./components/AuthProvider";
import './gesture-handler';

export default function App() {
  const [fontsLoaded, error] = useFonts({
    'Clash Grotesk': require('./assets/fonts/ClashGrotesk.ttf'),
    'ClashGrotesk-Bold': require('./assets/fonts/ClashGrotesk-Bold.ttf'),
    'ClashGrotesk-Extralight': require('./assets/fonts/ClashGrotesk-Extralight.ttf'),
    'ClashGrotesk-Light': require('./assets/fonts/ClashGrotesk-Light.ttf'),
    'ClashGrotesk-Medium': require('./assets/fonts/ClashGrotesk-Medium.ttf'),
    'ClashGrotesk-Regular': require('./assets/fonts/ClashGrotesk-Regular.ttf'),
    'ClashGrotesk-Semibold': require('./assets/fonts/ClashGrotesk-Semibold.ttf'),
    'ClashGrotesk-Variable': require('./assets/fonts/ClashGrotesk-Variable.ttf'),
    'Satoshi': require('./assets/fonts/Satoshi.ttf'),
    // 'SF Pro Text': require('./assets/fonts/SfProText.OTF')
  });
  
   useEffect(() => {
    if (error) {
      console.error('Error loading fonts', error);
      throw error;
    }
  }, [error]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <>
      <StackNavigator />
    </>
  );
}