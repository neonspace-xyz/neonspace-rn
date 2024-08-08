import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import StackNavigator from "./StackNavigator";
import { Color } from "./GlobalStyles";

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Clash Grotesk': require('./assets/fonts/ClashGrotesk.ttf'),
    'Satoshi': require('./assets/fonts/Satoshi.ttf'),
    // 'SF Pro Text': require('./assets/fonts/SfProText.OTF')
  });
  return (
    <>
      <StackNavigator />
    </>
  );
}