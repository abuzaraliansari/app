import React, {useState, useContext, useEffect} from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import AppStyles from '../styles/AppStyles';
import {AuthContext} from '../contexts/AuthContext';
import Config from 'react-native-config';
import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid, Platform} from 'react-native';
import { FormDataContext } from '../contexts/FormDataContext';
import axios from 'axios';
import { run } from 'jest';

const  PropertyAreaComponent= () => {
 

  const {authState} = useContext(AuthContext);
  const { updateFormData , formData } = useContext(FormDataContext);

  const {login} = useContext(AuthContext);
  //login('test', 'test', 1, 1);
  const ownerID = authState.ownerId;
  
  const [galliNumber, setGalliNumber] = useState('');
  
  const CreatedBy = authState.user;
  const token = authState.token;
  const [colony, setColony] = useState('');
  const navigation = useNavigation();
  const [zone, setZone] = useState('');
  const [locality, setLocality] = useState('');
  const [localities, setLocalities] = useState([]); // Array to hold localities
  const [selectedLocality, setSelectedLocality] = useState('');
  const API_ENDPOINTloc = `${Config.API_URL}/auth/Locality`;
  const API_ENDPOINT = `${Config.API_URL}/auth/PropertyDetails1`;
  const API_ENDPOINTnewHouseNumber = `${Config.API_URL}/auth/getMaxHouseNumber`;


  const zoneID = 4;

  // Fetch localities when component mounts
  useEffect(() => {
    const fetchLocalities = async zoneId => {
      setLocalities([]);
      try {
        console.log('API_ENDPOINTloc:', API_ENDPOINTloc);
        const response = await axios.post(API_ENDPOINTloc, {
          ZoneID: String(zone),

        },
        {headers: {
          header_gkey: authState.token, // Replace 'your-header-value' with the actual value
        }});

        if (response.data?.locality) {
          setLocalities(response.data.locality[0]);
        } else {
          console.error('Invalid response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching localities:', error);
      }
    };

    fetchLocalities(zone);
  }, [zone]);

  
const handleNext = async () => {
    if (!galliNumber || !colony || !zone || !locality) {
      Alert.alert('Error', 'Please fill all the required fields.');
      return;
    }

    try {
      const response = await axios.post(API_ENDPOINTnewHouseNumber, {
        zone,
        galliNumber,
      }, {
        headers: {
          header_gkey: authState.token,
        },
      });

      if (response.status === 200 && response.data.success) {
        const newHouseNumber = response.data.newHouseNumber;
        const propertyDetails = {
          propertyMode: formData.propertyDetails?.propertyMode || '',
          propertyAge: formData.propertyDetails?.propertyAge || '',
          roomCount: formData.propertyDetails?.roomCount || '',
          floorCount: formData.propertyDetails?.floorCount || '',
          shopCount: formData.propertyDetails?.shopCount || '',
          ShopArea: formData.propertyDetails?.ShopArea || '',
          tenantCount: formData.propertyDetails?.tenantCount || '',
          TenantYearlyRent: formData.propertyDetails?.TenantYearlyRent || '',
          waterHarvesting: formData.propertyDetails?.waterHarvesting || '',
          submersible: formData.propertyDetails?.submersible || '',
          zone,
          locality,
          colony,
          galliNumber,
          houseNumber: newHouseNumber,
          HouseType: formData.propertyDetails?.HouseType || '',
          OpenArea: formData.propertyDetails?.OpenArea || '',
          ConstructedArea: formData.propertyDetails?.ConstructedArea || '',
          bankAccountNumber: formData.propertyDetails?.bankAccountNumber || '',
          consent: formData.propertyDetails?.consent || '',
          CreatedBy: authState.user,
        };

        updateFormData({
          propertyDetails,
        });
    console.log('Area:', formData); // Log the temporary data to verify
console.log('newHouseNumber:', newHouseNumber);
    navigation.replace('PropertyHouse',{ newHouseNumber }); // Navigate to the next form

  } else {
    Alert.alert('Error', 'Failed to fetch new house number.');
  }
} catch (error) {
  console.error('Error fetching new house number:', error);
  Alert.alert('Error', 'Failed to fetch new house number.');
}
  };


  return (
    <ScrollView style={AppStyles.container}>
      <Text style={AppStyles.header}>Property Details</Text>
      {/* <Text style={AppStyles.label}>Welcome, {authState.user}</Text> */}

      <Text style={AppStyles.label}>Zone</Text>
      <Picker
        selectedValue={zone}
        onValueChange={itemValue => setZone(itemValue)}
        style={AppStyles.picker}>
        <Picker.Item label="Select Zone" value="" />
        <Picker.Item label="Zone 1" value="1" />
        <Picker.Item label="Zone 2" value="2" />
        <Picker.Item label="Zone 3" value="3" />
        <Picker.Item label="Zone 4" value="4" />
      </Picker>

      <Text style={AppStyles.label}>Locality Ward Sankhya</Text>
      <Picker
        selectedValue={locality}
        onValueChange={itemValue => setLocality(itemValue)}
        style={AppStyles.picker}>
        <Picker.Item label="Select Locality Ward" value="" />
        {localities.map(loc => (
          <Picker.Item
            key={loc.LocalityID}         // Use LocalityID as the key
            label={loc.Locality}           // Use Locality for the label
            value={loc.LocalityID}         // Use LocalityID as the value
          />
        ))}
      </Picker>

      <Text style={AppStyles.label}>Colony</Text>
      <Picker
        selectedValue={colony}
        onValueChange={itemValue => setColony(itemValue)}
        style={AppStyles.picker}>
        <Picker.Item label="Select Colony" value="" />
        <Picker.Item label="Colony 1" value="Colony 1" />
        <Picker.Item label="Colony 2" value="Colony 2" />
        <Picker.Item label="Colony 3" value="Colony 3" />
        <Picker.Item label="Colony 4" value="Colony 4" />
      </Picker>

      <Text style={AppStyles.label}>Galli Number</Text>
      <TextInput
        style={AppStyles.input}
        placeholder="Enter Galli Number"
        value={galliNumber}
        onChangeText={setGalliNumber}
     
      />

      
      <TouchableOpacity
        style={[AppStyles.button, AppStyles.probutton]}
        onPress={handleNext}>
        <Text style={AppStyles.buttonText}>Save and Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PropertyAreaComponent;
