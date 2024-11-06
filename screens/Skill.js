import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable, StatusBar, Switch, TextInput, FlatList, Button, Alert } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Padding, FontSize, Color, FontFamily, Border, getFontFamily, StyleContent } from "../GlobalStyles";
import PostList from "../components/PostList";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../components/SearchBar";
import ProfileDetail from "../components/ProfileDetail";
import { useAuth } from "../components/AuthProvider";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import EmptyView from "../components/EmptyView";
import { API_URL } from "../Constant";

const Skill = ({ route }) => {
  const { api, getOtherUser } = useAuth();
  const navigation = useNavigation();
  const { getSession, getUser } = useAuth();
  const [skills, setSkills] = useState(route.params?.skills);
  const tab = 4;

  const updateGetUser = () => {
    getUser().then((user) => {
      setSkills(user.skills)
    });
  }

  useFocusEffect (
    useCallback(() => {
      updateGetUser();
    }, [])
  )

  const deleteSkill = (id) => {
    Alert.alert("Delete skill", "Are you sure you want to delete this skill?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: async() => {
        try {
          let url = API_URL + `/user/deleteSkill`;
          let response = await api.post(url, {id});
    
          if (response.status == 200) {
            Alert.alert('Success', 'Skill successfully deleted');
            await AsyncStorage.setItem("reset", "true");
            updateGetUser();
          } else {
            const errorData = await response.json();
            Alert.alert('Error', errorData.message || 'Failed to save skill');
          }
        } catch (error) {
          Alert.alert('Error', 'An error occurred while deleting skill');
        }
      } }
    ]);
  }

  const Item = ({ id, skill, description }) => (
    <View style={styles.itemContainer} key={id}>
      <Text style={styles.name}>{skill}</Text>
      <View style={styles.buttonsContainer}>
      <TouchableOpacity style={styles.deleteButton} onPress={() => {
        deleteSkill(id);
        }}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.editButton} onPress={() => {
          navigation.push(`SkillForm${tab}`, { tab, action: "edit", id, skill, description });
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
            navigation.push(`SkillForm${tab}`, { tab, action: "new" });
          }}>
          <Image
            source={require("../assets/add.png")}
            style={styles.headerImage}

          />
        </TouchableOpacity>
      </View>

      <View style={[StyleContent, { paddingTop: 4 }]}>
        <FlatList
          data={skills}
          ListEmptyComponent={() => {
            return <EmptyView loadingMore={false} />
          }}
          renderItem={({ item }) => {
            return <Item id={item.id} skill={item.skill} description={item.description}/>
          }}
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
    width: "100%",
    flexDirection: 'row',
    padding: Padding.p_base,
    backgroundColor: Color.colorGray_100,
    alignItems: 'center',
    height: 60,
  },
  headerImage: {
    width: 30,
    height: 30,
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
    backgroundColor: Color.colorDarkslategray_400, // Background color similar to the image
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
    fontSize: 14,
    fontWeight: "500",
    fontFamily: getFontFamily("500"),
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap:10
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
    fontSize: 14,
    fontWeight: "500",
    fontFamily: getFontFamily("500"),
  },
  deleteButton: {
    borderColor: 'red',
    borderWidth: 2,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: "500",
    fontFamily: getFontFamily("500"),
  },
});

export default Skill;
