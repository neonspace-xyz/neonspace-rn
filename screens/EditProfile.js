import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Padding, FontSize, Color, FontFamily, Border } from "../GlobalStyles";
import PostList from "../components/PostList";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../components/SearchBar";
import ProfileDetail from "../components/ProfileDetail";

const EditProfile = () => {
  const navigation = useNavigation();
  
  return (
    <SafeAreaView style={styles.container}>
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
            }>Edit Profile</Text>
            
          <Pressable
            onPress={() => navigation.goBack()}>
            <Text style={[styles.save1, styles.save1Typo]}>Save</Text>
          </Pressable>
      </View> 

      <View style={{
        flexDirection:"column", width:"100%", 
        alignItems:"center", gap:10, paddingTop:20, paddingBottom: 20,
backgroundColor: Color.colorGray_100,
      // borderColor:"red",
      // borderWidth:2,
      }}>
        <Image
          style={[styles.editMyProfileChild]}
          contentFit="cover"
          source={require("../assets/photo.png")}
        />
        <Text style={[styles.editPicture, styles.save1Typo]}>Edit picture</Text>

      </View>
      <View style={{marginTop:10, padding:10, backgroundColor: Color.colorBlack}}>
        <View
          style={[
            styles.showMyWalletAddressParent,
            styles.statusBarIphoneFlexBox,
          ]}
        >
          <Text style={[styles.showMyWallet, styles.theBioTextTypo]}>
            Show my wallet address
          </Text>
          <View style={styles.groupLayout}>
            <View style={[styles.groupChild, styles.groupLayout]} />
            <Image
              style={[styles.groupItem, styles.wrapperLayout]}
              contentFit="cover"
              source={require("../assets/switch.png")}
            />
          </View>
        </View>
        <View style={styles.frameItem} />
        <View style={styles.bioParent}>
          <Text style={[styles.showMyWallet, styles.theBioTextTypo]}>Bio</Text>
          <Text style={[styles.theBioText, styles.theBioTextTypo]}>
            The bio text will be here. The maximum number of lines is 2 and that
            means max. characters is 100.
          </Text>
        </View>
      </View>
      
      
    </SafeAreaView>
  )
};


const styles = StyleSheet.create({
  container:{
    // backgroundColor: Color.colorGray_100,
    backgroundColor: Color.colorBlack,
    width:"100%",
    height:"100%",
    flex:1
  },
  header: {
    // marginTop: 60,
    width: "100%",
    // flex:1,
    flexDirection: 'row',
    // alignSelf:"flex-",
    padding: 14,
    backgroundColor: Color.colorGray_100,
  },
  headerImage: {
    width: 30,
    height: 30,
  },
  frameChildPosition: {
    backgroundColor: Color.colorGray_100,
    top: 0,
    width: 390,
    left: 0,
    position: "absolute",
  },
  iconLayout1: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  save1Typo: {
    textAlign: "center",
    color: Color.colorCornflowerblue_100,
    fontFamily: FontFamily.clashGrotesk,
    fontWeight: "500",
  },
  statusBarIphoneFlexBox: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  timeTypo: {
    color: Color.darkInk,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: FontFamily.clashGrotesk,
  },
  borderPosition: {
    bottom: "0%",
    height: "100%",
    top: "0%",
    position: "absolute",
  },
  wrapperLayout: {
    width: 24,
    height: 24,
  },
  iconLayout: {
    height: "100%",
    width: "100%",
  },
  theBioTextTypo: {
    textAlign: "left",
    color: Color.darkInk,
    fontFamily: FontFamily.clashGrotesk,
  },
  groupLayout: {
    height: 30,
    width: 56,
  },
  frameChild: {
    height: 294,
  },
  vectorIcon: {
    top: 189,
    left: -64,
    width: 292,
    height: 105,
    display: "none",
    position: "absolute",
  },
  vectorIcon1: {
    height: "25.51%",
    width: "82.56%",
    right: "-10.51%",
    bottom: "74.49%",
    left: "27.95%",
    top: "0%",
    maxWidth: "100%",
    display: "none",
  },
  editPicture: {
    fontSize: FontSize.size_sm,
  },
  rectangleParent: {
    // top: 101,
    // height: 147,
    // width: 390,
    // left: 0,
    // position: "absolute",
    // overflow: "hidden",
  },
  editMyProfileChild: {
    // borderColor:"red",
    // borderWidth:2,
    width: 90,
    height: 90,
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
    height: 32,
    zIndex: 2,
    top: 0,
  },
  statusBarIphone: {
    paddingHorizontal: Padding.p_3xl,
    paddingTop: Padding.p_sm,
    paddingBottom: Padding.p_xs,
    backgroundColor: Color.colorGray_100,
    top: 0,
    width: 390,
    left: 0,
    position: "absolute",
  },
  vuesaxoutlinearrowLeftWrapper: {
    width: 37,
    flexDirection: "row",
    top: 0,
    left: 0,
    position: "absolute",
  },
  topNavInner: {
    height: 24,
    width: 37,
  },
  icon1: {
    display: "none",
  },
  wrapper: {
    marginLeft: 14,
  },
  editProfile: {
    fontSize: FontSize.labelLarge_size,
    // marginLeft: 14,
    // flex: 1,
    flexGrow:1, color:"white", 
    textAlign:"center", 
    paddingTop:3, 
    alignItems:"center",
    color: Color.darkInk,
    fontWeight: "600",
  },
  save1: {
    fontSize: FontSize.labelLarge_size,
  },
  save: {
    marginLeft: 14,
  },
  vectorIcon2: {
    width: 21,
    marginLeft: 14,
    height: 21,
    display: "none",
  },
  vuesaxboldmoreIcon: {
    marginLeft: 14,
    display: "none",
  },
  topNav: {
    marginLeft: -195,
    top: 47,
    height: 54,
    paddingHorizontal: Padding.p_sm,
    paddingVertical: Padding.p_3xs,
    alignItems: "center",
    flexDirection: "row",
    left: "50%",
    backgroundColor: Color.colorGray_100,
    width: 390,
    position: "absolute",
  },
  showMyWallet: {
    fontSize: FontSize.labelLarge_size,
    fontWeight: "500",
    textAlign: "left",
  },
  groupChild: {
    borderRadius: 70,
    backgroundColor: "#3b4b5b",
    top: 0,
    left: 0,
    position: "absolute",
  },
  groupItem: {
    top: 3,
    left: 4,
    position: "absolute",
  },
  showMyWalletAddressParent: {
    width: "100%",
  },
  frameItem: {
    borderColor: Color.colorDarkslategray_400,
    borderTopWidth: 1,
    height: 1,
    marginTop: 16,
    width: "100%",
    borderStyle: "solid",
  },
  theBioText: {
    width: 260,
    fontSize: FontSize.size_sm,
  },
  bioParent: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editMyProfile: {
    backgroundColor: Color.colorGray_200,
    height: 844,
    overflow: "hidden",
    width: "100%",
    flex: 1,
  },
});

export default EditProfile;
