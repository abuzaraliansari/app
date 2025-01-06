// import React, { useState, useContext, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   StyleSheet,
//   ScrollView,
//   Animated,
//   Image,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { launchCamera } from 'react-native-image-picker';
// import axios from 'axios';
// import Config from 'react-native-config';
// import { useNavigation } from '@react-navigation/native';
// import { AuthContext } from '../contexts/AuthContext';
// import DocumentPicker from 'react-native-document-picker';
// import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

// const FormData = require('form-data');

// const TestComponent = () => {
//   const { authState } = useContext(AuthContext);
//   const [photos, setPhotos] = useState([]);
//   const [tenantDocuments, setTenantDocuments] = useState([]);
//   const [tenantNames, setTenantNames] = useState([]);
//   const [tenantCount, setTenantCount] = useState('');
//   const [ownerID, setOwnerID] = useState('');
//   const [propertyID, setPropertyID] = useState('');
//   const [createdBy, setCreatedBy] = useState('');
//   const [hasPermission, setHasPermission] = useState(false);
//   const [fadeAnim] = useState(new Animated.Value(0));
//   const [error, setError] = useState('');

//   const token = authState.token;
//   const navigation = useNavigation();

//   const API_ENDPOINT_PHOTO = `${Config.API_URL}/auth/uploadFileMetadata`;
//   const API_ENDPOINT_DOCUMENT = `${Config.API_URL}/auth/uploadTenantDocuments`;

//   useEffect(() => {
//     const checkPermission = async () => {
//       const result = await check(PERMISSIONS.ANDROID.CAMERA);
//       if (result === RESULTS.GRANTED) {
//         setHasPermission(true);
//       } else {
//         const requestResult = await request(PERMISSIONS.ANDROID.CAMERA);
//         setHasPermission(requestResult === RESULTS.GRANTED);
//       }
//     };

//     checkPermission();
//   }, []);

//   useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 1000,
//       useNativeDriver: true,
//     }).start();
//   }, [fadeAnim]);

//   const handleTakePhoto = async (index) => {
//     if (!hasPermission) {
//       Alert.alert(
//         'Permission Denied',
//         'Camera permission is required to take photos.',
//       );
//       return;
//     }

//     launchCamera(
//       {
//         mediaType: 'photo',
//         saveToPhotos: true,
//       },
//       async (response) => {
//         if (response.didCancel) {
//           console.log('User cancelled camera');
//         } else if (response.errorCode) {
//           console.log('Camera error:', response.errorMessage);
//         } else if (response.assets && response.assets.length > 0) {
//           const { uri, fileName, fileSize } = response.assets[0];
//           const updatedPhotos = [...photos];
//           updatedPhotos[index] = { uri, fileName, fileSize };
//           setPhotos(updatedPhotos);

//           // Save photo details locally
//           try {
//             await AsyncStorage.setItem(
//               'capturedPhotos',
//               JSON.stringify(updatedPhotos),
//             );
//             Alert.alert('Success', 'Photo saved locally.');
//           } catch (error) {
//             console.error('Error saving photo to local storage:', error);
//             Alert.alert('Error', 'Failed to save photo locally.');
//           }
//         }
//       }
//     );
//   };

//   const handleDocumentPick = async (index) => {
//     try {
//       const result = await DocumentPicker.pickSingle({
//         type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
//       });
//       if (result) {
//         const { name: documentName, size: documentSize, type: documentType, uri: documentUri } = result;

//         // Log the details of the selected document
//         console.log("Document Name:", documentName);
//         console.log("Document Size:", documentSize);
//         console.log("Document Type:", documentType);
//         console.log("Document URI:", documentUri);

//         const updatedTenantDocuments = [...tenantDocuments];
//         updatedTenantDocuments[index] = {
//           documentName,
//           documentPath: documentUri,
//           documentSize,
//           documentType,
//         };
//         setTenantDocuments(updatedTenantDocuments);
//       }
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//         Alert.alert('Cancelled', 'Document selection was cancelled.');
//       } else {
//         Alert.alert('Error', 'Document selection failed.');
//       }
//     }
//   };

//   const renderTenantFields = () => {
//     return Array.from({ length: parseInt(tenantCount, 10) }, (_, index) => (
//       <View key={index} style={styles.tenantContainer}>
//         <Text style={styles.label}>Tenant {index + 1} Name</Text>
//         <TextInput
//           style={styles.input}
//           placeholder={`Enter Tenant ${index + 1} Name`}
//           value={tenantNames[index] || ''}
//           onChangeText={value => handleNameChange(index, value)}
//         />

//         <TouchableOpacity
//           style={styles.documentButton}
//           onPress={() => handleDocumentPick(index)}>
//           <Text style={styles.photoButtonText}>
//             {tenantDocuments[index] ? 'Change Document' : 'Upload Document'}
//           </Text>
//         </TouchableOpacity>
//         {tenantDocuments[index] && (
//           <Text style={styles.photoText}>
//             Document: {tenantDocuments[index].documentName}
//           </Text>
//         )}
//       </View>
//     ));
//   };

//   const handleNameChange = (index, value) => {
//     const updatedTenantNames = [...tenantNames];
//     updatedTenantNames[index] = value;
//     setTenantNames(updatedTenantNames);
//   };

