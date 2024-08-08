import * as React from "react";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Color, FontSize, Border, FontFamily, Padding } from "../GlobalStyles";
import { Component_Max_Width } from "../Constant";

const Mint = () => {
  const navigation = useNavigation();
  const [totalNft, setTotalNft] = useState(1);
  const [showReceive, setShowReceive] = useState(false);
  const [showAddressCopied, setShowAddressCopied] = useState(false);
  const [showSuccessMint, setShowSuccessMint] = useState(false);

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

  useEffect(() => {
    if (setShowAddressCopied) {
      const timer = setTimeout(() => {
        setShowAddressCopied(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAddressCopied])

  return (
    <View style={styles.container}>
      <Image
        style={styles.imgBackground}
        contentFit="cover"
        source={require("../assets/group-865.png")}
      />
      <Text style={[styles.txtTitle, styles.txtStyle]}>
        Neonrabbits NFT
      </Text>
      <Text style={[styles.txtTitle2, styles.txtStyle]}>
        0.02 ETH
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
              <Text style={[styles.eth1Typo, styles.walletTypo]}>0.02 ETH</Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.walletBalance, styles.walletTypo]}>Wallet Address: </Text>
              <Text style={[styles.eth1Typo, styles.walletTypo]}>0xe...dhv</Text>
            </View>
          </View>
          <Pressable
            style={[styles.topUpWalletWrapper, styles.buttonBorder]}
            onPress={() => setShowReceive(!showReceive)}
          >
            <Text style={[styles.topUpWallet, styles.walletTypo]}>
              Top up wallet
            </Text>
          </Pressable>
        </View>
        <Pressable
          style={styles.button}
          onPress={() => setShowSuccessMint(!showSuccessMint)}
        >
          <Text style={[styles.buttonLabel, styles.eth1Typo]}>
            Mint Neonrabbits
          </Text>
        </Pressable>
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
            <Text style={styles.xedhv}>0xe...dhv</Text>
            <Pressable onPress={() => setShowAddressCopied(!showAddressCopied)}>
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
      <View style={[styles.postModal, !showSuccessMint && { display: "none" }]}>
        <Image
          style={styles.mintItemLayout}
          contentFit="cover"
          source={require("../assets/ic_nft_default.png")}
        />
        <View style={styles.buttonParentSpaceBlock}>
          <Text style={[styles.congratulations, styles.eth1Typo]}>
            Congratulations!
          </Text>
          <Text style={[styles.youAre287, styles.youAre287Typo]}>
            You are #287 Neonrabbit
          </Text>
        </View>
        <View style={[styles.buttonParent, styles.buttonParentSpaceBlock]}>
          <Pressable
            style={[styles.button1, styles.buttonBorder2]}
            onPress={() => navigation.navigate("Main")}
          >
            <Text style={[styles.buttonLabel, styles.eth1Typo]}>
              Share on X
            </Text>
          </Pressable>
          <Pressable
            style={[styles.button2, styles.buttonBorder2]}
            onPress={() => setShowSuccessMint(!showSuccessMint)}
          >
            <Text style={[styles.buttonLabel, styles.eth1Typo]}>
              Download Original Image
            </Text>
          </Pressable>
        </View>
      </View>
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
  txtTitle2: {
    top: 178,
    fontWeight: "700",
    width: 272,
    fontSize: FontSize.size_9xl,
    position: "absolute",
  },
  imgNft: {
    marginTop: -178,
    top: "50%",
    height: 272,
    borderRadius: Border.br_5xs,
    width: 272,
    position: "absolute",
  },
  frameGroup: {
    top: 540,
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
    top: 588,
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
    fontSize: FontSize.labelLarge_size,
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
  button: {
    borderWidth: 3,
    width: "95%",
    maxWidth: Component_Max_Width,
    height: 54,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_xs,
    marginTop: 24,
    borderColor: Color.colorDeeppink,
    borderStyle: "solid",
    flexDirection: "row",
    borderRadius: Border.br_5xs,
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
