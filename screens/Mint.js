import * as React from "react";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import * as Clipboard from 'expo-clipboard';
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Pressable, Alert, TouchableOpacity, Share, ActivityIndicator, TouchableWithoutFeedback } from "react-native";
import { Component_Max_Width } from "../Constant";
import { logout, shortenAddress } from "../Utils";
import { useAuth } from "../components/AuthProvider";
import DownloadHelper from "../utils/DownloadHelper";
import { Color, FontSize, Border, FontFamily, Padding } from "../GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "react-native";

const Mint = () => {
  const { api, getUser } = useAuth();
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState();
  const [totalNft, setTotalNft] = useState(1);
  const [nftInfo, setnftInfo] = useState();
  const [nft, setNft] = useState();
  const [downloading, setDownloading] = useState(false);
  const [showReceive, setShowReceive] = useState(false);
  const [showAddressCopied, setShowAddressCopied] = useState(false);
  const [showSuccessMint, setShowSuccessMint] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hash, setHash] = useState();

  useEffect(() => {
    getUser().then((data) => {
      console.log(data)
      setUserInfo(data);
      if (data?.owned_nfts?.length > 0) {
        let ownedNft = data?.owned_nfts[0];
        if (ownedNft?.token_ids?.length > 0) {
          setNft(ownedNft.token_ids[0]);
        }
      }
    });

    getNftCurrentMintInfo();
  }, []);

  useEffect(() => {
    if (setShowAddressCopied) {
      const timer = setTimeout(() => {
        setShowAddressCopied(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAddressCopied]);

  const getNftCurrentMintInfo = async () => {
    try {
      let url = `/nft/currentMintInfo`;
      let resp = await api.get(url);
      let data = resp.data;
      setnftInfo(data);
    } catch (error) {
      if (error.isSessionExpired) {
        await logout(navigation);
      } else {
        console.error("getNftCurrentMintInfo-error", error)
      }
    }
  }

  useEffect(() => {
    const checkMintStatus = async () => {
      try {
          let checkUrl = `/nft/mintStatus?op_hash=${hash}`
          let checkStatus = await api.get(checkUrl);
          let response = checkStatus.data;
          if(response?.status == "SUCCESS"){            
            getUser().then((data) => {
              setUserInfo(data);
              if (data?.owned_nfts?.length > 0) {
                let ownedNft = data?.owned_nfts[0];
                if (ownedNft?.token_ids?.length > 0) {
                  setNft(ownedNft.token_ids[0]);
                  setShowSuccessMint(!showSuccessMint);
                  setIsLoading(false);
                }
              }
            });
          }
          else{
            await new Promise((resolve) => setTimeout(resolve, 3000));
            await checkMintStatus();
          }
      } catch (error) {
        setIsLoading(false);
        console.error('Error fetching mint status:', error);
        // Anda bisa menangani error di sini, misalnya dengan menunjukkan pesan error ke pengguna
      }
    };

    if(hash){
      checkMintStatus();
    }
  }, [hash]);

  const doMint = async () => {
    try {
      // setShowSuccessMint(!showSuccessMint);
      // return;

      if (!nftInfo) {
        Alert.alert(
          'Mint Failed',
          'NFT Info not found',
          [{
            text: 'OK', onPress: () => {
              getNftCurrentMintInfo();
            }
          }]
        );
        return;
      }
      // let url = `/user/mintNft`;
      // let body = {
      //   "nft_address": nftInfo.nft_address,
      //   "quantity": totalNft,
      //   "eth_value": "0"
      // };
      // let resp = await api.post(url, body);
      // let data = resp.data;
      // setShowSuccessMint(!showSuccessMint);
      let url = `/user/mintNft`;
      let body = {
        "nft_address": nftInfo.nft_address,
        "quantity": totalNft,
        "eth_value": "0"
      };
      let resp = await api.post(url, body);
      let data = resp.data;
      let hash = data.transaction_hash;
      setHash(hash);
      setIsLoading(true);
    } catch (error) {
      if (error.isSessionExpired) {
        await logout(navigation);
      } else {
        console.error("postUserMintNft-error", error)
      }
    }
  }

  const doTotalNftMin = () => {
    if (totalNft == 0) return;
    let t = totalNft - 1;
    setTotalNft(t);
  }

  const doTotalNftAdd = () => {
    if (totalNft == 2) return;
    let t = totalNft + 1;
    setTotalNft(t);
  }

  const doDownloadImage = async () => {
    try {
      setDownloading(true);
      if (nft?.image) {
        await DownloadHelper(nft?.image);
      }
      else {
        Alert.alert('Warning', "Image NFT not found");
      }
    } catch (error) {
      console.error("doDownloadImage", error);
    } finally {
      setDownloading(false);
    }
  }

  const doCopyWallet = async () => {
    try {
      if (userInfo?.wallet_address) {
        await Clipboard.setStringAsync(userInfo?.wallet_address);
      }
      setShowAddressCopied(!showAddressCopied);
    } catch (error) {
      console.error("doCopyWallet", error);
    }
  }

  const doShareOnX = async () => {
    try {
      let content = {
        message: 'I minted a Neonrabbit! Neonrabbits are always on adventures at Neonspace. Check it out!',
      };
      if (nft?.image) {
        content['url'] = nft?.image;
      }
      console.log("doShareOnX-content", content);

      const result = await Share.share(content, {
        // Optional: only display Twitter as an option
        excludedActivityTypes: [
          'com.apple.UIKit.activity.PostToFacebook',
          'com.apple.UIKit.activity.PostToWeibo',
          'com.apple.UIKit.activity.Message',
          'com.apple.UIKit.activity.Mail',
          'com.apple.UIKit.activity.Print',
          'com.apple.UIKit.activity.CopyToPasteboard',
          'com.apple.UIKit.activity.AssignToContact',
          'com.apple.UIKit.activity.SaveToCameraRoll',
          'com.apple.UIKit.activity.AddToReadingList',
          'com.apple.UIKit.activity.PostToFlickr',
          'com.apple.UIKit.activity.PostToVimeo',
          'com.apple.UIKit.activity.PostToTencentWeibo',
          'com.apple.UIKit.activity.AirDrop',
        ]
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.log("share", result.activityType)
        } else {
          // shared
          console.log("share")
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log("dismissed")
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  }

  const LoadingScreen = () => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff0099" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  };

  const handleOutsidePress = () => {
    console.log("outside press")
    if(showSuccessMint){
      if (userInfo?.owned_nfts?.length == 0) {
        //navigation.navigate("Mint");
        setShowSuccessMint(!showSuccessMint);
      }
      else {
        navigation.replace("Main");
      }
    }
  };

  const handleInsideSuccessMint = () => {
    console.log("inside success mint")
  }

  if(isLoading){
    return <LoadingScreen/>
  }

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
    <View style={styles.container}>
    
      <StatusBar backgroundColor={Color.colorGray_100} barStyle="light-content" />
        <Image
          style={styles.imgBackground}
          contentFit="cover"
          source={require("../assets/group-865.png")}
        />
        <Text style={[styles.txtTitle, styles.txtStyle]}>
          Neonrabbits NFT
        </Text>
        <Text style={[styles.txtTitle2, styles.txtStyle]}>
          {Number(nftInfo?.mint_price).toFixed(2)} ETH
        </Text>
        <Image
          style={styles.imgNft}
          contentFit="cover"
          source={require("../assets/ic_nft_default.png")}
        />
        <View style={styles.frameGroup}>
          <Pressable onPress={doTotalNftMin}>
            <View style={[styles.wrapper, styles.wrapperFlexBox]}>
              <Text style={[totalNft == 0 ? styles.text : styles.text1, styles.textTypo]}>-</Text>
            </View>
          </Pressable>
          <View style={[styles.container2, styles.wrapperFlexBox]}>
            <Text style={[styles.text1, styles.textTypo]}>{totalNft}</Text>
          </View>
          <Pressable onPress={doTotalNftAdd}>
            <View style={[styles.wrapper, styles.wrapperFlexBox]}>
              <Text style={[totalNft == 2 ? styles.text : styles.text1, styles.textTypo]}>+</Text>
            </View>
          </Pressable>
        </View>
        {totalNft == 2 ? (
          <Text style={[styles.theMaximumNumber, styles.textTypo]}>
            The maximum number of mints is 2.
          </Text>
        ) : ""}

        {/* Section Wallet Info */}
        <View style={[styles.frameParentWallet]}>
          <View style={styles.walletBalance0EthWalletAParent}>
            <View style={styles.walletBalance0Container}>
              <View style={styles.row}>
                <Text style={[styles.walletBalance, styles.walletTypo]}>Wallet Balance: </Text>
                <Text style={[styles.eth1Typo, styles.walletTypo]}>{userInfo?.wallet_balance ? Number(userInfo.wallet_balance).toFixed(2) : '0.00'} ETH</Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.walletBalance, styles.walletTypo]}>Wallet Address: </Text>
                <Text style={[styles.eth1Typo, styles.walletTypo]}>{userInfo?.wallet_address ? shortenAddress(userInfo?.wallet_address) : " 0x00"}</Text>
              </View>
            </View>

            {/* <LinearGradient
              colors={['#FC00A7', '#65EDE3']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientBorder}
            >
            <View style={styles.buttonInner}> */}
              <Pressable
                style={[styles.topUpWalletWrapper, styles.buttonBorder]}
                onPress={() => setShowReceive(!showReceive)}
              >
                <Text style={[styles.topUpWallet, styles.walletTypo]}>
                  Top up wallet
                </Text>
              </Pressable>
              {/* </View>
            </LinearGradient> */}
          </View>

          <LinearGradient
            colors={['#FC00A7', '#65EDE3']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBorder}
          >
          <View style={styles.buttonInner}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => doMint()}
            >
            <Text style={[styles.buttonLabel, styles.eth1Typo]}>
              Mint Neonrabbits
            </Text>
          </TouchableOpacity>
          </View>
        </LinearGradient>
        </View>

        {/* View Receive/Top Up Wallet */}
        <View style={[styles.frameParent, !showReceive && { display: "none" }]}>
          <Pressable
            style={[styles.svgrepoLayout]}
            onPress={() => setShowReceive(!showReceive)}
          >
            <Image
              style={[styles.icon1, styles.iconLayout]}
              contentFit="cover"
              source={require("../assets/ic_close_white.png")}
            />
          </Pressable>
          <View style={styles.deposit002EthParent}>
            <Text style={[styles.deposit002Eth, styles.deposit002EthTypo]}>
              Deposit 0.02 ETH
            </Text>
            <Text style={styles.mintANeonrabbitTypo}>Ethereum network</Text>
          </View>
          <View style={styles.screenshot20231216At421Parent}>
            <Image
              style={styles.screenshot20231216At421}
              contentFit="cover"
              source={require("../assets/ic_barcode.png")}
            />
            <View style={styles.xedhvParent}>
              <Text style={styles.xedhv}>{userInfo?.wallet_address ? shortenAddress(userInfo?.wallet_address) : " 0x00"}</Text>
              <Pressable onPress={doCopyWallet}>
                <Image
                  style={styles.copySvgrepoCom1Icon}
                  contentFit="cover"
                  source={require("../assets/ic_copy.png")}
                />
              </Pressable>
            </View>
          </View>
        </View>

        {/* View Pop Up Copy Address */}
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

        {/* View Success Mint */}
        <TouchableWithoutFeedback onPress={handleInsideSuccessMint}>
          <View style={[styles.postModal, !showSuccessMint && { display: "none" }]}>
            {nft?.image ? (
              <Image
                style={styles.mintItemLayout}
                contentFit="cover"
                source={nft?.image}
              />
            ) : (
              <Image
                style={styles.mintItemLayout}
                contentFit="cover"
                source={require("../assets/ic_nft_default.png")}
              />
            )}
            <View style={styles.buttonParentSpaceBlock}>
              <Text style={[styles.congratulations, styles.eth1Typo]}>
                Congratulations!
              </Text>
              <Text style={[styles.youAre287, styles.youAre287Typo]}>
                You are #{nft?.token_id} Neonrabbit
              </Text>
            </View>
            <View style={[styles.buttonParent, styles.buttonParentSpaceBlock]}>
              <TouchableOpacity
                style={[styles.button1, styles.buttonBorder2]}
                // onPress={() => navigation.replace("Main")}
                onPress={doShareOnX}
              >
                <Text style={[styles.buttonLabel, styles.eth1Typo]}>
                  Share on X
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button2, styles.buttonBorder2]}
                // onPress={() => setShowSuccessMint(!showSuccessMint)}
                disabled={downloading}
                onPress={doDownloadImage}
              >
                <Text style={[styles.buttonLabel, styles.eth1Typo]}>
                  {downloading ? "Download ..." : "Download Original Image"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
    </View>
    </TouchableWithoutFeedback>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c1c',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#FFFFFF',
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
  txtTitle2: {
    top: 178,
    fontWeight: "700",
    width: 272,
    fontSize: FontSize.size_9xl,
    position: "absolute",
  },
  imgNft: {
    marginTop: -168,
    top: "50%",
    height: 272,
    borderRadius: Border.br_5xs,
    width: 272,
    position: "absolute",
  },
  frameGroup: {
    top: 480,
    flexDirection: "row",
    borderRadius: Border.br_5xs,
    position: "absolute",
    overflow: "hidden",
  },
  wrapper: {
    paddingHorizontal: Padding.p_base,
    backgroundColor: Color.colorGray_100,
  },
  wrapperFlexBox: {
    paddingVertical: Padding.p_3xs,
    justifyContent: "center",
    alignItems: "center",
  },
  container2: {
    backgroundColor: Color.colorGray_200,
    width: 90,
    paddingHorizontal: Padding.p_21xl,
  },
  text: {
    opacity: 0.32,
    fontSize: FontSize.labelLarge_size,
  },
  text1: {
    fontSize: FontSize.labelLarge_size,
  },
  textTypo: {
    lineHeight: 16,
    textAlign: "center",
    color: Color.darkInk,
    fontFamily: FontFamily.clashGrotesk,
    fontWeight: "500",
  },
  theMaximumNumber: {
    top: 520,
    fontSize: FontSize.size_xs,
    // display: "none",
    width: 264,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  frameParentWallet: {
    bottom: 0,
    borderTopLeftRadius: Border.br_5xs,
    borderTopRightRadius: Border.br_5xs,
    backgroundColor: Color.colorWhitesmoke_100,
    paddingHorizontal: Padding.p_sm,
    paddingTop: Padding.p_xl,
    paddingBottom: Padding.p_13xl,
    width: "100%",
    position: "absolute",
    alignItems: "center"
  },
  walletBalance0EthWalletAParent: {
    alignSelf: "stretch",
    alignItems: "center",
    flexDirection: "row",
  },
  walletBalance0Container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  walletTypo: {
    textAlign: 'left',
    fontSize: FontSize.size_sm,
    color: Color.darkInk,
  },
  walletBalance: {
    fontFamily: FontFamily.clashGrotesk,
  },
  eth1Typo: {
    fontWeight: '600',
    fontFamily: FontFamily.clashGrotesk,
  },
  buttonBorder: {
    borderColor: Color.colorDeeppink,
    borderStyle: "solid",
    flexDirection: "row",
    borderRadius: Border.br_5xs,
  },
  topUpWalletWrapper: {
    borderWidth: 1,
    alignItems: "flex-end",
    paddingVertical: Padding.p_5xs,
    marginLeft: 20,
    paddingHorizontal: Padding.p_base,
  },
  topUpWallet: {
    fontFamily: FontFamily.clashGrotesk,
    fontWeight: "500",
  },
  buttonInner: {
    // width: 100,
    // marginTop: -111,
    // top: "50%",
    // width:"100%",
    // backgroundColor: '#1c1c1c', // Warna background tombol
    // borderRadius: 10,
    // borderColor:"red",
    // borderWidth:2
  },
  gradientBorder: {
    // borderColor:'red',
    // borderWidth:5,
    padding: 2, // Lebar border gradien
    borderRadius: 10,
    width:"100%",
    marginTop:24
  },
  button: {
    // borderWidth: 3,
    // width: "95%",
    // maxWidth: Component_Max_Width,
    // height: 54,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_xs,
    borderRadius:10,
    // marginTop: 24,
    // borderColor: Color.colorDeeppink,
    // borderStyle: "solid",
    flexDirection: "row",
    // borderRadius: Border.br_5xs,
    backgroundColor: Color.colorGray_100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLabel: {
    lineHeight: 24,
    fontSize: FontSize.labelLarge_size,
    textAlign: "center",
    color: Color.darkInk,
  },
  frameParent: {
    bottom: 0,
    borderTopLeftRadius: Border.br_5xs,
    borderTopRightRadius: Border.br_5xs,
    paddingHorizontal: Padding.p_sm,
    paddingTop: Padding.p_xl,
    paddingBottom: Padding.p_37xl,
    alignItems: "center",
    width: "100%",
    backgroundColor: Color.colorGray_100,
    position: "absolute",
  },
  frameTopUpShow: {
    display: "none"
  },
  deposit002EthParent: {
    alignItems: "center",
  },
  deposit002Eth: {
    fontSize: FontSize.size_xl,
    fontWeight: "600",
  },
  deposit002EthTypo: {
    width: 297,
    textAlign: "center",
    color: Color.darkInk,
    fontFamily: FontFamily.clashGrotesk,
  },
  mintANeonrabbitTypo: {
    width: 236,
    fontSize: FontSize.labelLarge_size,
    textAlign: "center",
    color: Color.darkInk,
    fontFamily: FontFamily.clashGrotesk,
  },
  screenshot20231216At421Parent: {
    marginTop: 12,
    alignItems: "center",
  },
  screenshot20231216At421: {
    width: 200,
    height: 200,
  },
  xedhvParent: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 4,
  },
  xedhv: {
    fontSize: FontSize.labelLarge_size,
    textAlign: "center",
    color: Color.darkInk,
    fontFamily: FontFamily.clashGrotesk,
    fontWeight: "500",
  },
  copySvgrepoCom1Icon: {
    width: 18,
    height: 18,
    marginLeft: 4,
    overflow: "hidden",
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
    fontFamily: FontFamily.clashGrotesk,
    fontWeight: "500",
  },
  postModal: {
    top: "50%",
    marginTop: -280,
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorDarkslategray_400,
    paddingHorizontal: Padding.p_xl,
    paddingVertical: 30,
    width: "90%",
    maxWidth: Component_Max_Width,
    alignItems: "center",
    overflow: "hidden",
    position: "absolute",
  },
  mintItemLayout: {
    height: 272,
    borderRadius: Border.br_5xs,
    width: 272,
  },
  buttonParentSpaceBlock: {
    marginTop: 24,
    alignItems: "center",
  },
  congratulations: {
    fontSize: FontSize.size_xl,
    width: 297,
    textAlign: "center",
    color: Color.darkInk,
  },
  youAre287: {
    width: 236,
    marginTop: 8,
    fontSize: FontSize.labelLarge_size,
    fontFamily: FontFamily.clashGrotesk,
  },
  youAre287Typo: {
    textAlign: "center",
    color: Color.darkInk,
    fontSize: FontSize.labelLarge_size,
  },
  buttonParent: {
    alignSelf: "stretch",
  },
  button1: {
    alignItems: "center",
    alignSelf: "stretch",
  },
  button2: {
    marginTop: 16,
    alignItems: "center",
    alignSelf: "stretch",
  },
  buttonBorder2: {
    paddingVertical: Padding.p_xs,
    paddingHorizontal: Padding.p_5xl,
    height: 54,
    borderWidth: 3,
    justifyContent: "center",
    borderColor: Color.colorDeeppink,
    borderStyle: "solid",
    flexDirection: "row",
    borderRadius: Border.br_5xs,
    backgroundColor: Color.colorGray_100,
  },
  svgrepoLayout: {
    width: 32,
    height: 32,
    position: "absolute",
    top: 10,
    right: 10
  },
  icon1: {
    overflow: "hidden",
  },
  iconLayout: {
    height: "100%",
    width: "100%",
  },
});

export default Mint;
