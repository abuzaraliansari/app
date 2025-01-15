import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import AppStyles from '../styles/AppStyles';
import { AuthContext } from '../contexts/AuthContext';
import Config from 'react-native-config';
import axios from 'axios';

const UpdatePropertyDetails = () => {
  const navigation = useNavigation();
  const { userToken } = useContext(AuthContext);

  const [propertyDetails, setPropertyDetails] = useState({
    ownerID: '',
    locality: '',
    galliNumber: '',
    zone: '',
    colony: '',
  });

  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const response = await axios.get(`${Config.API_BASE_URL}/api/zones`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setZones(response.data.zones || []);
      } catch (error) {
        console.error('Error fetching zones:', error);
        Alert.alert('Error', 'Failed to fetch zones');
      }
    };

    fetchZones();
  }, [userToken]);

  const handleChange = (key, value) => {
    setPropertyDetails((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!propertyDetails.ownerID) {
      Alert.alert('Error', 'OwnerID is required');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.put(
        `${Config.API_BASE_URL}/api/updatePropertyDetails`,
        { PropertyDetails: propertyDetails },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      setLoading(false);

      if (response.data.success) {
        Alert.alert('Success', response.data.message, [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error updating property details:', error);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'An error occurred while updating property details'
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Update Property Details</Text>

      <TextInput
        style={styles.input}
        placeholder="Owner ID"
        keyboardType="numeric"
        value={propertyDetails.ownerID}
        onChangeText={(text) => handleChange('ownerID', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Locality"
        keyboardType="numeric"
        value={propertyDetails.locality}
        onChangeText={(text) => handleChange('locality', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Galli Number"
        value={propertyDetails.galliNumber}
        onChangeText={(text) => handleChange('galliNumber', text)}
      />

      <Picker
        selectedValue={propertyDetails.zone}
        onValueChange={(value) => handleChange('zone', value)}
        style={styles.picker}
      >
        <Picker.Item label="Select Zone" value="" />
        {zones.map((zone) => (
          <Picker.Item key={zone.id} label={zone.name} value={zone.id} />
        ))}
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Colony"
        value={propertyDetails.colony}
        onChangeText={(text) => handleChange('colony', text)}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Updating...' : 'Update'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default UpdatePropertyDetails;
