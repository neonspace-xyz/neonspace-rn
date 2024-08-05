import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Padding, FontSize, Color, FontFamily, Border } from "../GlobalStyles";
import PostList from "../components/PostList";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../components/SearchBar";
import ProfileDetail from "../components/ProfileDetail";

const MyProfile = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Color.colorGray_100} barStyle="light-content" />

      <SearchBar/>

      <ProfileDetail/>
  
      <PostList/>
    </SafeAreaView>
  )

  return (
    <View style={styles.myProfile}>
      <Image
        style={[styles.myProfileChild, styles.frameParent12Layout]}
        contentFit="cover"
        //source={require("../assets/frame-718.png")}
      />
      <View style={[styles.frameParent, styles.notchIconPosition]}>
        <View style={[styles.frameGroup, styles.frameSpaceBlock]}>
          <View style={styles.ellipseParent}>
            <Image
              style={[styles.frameChild, styles.svgrepoLayout]}
              contentFit="cover"
              //source={require("../assets/ellipse-2.png")}
            />
            <View style={styles.frameContainer}>
              <View style={styles.ellipseParent}>
                <Text style={[styles.name, styles.nameTypo]}>Name</Text>
                <Text style={[styles.endlessmeee, styles.nameTypo]}>
                  @endlessmeee
                </Text>
              </View>
              <Image
                style={styles.frameItem}
                contentFit="cover"
                //source={require("../assets/ellipse-141.png")}
              />
              <Text style={[styles.h, styles.textTypo]}>2h</Text>
            </View>
          </View>
          <Text
            style={[
              styles.christineJoinedNeonspace,
              styles.heartSvgrepoCom1ParentSpaceBlock,
            ]}
          >
            Christine joined #Neonspace!
          </Text>
          <View
            style={[
              styles.heartSvgrepoCom1Parent,
              styles.heartSvgrepoCom1ParentSpaceBlock,
            ]}
          >
            <Image
              style={styles.heartSvgrepoCom1Icon}
              contentFit="cover"
              //source={require("../assets/heartsvgrepocom-1.png")}
            />
            <Text style={[styles.text, styles.textTypo]}>1</Text>
          </View>
        </View>
        <View style={[styles.frameView, styles.frameSpaceBlock]}>
          <View style={styles.ellipseParent}>
            <Image
              style={[styles.frameChild, styles.svgrepoLayout]}
              contentFit="cover"
              //source={require("../assets/ellipse-22.png")}
            />
            <View style={styles.frameContainer}>
              <View style={styles.ellipseParent}>
                <Text style={[styles.name, styles.nameTypo]}>Name</Text>
                <Text style={[styles.endlessmeee, styles.nameTypo]}>
                  @endlessmeee
                </Text>
              </View>
              <Image
                style={styles.frameItem}
                contentFit="cover"
                //source={require("../assets/ellipse-141.png")}
              />
              <Text style={[styles.h, styles.textTypo]}>2h</Text>
            </View>
          </View>
          <Text
            style={[
              styles.christineJoinedNeonspace,
              styles.heartSvgrepoCom1ParentSpaceBlock,
            ]}
          >
            Christine joined #Neonspace!
          </Text>
          <View
            style={[
              styles.heartSvgrepoCom1Parent,
              styles.heartSvgrepoCom1ParentSpaceBlock,
            ]}
          >
            <Image
              style={styles.heartSvgrepoCom1Icon}
              contentFit="cover"
              //source={require("../assets/heartsvgrepocom-1-1.png")}
            />
            <Text style={[styles.text, styles.textTypo]}>2</Text>
          </View>
        </View>
        <View style={[styles.frameView, styles.frameSpaceBlock]}>
          <View style={styles.ellipseParent}>
            <Image
              style={[styles.frameChild, styles.svgrepoLayout]}
              contentFit="cover"
              //source={require("../assets/ellipse-21.png")}
            />
            <View style={styles.frameContainer}>
              <View style={styles.ellipseParent}>
                <Text style={[styles.name, styles.nameTypo]}>Name</Text>
                <Text style={[styles.endlessmeee, styles.nameTypo]}>
                  @endlessmeee
                </Text>
              </View>
              <Image
                style={styles.frameItem}
                contentFit="cover"
                //source={require("../assets/ellipse-141.png")}
              />
              <Text style={[styles.h, styles.textTypo]}>2h</Text>
            </View>
          </View>
          <Text
            style={[
              styles.christineJoinedNeonspace,
              styles.heartSvgrepoCom1ParentSpaceBlock,
            ]}
          >
            I’m so excited to be on this app and in this community! I love
            Neonrabbits!! I’m so excited to be on this app and in this
            community! I love Neonrabbits!! I’m so excited to be on this app and
            in this community! I love Neonrabbits!! I’m so excited to be on this
            app and in this comm...
          </Text>
          <View
            style={[
              styles.heartSvgrepoCom1Parent,
              styles.heartSvgrepoCom1ParentSpaceBlock,
            ]}
          >
            <Image
              style={styles.heartSvgrepoCom1Icon}
              contentFit="cover"
              //source={require("../assets/heartsvgrepocom-1.png")}
            />
            <Text style={[styles.text, styles.textTypo]}>1</Text>
          </View>
        </View>
        <View style={[styles.frameView, styles.frameSpaceBlock]}>
          <View style={styles.ellipseParent}>
            <Image
              style={[styles.frameChild, styles.svgrepoLayout]}
              contentFit="cover"
              //source={require("../assets/ellipse-23.png")}
            />
            <View style={styles.frameContainer}>
              <View style={styles.ellipseParent}>
                <Text style={[styles.name, styles.nameTypo]}>Name</Text>
                <Text style={[styles.endlessmeee, styles.nameTypo]}>
                  @endlessmeee
                </Text>
              </View>
              <Image
                style={styles.frameItem}
                contentFit="cover"
                //source={require("../assets/ellipse-141.png")}
              />
              <Text style={[styles.h, styles.textTypo]}>2h</Text>
            </View>
          </View>
          <Text
            style={[
              styles.christineJoinedNeonspace,
              styles.heartSvgrepoCom1ParentSpaceBlock,
            ]}
          >
            Christine joined #Neonspace!
          </Text>
          <View
            style={[
              styles.heartSvgrepoCom1Parent,
              styles.heartSvgrepoCom1ParentSpaceBlock,
            ]}
          >
            <Image
              style={styles.heartSvgrepoCom1Icon}
              contentFit="cover"
              //source={require("../assets/heartsvgrepocom-1.png")}
            />
            <Text style={[styles.text, styles.textTypo]}>1</Text>
          </View>
        </View>
        <View style={[styles.frameView, styles.frameSpaceBlock]}>
          <View style={styles.ellipseParent}>
            <Image
              style={[styles.frameChild, styles.svgrepoLayout]}
              contentFit="cover"
              //source={require("../assets/ellipse-24.png")}
            />
            <View style={styles.frameContainer}>
              <View style={styles.ellipseParent}>
                <Text style={[styles.name, styles.nameTypo]}>Name</Text>
                <Text style={[styles.endlessmeee, styles.nameTypo]}>
                  @endlessmeee
                </Text>
              </View>
              <Image
                style={styles.frameItem}
                contentFit="cover"
                //source={require("../assets/ellipse-141.png")}
              />
              <Text style={[styles.h, styles.textTypo]}>2h</Text>
            </View>
          </View>
          <Text
            style={[
              styles.christineJoinedNeonspace,
              styles.heartSvgrepoCom1ParentSpaceBlock,
            ]}
          >
            Christine joined #Neonspace!
          </Text>
          <View
            style={[
              styles.heartSvgrepoCom1Parent,
              styles.heartSvgrepoCom1ParentSpaceBlock,
            ]}
          >
            <Image
              style={styles.heartSvgrepoCom1Icon}
              contentFit="cover"
              //source={require("../assets/heartsvgrepocom-1.png")}
            />
            <Text style={[styles.text, styles.textTypo]}>1</Text>
          </View>
        </View>
        <View style={[styles.frameView, styles.frameSpaceBlock]}>
          <View style={styles.ellipseParent}>
            <Image
              style={[styles.frameChild, styles.svgrepoLayout]}
              contentFit="cover"
              //source={require("../assets/ellipse-24.png")}
            />
            <View style={styles.frameContainer}>
              <View style={styles.ellipseParent}>
                <Text style={[styles.name, styles.nameTypo]}>Name</Text>
                <Text style={[styles.endlessmeee, styles.nameTypo]}>
                  @endlessmeee
                </Text>
              </View>
              <Image
                style={styles.frameItem}
                contentFit="cover"
                //source={require("../assets/ellipse-141.png")}
              />
              <Text style={[styles.h, styles.textTypo]}>2h</Text>
            </View>
          </View>
          <Text
            style={[
              styles.christineJoinedNeonspace,
              styles.heartSvgrepoCom1ParentSpaceBlock,
            ]}
          >
            Christine joined #Neonspace!
          </Text>
          <View
            style={[
              styles.heartSvgrepoCom1Parent,
              styles.heartSvgrepoCom1ParentSpaceBlock,
            ]}
          >
            <Image
              style={styles.heartSvgrepoCom1Icon}
              contentFit="cover"
              //source={require("../assets/heartsvgrepocom-1.png")}
            />
            <Text style={[styles.text, styles.textTypo]}>1</Text>
          </View>
        </View>
      </View>
      <View style={styles.frameParent10}>
        <View style={styles.nameParent4}>
          <Text style={[styles.name6, styles.timeTypo]}>Name</Text>
          <Text style={[styles.endlessmeee6, styles.nameTypo]}>
            @endlessmeee
          </Text>
        </View>
        <Text style={[styles.theBioText, styles.textTypo]}>
          The bio text will be here. The maximum number of lines is 2 and that
          means max. characters is 100.
        </Text>
      </View>
      <Image
        style={[styles.myProfileItem, styles.frameParentPosition]}
        contentFit="cover"
        //source={require("../assets/ellipse-27.png")}
      />
      <View style={[styles.frameParent11, styles.frameParentPosition]}>
        <Pressable
          style={[styles.editProfileWrapper, styles.profileWrapperSpaceBlock]}
          onPress={() => navigation.navigate("EditMyProfile")}
        >
          <Text style={[styles.editProfile, styles.editProfileTypo]}>
            Edit profile
          </Text>
        </Pressable>
        <View
          style={[styles.shareProfileWrapper, styles.profileWrapperSpaceBlock]}
        >
          <Text style={[styles.editProfile, styles.editProfileTypo]}>
            Share profile
          </Text>
        </View>
      </View>
      <View style={[styles.frameParent12, styles.bottomNavPosition]}>
        <View style={[styles.postsWrapper, styles.wrapperFlexBox]}>
          <Text style={[styles.editProfile, styles.editProfileTypo]}>
            Posts
          </Text>
        </View>
        <View style={styles.wrapperFlexBox}>
          <Text style={[styles.editProfile, styles.editProfileTypo]}>
            Likes
          </Text>
        </View>
      </View>
      <Text
        style={[
          styles.walletAddress0xedhvContainer,
          styles.frameParentPosition,
        ]}
      >
        <Text style={styles.walletAddress}>{`Wallet Address: `}</Text>
        <Text style={styles.timeTypo}>0xe...dhv</Text>
      </Text>
      <View style={[styles.frameParent13, styles.frameParentPosition]}>
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
      </View>
      <View style={styles.topNav}>
        <Pressable
          style={styles.wrapperLayout}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={[styles.icon, styles.iconLayout]}
            contentFit="cover"
            //source={require("../assets/group-6.png")}
          />
        </Pressable>
        <Pressable
          style={[styles.searchByXHandleWrapper, styles.frameSpaceBlock]}
          onPress={() => navigation.navigate("Search")}
        >
          <Text style={[styles.searchByX, styles.nameTypo]}>
            Search by X handle
          </Text>
        </Pressable>
        <Pressable
          style={[styles.chatLineSvgrepoCom1, styles.svgrepoLayout]}
          onPress={() => navigation.navigate("AllChats")}
        >
          <Image
            style={[styles.icon1, styles.iconLayout]}
            contentFit="cover"
            //source={require("../assets/chatlinesvgrepocom-1.png")}
          />
        </Pressable>
        <Image
          style={[styles.vuesaxboldmoreIcon, styles.wrapperLayout]}
          contentFit="cover"
          //source={require("../assets/vuesaxboldmore.png")}
        />
      </View>
      <View style={[styles.statusBarIphone, styles.bottomNavFlexBox]}>
        <View style={styles.timeIphone}>
          <Text style={[styles.time, styles.timeTypo]}>9:41</Text>
        </View>
        <View style={styles.cellularwifibatteryIphone}>
          <View style={[styles.battery, styles.borderPosition]}>
            <View style={[styles.border, styles.borderPosition]} />
            <Image
              style={styles.capIcon}
              contentFit="cover"
              //source={require("../assets/cap.png")}
            />
            <View style={styles.capacity} />
          </View>
          <Image
            style={styles.wifiIcon}
            contentFit="cover"
            //source={require("../assets/wifi2.png")}
          />
          <Image
            style={styles.cellularConnectionIcon}
            contentFit="cover"
            //source={require("../assets/cellular-connection1.png")}
          />
        </View>
        <Image
          style={[styles.notchIcon, styles.notchIconPosition]}
          contentFit="cover"
          //source={require("../assets/notch.png")}
        />
      </View>
      <Image
        style={styles.vuesaxboldaddCircleIcon}
        contentFit="cover"
        //source={require("../assets/vuesaxboldaddcircle.png")}
      />
      <View style={[styles.bottomNav, styles.bottomNavFlexBox]}>
        <Pressable
          style={[styles.home1SvgrepoComParent, styles.svgrepoParentLayout]}
          onPress={() => navigation.navigate("Home")}
        >
          <Image
            style={[styles.home1SvgrepoComIcon, styles.svgrepoLayout]}
            contentFit="cover"
            //source={require("../assets/home1svgrepocom1.png")}
          />
          <Text style={[styles.home, styles.homeTypo]}>Home</Text>
        </Pressable>
        <View style={styles.svgrepoParentLayout}>
          <Image
            style={[styles.home1SvgrepoComIcon, styles.svgrepoLayout]}
            contentFit="cover"
            //source={require("../assets/notificationsvgrepocom-12.png")}
          />
          <Text style={[styles.notification, styles.homeTypo]}>
            Notification
          </Text>
        </View>
        <Pressable
          style={styles.svgrepoParentLayout}
          onPress={() => navigation.navigate("Wallet")}
        >
          <Image
            style={[styles.home1SvgrepoComIcon, styles.svgrepoLayout]}
            contentFit="cover"
            //source={require("../assets/walletsvgrepocom-11.png")}
          />
          <Text style={[styles.notification, styles.homeTypo]}>Wallet</Text>
        </Pressable>
        <View style={styles.profile1341SvgrepoCom1Parent}>
          <Image
            style={[styles.home1SvgrepoComIcon, styles.svgrepoLayout]}
            contentFit="cover"
            //source={require("../assets/profile1341svgrepocom-11.png")}
          />
          <Text style={[styles.profile, styles.homeTypo]}>Profile</Text>
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
    justifyContent: 'flex-start',
    flexDirection:"column",
    alignItems: "center",
    // borderColor:"red",
    // borderWidth:5,
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
  frameParentPosition: {
    left: 14,
    position: "absolute",
  },
  profileWrapperSpaceBlock: {
    paddingVertical: Padding.p_9xs,
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
    top: 101,
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
    top: 123,
    left: 116,
    width: 260,
    justifyContent: "center",
    position: "absolute",
  },
  myProfileItem: {
    top: 115,
    width: 90,
    height: 90,
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
    marginLeft: 12,
  },
  frameParent11: {
    top: 219,
    flexDirection: "row",
    width: 362,
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
    top: 258,
    width: 217,
    textAlign: "left",
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
    width: 218,
    marginLeft: 8,
    textAlign: "left",
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
    height: 844,
    overflow: "hidden",
    width: "100%",
    flex: 1,
    backgroundColor: Color.colorGray_200,
  },
});

export default MyProfile;
