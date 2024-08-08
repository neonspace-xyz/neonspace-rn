import { useFonts } from "expo-font";
import StackNavigator from "./StackNavigator";

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