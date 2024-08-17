import { Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useAuth } from '../components/AuthProvider';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import PostList from '../components/PostList';
import CrowdsourceHiringList from '../components/CrowdsourceHiringList';
import CrowdsourceEventList from '../components/CrowdsourceEventList';
import CrowdsourceQuestList from '../components/CrowdsourceQuestList';
import { Color } from '../GlobalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import Header3 from '../components/Header3';

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

const ThirdRoute = ({index, routes, tab, isShowSearch, isShowCreate}) => {
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
        <CrowdsourceQuestList
          tab={tab}
          userInfo={userInfo}
          isProfile={false}
          isShowSearch={isShowSearch}
          isShowCreate={isShowCreate} />
    </View>)
};
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute
});

export default function CrowdsourceView({ route }) {
  const layout = useWindowDimensions();
  const { getSession, getUser } = useAuth();
  const { tab } = route?.params;

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Hiring' },
    { key: 'second', title: 'Event' },
    { key: 'third', title: 'Quest' },
  ]);
  
  const [usersession, setUsersession] = useState();
  const [userInfo, setUserInfo] = useState();
  const [isShowCreate, setIsShowCreate] = useState(false);
  const [isShowSearch, setIsShowSearch] = useState(false);
  
  const doPostCreate = () => {
    setIsShowCreate(true);
  };

  useEffect(() => {
    getSession().then((session) => {
      setUsersession(session)
    });
  },[]);
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={styles.tabBar}
      indicatorStyle={styles.indicator}
      labelStyle={styles.label}
    />
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 20,
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

  containerFAB: {
    position: 'absolute',
    zIndex: 1,
    bottom: 30,
    right: 30,
  },
  FAB: {
    backgroundColor: Color.darkInk, // Adjust color as needed
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  });

  return (
    <>
      <Header3
          tab={tab}
          isHideList={!isShowSearch}
          isShowSearch={isShowSearch}
          setIsShowSearch={setIsShowSearch}
      />

      <TabView
        navigationState={{ index, routes, tab, isShowSearch, isShowCreate }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        style={{backgroundColor:  Color.colorGray_100}}
        initialLayout={{ width: layout.width }}
      />

      {isShowCreate && (
        <PostCreate
          usersession={usersession}
          setIsShowCreate={setIsShowCreate} />
      )}
      {!isShowCreate && (
        <View style={styles.containerFAB}>
          <Pressable style={styles.FAB} onPress={doPostCreate}>
            <Icon name="add" size={45} color={Color.colorBlack} />
          </Pressable>
        </View>
      )}
    </>
  );
}
