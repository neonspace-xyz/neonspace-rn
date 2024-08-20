import * as React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Image } from "expo-image";
import { Color } from "../GlobalStyles";

const PopupOption = ({ showEdit, selectedItemIndex, menuPosition, handleEdit, handleDelete }) => {
  return (
    <>
      {selectedItemIndex !== null && (
        <View style={[styles.optionsMenu, { top: menuPosition.top + 10, left: menuPosition.left }]}>
          {showEdit && (
            <>
              <TouchableOpacity style={styles.optionItem} onPress={handleEdit}>
                <Text style={styles.optionText}>Edit</Text>
                <Image source={require('../assets/ic_edit_white.png')} style={styles.optionIcon} />
              </TouchableOpacity>
              <View style={styles.divider} />
            </>
          )}
          <TouchableOpacity style={styles.optionItem} onPress={handleDelete}>
            <Text style={styles.optionText}>Delete</Text>
            <Image source={require('../assets/ic_trash_white.png')} style={styles.optionIcon} />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  optionsMenu: {
    width: 160,
    position: 'absolute',
    backgroundColor: Color.colorDarkslategray_100,
    borderRadius: 5,
    borderColor: Color.colorDarkslategray_100,
    borderWidth: 1,
    shadowColor: Color.colorDarkslategray_100,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 1,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  optionText: {
    fontSize: 16,
    color: Color.darkInk
  },
  optionIcon: {
    width: 20,
    height: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
  },
})
export default PopupOption;
