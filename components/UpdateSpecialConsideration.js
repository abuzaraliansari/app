import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert, 
  StyleSheet 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import AppStyles from '../styles/AppStyles';
import { AuthContext } from '../contexts/AuthContext';
import Config from 'react-native-config';

const UpdateSpecialConsideration = () => {
  const { userToken } = useContext(AuthContext); // Context for authentication
  const navigation = useNavigation();
  const route = useRoute();

  // State variables for form fields
  const [ownerID, setOwnerID] = useState('');
  const [propertyID, setPropertyID] = useState('');
  const [considerationType, setConsiderationType] = useState('');
  const [description, setDescription] = useState('');

  // Handle form submission
  const handleSubmit = async () => {
    if (!ownerID) {
      Alert.alert('Validation Error', 'OwnerID is required.');
      return;
    }

    try {
      const response = await axios.put(
        `${Config.API_URL}/updateSpecialConsideration`, // Replace with your endpoint
        {
          ownerID,
          propertyID: propertyID || null,
          considerationType: considerationType || null,
          description: description || null,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`, // Add token for authenticated API calls
          },
        }
      );

      if (response.data.success) {
        Alert.alert('Success', response.data.message);
        navigation.goBack(); // Navigate back after success
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.error('Error updating special consideration:', error);
      Alert.alert('Error', 'An error occurred while updating the special consideration.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Update Special Consideration</Text>

      <Text style={styles.label}>Owner ID</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Owner ID"
        value={ownerID}
        onChangeText={setOwnerID}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Property ID (Optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Property ID"
        value={propertyID}
        onChangeText={setPropertyID}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Consideration Type</Text>
      <Picker
        selectedValue={considerationType}
        onValueChange={(itemValue) => setConsiderationType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Consideration Type" value="" />
        <Picker.Item label="Type A" value="Type A" />
        <Picker.Item label="Type B" value="Type B" />
        <Picker.Item label="Type C" value="Type C" />
      </Picker>

      <Text style={styles.label}>Description (Optional)</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: AppStyles.primaryColor,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 80,
  },
  picker: {
    height: 50,
    marginBottom: 15,
  },
  button: {
    backgroundColor: AppStyles.primaryColor,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UpdateSpecialConsideration;
