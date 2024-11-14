import { StyleSheet, View, useWindowDimensions, StatusBar } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useAuth } from '../components/AuthProvider';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import CrowdListHiring from '../components/CrowdListHiring';
import CrowdListEvent from '../components/CrowdListEvent';
import CrowdListQuest from '../components/CrowdListQuest';
import { Color } from '../GlobalStyles';
import { CROWD } from '../Constant';
import { getSession } from '../Utils';

const FirstRoute = ({ route }) => {
  const { getUser, getSession } = useAuth();
  const [userInfo, setUserInfo] = useState();
  const [usersession, setUsersession] = useState();

  useEffect(() => {
    getUser().then((user) => {
      setUserInfo(user);
    });
    getSession().then((item) => {
      setUsersession(item)
    })
  }, [])

  return (userInfo &&
    <View style={styles.containerTab} >
      <CrowdListHiring
        tab={route.tab}
        isProfile={false}
        usersession={usersession}
        userInfo={userInfo} />
    </View>)
};

const SecondRoute = ({ route }) => {
  const { getUser, getSession } = useAuth();
  const [userInfo, setUserInfo] = useState();
  const [usersession, setUsersession] = useState();

  useEffect(() => {
    getUser().then((user) => {
      setUserInfo(user);
    });
    getSession().then((item) => {
      setUsersession(item)
    })
  }, [])

  return (userInfo &&
    <View style={styles.containerTab} >
      <CrowdListEvent
        tab={route.tab}
        isProfile={false}
        usersession={usersession}
        userInfo={userInfo} />
    </View>)
};

const ThirdRoute = ({ route }) => {
  const { getUser, getSession } = useAuth();
  const [userInfo, setUserInfo] = useState();
  const [usersession, setUsersession] = useState();

  useEffect(() => {
    getUser().then((user) => {
      setUserInfo(user);
    });
    getSession().then((item) => {
      setUsersession(item)
    })
  }, [])

  return (userInfo &&
    <View style={styles.containerTab} >
      <CrowdListQuest
        tab={route.tab}
        isProfile={false}
        usersession={usersession}
        userInfo={userInfo} />
    </View>)
};
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute
});

export default function CrowdsourceView({ route }) {
  const layout = useWindowDimensions();
  const { tab } = route?.params;

  const [index, setIndex] = React.useState(0);
  const [routes] = useState([
    { key: 'first', title: CROWD.HIRING, tab: 5 },
    { key: 'second', title: CROWD.EVENT, tab: 5 },
    { key: 'third', title: CROWD.QUEST, tab: 5 },
  ]);

  const [isShowSearch, setIsShowSearch] = useState(false);

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
      backgroundColor: Color.colorGray_100,
      // borderColor:'red',
      // borderWidth:2
    },
    text: {
      fontSize: 20,
    },
    tabBar: {
      backgroundColor: Color.colorGray_100, // Background color of the tab bar
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
    <SafeAreaView style={styles.container}>
      <Header
        tab={tab}
        isHideList={!isShowSearch}
        isShowSearch={isShowSearch}
        setIsShowSearch={setIsShowSearch}
      />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        initialLayout={{ width: layout.width }}
        style={{ backgroundColor: Color.colorBlack }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerTab: {
    flex: 1,
    width: "100%",
    height:"100%",
    overflow: "hidden",
    // justifyContent: 'center',
    // alignItems: "center",
    backgroundColor: Color.colorGray_100,
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