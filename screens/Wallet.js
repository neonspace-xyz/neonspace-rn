import * as React from "react";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Pressable, TextInput, StatusBar } from "react-native";
import { Color, FontSize, Border, FontFamily, Padding, getFontFamily } from "../GlobalStyles";
import { Component_Max_Width } from "../Constant";
import { useAuth } from "../components/AuthProvider";
import WalletHeader from "../components/WalletHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import DropdownExample from "../components/DropdownExample";
import CustomDropdown from "../components/CustomDropdown";

const Wallet = ({ route }) => {
  const { tab } = route?.params;
  const navigation = useNavigation();
  const { getUser } = useAuth();

  const [showTransferAction, setShowTransferAction] = useState(false);
  const [showSend, setShowSend] = useState(false);
  const [showSendInput, setShowSendInput] = useState(false);
  const [showSendConfirm, setShowSendConfirm] = useState(false);
  const [showSendResult, setShowSendResult] = useState(false);
  const [inputSend, setInputSend] = useState('');
  const [showReceive, setShowReceive] = useState(false);
  const [showAddressCopied, setShowAddressCopied] = useState(false);
  const [showSuccessMint, setShowSuccessMint] = useState(false);
  const [userData, setUserData] = useState();


  useEffect(() => {
    getUser().then((user) => {
      setUserData(user);
    })
  }, [])

  useEffect(() => {
    if (setShowAddressCopied) {
      const timer = setTimeout(() => {
        setShowAddressCopied(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAddressCopied])

  const doSendNext = () => {
    if (!showSend) {
      setShowTransferAction(!showTransferAction);
      setShowSend(!showSend);
      setShowSendInput(!showSendInput);
    }
    else if (showSendInput) {
      setShowSendInput(!showSendInput);
      setShowSendConfirm(!showSendConfirm);
    }
    else if (showSendConfirm) {
      setShowSendConfirm(!showSendConfirm);
      setShowSendResult(!showSendResult);
    }
    else if (showSendResult) {
      setShowSendResult(!showSendResult);
      setShowSend(!showSend);
    }
  }

  const doSendBack = () => {
    if (showSendInput) {
      setShowSendInput(!showSendInput);
      setShowSend(!showSend);
      setShowTransferAction(true);
    }
    else if (showSendConfirm) {
      setShowSendInput(!showSendInput);
      setShowSendConfirm(!showSendConfirm);
    }
    else if (showSendResult) {
      setShowSend(!showSend);
      setShowSendResult(!showSendResult);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Color.colorGray_100} barStyle="light-content" />

      <WalletHeader
        tab={tab}
        isHideList={false}
        isShowSearch={false}
      />

      <View style={styles.container}>

        <Image
          style={styles.imgBackground}
          contentFit="cover"
          source={require("../assets/group-865.png")}
        />



      <Text style={[styles.txtTitle]}>
        {userData && userData?.owned_nfts[0]?.token_ids[0]?.name}
      </Text>

      {
        userData?.owned_nfts[0]?.token_ids[0]?.image ?
          <Image
            style={styles.imgNft}
            contentFit="cover"
            source={userData?.owned_nfts[0]?.token_ids[0]?.image}
          />
          :
          <Image
            style={styles.imgNft}
            contentFit="cover"
            source={require("../assets/ic_nft_default.png")}
          />
      }

      <View style={styles.frameGroup}>

        <LinearGradient
          colors={['#FC00A7', '#65EDE3']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBorder}
        >
          <Pressable
            style={styles.button}
            onPress={() => setShowSuccessMint(!showSuccessMint)}
          >
            <Text style={[styles.buttonLabel]}>
              Share on X
            </Text>
          </Pressable>
        </LinearGradient>

        <LinearGradient
          colors={['#FC00A7', '#65EDE3']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBorder}
        >
          <Pressable
            style={styles.button}
            onPress={() => setShowSuccessMint(!showSuccessMint)}
          >
            <Text style={[styles.buttonLabel]}>
              Download Original Image
            </Text>
          </Pressable>
        </LinearGradient>
      </View>

      {/* Section Wallet Info */}
      <View style={[styles.frameParentWallet]}>
        <View style={styles.walletBalance0EthWalletAParent}>
          <View style={[styles.walletBalance0Container]}>
            <View style={[styles.row, styles.row1]}>
              <Text style={[styles.walletBalance]}>Wallet Balance: </Text>
              <Text style={[styles.eth1Typo]}>0.02 ETH</Text>
            </View>
            <View style={[styles.row, styles.row2]}>
              <Text style={[styles.walletBalance]}>Wallet Address: </Text>
              <Text style={[styles.eth1Typo]}>0xe...dhv</Text>
            </View>
          </View>
          <View>
            <LinearGradient
              colors={['#FC00A7', '#65EDE3']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.gradientBorder]}
            >
              <View style={{
                backgroundColor: "#000000", borderRadius: Border.br_5xs,
                borderTopLeftRadius: Border.br_5xs,
                borderTopRightRadius: Border.br_5xs
              }}>
                <Pressable
                  style={[styles.topUpWalletWrapper]}
                  onPress={() => setShowTransferAction(!showTransferAction)}
                >

                  <Text style={[styles.topUpWallet]}>
                    Transfer
                  </Text>
                </Pressable>
              </View>
            </LinearGradient>

            <LinearGradient
              colors={['#FC00A7', '#65EDE3']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.gradientBorder, { marginTop: 10 }]}
            >
              <View style={{
                backgroundColor: "#000000", borderRadius: Border.br_5xs,
                borderTopLeftRadius: Border.br_5xs,
                borderTopRightRadius: Border.br_5xs
              }}>
                <Pressable
                  style={[styles.topUpWalletWrapper]}
                  onPress={() => navigation.navigate(`MyAssets${tab}`)}
                >
                  <Text style={[styles.topUpWallet]}>
                    My assets
                  </Text>
                </Pressable>
              </View>
            </LinearGradient>
          </View>
        </View>
      </View>

      {/* View Transfer Action */}
      <View style={[styles.frameParentTransferAction, styles.bottomNavPosition, , !showTransferAction && { display: "none" }]}>
        <Pressable
          style={[styles.svgrepoLayout]}
          onPress={() => setShowTransferAction(!showTransferAction)}
        >
          <Image
            style={[styles.icon1, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/ic_close_white.png")}
          />
        </Pressable>
        <View style={styles.selectActionWrapper}>
          <Text style={[styles.selectAction]}>
            Select action
          </Text>
        </View>

        <Pressable
          style={[styles.button2, styles.buttonLayout]}
          onPress={() => {
            setShowTransferAction(!showTransferAction);
            setShowReceive(!showReceive);
          }}
        >
          <Image
            style={styles.home1SvgrepoComIcon}
            contentFit="cover"
            source={require("../assets/ic_receive.png")}
          />
          <Text style={[styles.sendCrypto]}>
            Receive
          </Text>
        </Pressable>
        <Pressable
          style={[styles.button2, styles.buttonLayout]}
          onPress={doSendNext}
        >
          <Image
            style={styles.home1SvgrepoComIcon}
            contentFit="cover"
            source={require("../assets/ic_send.png")}
          />
          <Text style={[styles.sendCrypto]}>
            Send
          </Text>
        </Pressable>
      </View>

      {/* View Receive/Top Up Wallet */}
      <View style={[styles.frameParentReceive, !showReceive && { display: "none" }]}>
        <View style={styles.frameView}>
          <View style={styles.baseNetworkWrapper}>
            <Text style={[styles.baseNetwork]}>
              BASE Network
            </Text>
          </View>
          <Text style={[styles.thisIsYour]}>
            This is your BASE Network wallet address for receiving onchain
            assets.
          </Text>
        </View>
        <Pressable
          style={styles.containerBack}
          onPress={() => {
            setShowReceive(!showReceive)
            setShowTransferAction(true)
          }}
        >
          <Image
            style={[styles.icon2]}
            contentFit="cover"
            source={require("../assets/ic_back_white.png")}
          />
        </Pressable>
        <View style={styles.screenshot20231216At421Parent}>
          <Image
            style={styles.screenshot20231216At421}
            contentFit="cover"
            source={require("../assets/ic_barcode.png")}
          />
          <View style={styles.xedhvParent}>
            <Text style={[styles.xedhv1]}>
              0xe...dhv
            </Text>
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

      {/* View Send */}
      {/* <View style={[styles.frameParentSend, styles.bottomNavPosition, !showSend && { display: "none" }]}>
        <Pressable
          style={[styles.svgrepoLayout]}
          onPress={() => setShowSend(!showSend)}
        >
          <Image
            style={[styles.icon1, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/ic_close_white.png")}
          />
        </Pressable>
        <View style={styles.sendCryptoParent}>
          <Text style={[styles.sendCryptoDetail, styles.eth1Typo]}>
            Send crypto
          </Text>
          <Text style={[styles.ethereumNetwork, styles.sendToClr]}>
            Ethereum network
          </Text>
        </View>
        <View style={[styles.sendToParent, styles.parentFlexBox]}>
          <Text style={[styles.sendTo, styles.sendToClr]}>Send to:</Text>
          <View style={styles.inputEthereumWalletAddressWrapper}>
            <TextInput
              style={styles.inputEthereumWallet}
              placeholder="Input Ethereum wallet address"
              placeholderTextColor={Color.colorGray_500}
              value={inputSend}
              onChangeText={(text) => setInputSend(text)}
            />
          </View>
        </View>
      </View> */}

      <View style={[styles.frameParentSend, styles.bottomNavPosition, !showSend && { display: "none" }]}>
        {showSendResult ? (
          <Pressable
            style={styles.containerSendClose}
            onPress={doSendBack}
          >
            <Image
              style={[styles.icon2, styles.iconLayout]}
              contentFit="cover"
              source={require("../assets/ic_close_white.png")}
            />
          </Pressable>
        ) : (
          <Pressable
            style={styles.containerSendBack}
            onPress={doSendBack}
          >
            <Image
              style={[styles.icon2, styles.iconLayout]}
              contentFit="cover"
              source={require("../assets/ic_back_white.png")}
            />
          </Pressable>
        )}

        {/* Send Input Wallet Address */}
        <View style={[styles.frameView, !showSendInput && { display: "none" }]}>
          <View style={styles.frameView}>
            <View style={styles.baseNetworkParent}>
              <Text style={[styles.baseNetwork]}>
                BASE Network
              </Text>

            </View>
            <CustomDropdown />

            {/* <View
                style={[
                  styles.selectCryptocurrencyParent,
                  styles.parentSpaceBlock1,
                ]}
              >
                <Text style={[styles.selectCryptocurrency]}>
                  Select cryptocurrency
                </Text>
                <View style={[styles.ellipseParent, styles.parentSpaceBlock]}>
                  <Image
                    style={styles.frameChild}
                    contentFit="cover"
                    source={require("../assets/ic_circle_white.png")}
                  />
                  <Text style={[styles.eth1, styles.eth1Typo]}>ETH</Text>
                  <Image
                    style={styles.frameItem}
                    contentFit="cover"
                    source={require("../assets/ic_arrow_down_white.png")}
                  />
                </View>
              </View> */}
            {/* <View style={[styles.frameParent1, styles.parentSpaceBlock]}>
              <View style={styles.frameView}>
                <View style={[styles.parent, styles.parentLayout]}>
                  <Text style={[styles.text, styles.ethTypo]}>0.1</Text>
                  <Text style={styles.eth2}>ETH</Text>
                </View>
                <Text style={[styles.sgd, styles.sgdSpaceBlock]}>$367 SGD</Text>
              </View>
              <Image
                style={styles.frameInner}
                contentFit="cover"
                source={require("../assets/ic_arrow_double_white.png")}
              />
            </View> */}
          </View>
          <View style={styles.frameParent3}>
            <View style={styles.sendToParent}>
              <Text style={[styles.selectCryptocurrency]}>
                Send to
              </Text>
              <View
                style={[
                  styles.baseWalletAddressWrapper,
                  styles.ellipseParentBg,
                ]}
              >
                <TextInput
                  style={styles.baseWalletAddress}
                  placeholder="BASE Wallet Address"
                  placeholderTextColor={Color.colorGray_500}
                  value={inputSend}
                  onChangeText={(text) => setInputSend(text)}
                />
              </View>
            </View>

            <LinearGradient
              colors={['#FC00A7', '#65EDE3']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.gradientBorder, styles.buttonSendConfirm]}

            >
              <Pressable
                style={[{
                  backgroundColor: Color.colorGray_100,
                  height: 54, borderRadius: 8,
                  flex: 1, alignItems: 'center', justifyContent: 'center'
                }]}
                onPress={doSendNext}
              >
                <Text style={[styles.buttonLabel]}>Confirm</Text>
              </Pressable>
            </LinearGradient>
          </View>
        </View>
        {/* Send Input Wallet Address */}

        {/* Send Confirm Transaction */}
        <View style={[styles.frameView, !showSendConfirm && { display: "none" }]}>
          <View>
            <View style={styles.sendParent1}>
              <Text style={[styles.send]}>Send</Text>
              <View style={styles.youAreSending367WorthOfWrapper}>
                <Text style={styles.youAreSendingContainer}>
                  <Text
                    style={styles.youAreSending}
                  >{`You are sending `}</Text>
                  <Text style={styles.textConfirm}>$367</Text>
                  <Text style={styles.youAreSending}> worth of</Text>
                  <Text style={styles.textConfirm}> 0.1 ETH</Text>
                  <Text style={styles.youAreSending}>
                    {" "}
                    to the following wallet address
                  </Text>
                </Text>
              </View>
            </View>
            <View style={[styles.wrapperFlexBox]}>
              <View
                style={[
                  styles.x37e5385aba3592d75436127c7184dWrapper,
                  styles.frameParent2SpaceBlock,
                ]}
              >
                <Text style={styles.walletAddress}>
                  0x37E5385AbA3592D75436127C7184dA175574398e
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.frameWrapper2}>
            <View
              style={[styles.frameParent2, styles.frameParent2SpaceBlock]}
            >
              <View style={styles.frameParent3}>
                <View style={styles.feeParentFlexBox}>
                  <Text style={[styles.estimatedGasFee, styles.totalTypo]}>
                    Estimated gas fee
                  </Text>
                  <View style={styles.walletBalance01EthParent}>
                    <Text style={[styles.eth2Confirm, styles.ethTypoConfirm]}>
                      0.0000023 ETH
                    </Text>
                    <Text style={[styles.text1, styles.textTypoConfirm]}>$0.10</Text>
                  </View>
                </View>
                <View style={[styles.maxFeeParent, styles.feeParentFlexBox]}>
                  <Text style={[styles.estimatedGasFee, styles.totalTypo]}>
                    Max fee
                  </Text>
                  <View style={styles.walletBalance01EthParent}>
                    <Text style={[styles.eth2Confirm, styles.ethTypoConfirm]}>
                      0.0000025 ETH
                    </Text>
                    <Text style={[styles.text1, styles.textTypoConfirm]}>$0.11</Text>
                  </View>
                </View>
              </View>
              <View style={[styles.frameChild, styles.borderBorder]} />
              <View style={styles.frameParent4}>
                <View style={styles.totalParent}>
                  <Text style={[styles.total, styles.total1Typo]}>Total</Text>
                  <View style={styles.walletBalance01EthParent}>
                    <Text style={[styles.total, styles.ethTypoConfirm]}>
                      0.1000123 ETH
                    </Text>
                    <Text style={[styles.text3, styles.textTypoConfirm]}>
                      $367.10
                    </Text>
                  </View>
                </View>
                <View style={[styles.maxFeeParent, styles.feeParentFlexBox]}>
                  <Text style={[styles.estimatedGasFee, styles.totalTypo]}>
                    Max amount
                  </Text>
                  <View style={styles.walletBalance01EthParent}>
                    <Text style={[styles.eth2Confirm, styles.ethTypoConfirm]}>
                      0.1000123 ETH
                    </Text>
                    <Text style={[styles.text1, styles.textTypoConfirm]}>
                      $367.11
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.buttonWrapper}>
            <LinearGradient
              colors={['#FC00A7', '#65EDE3']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.gradientBorder, styles.buttonSendConfirm]}

            >
              <Pressable
                style={[{
                  backgroundColor: Color.colorGray_100,
                  height: 54, borderRadius: 8,
                  flex: 1, alignItems: 'center', justifyContent: 'center'
                }]}
                onPress={doSendNext}
              >
                <Text style={[styles.buttonLabel]}>Send</Text>
              </Pressable>
            </LinearGradient>
          </View>
        </View>
        {/* Send Confirm Transaction */}

        {/* Send Confirm Transaction */}
        <View style={[styles.frameView, !showSendResult && { display: "none" }]}>
          <View>
            <View style={styles.sendParent1}>
              <Text style={[styles.send, styles.ethTypo1]}>Send</Text>
              <View style={styles.youAreSending367WorthOfWrapper}>
                <Text style={styles.youAreSendingContainer}>
                  <Text style={styles.youAreSending}>
                    Click transaction hash below{'\n'}
                    to view on basescan
                  </Text>
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.frameWrapper3}>
            <View style={[styles.wrapperFlexBox]}>
              <View
                style={[
                  styles.x37e5385aba3592d75436127c7184dWrapper,
                  styles.frameParent2SpaceBlock,
                ]}
              >
                <Text style={styles.walletAddress}>
                  0x37E5385AbA3592D75436127C7184dA175574398e
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.buttonWrapper}>

            <LinearGradient
              colors={['#FC00A7', '#65EDE3']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.gradientBorder, styles.buttonSendConfirm]}

            >
              <Pressable
                style={[{
                  backgroundColor: Color.colorGray_100,
                  height: 54, borderRadius: 8,
                  flex: 1, alignItems: 'center', justifyContent: 'center'
                }]}
                onPress={doSendNext}
              >
                <Text style={[styles.buttonLabel, styles.ethTypo1]}>Close</Text>
              </Pressable>
            </LinearGradient>
          </View>
        </View>
        {/* Send Confirm Transaction */}
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    // justifyContent: 'center',
    alignItems: "center",
    backgroundColor: Color.colorGray_100,
    // borderColor:'red',
    // borderWidth:2
  },
  imgBackground: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  txtStyle: {
    textAlign: "center",
    color: Color.darkInk,
    fontFamily: FontFamily.clashGrotesk,
  },
  txtTitle: {
    marginTop: 20,
    fontSize: FontSize.size_9xl,
    fontWeight: "500",
    fontFamily: getFontFamily("500"),
    color: Color.darkInk,
    // position: "absolute",
  },
  txtTitle2: {
    top: 60,
    fontWeight: "700",
    width: 272,
    fontSize: FontSize.size_9xl,
    position: "absolute",
  },
  imgNft: {
    // marginTop: -178,
    // top: "50%",
    marginTop: 20,
    // top:130,
    height: 272,
    borderRadius: Border.br_5xs,
    width: 272,
    // position: "absolute",
  },
  frameGroup: {
    flex: 1,
    gap: 10,
    marginTop: 20,
    // top: 420,
    // height: 160,
    width: "85%",
    // alignItems: "center",
    // borderRadius: Border.br_5xs,
    // position: "absolute",
    // overflow: "hidden",
  },
  wrapper: {
    paddingHorizontal: Padding.p_base,
    backgroundColor: Color.colorGray_100,
  },
  wrapperFlexBox: {
    width: "100%",
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
    bottom: "5%",
    borderTopLeftRadius: Border.br_5xs,
    borderTopRightRadius: Border.br_5xs,
    backgroundColor: Color.colorWhitesmoke_100,
    paddingHorizontal: Padding.p_sm,
    paddingTop: Padding.p_xl,
    paddingBottom: Padding.p_xl,
    width: "100%",
    // position: "absolute",
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
    // marginBottom: 10,
  },
  row1: {
    marginBottom: 5,
  },
  row2: {
    marginTop: 5,
  },
  walletTypo: {
    textAlign: 'left',
    fontSize: FontSize.labelLarge_size,
    color: Color.darkInk,
  },
  walletBalance: {
    fontFamily: getFontFamily("400"),
    fontWeight: "400",
    textAlign: 'left',
    fontSize: FontSize.labelLarge_size,
    color: Color.darkInk,
  },
  eth1Typo: {
    fontFamily: getFontFamily("600"),
    fontWeight: "600",
    textAlign: 'left',
    fontSize: FontSize.labelLarge_size,
    color: Color.darkInk,
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
    backgroundColor: Color.colorWhitesmoke_100,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingVertical: Padding.p_9xs,
    paddingHorizontal: Padding.p_base,
    borderRadius: Border.br_5xs,
    borderTopLeftRadius: Border.br_5xs,
    borderTopRightRadius: Border.br_5xs,
    justifyContent: "center",
    alignItems: "center",

  },
  topUpWallet: {
    textAlign: 'left',
    fontSize: FontSize.labelLarge_size,
    color: Color.darkInk,
    fontFamily: getFontFamily("500"),
    fontWeight: "500",
  },
  button: {
    // borderWidth: 3,
    // width: "87%",
    height: 54,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_xs,
    // marginTop: 32,
    // borderColor: Color.colorDeeppink,
    // borderStyle: "solid",
    flexDirection: "row",
    borderRadius: Border.br_5xs,
    backgroundColor: Color.colorGray_100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLabel: {
    lineHeight: 24,
    fontFamily: getFontFamily("600"),
    fontWeight: "600",
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
    width: "100%",
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
    marginTop: 10,
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
    fontWeight: "600",
    fontFamily: getFontFamily("600"),
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
    fontWeight: "400",
    fontFamily: getFontFamily("400"),
    fontSize: FontSize.labelLarge_size,
    color: Color.darkInk,
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
  containerSendBack: {
    left: "5.13%",
    top: "3.15%",
    right: "86.67%",
    bottom: "87.3%",
    width: "8.21%",
    height: "6.56%",
    zIndex: 1,
    position: "absolute",
  },
  containerSendClose: {
    right: "5.13%",
    top: "3.15%",
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
    fontFamily: getFontFamily("500"),
    fontWeight: "500",
    fontSize: FontSize.labelLarge_size,
    color: Color.darkInk
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
    width: "100%",
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
    fontSize: FontSize.size_lg,
    color: Color.darkInk,
    fontFamily: getFontFamily("600"),
    fontWeight: "600",
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
  },
  buttonLayout: {
    paddingVertical: Padding.p_xs,
    paddingHorizontal: Padding.p_5xl,
    height: 54,
    width: "90%",
    maxWidth: Component_Max_Width,
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
    fontFamily: getFontFamily("600"),
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
    fontSize: FontSize.size_lg,
    color: Color.darkInk,
    fontFamily: getFontFamily("500"),
    fontWeight: "500",
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
    // marginTop: 120,
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
    fontFamily: getFontFamily("500"),
    fontWeight: "500",
    opacity: 0.4
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
    fontWeight: "600",
    fontFamily: getFontFamily("600"),

  },
  ethTypo1: {
    fontWeight: "600",
    fontFamily: FontFamily.clashGrotesk,
  },
  textConfirm: {
    fontSize: FontSize.size_lg,
    fontWeight: "700",
    fontFamily: getFontFamily("700"),
  },
  youAreSendingContainer: {
    fontSize: FontSize.size_lg,
    width: 322,
    textAlign: "center",
    color: Color.darkInk
  },
  youAreSending367WorthOfWrapper: {
    marginTop: 30,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
  },
  youAreSending: {
    fontSize: FontSize.size_lg,
    fontWeight: "500",
    fontFamily: getFontFamily("500"),
  },
  walletAddress: {
    textAlign: "center",
    fontSize: FontSize.labelLarge_size,
    color: Color.darkInk,
    fontFamily: getFontFamily("500"),
    fontWeight: "500",
    // flex: 1,
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
  frameWrapper3: {
    marginTop: 127,
    marginBottom: 128,
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
    fontWeight: "500"
  },
  total: {
    fontSize: FontSize.labelLarge_size
  },
  totalTypo: {
    width: 160,
    textAlign: "left",
    color: Color.darkInk,
    fontFamily: getFontFamily("500"),
  },
  total1Typo: {
    width: 160,
    textAlign: "left",
    color: Color.darkInk,
    fontFamily: getFontFamily("700"),
  },
  ethTypoConfirm: {
    width: 138,
    textAlign: "left",
    color: Color.darkInk,
    fontFamily: getFontFamily("500"),
  },
  textTypoConfirm: {
    opacity: 0.7,
    width: 138,
    textAlign: "left",
    color: Color.darkInk,
    fontFamily: getFontFamily("500"),
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
  gradientBorder: {
    padding: 2, // Lebar border gradien
    borderRadius: 8,
  },
});

export default Wallet;
