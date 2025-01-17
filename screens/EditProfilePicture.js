import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable, StatusBar, Switch, TextInput, TouchableOpacity, Linking, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Padding, FontSize, Color, FontFamily, Border, getFontFamily, StyleContent } from "../GlobalStyles";
import PostList from "../components/PostList";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../components/SearchBar";
import ProfileDetail from "../components/ProfileDetail";
import { useAuth } from "../components/AuthProvider";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';
import { Camera } from "expo-camera";
import { Component_Max_Width } from "../Constant";
import { LinearGradient } from "expo-linear-gradient";

const EditProfilePicture = () => {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const [userData, setUserData] = useState();
  const [bio, setBio] = useState();
  const [bioError, setBioError] = useState('');
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const { api } = useAuth();

  const getUser = async () => {
    try {
      let _usersession = await AsyncStorage.getItem("usersession");
      if (_usersession == null) {
        await logout(navigation);
        return;
      }
      _usersession = JSON.parse(_usersession);
      let url = `/user/getUser?userId=${_usersession.user_info.user_id}`;
      let resp = await api.get(url);
      setUserData(resp.data);
      setIsEnabled(!resp.data.hide_wallet)
      setBio(resp.data.bio)
    } catch (err) {
      console.log("ERR : ", err)
      if (err.isSessionExpired) {
        await logout(navigation);
      } else {
      }
    }
  }

  useEffect(() => {
    getUser();
  }, [])

  const editProfile = async () => {
    if (bio && bio.length > 255) {
      setBioError('Bio cannot exceed 255 characters');
      return;
    }

    let url = `/user/editProfile`;
    let body = {
      "hide_wallet": !isEnabled,
      "bio": bio
    }

    let resp = await api.post(url, body);
    if (resp) {
      await AsyncStorage.setItem("reset", "true")
      navigation.goBack();
    }
  }

  const openAppSettings = async() => {
    Linking.openSettings().catch(() => {
      Alert.alert("Error", "Unable to open settings.");
    });
  };

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      console.log("RESULT : ", result)
      setImage(result.assets[0].uri);
      navigation.goBack();
    }
  };

  const pickImageCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [1,1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      navigation.goBack();
    }
  };

  const [permissions, setPermissions] = useState([]);
  const [isCameraGranted, setIsCameraGranted] = useState(false);
  const [isMediaLibraryGranted, setIsMediaLibraryGranted] = useState(false);

  const checkPermissions = async () => {
  
    // Check Camera Permission
    const cameraPermission = await Camera.getCameraPermissionsAsync();
    setIsCameraGranted(cameraPermission.granted);

    // Check Media Library Permission
    const imagePickerPermission = await ImagePicker.getMediaLibraryPermissionsAsync();
    setIsMediaLibraryGranted(imagePickerPermission.granted);
  };

  useEffect(() => {
    checkPermissions();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Color.colorGray_100} barStyle="light-content" />
      
      <View style={styles.content}>
        <View style={{
          flex:1,
          // borderColor:'red',
          // borderWidth:1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 5,
          }}>

          {/* {!isCameraGranted || !isMediaLibraryGranted ? 
          <> */}
          <Text style={styles.title}>Neonspace would like to access your photos</Text>
          <Text style={styles.description}>
            Allowing Neonspace to access your photos enables you to choose pictures from your existing photos.
          </Text>
          <Text style={styles.description}>
            You can change this access in your system settings anytime.
          </Text>
          {/* </> : <></>} */}

          {/* <View style={{flex:1, gap:10, 
          borderColor:'blue',
          borderWidth:1,
          }}> */}
            <View
            style={{
              marginTop:70,
              marginBottom: 10
            }}>
              <LinearGradient
                colors={['#FC00A7', '#65EDE3']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBorder}
              >
                <View style={styles.buttonInner}>
                  <TouchableOpacity
                    style={[styles.buttonContainer]}
                    onPress={openAppSettings}
                  >
                    <Text style={[styles.buttonLabel, styles.txtStyle]}>
                      Go to Settings
                    </Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>

            <View
            style={{
              marginBottom:10
            }}>
              <LinearGradient
                colors={['#FC00A7', '#65EDE3']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBorder}
              >
                <View style={styles.buttonInner}>
                  <TouchableOpacity
                    style={[styles.buttonContainer]}
                    onPress={pickImage}
                  >
                    <Text style={[styles.buttonLabel, styles.txtStyle]}>
                      Pick Image From Gallery
                    </Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>

            <View
            style={{
              marginBottom:10
            }}>
              <LinearGradient
                colors={['#FC00A7', '#65EDE3']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBorder}
              >
                <View style={styles.buttonInner}>
                  <TouchableOpacity
                    style={[styles.buttonContainer]}
                    onPress={pickImageCamera}
                  >
                    <Text style={[styles.buttonLabel, styles.txtStyle]}>
                      Pick Image From Camera
                    </Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          {/* </View> */}
        </View> 

        {/* <TouchableOpacity style={styles.button} onPress={openAppSettings}>
          <Text style={styles.buttonText}>Go to settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Pick Image From Gallery</Text>
        </TouchableOpacity>
                
        <TouchableOpacity style={styles.button} onPress={pickImageCamera}>
          <Text style={styles.buttonText}>Pick Image From Camera</Text>
        </TouchableOpacity>  */}
      </View>
    </SafeAreaView>
  );
  
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorGray_100,
  },
  content: {
    // borderColor:'red',
    // borderWidth:1,
    flex: 1,
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
    opacity:0.4
  },
  button: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    backgroundColor: "#000",
    borderWidth: 1,
    borderColor: "#0ff",
    shadowColor: "#0ff",
    shadowOpacity: 0.6,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
    textAlign: "center",
  },
  permissionText: {
    fontSize: 16,
    marginBottom: 5,
    color:'white'
  },


  buttonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
  gradientBorder: {
    padding: 2, // Lebar border gradien
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonInner: {
    width: "100%",
    backgroundColor: '#1c1c1c', // Warna background tombol
    borderRadius: 10,
  },
  buttonLabel: {
    fontSize: FontSize.labelLarge_size,
    lineHeight: 24,
    fontWeight: "600",
    fontFamily: getFontFamily("600"),
    color: Color.darkInk,
  },
});


