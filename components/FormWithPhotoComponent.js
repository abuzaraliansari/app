import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Animated,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera } from 'react-native-image-picker';
import axios from 'axios';
import Config from 'react-native-config';
import { useNavigation, useRoute } from '@react-navigation/native';

import { AuthContext } from '../contexts/AuthContext';
import DocumentPicker from 'react-native-document-picker';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import AppStyles from '../styles/AppStyles';

const FormData = require('form-data');

const FormWithPhotoComponent = () => {
  const route = useRoute();
  const { ownerID, propertyID, tenantCount, CreatedBy } = route.params;

  const { authState } = useContext(AuthContext);
  const { login } = useContext(AuthContext);
  const [photos, setPhotos] = useState([]);
  const [tenantDocuments, setTenantDocuments] = useState([]);
  const [tenantNames, setTenantNames] = useState([]);
  const [hasPermission, setHasPermission] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [error, setError] = useState('');
  const [OwnerID, SetOwnerID] = useState(String(ownerID));
  const [PropertyID, SetpropertyID] = useState(String(propertyID));
  const [TenantCount, SettenantCount] = useState(String(tenantCount));
  const [createdBy, SetCreatedBy] = useState(String(CreatedBy));
  const token = authState.token;
  const navigation = useNavigation();

  const API_ENDPOINT_PHOTO = `${Config.API_URL}/auth/uploadFileMetadata`;
  const API_ENDPOINT_DOCUMENT = `${Config.API_URL}/auth/uploadTenantDocuments`;

  useEffect(() => {
    const checkPermission = async () => {
      const result = await check(PERMISSIONS.ANDROID.CAMERA);
      if (result === RESULTS.GRANTED) {
        setHasPermission(true);
      } else {
        const requestResult = await request(PERMISSIONS.ANDROID.CAMERA);
        setHasPermission(requestResult === RESULTS.GRANTED);
      }
    };

    checkPermission();
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleTakePhoto = async (index) => {
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
      async (response) => {
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.errorCode) {
          console.log('Camera error:', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const { uri, fileName, fileSize } = response.assets[0];
          const newFileName = fileName;
          const updatedPhotos = [...photos];
          updatedPhotos[index] = { uri, fileName: newFileName, fileSize };
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
      }
    );
  };

  const handleDocumentPick = async (index) => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      if (result) {
        const { name: documentName, size: documentSize, type: documentType, uri: documentUri } = result;
        const newDocumentName = documentName;


        const updatedTenantDocuments = [...tenantDocuments];
        updatedTenantDocuments[index] = {
          documentName: newDocumentName,
          documentPath: documentUri,
          documentSize,
          documentType,
        };
        setTenantDocuments(updatedTenantDocuments);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('Cancelled', 'Document selection was cancelled.');
      } else {
        Alert.alert('Error', 'Document selection failed.');
      }
    }
  };

  const renderTenantFields = () => {
    return Array.from({ length: parseInt(TenantCount, 10) }, (_, index) => (
      <View key={index} style={AppStyles.tenantContainer}>
        <Text style={AppStyles.label}>Tenant {index + 1} Name</Text>
        <TextInput
          style={AppStyles.input}
          placeholder={`Enter Tenant ${index + 1} Name`}
          value={tenantNames[index] || ''}
          onChangeText={value => handleNameChange(index, value)}
        />

        <TouchableOpacity
          style={AppStyles.documentButton}
          onPress={() => handleDocumentPick(index)}>
          <Text style={AppStyles.photoButtonText}>
            {tenantDocuments[index] ? 'Change Document' : 'Upload Document'}
          </Text>
        </TouchableOpacity>
        {tenantDocuments[index] && (
          <Text style={AppStyles.photoText}>
            Document: {tenantDocuments[index].documentName}
          </Text>
        )}
      </View>
    ));
  };

  const handleNameChange = (index, value) => {
    const updatedTenantNames = [...tenantNames];
    updatedTenantNames[index] = value;
    setTenantNames(updatedTenantNames);
  };

  const validateAndSubmit = async () => {
    try {
      if (photos.length < 2 || photos.some(photo => !photo.uri)) {
        throw new Error('Please take at leat two photos.');
      }

      if (TenantCount > 0 && (tenantNames.length < TenantCount || tenantDocuments.length < TenantCount ||
        tenantNames.some(name => !name) || tenantDocuments.some(doc => !doc.documentPath))) {
        throw new Error('Please provide names and documents for all tenants.');
      }

      console.log('Auth Token:', token);
      // Submit photo details
      const photoData = new FormData();
      photoData.append('OwnerID', OwnerID);
      photoData.append('PropertyID', PropertyID);
      photoData.append('CreatedBy', createdBy);
      photos.forEach((photo, index) => {
        photoData.append('files', {
          uri: photo.uri,
          name: photo.fileName,
          type: 'image/jpeg', // Adjust the type based on your file type
        });
      });

      console.log('Photo FormData:', photoData);
      try {
        console.log('Sending photo data to API:', photoData);
        const photoResponse = await axios.post(API_ENDPOINT_PHOTO, photoData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });

        if (photoResponse.status !== 200) {
          throw new Error(photoResponse.data.message || 'Photo submission failed.');
        }
      } catch (error) {
        Alert.alert('Error', error.message);
        console.error('Photo upload error:', error.response ? error.response.data : error.message);
        throw new Error('Photo upload failed.');
      }

      // Submit tenant documents if tenant count is greater than 0
      if (TenantCount > 0) {
        const documentData = new FormData();
        documentData.append('OwnerID', OwnerID);
        documentData.append('PropertyID', PropertyID);
        documentData.append('CreatedBy', createdBy);
        documentData.append('tenantNames', JSON.stringify(tenantNames));
        tenantDocuments.forEach((document, index) => {
          documentData.append('files', {
            uri: document.documentPath,
            name: document.documentName,
            type: document.documentType,
          });
        });

        console.log('Document FormData:', documentData);
        const documentResponse = await axios.post(API_ENDPOINT_DOCUMENT, documentData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });

        if (documentResponse.status !== 200) {
          throw new Error(documentResponse.data.message || 'Document submission failed.');
        }
      }

      navigation.navigate('Final', { propertyID: PropertyID });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView style={AppStyles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={AppStyles.headerCenter}>Upload Photos</Text>
        {['Owner Photo', 'Property Photo 1', 'Property Photo 2'].map((title, index) => (
          <View key={index} style={AppStyles.photoContainer}>
            <Text style={AppStyles.photoText}>{title}</Text>
            <TouchableOpacity
              style={AppStyles.captureButton}
              onPress={() => handleTakePhoto(index)}
            >
              <Text style={AppStyles.buttonText}>{photos[index] ? 'Change Photo' : 'Take Photo'}</Text>
            </TouchableOpacity>
            {photos[index]?.uri && (
              <Image source={{ uri: photos[index].uri }} style={AppStyles.photoPreview} />
            )}
          </View>
        ))}

        <Text style={AppStyles.header}>Tenant Details</Text>
        <TextInput
          style={AppStyles.input}
          placeholder="Enter Tenant Count"
          defaultValue={TenantCount}
        />

        {renderTenantFields()}

        <TouchableOpacity
          style={[AppStyles.submitButton, { marginBottom: 50 }]}
          onPress={validateAndSubmit}
        >
          <Text style={AppStyles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
};

export default FormWithPhotoComponent;