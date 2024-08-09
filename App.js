import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import StackNavigator from "./StackNavigator";
import { Color } from "./GlobalStyles";
import { useEffect } from "react";

export default function App() {
  const [fontsLoaded, error] = useFonts({
    'Clash Grotesk': require('./assets/fonts/ClashGrotesk.ttf'),
    'Satoshi': require('./assets/fonts/Satoshi.ttf'),
    // 'SF Pro Text': require('./assets/fonts/SfProText.OTF')
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      // SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }
  return (
    <>
      <StackNavigator />
    </>
  );
}