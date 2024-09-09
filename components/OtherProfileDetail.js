import * as React from "react";
import { useState } from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable, TouchableOpacity, useWindowDimensions, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Padding, FontSize, Color, FontFamily, Border } from "../GlobalStyles";
import { getRandomNumber, processUserVerifiedList, shortenAddress, truncateString } from "../Utils";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "./AuthProvider";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { IMG_PROFILE } from "../Constant";
import CrowdListHiring from "./CrowdListHiring";
import PostList from "./PostList";
import PostLikeList from "./PostLikeList";

const OtherProfileDetail = ({ tab, userInfo, isShowSearch }) => {
  const { api, getUser } = useAuth();
  const navigation = useNavigation();
  const layout = useWindowDimensions();
  const [user, setUser] = useState();
  const [userInfo2, setUserInfo2] = useState(userInfo);
  const [isVerified, setIsVerified] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [userVerifiedByImages, setUserVerifiedByImages] = useState([]);
  const [userVerifiedByNames, setUserVerifiedByNames] = useState('-');
  const [userVerifiedImages, setUserVerifiedImages] = useState([]);
  const [userVerifiedNames, setUserVerifiedNames] = useState('-');
  const [index, setIndex] = React.useState(0);
  const [isFullBio, setIsFullBio] = useState(false);
  const [isShowCreate, setIsShowCreate] = useState(false);

  useEffect(() => {
    doRefreshUserInfo();
    getUser().then((data) => {
      setUser(data);
    })
  }, [])

  useEffect(() => {
    const check = async () => {
      if (!userInfo2) return;

      if (userInfo2?.verified_by) {
        let { names: names1, images: images1 } = processUserVerifiedList(userInfo2?.verified_by);
        setUserVerifiedByNames(names1);
        setUserVerifiedByImages(images1);
      }

      if (userInfo2?.verified) {
        let { names: names2, images: images2 } = processUserVerifiedList(userInfo2?.verified);
        setUserVerifiedNames(names2);
        setUserVerifiedImages(images2);
      }

      let usersession = await AsyncStorage.getItem("usersession");
      usersession = JSON.parse(usersession);

      if (userInfo2.verified?.length > 0) {
        for (const item of userInfo2.verified) {
          if (usersession.user_info.user_id == item.user_id) {
            setIsVerified(true);
            break;
          }
        }
      }
    }

    check();

  }, [userInfo2])

  const doRefreshUserInfo = async () => {
    try {
      if (!userInfo2?.user_id) return;
      let url = `/user/getUser?userId=${userInfo2.user_id}`;
      console.log("url", url)
      let resp = await api.get(url);
      let data = resp.data;
      console.log("data", data)
      setUserInfo2(data);
    } catch (error) {
      console.error("doRefreshUserInfo", error);
    }
  }
  const doVerify = async () => {
    console.log("Do verify : ", userInfo2)
    if (!userInfo2?.user_id) {
      console.log('user ID undefined')
      Alert.alert("User ID undefined");
      return;
    }
    try {
      setLoadingVerify(true);
      let body = {
        "user_id": userInfo2.user_id,
        "verify": !isVerified
      }
      let resp = await api.post('/user/updateVerification', body)
      Alert.alert("Verify Success");
      setIsVerified(!isVerified);
      await doRefreshUserInfo();
    } catch (error) {
      Alert.alert("Verify failed", error)
      console.error("doVerify", error);
    } finally {
      setLoadingVerify(false);
    }
  }

  const [routes] = React.useState([
    { key: 'first', title: 'Posts' },
    { key: 'second', title: 'Crowdsource' },
    { key: 'third', title: 'Minting' },
    { key: 'forth', title: 'Likes' },
  ]);
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
    />
  );

  const CircularImage = ({ source }) => {
    return (
      <View style={styles.imageContainer}>
        <Image source={source} style={styles.image} />
      </View>
    );
  };
  return (
    <View style={styles.myProfile}>
      <View style={{
        flex: 1, flexDirection: "row", maxHeight: 120,

      }}>
        {userInfo2?.profile_image ? (
          <Image
            style={[styles.myProfileItem]}
            contentFit="cover"
            source={userInfo2.profile_image}
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
            <Text style={[styles.name6, styles.timeTypo]}>{userInfo2?.name ? userInfo2.name : "Name"}</Text>
            <Text style={[styles.endlessmeee6, styles.nameTypo]}>
              {userInfo2?.screen_name ? `@${userInfo2.screen_name}` : "@username"}
            </Text>
          </View>
          <Text style={[styles.theBioText, styles.textTypo]}>
            {userInfo2?.bio ? truncateString(userInfo2.bio, 100) : ""}
          </Text>
        </View>
      </View>
      <View style={{
        flex: 1, flexDirection: "row", maxHeight: 30, gap: 2
      }}>
        {user?.user_id == userInfo2?.user_id ? (
          <>
            <TouchableOpacity
              style={[styles.editProfileWrapper, styles.profileWrapperSpaceBlock]}
              onPress={() => navigation.navigate(`EditProfile${tab}`)}
            >
              <Text style={[styles.editProfile, styles.editProfileTypo]}>
                Edit profile
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={[styles.verifyWrapper, styles.profileWrapperSpaceBlock]}
              disabled={loadingVerify}
              onPress={doVerify}
            >
              <Text style={[styles.verify, styles.verifyTypo]}>
                {loadingVerify ? isVerified ? "Unverifying..." : "Verifying..." : isVerified ? "Unverify" : "Verify"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.editProfileWrapper, styles.profileWrapperSpaceBlock]}
            // onPress={() => {
            //   navigation.push(`ChatView${tab}`, { tab, userInfo: userInfo2 })
            // }}
            >
              <Text style={[styles.editProfile, styles.editProfileTypo]}>
                Full Bio
              </Text>
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity
          style={{
            borderWidth: 1.5, borderColor: 'transparent', marginHorizontal: 5
          }}
          onPress={() => {
            navigation.push(`ChatView${tab}`, { tab, userInfo: userInfo2 })
          }}
        >
          <Image
            style={{
              width: 25, height: 25,

            }}
            source={require("../assets/ic_chat.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity style={{
          borderWidth: 1.5, borderColor: 'transparent', marginLeft: 5, marginRight: 10
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
        height: "100%",
        flex: 1, padding: 10, gap: 8
      }}>
        <Text
          style={[
            styles.walletAddress0xedhvContainer,
          ]}
        >
          <Text style={styles.walletAddress}>{`Wallet Address: `}</Text>
          <Text style={styles.timeTypo}>{userInfo2?.wallet_address ? shortenAddress(userInfo2?.wallet_address) : " 0x00"}</Text>
        </Text>
        
        <TouchableOpacity
            style={{
              marginTop: 15
              // borderWidth:2, borderColor:"red"
            }}
            onPress={() => navigation.push(`Verified${tab}`, { tab, verifiedByParam: true, user: userInfo2 })}
          >
            <Text
              style={[
                styles.walletAddress0xedhvContainer,
              ]}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap:5, flex:1  }}>
                <Text style={[styles.walletAddress, { color:'white'}]}>{`Verified by: `}</Text>
              
                
                <View style={{
                  // borderColor:'red', 
                  // borderWidth:2, 
                  width:userVerifiedByImages.length*23, 
                  height:32,
                  position:'relative'}}>
                  {
                    userVerifiedByImages.map((e, index) => {
                      return (
                          <Image key={index} source={e} style={[styles.image, {
                            zIndex:9999-index,
                          position:'absolute',left:20*index
                          }]} />
                      )
                    })
                  }
                </View>
                <Text style={[styles.samPolymathAnd, styles.textTypo, {paddingLeft:4}]}>
                  {userVerifiedByNames}
                </Text>
              </View>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              marginTop: 15
              // borderWidth:2, borderColor:"red"
            }}
            onPress={() => navigation.push(`Verified${tab}`, { tab, verifiedByParam: true, user: userInfo2 })}
          >
            <Text
              style={[
                styles.walletAddress0xedhvContainer,
              ]}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap:5, flex:1 }}>
                <Text style={[styles.walletAddress, { color:'white'}]}>{`Verified: `}</Text>
              
                
                <View style={{
                  // borderColor:'red', 
                  // borderWidth:2, 
                  width:userVerifiedImages.length*23, 
                  height:32,
                  position:'relative'}}>
                  {
                    userVerifiedImages.map((e, index) => {
                      return (
                          <Image key={index} source={e} style={[styles.image, {
                            zIndex:9999-index,
                          position:'absolute',left:20*index
                          }]} />
                      )
                    })
                  }
                </View>
                <Text style={[styles.samPolymathAnd, styles.textTypo, {paddingLeft:4}]}>
                  {userVerifiedNames}
                </Text>
              </View>
            </Text>
          </TouchableOpacity>
        
      
      </View>

      <View style={[styles.frameParent8, styles.topNavBg]}>
        <TabView
          navigationState={{ index, routes, tab, isShowSearch, isShowCreate }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
          style={{ backgroundColor: Color.colorGray_100, marginBottom: -40 }}
          initialLayout={{ width: layout.width }}
        />
        {/* <Pressable
          style={styles.verifiedWrapperFlexBox}
        // onPress={() => navigation.navigate("MyProfileYouVerifiedVerifiedBy")}
        >
          <Text style={[styles.youVerified, styles.bioExampleTypo]}>
            Posts
          </Text>
        </Pressable>
        <View style={[styles.verifiedByWrapper, styles.verifiedWrapperFlexBox]}>
          <Text style={[styles.youVerified, styles.bioExampleTypo]}>
            Likes
          </Text>
        </View> */}
      </View>
    </View>
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
        isProfile={false}
        usersession={usersession}
        userInfo={userInfo} />
      {/* <CrowdListHiring
        tab={4}
        userInfo={userInfo}
        isProfile={false}
        isShowSearch={isShowSearch}
        isShowCreate={isShowCreate} /> */}
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
      <CrowdListHiring
        tab={4}
        userInfo={userInfo}
        isProfile={false}
        isShowSearch={isShowSearch}
        isShowCreate={isShowCreate} />
    </View>)

};

