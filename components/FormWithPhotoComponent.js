import React, {useState , useContext} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  PermissionsAndroid,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera} from 'react-native-image-picker';
import axios from 'axios';
import Config from 'react-native-config';
import RNFS from 'react-native-fs';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../contexts/AuthContext';
import {Picker} from '@react-native-picker/picker';
import AppStyles from '../styles/AppStyles';

const FormData = require('form-data');
const fs = require('fs');
const FormWithPhotoComponent = () => {
  const {authState} = useContext(AuthContext);
  const [photos, setPhotos] = useState([]);
  const ownerID = authState.ownerId; // Example OwnerID
  const [propertyID, setPropertyID] = useState('3040'); // Example PropertyID
  const createdBy = authState.user; // Example CreatedBy
  const API_ENDPOINT = `${Config.API_URL}/auth/upload`;

  // Function to request camera permission
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'We need access to your camera to take photos.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  // Function to capture a photo
  const capturePhoto = async index => {
    const hasPermission = await requestCameraPermission();

    if (!hasPermission) {
      Alert.alert(
        'Permission Denied',
        'Camera permission is required to take photos.',
      );
      return;
    }

    launchCamera(
      {
        mediaType: 'photo',
        saveToPhotos: true,
      },
      async response => {
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.errorCode) {
          console.log('Camera error:', response.errorMessage);
        } else {
          const {uri, fileName, fileSize} = response.assets[0];
          const updatedPhotos = [...photos];
          updatedPhotos[index] = {uri, fileName, fileSize};
          setPhotos(updatedPhotos);

          // Save photo details locally
          try {
            await AsyncStorage.setItem(
              'capturedPhotos',
              JSON.stringify(updatedPhotos),
            );
            Alert.alert('Success', 'Photo saved locally.');
          } catch (error) {
            console.error('Error saving photo to local storage:', error);
            Alert.alert('Error', 'Failed to save photo locally.');
          }
        }
      },
    );
  };

  // Function to call the API to store photo details
  const uploadPhotoDetails = async photo => {
    if (!photo || !photo.uri || !photo.fileName || !photo.fileSize) {
      Alert.alert('Error', 'Invalid photo data.');
      return;
    }

    const fileDetails = {
      OriginalName: photo.fileName,
      FileName: photo.fileName,
      FilePath: photo.uri,
      FileSize: photo.fileSize,
      CreatedAt: new Date().toISOString(),
      OwnerID: ownerID,
      PropertyID: propertyID,
      CreatedBy: createdBy,
    };

    try {
      const data = new FormData();
      data.append('file', {
        uri: photo.uri,
        name: photo.fileName,
        type: 'image/jpeg',
      });

      // data.append('file', fs.createReadStream(photo.uri));
      // data.append('file', {
      //   uri: photo.uri,
      //   name: photo.fileName,
      //   type: 'image/jpeg', // Adjust MIME type as needed
      // });
      data.append('ownerID', ownerID);
      data.append('propertyID', propertyID);
      data.append('createdBy', createdBy);
      console.log('FormData:', photo.uri);
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://192.168.29.56:3000/auth/upload',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: data,
      };
      console.log('FormData:', photo.uri);
      const response = await axios.request(config);
      //   const response = await fetch('http://192.168.29.56:3000/auth/upload', {
      //     method: 'POST',
      //     maxBodyLength: Infinity,
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      //     body: data});
      if (response.data.success) {
        Alert.alert('Success', 'Photo details uploaded successfully!');
      } else {
        Alert.alert('Error', 'Failed to upload photo details.');
      }
    } catch (error) {
      console.error('API error:', error);
      Alert.alert('Error', 'Failed to upload photo details.');
    }
  };
  // Add a new photo slot
  const addPhotoSlot = () => {
    setPhotos([...photos, null]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Capture and Upload Photos</Text>
      {photos.map((photo, index) => (
        <View key={index} style={styles.photoSection}>
          <Text style={styles.label}>Photo {index + 1}</Text>
          <View style={styles.photoContainer}>
            {photo ? (
              <Image source={{uri: photo.uri}} style={styles.photo} />
            ) : (
              <Text style={styles.placeholder}>No photo selected</Text>
            )}
          </View>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={() => capturePhoto(index)}>
            <Text style={styles.buttonText}>Capture Photo</Text>
          </TouchableOpacity>
          {photo && (
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => uploadPhotoDetails(photo)}>
              <Text style={styles.buttonText}>Upload Details</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={addPhotoSlot}>
        <Text style={styles.addButtonText}>+ Add Another Photo</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  photoSection: {
    marginBottom: 24,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  photoContainer: {
    width: 200,
    height: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
    marginBottom: 8,
  },
  photo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholder: {
    color: '#888',
  },
  captureButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 8,
  },
  uploadButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    marginVertical: 16,
    backgroundColor: '#17a2b8',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FormWithPhotoComponent;
