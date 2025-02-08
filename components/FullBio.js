import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
import { Border, Color, getFontFamily, Padding } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/core";

const FullBio = ({ userInfo, isOtherProfile }) => {
  // console.log("FullBio-userInfo", userInfo);
  const navigation = useNavigation();
  const tab = 4;

  const SkillsCard = () => {
    const isEmpty = !userInfo.skills || userInfo.skills.length === 0;
    return (
      <View style={[styles.container, isEmpty && styles.containerEmpty]}>
        <Text style={styles.header}>Skills</Text>

        {!isOtherProfile && (
          <TouchableOpacity style={styles.editButton} onPress={() => navigation.push(`Skill${tab}`, { tab, skills: userInfo.skills })}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        )}
        {isEmpty ? (
          <Text style={styles.emptyText}>
            @{userInfo.screen_name} has not updated their skills
          </Text>
        ) : (
          userInfo.skills.map((skill) => (
            <View style={styles.skillItem} key={skill.id}>
              <Text style={styles.title}>{skill.skill}</Text>
              <Text style={styles.verified}>{skill.description}</Text>
            </View>
          ))
        )}
        {!isOtherProfile && (
          <TouchableOpacity style={styles.viewMoreButton} onPress={() => navigation.push(`Skill${tab}`, { tab, skills: userInfo.skills })}>
            <Text style={styles.viewMoreText}>View all {userInfo.skills?.length} skills</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const ExperienceCard = () => {
    const isEmpty = !userInfo.experiences || userInfo.experiences.length === 0;
    // console.log("ExperienceCard-userInfo", userInfo.experiences);
    return (
      <View style={[styles.container, isEmpty && styles.containerEmpty]}>
        <Text style={styles.header}>Experience</Text>

        {!isOtherProfile && (
          <TouchableOpacity style={styles.editButton} onPress={() => navigation.push(`Experience${tab}`, { tab, experiences: userInfo.experiences })}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        )}
        {isEmpty ? (
          <Text style={styles.emptyText}>
            @{userInfo.screen_name} has not updated their experience
          </Text>
        ) : (
          userInfo.experiences.slice(0, 2).map((experience) => (
            <View style={styles.experienceItem} key={experience.id}>
              <Text style={styles.title}>{experience.role}</Text>
              <Text style={styles.subtitle}>{experience.company} - {experience.employment_type}</Text>
              <Text style={styles.date}>{experience.start_date} - {experience.end_date}</Text>
              <Text style={styles.description}>
                {experience.description.substring(0, 250)}
              </Text>
            </View>
          ))
        )}
        {!isOtherProfile && (
          <TouchableOpacity style={styles.viewMoreButton} onPress={() => navigation.push(`Experience${tab}`, { tab, experiences: userInfo.experiences })}>
            <Text style={styles.viewMoreText}>View all {userInfo.experiences?.length} experiences</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <ExperienceCard />
        <SkillsCard />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.colorGray_100,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 10,
  },
  scrollContent: {
    paddingVertical: 20,
  },
  container: {
    backgroundColor: Color.colorDarkslategray_400,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    minHeight: 150,
  },
  containerEmpty: {
    minHeight: 100,
  },
  header: {
    fontSize: 16,
    fontFamily: getFontFamily("600"),
    fontWeight: "600",
    color: '#FFFFFF',
    marginBottom: 10,
  },
  editButton: {
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
    flex: 1,
  },
  editButtonText: {
    fontWeight: "400",
    fontFamily: getFontFamily("400"),
    textAlign: "left",
    fontSize: 14,
    color: Color.darkInk,
    lineHeight: 20,
  },
  skillItem: {
    marginBottom: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: getFontFamily("500"),
    color: Color.darkInk,
  },
  verified: {
    fontSize: 14,
    color: '#AAAAAA',
  },
  viewMoreButton: {
    borderTopWidth: 1,
    borderTopColor: '#444',
    paddingTop: 10,
  },
  viewMoreText: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  experienceItem: {
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 14,
    color: '#AAAAAA',
  },
  date: {
    fontSize: 14,
    color: '#AAAAAA',
  },
  description: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 5,
  },
  emptyText: {
    fontSize: 14,
    color: '#AAAAAA',
    textAlign: 'center',
    paddingVertical: 10,
  },
});

export default FullBio;
