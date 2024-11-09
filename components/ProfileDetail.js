import * as React from "react";
import { useState, useEffect } from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, TouchableOpacity, useWindowDimensions, Pressable, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Padding, FontSize, Color, FontFamily, Border, getFontFamily } from "../GlobalStyles";
import { processUserVerifiedList, shortenAddress, truncateString } from "../Utils";
import CrowdListHiring from "./CrowdListHiring";
import { useAuth } from "./AuthProvider";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import FullBio from "./FullBio";
import PostList from "./PostList";
import ProfileListLikes from "./ProfileListLikes";
import MintingList from "./MintilngList";
import * as Clipboard from 'expo-clipboard';

const ProfileDetail = ({ tab, userInfo, isShowSearch }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const layout = useWindowDimensions();
  const [userVerifiedByImages, setUserVerifiedByImages] = useState([]);
  const [userVerifiedByNames, setUserVerifiedByNames] = useState('');
  const [userVerifiedImages, setUserVerifiedImages] = useState([]);
  const [userVerifiedNames, setUserVerifiedNames] = useState('');
  const [index, setIndex] = React.useState(0);
  const [isFullBio, setIsFullBio] = useState(route.params?.isFullBio || false);
  const [isShowCreate, setIsShowCreate] = useState(false);
  const [showAddressCopied, setShowAddressCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [routes] = React.useState([
    { key: 'first', title: 'Posts' },
    { key: 'second', title: 'Crowdsource' },
    { key: 'forth', title: 'Likes' },
  ]);

  console.log(userInfo)

  useEffect(() => {
    if (setShowAddressCopied) {
      const timer = setTimeout(() => {
        setShowAddressCopied(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAddressCopied])

  useEffect(() => {
    if (userInfo) {
      setIsLoading(false);
    }
  }, [userInfo]);

  const doCopyWallet = async () => {
    try {
      await Clipboard.setStringAsync(userInfo?.wallet_address);
      setShowAddressCopied(!showAddressCopied);
    } catch (error) {
      console.error("doCopyWallet", error);
    }
  }

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    forth: ForthRoute,
  });
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={styles.tabBar}
      indicatorStyle={styles.indicator}
      labelStyle={styles.label}
      renderLabel={({ route, focused, color }) => {
        // Conditionally apply a style based on the route title or index
        const customLabelStyle =
          route.key === 'second' // or use `route.title === 'Specific Tab'` or route index
            ? styles.labelSmall
            : styles.labelSmall;

        return (
          <Text style={[customLabelStyle, { color }]}>
            {route.title}
          </Text>
        );
      }}
    />
  );

  const CircularImage = ({ source }) => {
    return (
      <View style={styles.imageContainer}>
        <Image source={source} style={styles.image} />
      </View>
    );
  };
  useEffect(() => {
    const check = async () => {
      if (!userInfo) return;
      let { names: names1, images: images1 } = processUserVerifiedList(userInfo?.verified_by);
      setUserVerifiedByNames(names1);
      setUserVerifiedByImages(images1);

      let { names: names2, images: images2 } = processUserVerifiedList(userInfo?.verified);
      setUserVerifiedNames(names2);
      setUserVerifiedImages(images2);
    }

    check();
  }, [userInfo])
  return (
    <>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Color.darkInk} />
          <Text style={styles.loadingText}>Loading Profile...</Text>
        </View>
      ) : (
        <View style={[styles.myProfile, isShowSearch && { display: "none" }]}>
          <View style={{
            // borderWidth:2, borderColor:'red',
            flex: 1,
            backgroundColor: Color.colorGray_100
          }}>
            <View style={{
              // borderWidth:2, borderColor:"red",
              flex: 1, flexDirection: "row", maxHeight: 150,
            }}>
              {userInfo?.profile_image ? (
                <Image
                  style={[styles.myProfileItem]}
                  contentFit="cover"
                  source={userInfo.profile_image}
                // resizeMode={FastImage.resizeMode.cover}
                />
              ) : (
                <Image
                  style={[styles.myProfileItem]}
                  contentFit="cover"
                  source={require("../assets/photo.png")}
                />
              )}
              <View style={styles.frameParent10}>
                <View style={styles.nameParent4}>
                  <Text style={[styles.name6]}>{userInfo?.name ? userInfo.name : "Name"}</Text>
                  <Text style={[styles.endlessmeee6]}>
                    {userInfo?.screen_name ? `@${userInfo.screen_name}` : "@endlessmeee"}
                  </Text>
                </View>
                <Text style={[styles.theBioText]}>
                  {userInfo?.bio ? truncateString(userInfo.bio, 100) : "The bio text will be here. The maximum number of lines is 2 and that means max. characters is 100."}
                </Text>
              </View>
            </View>
            <View style={{
              flex: 1, flexDirection: "row", maxHeight: 30, gap: 10
              // borderColor:"red", borderWidth:2,
            }}>
              <TouchableOpacity
                style={[styles.editProfileWrapper, styles.profileWrapperSpaceBlock, { marginLeft: 10 }]}
                onPress={() => navigation.navigate(`EditProfile${tab}`)}
              >
                <Text style={[styles.editProfile]}>
                  Edit profile
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.shareProfileWrapper, styles.profileWrapperSpaceBlock,
                ]}
                onPress={() => setIsFullBio(!isFullBio)}
              >
                <Text style={[styles.editProfile]}>
                  {isFullBio ? "Default Bio" : "Full Bio"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={{
                borderWidth: 1.5, borderColor: 'transparent', marginRight: 10
              }}>
                <Image
                  style={{
                    width: 25, height: 25,

                  }}
                  source={require("../assets/share.png")}
                />
              </TouchableOpacity>
            </View>

            <View style={{
              // borderWidth:2, borderColor:"red", 
              // flex: 1, padding: 10, gap: 8
              // flex:1,
              // flexGrow:0,
              padding: 10
            }}>

              {userInfo?.hide_wallet == false &&
                <Text
                  style={[
                    styles.walletAddress0xedhvContainer,
                  ]}
                >
                  <Text style={styles.walletAddress}>{`Wallet Address: `}</Text>

                  <Text style={styles.timeTypo}>{userInfo?.wallet_address ? shortenAddress(userInfo?.wallet_address) : " 0x00"}</Text>
                  <Pressable onPress={() => doCopyWallet()}>
                    <Image
                      style={styles.copySvgrepoCom1Icon}
                      contentFit="cover"
                      source={require("../assets/ic_copy.png")}
                    />
                  </Pressable>
                </Text>}

              <TouchableOpacity
                style={{
                  marginTop: 15
                  // borderWidth:2, borderColor:"red"
                }}
                onPress={() => navigation.push(`Verified${tab}`, { tab, verifiedByParam: true, user: userInfo })}
              >
                <Text
                  style={[
                    styles.walletAddress0xedhvContainer,
                  ]}
                >
                  <Text style={styles.walletAddress}>{`Verified by: `}</Text>

                  <View style={{ flexDirection: "row", alignItems: "center" }}>

                    {userVerifiedByImages[0] &&
                      <CircularImage source={userVerifiedByImages[0]}></CircularImage>
                    }
                    {userVerifiedByImages[1] &&
                      <View style={[styles.imageContainer, {
                        width: userVerifiedByImages.length * 23,
                        height: 32,
                        position: 'relative'
                      }]}>
                        {
                          userVerifiedByImages.map((e, index) => {
                            return (
                              <Image key={index} source={e} style={[styles.image, {
                                zIndex: 9999 - index,
                                position: 'absolute', left: 20 * index
                              }]} />
                            )
                          })
                        }
                      </View>
                    }
                    <Text style={[styles.samPolymathAnd, styles.textTypo, { paddingLeft: 4 }]}>
                      {userVerifiedByNames}
                    </Text>
                  </View>
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  marginTop: 15
                  //  borderWidth:2, borderColor:"red"
                }}
                onPress={() => navigation.push(`Verified${tab}`, { tab, verifiedByParam: false, user: userInfo })}
              >
                <Text
                  style={[
                    styles.walletAddress0xedhvContainer,
                  ]}
                >
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                    <Text style={[styles.walletAddress, { color: 'white' }]}>{`Verified: `}</Text>


                    <View style={{
                      // borderColor:'red', 
                      // borderWidth:2, 
                      width: userVerifiedImages.length * 23,
                      height: 32,
                      position: 'relative'
                    }}>
                      {
                        userVerifiedImages.map((e, index) => {
                          return (
                            <Image key={index} source={e} style={[styles.image, {
                              zIndex: 9999 - index,
                              position: 'absolute', left: 20 * index
                            }]} />
                          )
                        })
                      }
                    </View>
                    <Text style={[styles.samPolymathAnd, styles.textTypo, { paddingLeft: 4 }]}>
                      {userVerifiedNames}
                    </Text>
                  </View>
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.frameParent8]}>
            {
              !isFullBio ?
                <TabView
                  navigationState={{ index, routes, tab, isShowSearch, isShowCreate }}
                  renderScene={renderScene}
                  onIndexChange={setIndex}
                  renderTabBar={renderTabBar}
                  style={{ backgroundColor: Color.colorGray_100, marginBottom: -40 }}
                  initialLayout={{ width: layout.width }}
                />
                :
                <FullBio experiences={userInfo?.experiences} skills={userInfo?.skills} />
            }
            {/* <View
              style={styles.verifiedWrapperFlexBox}
            >
              <Text style={[styles.youVerified, styles.bioExampleTypo]}>
                Posts
              </Text>
            </View>
            <View style={[styles.verifiedByWrapper, styles.verifiedWrapperFlexBox]}>
              <Text style={[styles.youVerified, styles.bioExampleTypo]}>
                Likes
              </Text>
            </View> */}
          </View>

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
      )}
    </>
  );
};

