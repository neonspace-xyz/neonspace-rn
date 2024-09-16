import { Platform, Pressable, StyleSheet, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { Color } from "../GlobalStyles"

const ButtonFAB = ({ isTab, isProfile, doCreate }) => {

  return (
    <View style={[styles.containerFAB, { bottom: Platform.OS == "ios" ? isTab ? 20 : isProfile ? 20 : 40 : isTab ? 60 : isProfile ? 60 : 80 }]}>
      <Pressable style={styles.FAB} onPress={doCreate}>
        <Icon name="add" size={45} color={Color.colorBlack} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  containerFAB: {
    position: 'absolute',
    zIndex: 1,
    right: 20,
  },
  FAB: {
    backgroundColor: Color.darkInk, // Adjust color as needed
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default ButtonFAB;
