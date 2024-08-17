import * as React from "react";
import { useState, useEffect } from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable, TouchableOpacity, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Padding, FontSize, Color, FontFamily, Border } from "../GlobalStyles";
import { processUserVerifiedList, shortenAddress, truncateString } from "../Utils";
import CrowdsourceEventList from "./CrowdsourceEventList";
import CrowdsourceHiringList from "./CrowdsourceHiringList";
import { useAuth } from "./AuthProvider";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";

const ProfileDetail = ({ tab, userInfo, isShowSearch }) => {
  const navigation = useNavigation();

  const layout = useWindowDimensions();
  const [userVerifiedByImages, setUserVerifiedByImages] = useState([]);
  const [userVerifiedByNames, setUserVerifiedByNames] = useState('');
  const [userVerifiedImages, setUserVerifiedImages] = useState([]);
  const [userVerifiedNames, setUserVerifiedNames] = useState('');
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Post' },
    { key: 'second', title: 'Like' },
  ]);
  const [isShowCreate, setIsShowCreate] = useState(false);
  
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
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
    <View style={[styles.myProfile, isShowSearch && { display: "none" }]}>
      <View style={{
        flex: 1, flexDirection: "row", maxHeight: 120,

      }}>
        {userInfo?.profile_image ? (
          <Image
            style={[styles.myProfileItem]}
            contentFit="cover"
            source={userInfo.profile_image}
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
            <Text style={[styles.name6, styles.timeTypo]}>{userInfo?.name ? userInfo.name : "Name"}</Text>
            <Text style={[styles.endlessmeee6, styles.nameTypo]}>
              {userInfo?.screen_name ? `@${userInfo.screen_name}` : "@endlessmeee"}
            </Text>
          </View>
          <Text style={[styles.theBioText, styles.textTypo]}>
            {userInfo?.bio ? truncateString(userInfo.bio, 100) : "The bio text will be here. The maximum number of lines is 2 and that means max. characters is 100."}
          </Text>
        </View>
      </View>
      <View style={{
        flex: 1, flexDirection: "row", marginTop: 10, maxHeight: 30, gap: 10
        // borderColor:"red", borderWidth:2,
      }}>
        <TouchableOpacity
          style={[styles.editProfileWrapper, styles.profileWrapperSpaceBlock]}
          onPress={() => navigation.navigate(`EditProfile${tab}`)}
        >
          <Text style={[styles.editProfile, styles.editProfileTypo]}>
            Edit profile
          </Text>
        </TouchableOpacity>
        <View
          style={[styles.shareProfileWrapper, styles.profileWrapperSpaceBlock]}
        >
          <Text style={[styles.editProfile, styles.editProfileTypo]}>
            Share profile
          </Text>
        </View>
      </View>

      <View style={{
        // borderWidth:2, borderColor:"red", 
        height: "100%",
        flex: 1, padding: 10, gap: 8
      }}>
      <TouchableOpacity
          onPress={() => navigation.push(`Verified${tab}`, { tab, verifiedByParam: true, user:userInfo })}
        >
        <Text
          style={[
            styles.walletAddress0xedhvContainer,
          ]}
        >
          <Text style={styles.walletAddress}>{`Wallet Address: `}</Text>
          <Text style={styles.timeTypo}>{userInfo?.wallet_address ? shortenAddress(userInfo?.wallet_address) : " 0x00"}</Text>
        </Text>
        <Text
          style={[
            styles.walletAddress0xedhvContainer,
          ]}
        >
          <Text style={styles.walletAddress}>{`Verified by: `}</Text>

          <View style={{flexDirection:"row", alignItems:"center"}}>

                {userVerifiedByImages[0] && 
                  <CircularImage source={userVerifiedByImages[0]}></CircularImage>
                }
                {userVerifiedByImages[1] && 
              <View style={[styles.imageContainer, {
                // borderColor:'red',
                // borderWidth:2,
                position: 'absolute',
                top: 0,
                left: 20
              }]}>
                <Image source={userVerifiedByImages[1]} style={styles.image} />
              </View>
                }
              <Text style={[styles.samPolymathAnd, styles.textTypo, {marginLeft:15}]}>
                {userVerifiedByNames}
              </Text>
            </View>
        </Text>
      </TouchableOpacity>
        <TouchableOpacity
         style={{flexDirection:"row"}}
          onPress={() => navigation.push(`Verified${tab}`, { tab, verifiedByParam: false, user:userInfo })}
        >
          <Text
            style={[
              styles.walletAddress0xedhvContainer,
            ]}
          >
            <Text style={styles.walletAddress}>{`Verified: `}</Text>

            <View style={{flexDirection:"row", alignItems:"center"}}>

                {userVerifiedImages[0] && 
                  <CircularImage source={userVerifiedImages[0]}></CircularImage>
                }
                {userVerifiedImages[1] && 
              <View style={[styles.imageContainer, {
                // borderColor:'red',
                // borderWidth:2,
                position: 'absolute',
                top: 0,
                left: 20
              }]}>
                <Image source={userVerifiedImages[1]} style={styles.image} />
              </View>
                }
              <Text style={[styles.samPolymathAnd, styles.textTypo, {marginLeft:15}]}>
                {userVerifiedNames}
              </Text>
            </View>
            {/* <Image
              style={styles.groupIcon}
              contentFit="cover"
              source={require("../assets/photo-duo.png")}
            /> */}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.frameParent8, styles.topNavBg]}>

      <TabView
        navigationState={{ index, routes, tab, isShowSearch, isShowCreate }}        
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        style={{backgroundColor:  Color.colorGray_100}}
        initialLayout={{ width: layout.width }}
      />
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
      {/* <View style={[styles.frameParent13, styles.frameParentPosition]}>
        <View style={styles.ellipseParent}>
          <Text style={[styles.verifiedBy, styles.nameTypo]}>Verified by:</Text>
          <Image
            style={styles.groupIcon}
            contentFit="cover"
            //source={require("../assets/group-871.png")}
          />
          <Text style={[styles.samPolymathAnd, styles.textTypo]}>
            Sam, Polymath, and 12 others
          </Text>
        </View>
        <Pressable
          style={styles.verifiedParent}
          onPress={() => navigation.navigate("MyProfileYouVerifiedVerifiedBy")}
        >
          <Text style={[styles.verified, styles.nameTypo]}>Verified:</Text>
          <Image
            style={styles.groupIcon}
            contentFit="cover"
            //source={require("../assets/group-871.png")}
          />
          <Text style={[styles.samPolymathAnd, styles.textTypo]}>
            Sam, Polymath, and 2 others
          </Text>
        </Pressable>
      </View>       */}
    </View>
  );
};

const FirstRoute = ({index, routes, tab, isShowSearch, isShowCreate}) => {
  const { getUser } = useAuth();
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    getUser().then((user) => {
      // console.log(user)
      setUserInfo(user);
    });
  }, [])

  return (userInfo &&
    <View style={{ flex: 1}} >
        <CrowdsourceHiringList
          tab={tab}
          userInfo={userInfo}
          isProfile={false}
          isShowSearch={isShowSearch}
          isShowCreate={isShowCreate} />
    </View>)
  
};

const SecondRoute = ({index, routes, tab, isShowSearch, isShowCreate}) => {
  const { getUser } = useAuth();
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    getUser().then((user) => {
      // console.log(user)
      setUserInfo(user);
    });
  }, [])
  return (userInfo &&
    <View style={{ flex: 1 }} >
        <CrowdsourceEventList
          tab={tab}
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
    fontFamily: FontFamily.clashGrotesk,
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
  tabBar: {
      backgroundColor:   Color.colorGray_100, // Background color of the tab bar
    },
    indicator: {
      backgroundColor: '#ff4081', // Color of the selected tab indicator
    },
    label: {
      color: '#ffffff', // Color of the tab labels
    },
});

export default ProfileDetail;