const FirstRoute = ({ index, routes, tab, isShowSearch, isShowCreate }) => {
  const { getUser, getSession } = useAuth();
  const [userInfo, setUserInfo] = useState();
  const [usersession, setUsersession] = useState();

  useEffect(() => {
    getUser().then((user) => {
      setUserInfo(user);
    });
    getSession().then((user) => {
      setUsersession(user);
    })
  }, [])

  return (userInfo &&
    <View>
      <PostList
        tab={4}
        isProfile={true}
        usersession={usersession}
        userInfo={userInfo} />
    </View>)

};

const SecondRoute = ({ index, routes, tab, isShowSearch, isShowCreate }) => {
  const { getUser, getSession } = useAuth();
  const [userInfo, setUserInfo] = useState();
  const [usersession, setUsersession] = useState();

  useEffect(() => {
    getUser().then((user) => {
      setUserInfo(user);
    });
    getSession().then((user) => {
      setUsersession(user);
    })
  }, [])

  return (userInfo &&
    <View>
      <CrowdListHiring
        tab={4}
        usersession={usersession}
        userInfo={userInfo}
        isProfile={false}
        isShowSearch={isShowSearch}
        isShowCreate={isShowCreate} />
    </View>)

};

const ThirdRoute = ({ index, routes, tab, isShowSearch, isShowCreate }) => {
  const { getUser, getSession } = useAuth();
  const [userInfo, setUserInfo] = useState();
  const [usersession, setUsersession] = useState();

  useEffect(() => {
    getUser().then((user) => {
      setUserInfo(user);
    });
    getSession().then((user) => {
      setUsersession(user);
    })
  }, [])

  return (userInfo &&
    <View>

      <MintingList
        tab={4}
        usersession={usersession}
        userInfo={userInfo}
        isProfile={false}
        isShowSearch={isShowSearch}
        isShowCreate={isShowCreate} />
    </View>)
};

