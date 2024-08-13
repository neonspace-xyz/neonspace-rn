import { Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';

const DownloadHelper = async (imageUrl) => {
  try {
    console.log("downloadImage-called");
    const fileName = imageUrl.split('/').pop();
    const path = `${FileSystem.documentDirectory}${fileName}`;
    const { uri } = await FileSystem.downloadAsync(imageUrl, path);
    console.log("downloadImage-downloaded");
    Alert.alert('Success', `Image downloaded to: ${uri}`);
    return true;
  } catch (error) {
    Alert.alert('Error', 'Failed to download image');
    console.error("downloadImage", error);
    return false;
  }
};

export default DownloadHelper;