const ForthRoute = ({ index, routes, tab, isShowSearch, isShowCreate }) => {
  const { getUser } = useAuth();
  const [userInfo, setUserInfo] = useState();
  const [itemLikes, setItemLikes] = useState();

  useEffect(() => {
    getUser().then((user) => {
      setUserInfo(user);
    });

    const setLikes = () => {
      let like = getRandomNumber(10, 15);
      let itemLikes = [];
      for (let j = 0; j < like; j++) {
        itemLikes.push({
          name: `Name${j}`,
          username: `@username${j}`,
          image: IMG_PROFILE[getRandomNumber(0, 4)],
          bio: `Founder at ChainCredit. #DYOR ${j}`,
        })
      }
      setItemLikes(itemLikes);
    };
    setLikes();
  }, [])
  return (userInfo &&
    <View style={{ flex: 1 }} >
      {/* <CrowdListEvent
        tab={4}
        userInfo={userInfo}
        isProfile={false}
        isShowSearch={isShowSearch}
        isShowCreate={isShowCreate} /> */}
      <PostLikeList
        tab={4}
        itemLikes={itemLikes} />
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
  verify: {
    color: Color.colorBlack,
    fontWeight: "500",
  },
  verifyTypo: {
    fontSize: FontSize.size_sm,
    textAlign: "left",
    fontFamily: FontFamily.clashGrotesk,
  },
  verifyWrapper: {
    borderWidth: 1.5,
    borderRadius: Border.br_5xs,
    paddingVertical: Padding.p_9xs,
    borderColor: Color.darkInk,
    borderStyle: "solid",
    flexDirection: "row",
    paddingHorizontal: Padding.p_xs,
    alignItems: "center",
    flex: 1,
    backgroundColor: Color.darkInk,
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
    fontFamily: FontFamily.clashGrotesk,
  },
  profileWrapperSpaceBlock: {
    justifyContent: "center",
    marginHorizontal: 5,
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
  },
  endlessmeee6: {
    textAlign: "left",
    color: Color.darkInk,
    fontFamily: FontFamily.clashGrotesk,
  },
  nameParent4: {
    justifyContent: "center",
  },
  theBioText: {
    marginTop: 8,
    textAlign: "left",
    alignSelf: "stretch",
    fontSize: FontSize.size_xs,
  },
  frameParent10: {
    // borderColor:"red", borderWidth:2,
    width: 260,
    padding: 10
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
    fontFamily: FontFamily.clashGrotesk,
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
    width: "100%",
    height: "45%",
    paddingHorizontal: 12,
    backgroundColor: Color.colorGray_200,
  },
  frameParent8: {
    // borderColor:"blue",
    // borderWidth:2,
    // top: 101,
    // paddingTop: Padding.p_9xs,
    // marginLeft: -195,
    // backgroundColor: Color.colorGray_100,
    height: 40
    // left: "50%",
    // position: "absolute",
  },
  topNavBg: {
    backgroundColor: Color.colorGray_100,
    flexDirection: "row",
    width: "100%"
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
    width: '100%',
    height: '100%',
    borderRadius: 50,
    resizeMode: 'cover',
  },
});

export default OtherProfileDetail;
