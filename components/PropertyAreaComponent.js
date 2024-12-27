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
import axios from 'axios';
import { run } from 'jest';

const  PropertyAreaComponent= () => {
 

  const {authState} = useContext(AuthContext);

  const {login} = useContext(AuthContext);
  //login('test', 'test', 1, 1);
  const ownerID = authState.ownerId;
  
  const [galliNumber, setGalliNumber, handlegalliNumberBlur] = useState('');
 
  
  const createdBy = authState.user;
  const token = authState.token;
  const [colony, setColony] = useState('');
  const navigation = useNavigation();
  const [zone, setZone] = useState('');
  const [locality, setLocality] = useState('');
  const [localities, setLocalities] = useState([]); // Array to hold localities
  const [selectedLocality, setSelectedLocality] = useState('');
  const API_ENDPOINTloc = `${Config.API_URL}/auth/Locality`;
  const API_ENDPOINT = `${Config.API_URL}/auth/PropertyDetails1`;


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

  


  const validateAndSubmit = async () => {
    try {

     
 

      const propertyDetails = {
        ownerID,
               locality,
       
        galliNumber,
        createdBy,
        zone,
        colony,
      };
      console.log('API_ENDPOINT:', API_ENDPOINT);
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
          'header_gkey': authState.token,
        },
        body: JSON.stringify({PropertyDetails: propertyDetails}),
      });

      const result = await response.json();
console.log('result:', result);
      if (response.status === 201) {
        //Alert.alert('Success', 'Property details submitted successfully.');
        //Ownere id baad mein change ker dena
        login(authState.token, authState.user, String(authState.ownerId), String(result.propertyID ));
        console.log('Property ID:', result.propertyID);
        console.log('HouseNumber ID:', result.HouseNumber);
        console.log('Owner ID:', authState.ownerId);
        navigation.replace('PropertyHouse',{ HouseNumber: result.HouseNumber ,  propertyID: result.propertyID});
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
        onValueChange={itemValue => setZone(itemValue)}
        style={AppStyles.picker}>
        <Picker.Item label="Select Zone" value="" />
        <Picker.Item label="Zone 1" value="1" />
        <Picker.Item label="Zone 2" value="2" />
        <Picker.Item label="Zone 3" value="3" />
        <Picker.Item label="Zone 4" value="4" />
      </Picker>

      <Text style={AppStyles.label}>Locality</Text>
      <Picker
        selectedValue={locality}
        onValueChange={itemValue => setLocality(itemValue)}
        style={AppStyles.picker}>
        <Picker.Item label="Select Locality" value="" />
        {localities.map(loc => (
          <Picker.Item
            key={loc.LocalityID}         // Use LocalityID as the key
            label={loc.Locality}           // Use Locality for the label
            value={loc.LocalityID}         // Use LocalityID as the value
          />
        ))}
      </Picker>

      <Text style={AppStyles.label}>Colony</Text>
      <TextInput
        style={AppStyles.input}
        placeholder="Enter Colony"
        value={colony}
        onChangeText={setColony}
      />

      <Text style={AppStyles.label}>Galli Number</Text>
      <TextInput
        style={AppStyles.input}
        placeholder="Enter Galli Number"
        value={galliNumber}
        onChangeText={setGalliNumber}
     
      />

      
      <TouchableOpacity
        style={[AppStyles.button, AppStyles.probutton]}
        onPress={validateAndSubmit}>
        <Text style={AppStyles.buttonText}>Save and Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PropertyAreaComponent;