//   const validateAndSubmit = async () => {
//     try {
//       if (photos.length < 3 || photos.some(photo => !photo.uri)) {
//         throw new Error('Please take all three photos.');
//       }

//       if (tenantNames.length < tenantCount || tenantDocuments.length < tenantCount ||
//           tenantNames.some(name => !name) || tenantDocuments.some(doc => !doc.documentPath)) {
//         throw new Error('Please provide names and documents for all tenants.');
//       }

//       console.log('Auth Token:', token);
//       // Submit photo details
//       const photoData = new FormData();
//       photoData.append('OwnerID', ownerID);
//       photoData.append('PropertyID', propertyID);
//       photoData.append('CreatedBy', createdBy);
//       photos.forEach((photo, index) => {
//         photoData.append('files', {
//           uri: photo.uri,
//           name: photo.fileName,
//           type: 'image/jpeg', // Adjust the type based on your file type
//         });
//       });

//       console.log('Photo FormData:', photoData);
//       try {
//         console.log('Sending photo data to API:', photoData);
//         const photoResponse = await axios.post(API_ENDPOINT_PHOTO, photoData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (photoResponse.status !== 200) {
//           throw new Error(photoResponse.data.message || 'Photo submission failed.');
//         }
//       } catch (error) {
//         Alert.alert('Error', error.message);
//         console.error('Photo upload error:', error.response ? error.response.data : error.message);
//         throw new Error('Photo upload failed.');
//       }

//       // Submit tenant documents
//       const documentData = new FormData();
//       documentData.append('OwnerID', ownerID);
//       documentData.append('PropertyID', propertyID);
//       documentData.append('CreatedBy', createdBy);
//       documentData.append('tenantNames', JSON.stringify(tenantNames));
//       tenantDocuments.forEach((document, index) => {
//         documentData.append('files', {
//           uri: document.documentPath,
//           name: document.documentName,
//           type: document.documentType,
//         });
//       });

//       console.log('Document FormData:', documentData);
//       const documentResponse = await axios.post(API_ENDPOINT_DOCUMENT, documentData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (documentResponse.status !== 200) {
//         throw new Error(documentResponse.data.message || 'Document submission failed.');
//       }

//       navigation.navigate('LiveLocation', { propertyID: propertyID });
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Animated.View style={{ opacity: fadeAnim }}>
//         <Text style={styles.headerCenter}>Upload Photos</Text>
//         {['Owner Photo', 'Property Photo 1', 'Property Photo 2'].map((title, index) => (
//           <View key={index} style={styles.photoContainer}>
//             <Text style={styles.photoText}>{title}</Text>
//             <TouchableOpacity
//               style={styles.captureButton}
//               onPress={() => handleTakePhoto(index)}
//             >
//               <Text style={styles.buttonText}>{photos[index] ? 'Change Photo' : 'Take Photo'}</Text>
//             </TouchableOpacity>
//             {photos[index]?.uri && (
//               <Image source={{ uri: photos[index].uri }} style={styles.photoPreview} />
//             )}
//           </View>
//         ))}

//         <Text style={styles.header}>Tenant Details</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter Tenant Count"
//           value={tenantCount}
//           onChangeText={setTenantCount}
//           keyboardType="numeric"
//         />

//         {renderTenantFields()}

//         <Text style={styles.header}>Owner ID</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter Owner ID"
//           value={ownerID}
//           onChangeText={setOwnerID}
//         />

//         <Text style={styles.header}>Property ID</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter Property ID"
//           value={propertyID}
//           onChangeText={setPropertyID}
//         />

//         <Text style={styles.header}>Created By</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter Created By"
//           value={createdBy}
//           onChangeText={setCreatedBy}
//         />

//         <TouchableOpacity
//           style={[styles.submitButton, { marginBottom: 50 }]}
//           onPress={validateAndSubmit}
//         >
//           <Text style={styles.buttonText}>Submit</Text>
//         </TouchableOpacity>
//       </Animated.View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#f9f9f9',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     color: '#333',
//     textAlign: 'left',
//   },
//   headerCenter: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     color: '#333',
//     textAlign: 'center',
//   },
//   photoContainer: {
//     marginBottom: 20,
//     backgroundColor: '#fff',
//     padding: 10,
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//     elevation: 2,
//     alignItems: 'center',
//   },
//   photoText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     color: '#555',
//     textAlign: 'center',
//   },
//   captureButton: {
//     backgroundColor: '#007bff',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     marginBottom: 8,
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//     textAlign: 'center',
//     fontSize: 16,
//   },
//   tenantContainer: {
//     marginBottom: 20,
//     backgroundColor: '#fff',
//     padding: 10,
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   documentButton: {
//     backgroundColor: '#007BFF',
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 10,
//     alignSelf: 'center',
//   },
//   photoButtonText: {
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//     textAlign: 'center',
//     fontSize: 16,
//   },
//   photoText: {
//     marginTop: 10,
//     color: '#555',
//     fontSize: 18,
//     textAlign: 'center',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 4,
//     padding: 8,
//     marginBottom: 16,
//     backgroundColor: '#fff',
//     fontSize: 18,
//   },
//   submitButton: {
//     backgroundColor: '#007BFF',
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 20,
//     alignSelf: 'center',
//   },
//   photoPreview: {
//     width: 100,
//     height: 100,
//     marginTop: 10,
//   },
// });

// export default TestComponent;