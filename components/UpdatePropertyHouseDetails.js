import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';

const UpdatePropertyDetailsHouse = () => {
  const { token } = useContext(AuthContext); // Assuming token is stored in AuthContext
  const navigation = useNavigation();
  const route = useRoute();
  
  const [formData, setFormData] = useState({
    ownerID: '',
    propertyMode: '',
    propertyAge: '',
    roomCount: '',
    floorCount: '',
    shopCount: '',
    tenantCount: '',
    TenantYearlyRent: '',
    waterHarvesting: false,
    submersible: false,
    houseNumber: '',
    bankAccountNumber: '',
    consent: false,
    HouseType: '',
    OpenArea: '',
    ConstructedArea: '',
  });

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async () => {
    if (!formData.ownerID) {
      Alert.alert('Validation Error', 'OwnerID is required.');
      return;
    }

    try {
      const response = await axios.put(
        `${Config.API_URL}/updatePropertyDetailsHouse`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message) {
        Alert.alert('Success', response.data.message, [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert('Error', response.data.error || 'Update failed.');
      }
    } catch (error) {
      console.error('Error updating property details:', error);
      Alert.alert('Error', 'An error occurred while updating property details.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Owner ID</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Owner ID"
        keyboardType="numeric"
        value={formData.ownerID}
        onChangeText={(value) => handleInputChange('ownerID', value)}
      />

      <Text style={styles.label}>Property Mode</Text>
      <Picker
        selectedValue={formData.propertyMode}
        onValueChange={(value) => handleInputChange('propertyMode', value)}
        style={styles.picker}
      >
        <Picker.Item label="Select Mode" value="" />
        <Picker.Item label="Residential" value="Residential" />
        <Picker.Item label="Commercial" value="Commercial" />
      </Picker>

      <Text style={styles.label}>Property Age</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Property Age"
        value={formData.propertyAge}
        onChangeText={(value) => handleInputChange('propertyAge', value)}
      />

      {/* Add other inputs for form fields */}
      <Text style={styles.label}>Room Count</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Room Count"
        keyboardType="numeric"
        value={formData.roomCount}
        onChangeText={(value) => handleInputChange('roomCount', value)}
      />

      <Text style={styles.label}>Water Harvesting</Text>
      <Picker
        selectedValue={formData.waterHarvesting}
        onValueChange={(value) => handleInputChange('waterHarvesting', value)}
        style={styles.picker}
      >
        <Picker.Item label="Select" value={false} />
        <Picker.Item label="Yes" value={true} />
        <Picker.Item label="No" value={false} />
      </Picker>

      {/* Add remaining fields similarly */}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Update Details</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
  },
  picker: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default UpdatePropertyDetailsHouse;

