import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable, StatusBar, Switch, TextInput, FlatList, Button } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Padding, FontSize, Color, FontFamily, Border, getFontFamily, StyleContent } from "../GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import EmptyView from "../components/EmptyView";
import { useAuth } from "../components/AuthProvider";
import { useCallback, useState } from "react";

const Experience = ({ route }) => {
  const { getSession, getUser } = useAuth();
  const [experiences, setExperience] = useState(route.params?.experiences);
  const navigation = useNavigation();
  const tab = 4;

  useFocusEffect(
    useCallback(() => {
      getUser().then((user) => {
        setExperience(user.experiences)
      });
    }, [])
  )

  const Item = ({ experience, id, role, company, start_date, end_date, description, employment_type }) => {
    return (
      <>
        <View style={styles.itemContainer} key={id}>
          <Pressable style={styles.editButton} onPress={() => {
            navigation.push(`ExperienceForm${tab}`, { tab, action: "edit", experience });
          }}>
            <Text style={styles.editButtonText}>Edit</Text>
          </Pressable>
          <Text style={styles.role}>{role}</Text>
          <Text style={styles.company}>{company} - {employment_type}</Text>
          <Text style={styles.duration}>{start_date} - {end_date}</Text>
          <Text style={styles.description}>
            {description}
          </Text>
        </View>
      </>
    );
  }

  // const Item = ({ role, company, start_date, end_date, description }) => (
  //   <View style={styles.itemContainer}>
  //     <Text style={styles.role}>{role}</Text>
  //     <Text style={styles.company}>{company}</Text>
  //     <Text style={styles.duration}>{start_date} - {end_date}</Text>
  //     <Text style={styles.description}>{description}</Text>
  //     {/* <Text style={styles.verifiedBy}>{verifiedBy}</Text> */}
  //     <View style={styles.buttonContainer}>
  //       <Button title="Edit" onPress={() => {
  //         navigation.push(`ExperienceForm${tab}`, { tab });
  //       }} />
  //     </View>
  //   </View>
  // );

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
            navigation.push(`ExperienceForm${tab}`, { tab, action: "new" });
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
              experience={item}
              id={item?.id}
              role={item?.role}
              company={item?.company}
              start_date={item?.start_date}
              end_date={item?.end_date}
              description={item?.description}
              employment_type={item?.employment_type}
            />
          )}
          keyExtractor={(item) => item?.id}
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
    padding: 14,
    backgroundColor: Color.colorGray_100,
  },
  headerImage: {
    width: 30,
    height: 30,
  },

  itemContainer: {
    backgroundColor: Color.colorDarkslategray_400, // Background color similar to the image
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
  },
  role: {
    fontWeight: "500",
    fontFamily: getFontFamily("500"),
    textAlign: "left",
    fontSize: 14,
    color: Color.darkInk,
  },
  company: {
    marginTop: 2,
    fontWeight: "400",
    fontFamily: getFontFamily("400"),
    textAlign: "left",
    fontSize: 14,
    color: Color.darkInk,
    opacity: 0.6
  },
  duration: {
    marginTop: 2,
    fontWeight: "400",
    fontFamily: getFontFamily("400"),
    textAlign: "left",
    fontSize: 14,
    color: Color.darkInk,
    opacity: 0.6
  },
  description: {
    fontWeight: "400",
    fontFamily: getFontFamily("400"),
    textAlign: "left",
    fontSize: 14,
    color: Color.darkInk,
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
  },
  editButton: {
    zIndex: 10,
    position: 'absolute',
    top: 20,
    right: 10,
    borderWidth: 1.5,
    borderRadius: Border.br_5xs,
    paddingVertical: Padding.p_9xs,
    borderColor: Color.darkInk,
    borderStyle: "solid",
    flexDirection: "row",
    paddingHorizontal: Padding.p_xs,
    alignItems: "center",
  },
  editButtonText: {
    fontWeight: "400",
    fontFamily: getFontFamily("400"),
    textAlign: "left",
    fontSize: 14,
    color: Color.darkInk,
    lineHeight: 20,
  },
});

export default Experience;
