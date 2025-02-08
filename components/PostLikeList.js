import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import { Color } from "../GlobalStyles";
import EmptyView from "./EmptyView";
import PostLikeSection from "./PostLikeSection";
import PostSection from "./PostSection";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import CrowdSectionHiring from "./CrowdSectionHiring";
import { useNavigation } from "@react-navigation/core";

const PostLikeList = ({ tab, itemLikes, fetchItems }) => {
  const { getSession, getUser } = useAuth();
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState();
  const [usersession, setUsersession] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchItems();
    setRefreshing(false);
  };

  useEffect(() => {
    getUser().then((user) => {
      setUserInfo(user);
    });
    getSession().then((user) => {
      setUsersession(user);
    })
  }, [])

  
  const handleDetail = (item) => {
    setSelectedItemIndex(null);
    navigation.push(`PostDetail${tab}`, { tab, item });
  };

  const handleCrowdsourceDetail = (item) => {
    setSelectedItemIndex(null);
    navigation.push(`CrowdDetailHiring${tab}`, { tab, item });
  };

  return (
    <View style={[styles.containerList]}>
      <FlatList
        style={styles.flat}
        data={itemLikes}
        ListEmptyComponent={() => {
          return <EmptyView loadingMore={false} />
        }}
        renderItem={({ item }) => {
          return (
            item?.item_type=='post' ?
              <PostSection
                tab={tab}
                isDetail={false}
                index={0}
                item={item}
                userInfo={userInfo}
                onPress={() => handleDetail(item)}
                // onMore={handleMore}
                // onRefresh={onRefresh}
            /> : item?.item_type=='crowdsource' ?
              <CrowdSectionHiring
                tab={tab}
                isDetail={false}
                index={0}
                item={item}
                userInfo={userInfo}
                onPress={() => handleCrowdsourceDetail(item)}
                onMore={() => {}}
              /> : <></>
          )
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            title="Pull to refresh"
            titleColor={Color.darkInk}
            colors={[Color.darkInk]}
            tintColor={Color.darkInk}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerList: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: Color.colorGray_200,
  },
  flat: {
    width: "100%"
  },
});

export default PostLikeList;
