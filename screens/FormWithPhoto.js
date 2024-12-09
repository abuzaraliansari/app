import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, PermissionsAndroid, Alert } from 'react-native';
import { launchCamera } from 'react-native-image-picker';

const FormWithPhoto = () => {
  const [photo, setPhoto] = useState(null);

  // Function to request camera permission
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Camera Permission",
          message: "We need access to your camera to take a photo.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const capturePhoto = async () => {
    const hasPermission = await requestCameraPermission();

    if (!hasPermission) {
      Alert.alert("Permission Denied", "Camera permission is required to take photos.");
      return;
    }

    launchCamera(
      {
        mediaType: 'photo',
        saveToPhotos: true,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.errorCode) {
          console.log('Camera error:', response.errorMessage);
        } else {
          const { uri } = response.assets[0]; // Extract the image URI
          setPhoto(uri);
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Person's Photo *</Text>
      <View style={styles.photoContainer}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.photo} />
        ) : (
          <Text style={styles.placeholder}>No photo selected</Text>
        )}
      </View>
      <Button title="Capture Photo" onPress={capturePhoto} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  photoContainer: {
    width: 200,
    height: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  photo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholder: {
    color: '#888',
  },
});

export default FormWithPhoto;
