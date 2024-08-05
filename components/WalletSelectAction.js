import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import { Color, FontSize, Border, FontFamily, Padding } from "../GlobalStyles";

const WalletSelectAction = ({ showTransferAction, showReceive, setShowReceive, doSendNext, doSendBack }) => {
  return (
    <View style={[styles.frameParentTransferAction, styles.bottomNavPosition, , !showTransferAction && { display: "none" }]}>
      <Pressable
        style={[styles.svgrepoLayout]}
        onPress={doSendBack}
      >
        <Image
          style={[styles.icon1, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/ic_close_white.png")}
        />
      </Pressable>
      <View style={styles.selectActionWrapper}>
        <Text style={[styles.selectAction, styles.eth1Typo]}>
          Select action
        </Text>
      </View>
      <Pressable
        style={[styles.button2, styles.buttonLayout]}
        onPress={doSendNext}
      >
        <Image
          style={styles.home1SvgrepoComIcon}
          contentFit="cover"
          source={require("../assets/ic_send.png")}
        />
        <Text style={[styles.sendCrypto, styles.eth1Typo]}>
          Send crypto
        </Text>
      </Pressable>
      <Pressable
        style={[styles.button2, styles.buttonLayout]}
        onPress={() => {
          doSendBack();
          setShowReceive(!showReceive);
        }}
      >
        <Image
          style={styles.home1SvgrepoComIcon}
          contentFit="cover"
          source={require("../assets/ic_receive.png")}
        />
        <Text style={[styles.sendCrypto, styles.eth1Typo]}>
          Receive or deposit crypto
        </Text>
      </Pressable>
    </View>
  )
}

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
    top: 450,
    height: 160,
    width: "100%",
    alignItems: "center",
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
    fontWeight: "600",
    textAlign: "center",
    color: Color.darkInk,
    fontFamily: FontFamily.clashGrotesk,
    fontSize: FontSize.size_9xl,
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
    width: 390,
    position: "absolute",
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
    borderWidth: 3,
    borderColor: Color.colorDeeppink,
    borderStyle: "solid",
    flexDirection: "row",
    borderRadius: Border.br_5xs,
    justifyContent: "center",
    alignItems: "center",
  },
  btnMyAssets: {
    marginTop: 8
  },
  topUpWalletWrapper: {
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingVertical: Padding.p_9xs,
    marginLeft: 20,
    paddingHorizontal: Padding.p_base,
  },
  topUpWallet: {
    fontFamily: FontFamily.clashGrotesk,
    fontWeight: "500",
  },
  button: {
    borderWidth: 3,
    width: "87%",
    height: 54,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_xs,
    marginTop: 32,
    borderColor: Color.colorDeeppink,
    borderStyle: "solid",
    flexDirection: "row",
    borderRadius: Border.br_5xs,
    backgroundColor: Color.colorGray_100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDownload: {
    borderWidth: 3,
    width: "87%",
    height: 54,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_xs,
    marginTop: 12,
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
  frameParentReceive: {
    bottom: 0,
    borderTopLeftRadius: Border.br_5xs,
    borderTopRightRadius: Border.br_5xs,
    paddingHorizontal: Padding.p_sm,
    paddingTop: Padding.p_xl,
    paddingBottom: Padding.p_37xl,
    alignItems: "center",
    width: 390,
    backgroundColor: Color.colorGray_100,
    position: "absolute",
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
  frameContainer: {
    marginTop: -500,
    paddingTop: Padding.p_13xl,
    paddingBottom: Padding.p_101xl,
    paddingHorizontal: Padding.p_sm,
    width: 390,
    borderTopRightRadius: Border.br_5xs,
    borderTopLeftRadius: Border.br_5xs,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.colorGray_100,
    top: "50%",
    position: "absolute",
  },
  frameView: {
    zIndex: 0,
    alignSelf: "stretch",
    alignItems: "center",
  },
  baseNetwork: {
    fontSize: FontSize.size_5xl,
    textAlign: "center",
    color: Color.darkInk,
  },
  baseNetworkWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  ethTypo: {
    fontWeight: "600",
    fontFamily: FontFamily.clashGrotesk,
  },
  thisIsYour: {
    width: 260,
    marginTop: 10,
    textAlign: "center",
    fontFamily: FontFamily.clashGrotesk,
  },
  walletContainerTypo: {
    fontSize: FontSize.labelLarge_size,
    color: Color.darkInk,
  },
  containerBack: {
    left: "5.13%",
    top: "6.15%",
    right: "86.67%",
    bottom: "87.3%",
    width: "8.21%",
    height: "6.56%",
    zIndex: 1,
    position: "absolute",
  },
  containerBackSend: {
    left: "5.13%",
    top: "3.15%",
    right: "86.67%",
    bottom: "87.3%",
    width: "8.21%",
    height: "6.56%",
    zIndex: 1,
    position: "absolute",
  },
  icon2: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  walletContainerTypo: {
    fontSize: FontSize.labelLarge_size,
    color: Color.darkInk,
  },
  xedhv1: {
    textAlign: "center",
    fontFamily: FontFamily.clashGrotesk,
    fontWeight: "500",
  },
  frameParentTransferAction: {
    shadowColor: "rgba(0, 0, 0, 0.08)",
    shadowRadius: 24,
    elevation: 24,
    paddingTop: Padding.p_xl,
    paddingBottom: Padding.p_37xl,
    paddingHorizontal: Padding.p_sm,
    borderTopRightRadius: Border.br_5xs,
    borderTopLeftRadius: Border.br_5xs,
  },
  bottomNavPosition: {
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    bottom: 0,
    alignItems: "center",
    backgroundColor: Color.colorGray_100,
    position: "absolute",
    width: 390,
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
  selectActionWrapper: {
    alignItems: "center",
  },
  selectAction: {
    fontSize: FontSize.size_xl,
    width: 297,
    color: Color.darkInk,
    textAlign: "center",
  },
  button2: {
    backgroundColor: Color.colorDarkslategray_400,
    borderColor: Color.colorDarkslategray_400,
    marginTop: 16,
  },
  buttonSendConfirm: {
    marginTop: 50,
    alignSelf: "stretch",
    paddingVertical: Padding.p_xs,
  },
  buttonLayout: {
    paddingVertical: Padding.p_xs,
    paddingHorizontal: Padding.p_5xl,
    height: 54,
    width: 322,
    borderWidth: 3,
    alignItems: "center",
    flexDirection: "row",
    borderStyle: "solid",
    borderRadius: Border.br_5xs,
  },
  home1SvgrepoComIcon: {
    width: 32,
    height: 32,
    overflow: "hidden",
  },
  sendCrypto: {
    marginLeft: 10,
    lineHeight: 24,
    fontWeight: "600",
    fontSize: FontSize.labelLarge_size,
    textAlign: "center",
    color: Color.darkInk,
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
  frameParentSend: {
    shadowColor: "rgba(0, 0, 0, 0.08)",
    shadowRadius: 24,
    elevation: 24,
    paddingTop: Padding.p_xl,
    paddingBottom: Padding.p_37xl,
    paddingHorizontal: Padding.p_sm,
    borderTopRightRadius: Border.br_5xs,
    borderTopLeftRadius: Border.br_5xs,
  },
  sendCryptoParent: {
    alignItems: "center",
  },
  sendCryptoDetail: {
    fontSize: FontSize.size_xl,
    width: 297,
    textAlign: "center",
    color: Color.darkInk,
  },
  ethereumNetwork: {
    width: 236,
    fontSize: FontSize.labelLarge_size,
    textAlign: "center",
    fontFamily: FontFamily.clashGrotesk,
  },
  sendToClr: {
    color: Color.darkInk,
    fontSize: FontSize.labelLarge_size,
  },
  parentFlexBox: {
    alignSelf: "stretch",
    alignItems: "center",
    flexDirection: "row",
  },
  sendTo: {
    fontSize: FontSize.labelLarge_size,
    textAlign: "center",
    fontFamily: FontFamily.clashGrotesk,
  },
  inputEthereumWalletAddressWrapper: {
    borderRadius: Border.br_9xs,
    backgroundColor: Color.colorDarkslategray_400,
    paddingHorizontal: Padding.p_xs,
    paddingVertical: Padding.p_3xs,
    marginLeft: 12,
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  inputEthereumWallet: {
    color: Color.colorGray_500,
    textAlign: "left",
    flex: 1,
    fontSize: FontSize.labelLarge_size,
    fontFamily: FontFamily.clashGrotesk,
    fontWeight: "500",
  },
  baseNetworkParent: {
    alignItems: "center",
  },
  selectCryptocurrencyParent: {
    justifyContent: "center",
    alignItems: "center",
  },
  parentSpaceBlock1: {
    marginTop: 30,
    alignSelf: "stretch",
  },
  selectCryptocurrency: {
    width: 322,
    textAlign: "center",
  },
  ellipseParent: {
    borderTopLeftRadius: Border.br_9xs,
    borderTopRightRadius: Border.br_9xs,
    width: 240,
    backgroundColor: Color.colorDarkslategray_400,
    marginTop: 10,
    paddingVertical: Padding.p_xs,
    flexDirection: "row",
  },
  parentSpaceBlock: {
    paddingHorizontal: Padding.p_xl,
    alignItems: "center",
  },
  frameChild: {
    width: 20,
    height: 20,
  },
  eth1: {
    marginLeft: 8,
    textAlign: "left",
    flex: 1,
  },
  eth1Typo: {
    fontSize: FontSize.size_lg,
    color: Color.darkInk,
    fontFamily: FontFamily.clashGrotesk,
    fontWeight: "500",
  },
  frameItem: {
    width: 14,
    height: 7,
    marginLeft: 8,
  },
  frameParent1: {
    borderRadius: Border.br_3xs,
    paddingVertical: 0,
    marginTop: 30,
    alignSelf: "stretch",
    overflow: "hidden",
  },
  parent: {
    backgroundColor: Color.colorDimgray_100,
    paddingHorizontal: 0,
    paddingVertical: Padding.p_5xs,
    width: 240,
    justifyContent: "center",
    overflow: "hidden",
  },
  parentLayout: {
    borderRadius: Border.br_9xs,
    flexDirection: "row",
  },
  eth2: {
    opacity: 0.6,
    marginLeft: 10,
    textAlign: "center",
    color: Color.darkInk,
    fontFamily: FontFamily.clashGrotesk,
    fontWeight: "500",
    fontSize: FontSize.size_9xl,
  },
  eth2Confirm: {
    fontSize: FontSize.size_sm,
    fontWeight: "500",
  },
  sgd: {
    fontSize: FontSize.labelLarge_size,
    textAlign: "center",
    color: Color.darkInk,
    fontFamily: FontFamily.clashGrotesk,
    fontWeight: "500",
  },
  sgdSpaceBlock: {
    marginTop: 10,
    alignSelf: "stretch",
  },
  frameInner: {
    top: 31,
    left: 320,
    width: 22,
    zIndex: 1,
    height: 24,
    position: "absolute",
  },
  frameParent3: {
    zIndex: 2,
    alignSelf: "stretch",
    alignItems: "center",
  },
  sendToParent: {
    marginTop: 120,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
  },
  baseWalletAddressWrapper: {
    paddingHorizontal: Padding.p_xs,
    paddingVertical: Padding.p_smi,
    backgroundColor: Color.colorDarkslategray_400,
    marginTop: 10,
    alignSelf: "stretch",
  },
  ellipseParentBg: {
    backgroundColor: Color.colorDarkslategray_400,
    marginTop: 10,
  },
  baseWalletAddress: {
    color: Color.darkInk,
    textAlign: "left",
    flex: 1,
    fontSize: FontSize.labelLarge_size,
    fontFamily: FontFamily.clashGrotesk,
    fontWeight: "500",
  },

  // Send Confirm
  sendParent1: {
    alignSelf: "stretch",
    alignItems: "center",
  },
  send: {
    fontSize: FontSize.size_5xl,
    alignSelf: "stretch",
    textAlign: "center",
    color: Color.darkInk,
  },
  ethTypo1: {
    fontWeight: "600",
    fontFamily: FontFamily.clashGrotesk,
  },
  textConfirm: {
    fontWeight: "700",
    fontFamily: FontFamily.clashGrotesk,
  },
  youAreSendingContainer: {
    fontSize: FontSize.size_lg,
    width: 322,
    textAlign: "center",
    color: Color.darkInk,
  },
  youAreSending367WorthOfWrapper: {
    marginTop: 30,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
  },
  youAreSending: {
    fontFamily: FontFamily.clashGrotesk,
    fontWeight: "500",
  },
  x37e5385aba3592d75436127c7184d: {
    textAlign: "left",
    fontSize: FontSize.labelLarge_size,
    color: Color.darkInk,
    fontFamily: FontFamily.clashGrotesk,
    fontWeight: "500",
    flex: 1,
  },
  x37e5385aba3592d75436127c7184dWrapper: {
    backgroundColor: Color.colorDarkslategray_400,
    alignItems: "center",
    flexDirection: "row",
  },
  frameParent2SpaceBlock: {
    paddingVertical: Padding.p_smi,
    paddingHorizontal: Padding.p_xs,
    borderRadius: Border.br_9xs,
    alignSelf: "stretch",
  },
  frameParent2: {
    backgroundColor: Color.colorDimgray_100,
  },
  frameWrapper2: {
    marginTop: 30,
    width: 322,
  },
  frameParent3: {
    alignSelf: "stretch",
  },
  feeParentFlexBox: {
    paddingVertical: 0,
    paddingHorizontal: Padding.p_7xs,
    justifyContent: "space-between",
    alignSelf: "stretch",
    flexDirection: "row",
  },
  estimatedGasFee: {
    fontSize: FontSize.size_sm,
    fontWeight: "500",
  },
  totalTypo: {
    width: 160,
    textAlign: "left",
    color: Color.darkInk,
    fontFamily: FontFamily.clashGrotesk,
  },
  ethTypoConfirm: {
    width: 138,
    textAlign: "left",
    color: Color.darkInk,
    fontFamily: FontFamily.clashGrotesk,
  },
  textTypoConfirm: {
    opacity: 0.7,
    width: 138,
    textAlign: "left",
    color: Color.darkInk,
    fontFamily: FontFamily.clashGrotesk,
    fontWeight: "500",
  },
  text3: {
    fontSize: FontSize.size_sm,
  },
  maxFeeParent: {
    marginTop: 6,
  },
  feeParentFlexBox: {
    paddingVertical: 0,
    paddingHorizontal: Padding.p_7xs,
    justifyContent: "space-between",
    alignSelf: "stretch",
    flexDirection: "row",
  },
  estimatedGasFee: {
    fontSize: FontSize.size_sm,
    fontWeight: "500",
  },
  walletBalance01EthParent: {
    justifyContent: "center",
    flex: 1,
  },
  totalParent: {
    backgroundColor: "#5c5f73",
    padding: Padding.p_7xs,
    borderRadius: Border.br_9xs,
    justifyContent: "space-between",
    alignSelf: "stretch",
    flexDirection: "row",
  },
  frameParent4: {
    marginTop: 12,
    alignSelf: "stretch",
  },
  borderBorder: {
    borderColor: Color.darkInk,
    borderStyle: "solid",
  },
  buttonWrapper: {
    zIndex: 2,
    alignSelf: "stretch",
    alignItems: "center",
  },
  button2Confirm: {
    alignSelf: "stretch",
  },
  buttonBorderConfirm: {
    marginTop: 51,
    paddingVertical: Padding.p_xs,
    paddingHorizontal: Padding.p_5xl,
    borderWidth: 3,
    borderColor: Color.colorDeeppink,
    borderStyle: "solid",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 54,
    borderRadius: Border.br_5xs,
    backgroundColor: Color.colorGray_100,
  },
  // Send Confirm
});

export default WalletSelectAction;