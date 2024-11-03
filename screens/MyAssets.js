import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable, StatusBar, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Padding, FontSize, Color, FontFamily, Border, getFontFamily } from "../GlobalStyles";
import PostList from "../components/PostList";
import { SafeAreaView } from "react-native-safe-area-context";
import TokenList from "../components/TokenList";
import NFTList from "../components/NFTList";
import { useAuth } from "../components/AuthProvider";
import React, { useEffect, useState } from "react";
import { shortenAddress } from "../Utils";
import { LinearGradient } from "expo-linear-gradient";
import * as Clipboard from 'expo-clipboard';
import WalletComponent from "../components/WalletComponent";
import Header from "../components/Header";

const MyAssets = () => {
  const route = useRoute();
  const { tab } = route.params;

  const navigation = useNavigation();
  const [isTokenList, setIsTokenList] = useState(true)
  const { getUser } = useAuth();
  const [userData, setUserData] = useState();
  const [showAddressCopied, setShowAddressCopied] = useState(false);
  const [isShowSearch, setIsShowSearch] = useState(false);
  useEffect(() => {
    getUser().then((user) => {
      setUserData(user);
    });
  }, []);

  useEffect(() => {
    if (setShowAddressCopied) {
      const timer = setTimeout(() => {
        setShowAddressCopied(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAddressCopied]);

  const doCopyWallet = async () => {
    try {
      if (userData?.wallet_address) {
        await Clipboard.setStringAsync(userData?.wallet_address);
      }
      setShowAddressCopied(!showAddressCopied);
    } catch (error) {
      console.error("doCopyWallet", error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <Header
        tab={tab}
        userInfo={userData}
        isHideList={!isShowSearch}
        isShowSearch={isShowSearch}
        setIsShowSearch={setIsShowSearch}
      /> */}

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
            }>Assets</Text>
            
            <Pressable
            onPress={() => navigation.navigate(`QrCamera${tab}`, { tab })}>
            <Image
              source={require("../assets/qr.png")}
              style={styles.headerImage}
            />
          </Pressable>
      </View>   
      <StatusBar backgroundColor={Color.colorGray_100} barStyle="light-content" />
      <View style={{
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: Color.colorGray_100,
        // borderColor:"red",
        // borderWidth:2,
        padding: 15,
        gap: 15
      }}>

        {
          userData && userData?.owned_nfts[0]?.token_ids[0]?.image ?
            <Image
              style={styles.frameChild}
              contentFit="cover"
              source={userData?.owned_nfts[0]?.token_ids[0]?.image}
            />
            :
            <Image
              style={styles.frameChild}
              contentFit="cover"
              source={require("../assets/photo.png")}
            />
        }

        <View style={styles.frameWrapper}>
          <View style={styles.neonrabbit287Parent}>
            <Text style={[styles.neonrabbit287]}>
              {userData && userData?.owned_nfts[0]?.token_ids[0]?.name}
            </Text>
            <View style={styles.walletAddress0xedhvGroup}>
              <Text
                style={[
                  styles.walletAddress0xedhvContainer,
                  styles.bitcoinContainerTypo,
                ]}
              >
                <Text style={styles.walletBalance}>{`Wallet Address: `}</Text>
                <Text style={styles.walletAddress}>{userData && shortenAddress(userData?.wallet_address)}</Text>
              </Text>

              <TouchableOpacity
                onPress={() => {
                  doCopyWallet();
                }}>
                <Image
                  style={styles.copySvgrepoCom1Icon}
                  contentFit="cover"
                  source={require("../assets/copy.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View style={{ flexDirection: "row", backgroundColor: Color.colorGray_100 }}>
        <LinearGradient
          colors={['#FC00A7', '#65EDE3']}
          style={[styles.wrapperFlexBox]}
          start={{ x: 0, y: 0.5 }} // Left side
          end={{ x: 1, y: 0.5 }}   // Right side
        >
          <Pressable
            onPress={() => { setIsTokenList(true) }}
            style={[{
              width: "100%",
              height: "100%",
              marginBottom: isTokenList ? 3 : 0,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              color: Color.darkInk, backgroundColor: Color.colorGray_100
            }]}
          >

            <Text style={styles.token}>Token</Text>

          </Pressable>
        </LinearGradient>

        <LinearGradient
          colors={['#FC00A7', '#65EDE3']}
          style={[styles.wrapperFlexBox]}
          start={{ x: 0, y: 0.5 }} // Left side
          end={{ x: 1, y: 0.5 }}   // Right side
        >
          <Pressable
            onPress={() => { setIsTokenList(false) }}
            style={[{
              width: "100%",
              height: "100%",
              marginBottom: !isTokenList ? 3 : 0,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              color: Color.darkInk, backgroundColor: Color.colorGray_100
            }]}
          >
            <Text style={styles.token}>NFT</Text>
          </Pressable>
        </LinearGradient>
      </View>

      {isTokenList && userData && <TokenList itemsData={userData.owned_tokens} />}
      {!isTokenList && userData && <NFTList tab={tab} itemsData={userData.owned_nfts} />}

      <View style={[styles.alert, !showAddressCopied && { display: "none" }]}>
        <Image
          style={styles.checkSvgrepoCom1Icon}
          contentFit="cover"
          source={require("../assets/ic_check.png")}
        />
        <Text style={styles.walletAddressCopied}>
          Wallet address copied to clipboard
        </Text>
      </View>

      <View style={{position:"absolute", bottom:0, width:"100%"}}>
        <WalletComponent tab={tab} />
      </View>
    </SafeAreaView>
  )
};


// const styles = StyleSheet.create({
//   container:{
//     // backgroundColor: Color.colorGray_100,
//     backgroundColor: Color.colorBlack,
//     width:"100%",
//     height:"100%",
//     flex:1
//   },
//   header: {
//     // marginTop: 60,
//     width: "100%",
//     // flex:1,
//     flexDirection: 'row',
//     // alignSelf:"flex-",
//     padding: 14,
//     backgroundColor: Color.colorGray_100,
//   },
//   headerImage: {
//     width: 30,
//     height: 30,
//   },
//   frameChildPosition: {
//     backgroundColor: Color.colorGray_100,
//     top: 0,
//     width: 390,
//     left: 0,
//     position: "absolute",
//   },
//   iconLayout1: {
//     maxHeight: "100%",
//     maxWidth: "100%",
//     position: "absolute",
//     overflow: "hidden",
//   },
//   save1Typo: {
//     textAlign: "center",
//     color: Color.colorCornflowerblue_100,
//     fontFamily: FontFamily.clashGrotesk,
//     fontWeight: "500",
//   },
//   statusBarIphoneFlexBox: {
//     justifyContent: "space-between",
//     alignItems: "center",
//     flexDirection: "row",
//   },
//   timeTypo: {
//     color: Color.darkInk,
//     fontWeight: "600",
//     textAlign: "center",
//     fontFamily: FontFamily.clashGrotesk,
//   },
//   borderPosition: {
//     bottom: "0%",
//     height: "100%",
//     top: "0%",
//     position: "absolute",
//   },
//   wrapperLayout: {
//     width: 24,
//     height: 24,
//   },
//   iconLayout: {
//     height: "100%",
//     width: "100%",
//   },
//   theBioTextTypo: {
//     textAlign: "left",
//     color: Color.darkInk,
//     fontFamily: FontFamily.clashGrotesk,
//   },
//   groupLayout: {
//     height: 30,
//     width: 56,
//   },
//   frameChild: {
//     height: 294,
//   },
//   vectorIcon: {
//     top: 189,
//     left: -64,
//     width: 292,
//     height: 105,
//     display: "none",
//     position: "absolute",
//   },
//   vectorIcon1: {
//     height: "25.51%",
//     width: "82.56%",
//     right: "-10.51%",
//     bottom: "74.49%",
//     left: "27.95%",
//     top: "0%",
//     maxWidth: "100%",
//     display: "none",
//   },
//   editPicture: {
//     fontSize: FontSize.size_sm,
//   },
//   rectangleParent: {
//     // top: 101,
//     // height: 147,
//     // width: 390,
//     // left: 0,
//     // position: "absolute",
//     // overflow: "hidden",
//   },
//   editMyProfileChild: {
//     // borderColor:"red",
//     // borderWidth:2,
//     width: 90,
//     height: 90,
//   },
//   time: {
//     marginTop: -10.5,
//     top: "50%",
//     fontSize: FontSize.size_mid,
//     letterSpacing: 0,
//     lineHeight: 22,
//     width: 54,
//     left: 0,
//     position: "absolute",
//   },
//   timeIphone: {
//     zIndex: 0,
//     height: 21,
//     width: 54,
//   },
//   border: {
//     width: "91.58%",
//     right: "8.42%",
//     left: "0%",
//     borderRadius: Border.br_9xs_5,
//     borderColor: Color.darkInk,
//     borderWidth: 1,
//     opacity: 0.35,
//     borderStyle: "solid",
//   },
//   capIcon: {
//     height: "30.77%",
//     width: "4.76%",
//     top: "36.15%",
//     right: "0%",
//     bottom: "33.08%",
//     left: "95.24%",
//   },
//   capacity: {
//     height: "69.23%",
//     width: "76.92%",
//     top: "15.38%",
//     right: "15.75%",
//     bottom: "15.38%",
//     left: "7.33%",
//     borderRadius: 1,
//     backgroundColor: Color.darkInk,
//     position: "absolute",
//   },
//   battery: {
//     width: "34.87%",
//     right: "0.13%",
//     left: "65.01%",
//   },
//   wifiIcon: {
//     width: 17,
//     height: 12,
//   },
//   cellularConnectionIcon: {
//     width: 19,
//     height: 12,
//   },
//   cellularwifibatteryIphone: {
//     width: 78,
//     height: 13,
//     zIndex: 1,
//   },
//   notchIcon: {
//     marginLeft: -76.7,
//     width: 153,
//     height: 32,
//     zIndex: 2,
//     top: 0,
//   },
//   statusBarIphone: {
//     paddingHorizontal: Padding.p_3xl,
//     paddingTop: Padding.p_sm,
//     paddingBottom: Padding.p_xs,
//     backgroundColor: Color.colorGray_100,
//     top: 0,
//     width: 390,
//     left: 0,
//     position: "absolute",
//   },
//   vuesaxoutlinearrowLeftWrapper: {
//     width: 37,
//     flexDirection: "row",
//     top: 0,
//     left: 0,
//     position: "absolute",
//   },
//   topNavInner: {
//     height: 24,
//     width: 37,
//   },
//   icon1: {
//     display: "none",
//   },
//   wrapper: {
//     marginLeft: 14,
//   },
//   editProfile: {
//     fontSize: FontSize.labelLarge_size,
//     // marginLeft: 14,
//     // flex: 1,
//     flexGrow:1, color:"white", 
//     textAlign:"center", 
//     paddingTop:3, 
//     alignItems:"center",
//     color: Color.darkInk,
//     fontWeight: "600",
//   },
//   save1: {
//     fontSize: FontSize.labelLarge_size,
//   },
//   save: {
//     marginLeft: 14,
//   },
//   vectorIcon2: {
//     width: 21,
//     marginLeft: 14,
//     height: 21,
//     display: "none",
//   },
//   vuesaxboldmoreIcon: {
//     marginLeft: 14,
//     display: "none",
//   },
//   topNav: {
//     marginLeft: -195,
//     top: 47,
//     height: 54,
//     paddingHorizontal: Padding.p_sm,
//     paddingVertical: Padding.p_3xs,
//     alignItems: "center",
//     flexDirection: "row",
//     left: "50%",
//     backgroundColor: Color.colorGray_100,
//     width: 390,
//     position: "absolute",
//   },
//   showMyWallet: {
//     fontSize: FontSize.labelLarge_size,
//     fontWeight: "500",
//     textAlign: "left",
//   },
//   groupChild: {
//     borderRadius: 70,
//     backgroundColor: "#3b4b5b",
//     top: 0,
//     left: 0,
//     position: "absolute",
//   },
//   groupItem: {
//     top: 3,
//     left: 4,
//     position: "absolute",
//   },
//   showMyWalletAddressParent: {
//     width: "100%",
//   },
//   frameItem: {
//     borderColor: Color.colorDarkslategray_400,
//     borderTopWidth: 1,
//     height: 1,
//     marginTop: 16,
//     width: "100%",
//     borderStyle: "solid",
//   },
//   theBioText: {
//     width: 260,
//     fontSize: FontSize.size_sm,
//   },
//   bioParent: {
//     marginTop: 16,
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   editMyProfile: {
//     backgroundColor: Color.colorGray_200,
//     height: 844,
//     overflow: "hidden",
//     width: "100%",
//     flex: 1,
//   },
// });


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
    // justifyContent: 'center',
    // alignItems: "center",
    backgroundColor: Color.colorGray_100,
  },
  assetContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: Color.colorGray_200,
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
  topNavPosition: {
    paddingHorizontal: Padding.p_sm,
    left: "50%",
    marginLeft: -195,
    position: "absolute",
  },
  topNavFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  bitcoinContainerTypo: {
    fontSize: FontSize.labelLarge_size,
    color: Color.darkInk,
  },
  wrapperSpaceBlock: {
    paddingVertical: Padding.p_9xs,
    justifyContent: "center",
  },
  navBg: {
    backgroundColor: Color.colorGray_100,
    width: 390,
  },
  timePosition: {
    left: 0,
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
  ethTypo: {
    fontWeight: "600",
    fontFamily: FontFamily.clashGrotesk,
  },
  bottomNavFlexBox: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  borderPosition: {
    bottom: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
  },
  // notchIconPosition: {
  //   left: "50%",
  //   position: "absolute",
  // },
  frameViewPosition: {
    width: 362,
    left: 14,
    position: "absolute",
  },
  wrapperFlexBox: {
    // paddingVertical: Padding.p_7xs,
    // paddingHorizontal: Padding.p_xs,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 30,
    flex: 1,
  },
  textSpaceBlock: {
    marginLeft: 12,
    flex: 1,
  },
  ellipseFlexBox: {
    paddingVertical: Padding.p_xs,
    paddingHorizontal: Padding.p_xl,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  svgrepoParentLayout: {
    opacity: 0.28,
    width: 48,
    alignItems: "center",
  },
  homeTypo: {
    marginTop: 2,
    fontSize: FontSize.size_5xs,
    fontFamily: FontFamily.clashGrotesk,
    color: Color.darkInk,
  },
  walletBalance: {
    fontSize: FontSize.labelLarge_size,
    fontFamily: getFontFamily("400"),
    fontWeight: "400"
  },
  walletAddress: {
    fontSize: FontSize.labelLarge_size,
    fontFamily: getFontFamily("600"),
    fontWeight: "600"
  },

  walletBalance01Container: {
    textAlign: "left",
    color: Color.darkInk,
    alignSelf: "stretch",
  },
  walletAddress0xedhvContainer: {
    textAlign: "left",
    color: Color.darkInk,
  },
  copySvgrepoCom1Icon: {
    width: 18,
    height: 18,
    marginLeft: 4,
    overflow: "hidden",
  },
  walletAddress0xedhvParent: {
    marginTop: 12,
    flexDirection: "row",
  },
  walletBalance01EthParent: {
    justifyContent: "center",
    flex: 1,
  },
  transfer: {
    fontWeight: "500",
    fontFamily: FontFamily.clashGrotesk,
    textAlign: "left",
    color: Color.darkInk,
  },
  transferWrapper: {
    paddingHorizontal: Padding.p_base,
    borderRadius: Border.br_5xs,
    paddingVertical: Padding.p_9xs,
    borderWidth: 1,
    borderColor: Color.colorDeeppink,
    borderStyle: "solid",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  myAssetsWrapper: {
    marginTop: 10,
    display: "none",
    paddingHorizontal: Padding.p_base,
    borderRadius: Border.br_5xs,
    paddingVertical: Padding.p_9xs,
    borderWidth: 1,
    borderColor: Color.colorDeeppink,
    borderStyle: "solid",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  frameGroup: {
    marginLeft: 20,
    justifyContent: "center",
  },
  frameParent: {
    alignSelf: "stretch",
  },
  assetsInner: {
    bottom: 90,
    borderTopLeftRadius: Border.br_5xs,
    borderTopRightRadius: Border.br_5xs,
    backgroundColor: Color.colorWhitesmoke_100,
    paddingVertical: Padding.p_xl,
    width: 390,
  },
  vuesaxoutlinearrowLeftWrapper: {
    top: 0,
    width: 32,
    flexDirection: "row",
  },
  topNavInner: {
    height: 24,
    width: 32,
  },
  icon1: {
    display: "none",
  },
  wrapper: {
    marginLeft: 14,
  },
  assets1: {
    textAlign: "center",
    marginLeft: 14,
    color: Color.darkInk,
    fontSize: FontSize.labelLarge_size,
    flex: 1,
  },
  vectorIcon: {
    width: 21,
    height: 21,
    marginLeft: 14,
    display: "none",
  },
  qrIcon: {
    height: 32,
    marginLeft: 14,
    width: 32,
  },
  vuesaxboldmoreIcon: {
    marginLeft: 14,
    display: "none",
  },
  topNav: {
    top: 47,
    height: 54,
    paddingVertical: Padding.p_3xs,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: Padding.p_sm,
    left: "50%",
    marginLeft: -195,
    position: "absolute",
  },
  assetsChild: {
    top: 101,
    height: 163,
    backgroundColor: Color.colorGray_100,
    width: 390,
  },
  time: {
    marginTop: -10.5,
    top: "50%",
    fontSize: FontSize.size_mid,
    letterSpacing: 0,
    lineHeight: 22,
    width: 54,
    textAlign: "center",
    fontWeight: "600",
    fontFamily: FontFamily.clashGrotesk,
    color: Color.darkInk,
  },
  timeIphone: {
    zIndex: 0,
    width: 54,
    height: 21,
  },
  border: {
    width: "91.58%",
    right: "8.42%",
    left: "0%",
    borderRadius: Border.br_9xs_5,
    borderColor: Color.darkInk,
    opacity: 0.35,
    borderWidth: 1,
    top: "0%",
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
    height: 32,
    top: 0,
  },
  statusBarIphone: {
    paddingHorizontal: Padding.p_3xl,
    paddingTop: Padding.p_sm,
    paddingBottom: Padding.p_xs,
    left: 0,
    position: "absolute",
    top: 0,
    backgroundColor: Color.colorGray_100,
    width: 390,
  },
  frameChild: {
    width: 90,
    height: 90,
    borderRadius: 50
  },
  neonrabbit287: {
    fontWeight: "600",
    fontFamily: getFontFamily("600"),
    fontSize: FontSize.size_xl,
    textAlign: "left",
    color: Color.darkInk,
  },
  walletAddress0xedhvGroup: {
    flexDirection: "row",
  },
  neonrabbit287Parent: {
    justifyContent: "center",
  },
  frameWrapper: {
    width: 260,
    justifyContent: "center",
  },
  ellipseParent: {
    top: 115,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  token: {
    fontSize: FontSize.size_sm,
    fontWeight: "500",
    fontFamily: getFontFamily("500"),
    textAlign: "center",
    color: Color.darkInk,
  },
  tokenWrapper: {
    // borderBottomWidth: 2,
    // borderColor: Color.colorDeeppink,
    // borderStyle: "solid",
    // paddingHorizontal: Padding.p_xs,
  },
  frameContainer: {
    flexDirection: "row",
    width: 390,
    // marginLeft: -195,
    // left: "50%",
  },
  frameItem: {
    height: 32,
    width: 32,
  },
  bitcoin: {
    fontWeight: "500",
    fontFamily: FontFamily.clashGrotesk,
    textAlign: "left",
    color: Color.darkInk,
    alignSelf: "stretch",
  },
  bitcoin1: {
    opacity: 0.7,
    fontFamily: FontFamily.clashGrotesk,
    textAlign: "left",
    color: Color.darkInk,
    alignSelf: "stretch",
  },
  bitcoinParent: {
    justifyContent: "center",
  },
  text: {
    textAlign: "right",
    fontWeight: "500",
    fontFamily: FontFamily.clashGrotesk,
    color: Color.darkInk,
    fontSize: FontSize.labelLarge_size,
  },
  ellipseParent1: {
    overflow: "hidden",
  },
  frameView: {
    top: 284,
  },
  home1SvgrepoComIcon: {
    height: 32,
    width: 32,
    overflow: "hidden",
  },
  home: {
    textAlign: "left",
  },
  home1SvgrepoComParent: {
    borderRadius: Border.br_xs,
    paddingHorizontal: Padding.p_3xs,
    paddingVertical: Padding.p_9xs,
    justifyContent: "center",
  },
  notification: {
    textAlign: "center",
  },
  wallet: {
    textAlign: "center",
    fontWeight: "500",
  },
  walletSvgrepoCom1Parent: {
    width: 48,
    alignItems: "center",
  },
  bottomNav: {
    bottom: 0,
    shadowColor: "rgba(0, 0, 0, 0.02)",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    paddingHorizontal: Padding.p_17xl,
    paddingTop: Padding.p_xs,
    paddingBottom: Padding.p_7xl,
    backgroundColor: Color.colorGray_100,
    width: 390,
    left: "50%",
    position: "absolute",
    marginLeft: -195,
  },
  assets: {
    backgroundColor: Color.colorGray_200,
    height: 844,
    overflow: "hidden",
    width: "100%",
    flex: 1,
  },

  alert: {
    bottom: 40,
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorAquamarine,
    width: 354,
    padding: Padding.p_xs,
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
  },
  checkSvgrepoCom1Icon: {
    width: 16,
    height: 16,
    overflow: "hidden",
  },
  walletAddressCopied: {
    fontSize: FontSize.size_sm,
    color: Color.colorSeagreen,
    marginLeft: 8,
    textAlign: "left",
    flex: 1,
    fontFamily: getFontFamily("500"),
    fontWeight: "500",
  },
});
export default MyAssets;
