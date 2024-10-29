import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable, StatusBar, Switch, TextInput, FlatList, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Padding, FontSize, Color, FontFamily, Border, getFontFamily, StyleContent } from "../GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import EmptyView from "../components/EmptyView";

const Experience = ({ route }) => {
  const experiences = route.params?.experiences;
  const navigation = useNavigation();
  const tab = 4;
  const Item = ({ role, company, start_date, end_date, description }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.role}>{role}</Text>
      <Text style={styles.company}>{company}</Text>
      <Text style={styles.duration}>{start_date} - {end_date}</Text>
      <Text style={styles.description}>{description}</Text>
      {/* <Text style={styles.verifiedBy}>{verifiedBy}</Text> */}
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
      <View style={StyleContent}>
        <FlatList
          data={experiences}
          ListEmptyComponent={() => {
            return <EmptyView loadingMore={false} />
          }}
          renderItem={({ item }) => (
            <Item
              role={item.role}
              company={item.company}
              start_date={item.start_date}
              end_date={item.end_date}
              description={item.description}
            />
          )}
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
