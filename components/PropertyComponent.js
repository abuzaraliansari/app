import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import AppStyles from '../styles/AppStyles';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';

const PropertyDetailsComponent = () => {
  const { authState } = useContext(AuthContext);
  const navigation = useNavigation();

  const ownerID = authState.ownerId;
  const createdBy = authState.user;

  const [propertyMode, setPropertyMode] = useState('');
  const [propertyAge, setPropertyAge] = useState('');
  const [roomCount, setRoomCount] = useState('');
  const [floorCount, setFloorCount] = useState('');
  const [shopCount, setShopCount] = useState('');
  const [geoLocation, setGeoLocation] = useState('');
  const [localities, setLocalities] = useState([]);
  const [locality, setLocality] = useState('');
  const [zone, setZone] = useState('');
  const [colony, setColony] = useState('');
  const [galliNumber, setGalliNumber] = useState('');
  const [houseNumber, setHouseNumber] = useState('');

  const zoneID = 4;

  // Fetch localities when component mounts
  useEffect(() => {
    const fetchLocalities = async () => {
      setLocalities([]);
      try {
        const response = await axios.post('http://192.168.29.56:3000/auth/Locality', {
          "ZoneID": String(zone) 
        });
        if (response.data?.locality) {
          setLocalities(response.data.locality);
        } else {
          console.error('Invalid response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching localities:', error);
      }
    };

    fetchLocalities();
  }, [zone]);



  const validateAndSubmit = async () => {
    try {
      if (!propertyMode || !geoLocation) {
        throw new Error('Property Mode and GeoLocation are required.');
      }

      const propertyDetails = {
        ownerID,
        propertyMode,
        propertyAge,
        roomCount: parseInt(roomCount, 10) || 0,
        floorCount: parseInt(floorCount, 10) || 0,
        shopCount: parseInt(shopCount, 10) || 0,
        geoLocation,
        locality,
        galliNumber,
        houseNumber,
        createdBy,
        zone,
        colony,
      };

      const response = await fetch(
        'http://192.168.29.56:3000/auth/PropertyDetails',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ PropertyDetails: propertyDetails }),
        },
      );

      const result = await response.json();

      if (response.status === 201) {
        Alert.alert('Success', 'Property details submitted successfully.');
        navigation.navigate('SpecialConsideration');
      } else {
        throw new Error(result.error || 'Submission failed.');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView style={AppStyles.container}>
      <Text style={AppStyles.header}>Property Details</Text>
      <Text style={AppStyles.label}>Welcome, {authState.user}</Text>

      <Text style={AppStyles.label}>Zone</Text>
      <Picker
        selectedValue={zone}
        onValueChange={(itemValue) => setZone(itemValue)}
        style={AppStyles.picker}
      >
        <Picker.Item label="Select Zone" value="" />
        <Picker.Item label="Zone 1" value="1" />
        <Picker.Item label="Zone 2" value="2" />
        <Picker.Item label="Zone 3" value="3" />
      </Picker>

      <Text style={AppStyles.label}>Locality</Text>
      <Picker
        selectedValue={locality}
        onValueChange={(itemValue) => setLocality(itemValue)}
        style={AppStyles.picker}
      >
        <Picker.Item label="Select Locality" value="" />
        {localities.map((loc) => (
          <Picker.Item key={loc.LocalityID} label={loc.Locality} value={String(loc.LocalityID)}  />
        ))}
      </Picker>

      {/* Additional Form Fields */}
      <Text style={AppStyles.label}>Galli Number</Text>
      <TextInput
        style={AppStyles.input}
        placeholder="Enter Galli Number"
        value={galliNumber}
        onChangeText={setGalliNumber}
      />

      <Text style={AppStyles.label}>House Number</Text>
      <TextInput
        style={AppStyles.input}
        placeholder="Enter House Number"
        value={houseNumber}
        onChangeText={setHouseNumber}
      />

      <TouchableOpacity
        style={AppStyles.button}
        onPress={validateAndSubmit}
      >
        <Text style={AppStyles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PropertyDetailsComponent;
