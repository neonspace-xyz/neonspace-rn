import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";
import { Component_Max_Width } from "../Constant";

const Login = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        style={styles.imgBackground}
        contentFit="cover"
        source={require("../assets/group-872.png")}
      />
      <Text style={[styles.txtTitle, styles.txtStyle]}>
        Neonrabbits
      </Text>
      <Text style={[styles.txtDesc, styles.txtStyle]}>
        Neonrabbits are connecting the dots of their lives, and always on
        adventure together at Neonspace
      </Text>
      <Image
        style={[styles.imgLogo]}
        contentFit="cover"
        source={require("../assets/ic_logo.png")}
      />
      <Pressable
        style={[styles.button]}
        onPress={() => navigation.replace("Mint")}
      >
        <Text style={[styles.buttonLabel, styles.txtStyle]}>
          Login with X
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: Color.colorGray_100,
  },
  imgBackground: {
    height: "100%",
    width: "100%",
  },
  txtStyle: {
    textAlign: "center",
    color: Color.darkInk,
    fontFamily: FontFamily.clashGrotesk,
  },
  txtTitle: {
    top: 140,
    fontSize: FontSize.size_13xl,
    fontWeight: "600",
    position: "absolute",
  },
  txtDesc: {
    top: 199,
    fontSize: FontSize.size_sm,
    position: "absolute",
    width: "80%",
    maxWidth: Component_Max_Width,
  },
  imgLogo: {
    marginTop: -111,
    top: "50%",
    width: 222,
    height: 222,
    position: "absolute",
  },
  button: {
    position: "absolute",
    top: "75%",
    borderRadius: Border.br_5xs,
    borderStyle: "solid",
    borderColor: Color.colorDeeppink,
    borderWidth: 3,
    width: "90%",
    maxWidth: Component_Max_Width,
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_xs,
    backgroundColor: Color.colorGray_100,
  },
  buttonLabel: {
    fontSize: FontSize.labelLarge_size,
    lineHeight: 24,
    fontWeight: "600",
    color: Color.darkInk,
    fontFamily: FontFamily.clashGrotesk,
  },
});

export default Login;