/*
const EditProfilePicture = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const requestPermissions = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: libraryStatus } = await MediaLibrary.requestPermissionsAsync();

    if (cameraStatus !== 'granted' || libraryStatus !== 'granted') {
      Alert.alert('Permission required', 'Camera and Media Library permissions are needed to use this feature.');
      return false;
    }
    return true;
  };

  const fetchGalleryImages = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const assets = await MediaLibrary.getAssetsAsync({
      first: 20, // Fetch the first 20 images
      mediaType: 'photo',
    });
    setGalleryImages(assets.assets);
  };

  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const selectImage = (uri) => {
    setSelectedImage(uri);
  };

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const renderItem = ({ item, index }) => {
    if (index === 0) {
      // First grid item is the camera option
      return (
        <TouchableOpacity style={styles.cameraTile} onPress={openCamera}>
          <Image source={require('../assets/adaptive-icon.png')} style={styles.cameraIcon} />
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity onPress={() => selectImage(item.uri)}>
        <Image source={{ uri: item.uri }} style={styles.imageThumbnail} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={[{ id: 'camera' }, ...galleryImages]}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        renderItem={renderItem}
        contentContainerStyle={styles.grid}
      />
      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={{ width: '100%', height: 200, marginTop: 20 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    padding: 10,
  },
  cameraTile: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    margin: 5,
    borderRadius: 10,
  },
  cameraIcon: {
    width: 40,
    height: 40,
    tintColor: '#555',
  },
  imageThumbnail: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },
});
*/
export default EditProfilePicture;
