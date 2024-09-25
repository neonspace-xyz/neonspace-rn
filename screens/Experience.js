import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable, StatusBar, Switch, TextInput, FlatList, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Padding, FontSize, Color, FontFamily, Border, getFontFamily } from "../GlobalStyles";
import PostList from "../components/PostList";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../components/SearchBar";
import ProfileDetail from "../components/ProfileDetail";
import { useAuth } from "../components/AuthProvider";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import EmptyView from "../components/EmptyView";

const Experience = () => {
  const navigation = useNavigation();
  const tab = 4;

  const data = [
    {
      id: '1',
      role: 'Developer relations',
      company: 'Polygon Labs - Full-time',
      duration: 'May 2023 - Present',
      description:
        'Lorem ipsum text here long text example here hello lorem ipsum dolor sit amet. Lorem ipsum text here long text example here hello lorem ipsum dolor sit amet.',
      verifiedBy: 'Verified by Sam, and 12 others',
    },
    {
      id: '2',
      role: 'Developer relations',
      company: 'Polygon Labs - Full-time',
      duration: 'May 2023 - Present',
      description:
        'Lorem ipsum text here long text example here hello lorem ipsum dolor sit amet. Lorem ipsum text here long text example here hello lorem ipsum dolor sit amet.',
      verifiedBy: 'Verified by Sam, and 12 others',
    },
    {
      id: '3',
      role: 'Developer relations',
      company: 'Polygon Labs - Full-time',
      duration: 'May 2023 - Present',
      description:
        'Lorem ipsum text here long text example here hello lorem ipsum dolor sit amet. Lorem ipsum text here long text example here hello lorem ipsum dolor sit amet.',
      verifiedBy: 'Verified by Sam, and 12 others',
    },
    {
      id: '4',
      role: 'Developer relations',
      company: 'Polygon Labs - Full-time',
      duration: 'May 2023 - Present',
      description:
        'Lorem ipsum text here long text example here hello lorem ipsum dolor sit amet. Lorem ipsum text here long text example here hello lorem ipsum dolor sit amet.',
      verifiedBy: 'Verified by Sam, and 12 others',
    },
    {
      id: '5',
      role: 'Developer relations',
      company: 'Polygon Labs - Full-time',
      duration: 'May 2023 - Present',
      description:
        'Lorem ipsum text here long text example here hello lorem ipsum dolor sit amet. Lorem ipsum text here long text example here hello lorem ipsum dolor sit amet.',
      verifiedBy: 'Verified by Sam, and 12 others',
    },
    {
      id: '6',
      role: 'Developer relations',
      company: 'Polygon Labs - Full-time',
      duration: 'May 2023 - Present',
      description:
        'Lorem ipsum text here long text example here hello lorem ipsum dolor sit amet. Lorem ipsum text here long text example here hello lorem ipsum dolor sit amet.',
      verifiedBy: 'Verified by Sam, and 12 others',
    },
    // Add more items as needed
  ];

  const Item = ({ role, company, duration, description, verifiedBy }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.role}>{role}</Text>
      <Text style={styles.company}>{company}</Text>
      <Text style={styles.duration}>{duration}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.verifiedBy}>{verifiedBy}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Edit" onPress={() => {
          navigation.push(`ExperienceForm${tab}`, { tab });
        }} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/back.png")}
            style={styles.headerImage}
          />
        </Pressable>

        <Text style={
          [styles.experience]
          // {flexGrow:1, color:"white", textAlign:"center", paddingTop:10, alignItems:"center"}
        }>Experience</Text>


        <TouchableOpacity
          onPress={() => {
            navigation.push(`ExperienceForm${tab}`, { tab });
          }}>
          <Image
            source={require("../assets/add.png")}
            style={styles.headerImage}

          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        ListEmptyComponent={() => {
          return <EmptyView loadingMore={false} />
        }}
        renderItem={({ item }) => (
          <Item
            role={item.role}
            company={item.company}
            duration={item.duration}
            description={item.description}
            verifiedBy={item.verifiedBy}
          />
        )}
        keyExtractor={(item) => item.id}
      />


    </SafeAreaView>
  )
};


const styles = StyleSheet.create({
  container: {
    // backgroundColor: Color.colorGray_100,
    backgroundColor: Color.colorBlack,
    width: "100%",
    height: "100%",
    flex: 1
  },
  header: {
    // marginTop: 60,
    width: "100%",
    // flex:1,
    flexDirection: 'row',
    // alignSelf:"flex-",
    padding: 14,
    backgroundColor: Color.colorGray_100,
  },
  headerImage: {
    width: 30,
    height: 30,
  },

  itemContainer: {
    backgroundColor: '#2b2b2b', // Background color similar to the image
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
  },
  role: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  company: {
    fontSize: 16,
    color: '#aaa',
    marginTop: 4,
  },
  duration: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 2,
  },
  description: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 10,
    lineHeight: 20,
  },
  verifiedBy: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  experience: {
    fontSize: FontSize.labelLarge_size,
    // marginLeft: 14,
    // flex: 1,
    flexGrow: 1,
    textAlign: "center",
    paddingTop: 3,
    alignItems: "center",
    color: Color.darkInk,
    fontWeight: "600",
    fontFamily: getFontFamily("600")
  }
});

export default Experience;
