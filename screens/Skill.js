import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable, StatusBar, Switch, TextInput, FlatList, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Padding, FontSize, Color, FontFamily, Border, getFontFamily, StyleContent } from "../GlobalStyles";
import PostList from "../components/PostList";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../components/SearchBar";
import ProfileDetail from "../components/ProfileDetail";
import { useAuth } from "../components/AuthProvider";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import EmptyView from "../components/EmptyView";

const Skill = () => {
  const navigation = useNavigation();
  const tab = 4;

  const data = [
    { id: '1', name: 'Tokenomics' },
    { id: '2', name: 'Financial modeling' },
    { id: '3', name: 'Applied Mathematics' },
  ];

  const Item = ({ name }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton} onPress={() => {
          navigation.push(`SkillForm${tab}`, { tab });
        }}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
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
          [styles.title]
          // {flexGrow:1, color:"white", textAlign:"center", paddingTop:10, alignItems:"center"}
        }>Skill</Text>


        <TouchableOpacity
          onPress={() => {
            navigation.push(`SkillForm${tab}`, { tab });
          }}>
          <Image
            source={require("../assets/add.png")}
            style={styles.headerImage}

          />
        </TouchableOpacity>
      </View>

      <View style={[StyleContent, {paddingTop: 4}]}>
        <FlatList
          data={data}
          ListEmptyComponent={() => {
            return <EmptyView loadingMore={false} />
          }}
          renderItem={({ item }) => <Item name={item.name} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  )
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.colorGray_100,
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
  title: {
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
  },


  itemContainer: {
    backgroundColor: '#2b2b2b', // Background color similar to the image
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    color: '#fff',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginRight: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  editButton: {
    borderColor: '#fff',
    borderWidth: 2,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Skill;