const ForthRoute = ({ index, routes, tab, isShowSearch, isShowCreate }) => {
  const { getUser, getSession } = useAuth();
  const [userInfo, setUserInfo] = useState();
  const [usersession, setUsersession] = useState();

  useEffect(() => {
    getUser().then((user) => {
      setUserInfo(user);
    });
    getSession().then((user) => {
      setUsersession(user);
    })
  }, [])

  return (userInfo &&
    <View>
      <ProfileListLikes
        tab={4}
        usersession={usersession}
        userInfo={userInfo}
        isProfile={false}
        isShowSearch={isShowSearch}
        isShowCreate={isShowCreate} />
    </View>)
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
  frameParent12Layout: {
    width: 390,
    position: "absolute",
  },
  notchIconPosition: {
    left: "50%",
    position: "absolute",
  },
  frameSpaceBlock: {
    paddingVertical: Padding.p_sm,
    paddingHorizontal: Padding.p_xs,
    alignSelf: "stretch",
  },
  svgrepoLayout: {
    width: 32,
    height: 32,
  },
  nameTypo: {
    fontSize: FontSize.labelLarge_size,
    textAlign: "left",
  },
  textTypo: {
    fontSize: FontSize.size_xs,
    color: Color.darkInk,
    fontFamily: FontFamily.clashGrotesk,
  },
  heartSvgrepoCom1ParentSpaceBlock: {
    marginTop: 10,
    alignSelf: "stretch",
  },
  timeTypo: {
    fontWeight: "600",
    fontFamily: getFontFamily("600"),
  },
  profileWrapperSpaceBlock: {
    // paddingVertical: Padding.p_3xs,
    justifyContent: "center",
  },
  editProfileTypo: {
    fontSize: FontSize.size_sm,
    textAlign: "left",
    color: Color.darkInk,
    fontFamily: FontFamily.clashGrotesk,
  },
  bottomNavPosition: {
    marginLeft: -195,
    left: "50%",
  },
  wrapperFlexBox: {
    paddingVertical: Padding.p_7xs,
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: Padding.p_xs,
    alignItems: "center",
    flex: 1,
  },
  iconLayout: {
    height: "100%",
    width: "100%",
  },
  wrapperLayout: {
    height: 24,
    width: 24,
  },
  bottomNavFlexBox: {
    justifyContent: "space-between",
    backgroundColor: Color.colorGray_100,
    flexDirection: "row",
    alignItems: "center",
    width: 390,
    position: "absolute",
  },
  borderPosition: {
    bottom: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
  },
  svgrepoParentLayout: {
    opacity: 0.28,
    width: 48,
    alignItems: "center",
  },
  homeTypo: {
    marginTop: 2,
    fontSize: FontSize.size_5xs,
    color: Color.darkInk,
    fontFamily: FontFamily.clashGrotesk,
  },
  myProfileChild: {
    height: 294,
    left: 0,
    overflow: "hidden",
  },
  frameChild: {
    height: 32,
  },
  name: {
    textAlign: "left",
    color: Color.darkInk,
    fontFamily: FontFamily.clashGrotesk,
    fontWeight: "500",
  },
  endlessmeee: {
    marginLeft: 6,
    textAlign: "left",
    color: Color.darkInk,
    fontFamily: FontFamily.clashGrotesk,
  },
  ellipseParent: {
    flexDirection: "row",
    alignItems: "center",
  },
  frameItem: {
    width: 3,
    height: 3,
    marginLeft: 12,
  },
  h: {
    textAlign: "left",
    marginLeft: 12,
  },
  frameContainer: {
    marginLeft: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  christineJoinedNeonspace: {
    fontSize: FontSize.size_sm,
    textAlign: "left",
    color: Color.darkInk,
    fontFamily: FontFamily.clashGrotesk,
  },
  heartSvgrepoCom1Icon: {
    width: 14,
    height: 14,
    overflow: "hidden",
  },
  text: {
    textAlign: "right",
    marginLeft: 4,
  },
  heartSvgrepoCom1Parent: {
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
  },
  frameGroup: {
    backgroundColor: Color.colorDarkslategray_400,
    borderRadius: Border.br_3xs,
    paddingHorizontal: Padding.p_xs,
    overflow: "hidden",
  },
  frameView: {
    marginTop: 12,
    backgroundColor: Color.colorDarkslategray_400,
    borderRadius: Border.br_3xs,
    paddingHorizontal: Padding.p_xs,
    overflow: "hidden",
  },
  frameParent: {
    marginLeft: -181,
    top: 409,
    alignItems: "center",
    width: 362,
  },
  name6: {
    textAlign: "left",
    color: Color.darkInk,
    fontSize: FontSize.labelLarge_size,
    fontWeight: "600",
    fontFamily: getFontFamily("600")
  },
  endlessmeee6: {
    textAlign: "left",
    color: Color.darkInk,
    fontSize: FontSize.labelLarge_size,
    fontWeight: "400",
    fontFamily: getFontFamily("400")
  },
  nameParent4: {
    justifyContent: "center",
  },
  theBioText: {
    color: Color.darkInk,
    fontWeight: "400",
    fontFamily: getFontFamily("400"),
    marginTop: 8,
    textAlign: "left",
    alignSelf: "stretch",
    fontSize: FontSize.size_xs,
  },
  frameParent10: {
    // borderColor:"red", borderWidth:2,
    width: 260,
    padding: 10,
    marginTop: 4
    // justifyContent: "center",
  },
  myProfileItem: {
    width: 90,
    height: 90,
    margin: 10,
    borderRadius: 50
  },
  editProfile: {
    fontWeight: "500",
    fontSize: FontSize.size_sm,
    textAlign: "left",
    color: Color.darkInk,
    fontFamily: getFontFamily("500")
  },
  editProfileWrapper: {
    borderWidth: 1.5,
    borderRadius: Border.br_5xs,
    paddingVertical: Padding.p_9xs,
    borderColor: Color.darkInk,
    borderStyle: "solid",
    flexDirection: "row",
    paddingHorizontal: Padding.p_xs,
    alignItems: "center",
    flex: 1,
  },
  shareProfileWrapper: {
    borderWidth: 1.5,
    borderRadius: Border.br_5xs,
    paddingVertical: Padding.p_9xs,
    borderColor: Color.darkInk,
    borderStyle: "solid",
    flexDirection: "row",
    paddingHorizontal: Padding.p_xs,
    alignItems: "center",
    flex: 1,
  },
  frameParent11: {
    top: 219,
    flexDirection: "row",
  },
  postsWrapper: {
    borderColor: Color.colorDeeppink,
    borderBottomWidth: 2,
    borderStyle: "solid",
    paddingVertical: Padding.p_7xs,
  },
  frameParent12: {
    top: 366,
    flexDirection: "row",
    width: 390,
    position: "absolute",
  },
  walletAddress: {
    fontFamily: getFontFamily("400"),
    fontWeight: "400"
  },
  walletAddress0xedhvContainer: {
    // top: 258,
    // width: 217,
    // borderWidth:2,borderColor:"red",
    // textAlign: "left",
    // alignItems:"center",
    // verticalAlign:"top",
    // flex:1,
    // justifyContent:"center",
    color: Color.darkInk,
    fontSize: FontSize.labelLarge_size,
  },
  verifiedBy: {
    width: 74,
    textAlign: "left",
    color: Color.darkInk,
    fontFamily: FontFamily.clashGrotesk,
  },
  groupIcon: {
    width: 46,
    height: 28,
    marginLeft: 8,
  },
  samPolymathAnd: {
    alignItems: "center"
    // width: 218,
    // marginLeft: 8,
    // textAlign: "left",
  },
  verified: {
    width: 55,
    textAlign: "left",
    color: Color.darkInk,
    fontFamily: FontFamily.clashGrotesk,
  },
  verifiedParent: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  frameParent13: {
    top: 288,
  },
  icon: {
    display: "none",
  },
  searchByX: {
    color: Color.colorGray_500,
    textAlign: "left",
    fontFamily: FontFamily.clashGrotesk,
    fontWeight: "500",
    flex: 1,
  },
  searchByXHandleWrapper: {
    borderRadius: Border.br_9xs,
    marginLeft: 14,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: Padding.p_xs,
    backgroundColor: Color.colorGray_200,
  },
  icon1: {
    overflow: "hidden",
  },
  chatLineSvgrepoCom1: {
    marginLeft: 14,
    height: 32,
  },
  vuesaxboldmoreIcon: {
    marginLeft: 14,
    display: "none",
  },
  topNav: {
    top: 47,
    height: 54,
    paddingHorizontal: Padding.p_sm,
    paddingVertical: Padding.p_3xs,
    backgroundColor: Color.colorGray_100,
    marginLeft: -195,
    flexDirection: "row",
    alignItems: "center",
    left: "50%",
    width: 390,
    position: "absolute",
  },
  time: {
    marginTop: -10.5,
    top: "50%",
    fontSize: FontSize.size_mid,
    letterSpacing: 0,
    lineHeight: 22,
    textAlign: "center",
    width: 54,
    color: Color.darkInk,
    left: 0,
    position: "absolute",
  },
  timeIphone: {
    height: 21,
    zIndex: 0,
    width: 54,
  },
  border: {
    width: "91.58%",
    right: "8.42%",
    left: "0%",
    borderRadius: Border.br_9xs_5,
    borderWidth: 1,
    opacity: 0.35,
    borderColor: Color.darkInk,
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
    top: 0,
    height: 32,
  },
  statusBarIphone: {
    paddingHorizontal: Padding.p_3xl,
    paddingTop: Padding.p_sm,
    paddingBottom: Padding.p_xs,
    top: 0,
    left: 0,
  },
  vuesaxboldaddCircleIcon: {
    top: 682,
    left: 312,
    width: 64,
    height: 64,
    position: "absolute",
  },
  home1SvgrepoComIcon: {
    height: 32,
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
  profile: {
    textAlign: "center",
    fontWeight: "500",
  },
  profile1341SvgrepoCom1Parent: {
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
    marginLeft: -195,
    left: "50%",
  },
  myProfile: {
    // width: "100%",
    // height: "100%",
    flex: 1,
    // paddingHorizontal: 12,
    backgroundColor: Color.colorGray_200,
    // borderColor:'red',
    // borderWidth:2
  },
  frameParent8: {
    // borderWidth:2,
    // borderColor:'red',
    // height:200,
    flexGrow: 1.3
    // borderColor:"blue",
    // borderWidth:2,
    // top: 101,
    // paddingTop: Padding.p_9xs,
    // marginLeft: -195,
    // backgroundColor: Color.colorGray_100,
    // height: 40
    // left: "50%",
    // position: "absolute",
    // height:"100%"
  },
  verifiedWrapperFlexBox: {
    // paddingVertical: Padding.p_7xs,
    justifyContent: "center",
    flex: 1,
    // paddingHorizontal: Padding.p_xs,
    flexDirection: "row",
    alignItems: "center",
  },
  youVerified: {
    fontWeight: "500",
  },
  bioExampleTypo: {
    fontSize: FontSize.size_sm,
    textAlign: "left",
    color: Color.darkInk,
    fontFamily: FontFamily.clashGrotesk,
  },
  imageContainer: {
    // borderWidth:2,
    // borderColor:"red",
    width: 30,
    height: 30,
    borderRadius: 50,
    // overflow: 'hidden',
    marginHorizontal: 10,
  },
  image: {
    width: 28,
    height: 28,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  tabBar: {
    backgroundColor: Color.colorGray_100, // Background color of the tab bar
  },
  indicator: {
    backgroundColor: '#ff4081', // Color of the selected tab indicator
  },
  label: {
    color: '#ffffff', // Color of the tab labels
    fontSize: 18
  },
  labelSmall: {
    color: '#ffffff', // Color of the tab labels
    fontSize: 11
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.colorGray_100,
  },
  loadingText: {
    marginTop: 10,
    color: Color.darkInk,
    fontSize: FontSize.size_sm,
    fontFamily: getFontFamily("500"),
    fontWeight: "500",
  },
});

export default ProfileDetail;