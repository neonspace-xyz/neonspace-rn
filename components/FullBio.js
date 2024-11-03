import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Color, getFontFamily } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/core";

const FullBio = ({ experiences, skills }) => {
  const navigation = useNavigation();
  const tab = 4;
  const SkillsCard = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Skills</Text>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        {skills?.map((skill) => (
          <View style={styles.skillItem} id={skill.id}>
            <Text style={styles.title}>{skill.skill}</Text>
            <Text style={styles.verified}>{skill.description}</Text>
          </View>))
        }
        <TouchableOpacity style={styles.viewMoreButton} onPress={() => navigation.push(`Skill${tab}`, { tab, skills })}>
          <Text style={styles.viewMoreText}>View all {skills?.length} skills</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const ExperienceCard = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Experience</Text>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        {experiences?.map((experience) => (
          <View style={styles.experienceItem}>
            <Text style={styles.title}>{experience.role}s</Text>
            <Text style={styles.subtitle}>{experience.company} - {experience.employment_type}</Text>
            <Text style={styles.date}>{experience.start_date} - {experience.end_date}</Text>
            <Text style={styles.description}>
              {experience.description}
            </Text>
          </View>
        ))}
        <TouchableOpacity style={styles.viewMoreButton} onPress={() => navigation.push(`Experience${tab}`, { tab, experiences })}>
          <Text style={styles.viewMoreText}>View all {experiences?.length} experiences</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
      <ExperienceCard />
      <SkillsCard />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingHorizontal: 10,
  },
  scrollContent: {
    alignItems: 'stretch',  // Ensures children fill the width
    paddingVertical: 20,    // Adds space at the top and bottom
  },
  container: {
    backgroundColor: Color.colorDarkslategray_400,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
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
    right: 20,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  skillItem: {
    marginBottom: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
});

export default FullBio;
