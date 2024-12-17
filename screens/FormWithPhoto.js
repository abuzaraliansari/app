import React, { useState } from 'react';
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
import { launchCamera } from 'react-native-image-picker';

const FormWithMultiplePhotos = () => {
  const [photos, setPhotos] = useState([]);

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
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  // Function to capture a photo
  const capturePhoto = async (index) => {
    const hasPermission = await requestCameraPermission();

    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Camera permission is required to take photos.');
      return;
    }

    launchCamera(
      {
        mediaType: 'photo',
        saveToPhotos: true,
      },
      async (response) => {
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.errorCode) {
          console.log('Camera error:', response.errorMessage);
        } else {
          const { uri } = response.assets[0];
          const updatedPhotos = [...photos];
          updatedPhotos[index] = uri;
          setPhotos(updatedPhotos);

          // Save photos to local storage
          try {
            await AsyncStorage.setItem('capturedPhotos', JSON.stringify(updatedPhotos));
            Alert.alert('Success', 'Photo saved to local storage.');
          } catch (error) {
            console.error('Error saving photo to local storage:', error);
            Alert.alert('Error', 'Failed to save photo.');
          }
        }
      }
    );
  };

  // Add a new photo slot
  const addPhotoSlot = () => {
    setPhotos([...photos, null]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Capture Multiple Photos</Text>
      {photos.map((photo, index) => (
        <View key={index} style={styles.photoSection}>
          <Text style={styles.label}>Photo {index + 1}</Text>
          <View style={styles.photoContainer}>
            {photo ? (
              <Image source={{ uri: photo }} style={styles.photo} />
            ) : (
              <Text style={styles.placeholder}>No photo selected</Text>
            )}
          </View>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={() => capturePhoto(index)}
          >
            <Text style={styles.buttonText}>Capture Photo</Text>
          </TouchableOpacity>
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    marginVertical: 16,
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadButton: {
    backgroundColor: '#ffc107',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 16,
  },
});

export default FormWithMultiplePhotos;
