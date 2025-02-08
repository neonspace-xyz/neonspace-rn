import * as React from "react";
import { useState, useEffect } from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, TouchableOpacity, useWindowDimensions, Pressable, ActivityIndicator, Modal, Platform } from "react-native";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
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
import PostLikeList from "./PostLikeList";
import { IMG_PROFILE } from "../Constant";

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
  const [showMintPrompt, setShowMintPrompt] = useState(false);

  useEffect(() => {
    if (route?.params?.isFullBio) {
      setIsFullBio(route.params?.isFullBio)
    }
  }, [route.params?.isFullBio])

  const [routes] = React.useState([
    { key: 'first', title: 'Posts' },
    { key: 'second', title: 'Crowdsource' },
    // { key: 'third', title: 'Minting' },
    { key: 'forth', title: 'Likes' },
  ]);

  // console.log('ProfileDetail : ', userInfo)

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
      // activeColor="blue" // Highlight active tab
      // inactiveColor="gray" // Inactive tab color
      renderLabel={({ route, focused, color }) => {
        const customLabelStyle = focused
          ? styles.labelActive  // Active tab style
          : styles.labelInactive; // Inactive tab style
  
        return (
          <Text style={[customLabelStyle, { color }]}>
            {route.title}
          </Text>
        );
      }}
    />
  );

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

  const handleBioToggle = () => {
    setIsFullBio(!isFullBio);
  };

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
            // borderWidth:2, borderColor:'blue',
            backgroundColor: Color.colorGray_100
          }}>
            <View style={{
              // borderWidth:2, borderColor:"red",
              // flex: 1, 
              flexDirection: "row"
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
              flexDirection: "row", maxHeight: 30, gap: 10
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
                {
                  borderColor: isFullBio ? 'red' : 'white'
                }]}
                onPress={handleBioToggle}
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
              // gap:5,
              // flexGrow:0,
              marginTop: 10,
              paddingLeft: 10
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
                  marginTop: 10,
                  marginBottom: 10
                  // borderWidth:2, borderColor:"red"
                }}
                onPress={() => {
                  navigation.push(`Verified${tab}`, { tab, verifiedByParam: true, user: userInfo })
                }}
              >
                <View
                  style={[
                    {
                      flexDirection: "row",
                      alignItems: "center",
                    },
                  ]}
                >
                  <Text style={styles.verifiedByTitle}>{`Verified by: `}</Text>

                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {userVerifiedByImages[0] &&
                      <View style={[{
                        // borderWidth:2, borderColor:'red', 
                        width: 30
                      }]}>
                        <Image source={userVerifiedByImages[0]} style={styles.image} />
                      </View>
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

                    <Text style={[styles.userVerifiedByNames]}>
                      {userVerifiedByNames}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  //  borderWidth:2, borderColor:"red"
                }}
                onPress={() => navigation.push(`Verified${tab}`, { tab, verifiedByParam: false, user: userInfo })}
              >
                <View
                  style={[
                    {
                      flexDirection: "row",
                      // flex:1,     
                      alignItems: "center",
                    },
                  ]}
                >
                  <Text style={styles.verifiedByTitle}>{`Verified: `}</Text>

                  <View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      {userVerifiedImages[1] ?
                        <View style={[styles.imageContainer, {
                          width: userVerifiedImages.length * 23,
                          height: 32,
                          position: 'relative'
                        }]}>
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
                        </View> :
                        <View style={[{
                          // borderWidth:2, borderColor:'red', 
                          width: 30
                        }]}>
                          <Image source={userVerifiedImages[0]} style={styles.image} />
                        </View>
                      }
                      {/* {userVerifiedImages[0] &&
                        <View style={[{
                          // borderWidth:2, borderColor:'red', 
                          width: 30
                        }]}>
                          <Image source={userVerifiedImages[0]} style={styles.image} />
                        </View>
                      }
                      {userVerifiedImages[1] &&
                        <View style={[styles.imageContainer, {
                          width: userVerifiedImages.length * 23,
                          height: 32,
                          position: 'relative'
                        }]}>
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
                      } */}

                      <Text style={[styles.userVerifiedByNames]}>
                        {userVerifiedNames}
                      </Text>
                    </View>

                  </View>
                </View>
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
                  style={{
                    backgroundColor: Color.colorGray_100,
                    // borderWidth:2, 
                    // borderColor:'red', 
                    marginBottom: Platform.OS == "ios" ? -35 : 0
                  }}
                  initialLayout={{ width: layout.width }}
                />
                :
                <FullBio userInfo={userInfo} isOtherProfile={false} />
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

      {/* Add Mint Prompt Modal */}
      <Modal
        transparent={true}
        visible={showMintPrompt}
        animationType="fade"
        onRequestClose={() => setShowMintPrompt(false)}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={() => setShowMintPrompt(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modalContent}
            onPress={e => e.stopPropagation()}
          >
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowMintPrompt(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>

            <Image
              style={styles.modalImage}
              source={userInfo?.profile_image}
            />
            <Text style={styles.modalTitle}>
              To view full bio, you should mint Christine's bio!
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.mintButton}
                onPress={() => {
                  setShowMintPrompt(false);
                  // Add mint navigation or action here
                }}
              >
                <Text style={styles.mintButtonText}>Mint</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
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
    <View style={{
      flex: 1,
      // borderWidth:2, 
      // borderColor:'red'
    }}>
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
    <View style={{ flex: 1 }}>
      <CrowdListHiring
        tab={4}
        usersession={usersession}
        userInfo={userInfo}
        isProfile={true}
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

const ForthRoute = () => {
  console.log('Rendering forth route');
  const { getUser } = useAuth();
  const { api } = useAuth();
  const [itemLikes, setItemLikes] = useState([]);

  const getLikes = async (userInfo) => {
    console.log(`getLikes-userInfo`, userInfo.user_id);
    let result = [];
    url = `/user/likes?userId=${userInfo.user_id}`;
    let resp = await api.get(url);
    let posts = resp.data.liked_posts;
    //console.log("POSTS: ", posts)
    for (const post of posts) {
      result.push({
        user_id: post.user_id,
        type: 'like',
        item_type: 'post',
        from: userInfo.screen_name,
        to: post.user_info.username,
        screen_name: `${post.user_info.username}`,
        image: post.user_info.profile_image_url,
        post_id: post.id,
        datetime: post?.created_at,
        text: post?.content,
        name: `${post.user_info.name}`
      });
    }
    return result;
  }

  function getRandomString() {
    const options = ["post", "crowdsource"];
    return options[Math.floor(Math.random() * options.length)];
  }
  
  const setLikes = async (user) => {
    // console.log('setLikes : ', user)
    let _likes = await getLikes(user);
    let items = []
    for (let j = 0; j < _likes.length; j++) {
      items.push({
        id: _likes[j]?.post_id,
        // item_type: _likes[j]?.item_type,
        user_id: _likes[j]?.user_id,
        item_type: getRandomString(),
        name: _likes[j]?.to,
        screen_name: _likes[j]?.screen_name,
        username: `Liked @${_likes[j]?.to}'s post`,
        fullname: _likes[j]?.name,
        image: _likes[j]?.image,
        bio: ``,
        datetime: _likes[j]?.datetime,
        text: _likes[j].text,

        title: "Crowdsource Title",
        salary_range: "Salary Range",
        company:"Company",
        location:"Location",
        description:"Description",
        view:1,
        like:10
      })
    }
    console.log("Item likes : ",itemLikes)
    setItemLikes(items);
  };


  useFocusEffect(
    React.useCallback(() => {
      getUser().then(async(user) => {
        setLikes(user);
      });
    }, [])
  );
  


  return (<View>
  {itemLikes ?
      <PostLikeList
        tab={4}
        itemLikes={itemLikes} 
          fetchItems={() => {
            getUser().then(async(user) => {
              setLikes(user);
            });
          }}
        />
        :
        <Text>NOT FOUND</Text>}
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
  verifiedByTitle: {
    height: 20,
    color: Color.darkInk,
    fontSize: FontSize.labelLarge_size,
    fontFamily: getFontFamily("400"),
    fontWeight: "400",
    marginRight: 5
    // borderColor:'red', 
    // borderWidth:2,
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
  userVerifiedByNames: {
    fontSize: FontSize.size_xs,
    color: Color.darkInk,
    fontFamily: getFontFamily(400),
    fontWeight: 400,
    marginLeft: 5,
    // borderColor:'blue',
    // borderWidth:2,
    height: 15,
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
    // height: 10,
    flex: 1,
    // alignItems: 'flex-start',

    // paddingHorizontal: 12,
    backgroundColor: Color.colorGray_200,
    // borderColor:'red',
    // borderWidth:2
  },
  frameParent8: {
    // borderWidth:2,
    // borderColor:'red',
    // height:200,
    flex: 1
    // flexGrow: 1.6
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
    flex: 1,
    // paddingHorizontal: Padding.p_xs,
    justifyContent: "center",
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Color.colorGray_100,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    position: 'relative',
  },
  modalImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 100,
    overflow: 'hidden',
  },
  modalTitle: {
    color: Color.darkInk,
    fontSize: FontSize.size_lg,
    fontFamily: getFontFamily("600"),
    textAlign: 'center',
    marginBottom: 20,
  },
  mintButton: {
    backgroundColor: Color.colorDarkslategray_400,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  mintButtonText: {
    color: Color.darkInk,
    fontSize: FontSize.size_lg,
    fontFamily: getFontFamily("600"),
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1,
    padding: 10,
  },
  closeButtonText: {
    color: Color.darkInk,
    fontSize: 20,
    fontWeight: "600",
    fontFamily: getFontFamily("600"),
  },
});

export default ProfileDetail;