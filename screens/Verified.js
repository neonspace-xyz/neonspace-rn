import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Padding, Border } from "../GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import VerifiedList from "../components/VerifiedList";

const Verified = () => {
  const route = useRoute();
  const { tab } = route.params;
  const navigation = useNavigation();
  const [verifiedBy, setVerifiedBy] = React.useState(false);

  return (
    <SafeAreaView style={styles.myProfileVerifiedBy}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/back.png")}
            style={styles.headerImage}
          />
        </Pressable>

        <Text style={
          [styles.editProfile, styles.timeTypo]
          // {flexGrow:1, color:"white", textAlign:"center", paddingTop:10, alignItems:"center"}
        }>Verification</Text>
      </View>

      <View style={[styles.frameParent8, styles.topNavBg]}>
        <Pressable
          style={styles.verifiedWrapperFlexBox}
          onPress={() => {}}
        >
          <Text style={[styles.youVerified, styles.bioExampleTypo]}>
            You verified
          </Text>
        </Pressable>
        <View style={[styles.verifiedByWrapper, styles.verifiedWrapperFlexBox]}>
          <Text style={[styles.youVerified, styles.bioExampleTypo]}>
            Verified by
          </Text>
        </View>
      </View>

      <VerifiedList
        tab={tab} />
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  header: {
    // marginTop: 60,
    width: "100%",
    // height:100,
    // maxHeight:100,
    // flex:1,
    flexDirection: 'row',
    // alignSelf:"flex-",
    padding: 14,
    backgroundColor: Color.colorGray_100,
    // borderColor:"red",
    // borderWidth:2,
  },
  headerImage: {
    width: 30,
    height: 30,
  },
  editProfile: {
    fontSize: FontSize.labelLarge_size,
    // marginLeft: 14,
    // flex: 1,
    flexGrow: 1, color: "white",
    textAlign: "center",
    paddingTop: 3,
    alignItems: "center",
    color: Color.darkInk,
    fontWeight: "600",
  },
  notchIconPosition: {
    left: "50%",
    position: "absolute",
  },
  nameTypo: {
    textAlign: "left",
    color: Color.darkInk,
    fontFamily: FontFamily.clashGrotesk,
    fontSize: FontSize.labelLarge_size,
  },
  bioExampleTypo: {
    fontSize: FontSize.size_sm,
    textAlign: "left",
    color: Color.darkInk,
    fontFamily: FontFamily.clashGrotesk,
  },
  ellipseGroupSpaceBlock: {
    marginTop: 12,
    paddingVertical: Padding.p_sm,
    paddingHorizontal: Padding.p_xs,
    flexDirection: "row",
    backgroundColor: Color.colorDarkslategray_400,
    borderRadius: Border.br_3xs,
    overflow: "hidden",
  },
  topNavBg: {
    backgroundColor: Color.colorGray_100,
    flexDirection: "row",
    width: "100%"
  },
  verifiedWrapperFlexBox: {
    paddingVertical: Padding.p_7xs,
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: Padding.p_xs,
    flexDirection: "row",
    alignItems: "center",
  },
  timePosition: {
    left: 0,
    position: "absolute",
  },
  timeTypo: {
    textAlign: "center",
    fontWeight: "600",
    color: Color.darkInk,
    fontFamily: FontFamily.clashGrotesk,
  },
  borderPosition: {
    bottom: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
  },
  containerLayout: {
    width: 24,
    marginLeft: 14,
    height: 24,
  },
  iconLayout: {
    width: "100%",
    height: "100%",
  },
  wrapperLayout: {
    height: 24,
    width: 23,
  },
  frameChild: {
    width: 32,
    height: 32,
  },
  name: {
    fontWeight: "500",
  },
  endlessmeee: {
    marginLeft: 6,
  },
  nameParent: {
    flexDirection: "row",
    alignItems: "center",
  },
  bioExample: {
    marginTop: 2,
    alignSelf: "stretch",
  },
  frameGroup: {
    marginLeft: 10,
    flex: 1,
  },
  ellipseParent: {
    paddingVertical: Padding.p_sm,
    paddingHorizontal: Padding.p_xs,
    backgroundColor: Color.colorDarkslategray_400,
    borderRadius: Border.br_3xs,
    flexDirection: "row",
    alignSelf: "stretch",
    overflow: "hidden",
  },
  ellipseGroup: {
    alignSelf: "stretch",
  },
  framePressable: {
    width: 362,
  },
  frameParent: {
    marginLeft: -181,
    top: 148,
    alignItems: "center",
    width: 362,
  },
  youVerified: {
    fontWeight: "500",
  },
  verifiedByWrapper: {
    borderColor: Color.colorDeeppink,
    borderBottomWidth: 2,
    borderStyle: "solid",
  },
  frameParent8: {
    // borderColor:"blue",
    // borderWidth:2,
    // top: 101,
    paddingTop: Padding.p_9xs,
    // marginLeft: -195,
    backgroundColor: Color.colorGray_100,
    height: 50
    // left: "50%",
    // position: "absolute",
  },
  time: {
    marginTop: -10.5,
    top: "50%",
    fontSize: FontSize.size_mid,
    letterSpacing: 0,
    lineHeight: 22,
    width: 54,
    left: 0,
    position: "absolute",
  },
  timeIphone: {
    zIndex: 0,
    height: 21,
    width: 54,
  },
  border: {
    width: "91.58%",
    right: "8.42%",
    left: "0%",
    borderRadius: Border.br_9xs_5,
    borderColor: Color.darkInk,
    borderWidth: 1,
    opacity: 0.35,
    borderStyle: "solid",
  },
  capIcon: {
    height: "30.77%",
    width: "4.76%",
    top: "36.15%",
    right: "0%",
    bottom: "33.08%",
    left: "95.24%",
    maxWidth: "100%",
    maxHeight: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  capacity: {
    height: "69.23%",
    width: "76.92%",
    top: "15.38%",
    right: "15.75%",
    bottom: "15.38%",
    left: "7.33%",
    borderRadius: 1,
    backgroundColor: Color.darkInk,
    position: "absolute",
  },
  battery: {
    width: "34.87%",
    right: "0.13%",
    left: "65.01%",
  },
  wifiIcon: {
    width: 17,
    height: 12,
  },
  cellularConnectionIcon: {
    width: 19,
    height: 12,
  },
  cellularwifibatteryIphone: {
    width: 78,
    height: 13,
    zIndex: 1,
  },
  notchIcon: {
    marginLeft: -76.7,
    width: 153,
    zIndex: 2,
    top: 0,
    height: 32,
  },
  statusBarIphone: {
    justifyContent: "space-between",
    paddingHorizontal: Padding.p_3xl,
    paddingTop: Padding.p_sm,
    paddingBottom: Padding.p_xs,
    top: 0,
    backgroundColor: Color.colorGray_100,
    flexDirection: "row",
    width: 390,
    alignItems: "center",
  },
  icon1: {
    display: "none",
  },
  container: {
    marginLeft: 14,
  },
  verification: {
    marginLeft: 14,
    fontSize: FontSize.labelLarge_size,
    textAlign: "center",
    fontWeight: "600",
    flex: 1,
  },
  vectorIcon: {
    width: 21,
    display: "none",
    marginLeft: 14,
    height: 21,
  },
  topNavChild: {
    marginLeft: 14,
  },
  vuesaxboldmoreIcon: {
    display: "none",
    marginLeft: 14,
  },
  topNav: {
    top: 47,
    height: 54,
    paddingHorizontal: Padding.p_sm,
    paddingVertical: Padding.p_3xs,
    marginLeft: -195,
    backgroundColor: Color.colorGray_100,
    left: "50%",
    position: "absolute",
    alignItems: "center",
  },
  myProfileVerifiedBy: {
    flexDirection: "column",
    backgroundColor: Color.colorGray_200,
    height: "100%",
    // borderColor:"red",
    // borderWidth:2,
    // height: 844,
    overflow: "hidden",
    // width: 390,
  },
});

export default Verified;
