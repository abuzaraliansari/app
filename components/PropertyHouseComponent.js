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
import {useNavigation , useRoute} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import AppStyles from '../styles/AppStyles';
import {AuthContext} from '../contexts/AuthContext';
import Config from 'react-native-config';
import axios from 'axios';

const PropertyHouseComponent = () => {
  const {authState} = useContext(AuthContext);
  const navigation = useNavigation();
  const route = useRoute();
  const { HouseNumber ,propertyID} = route.params; 
  console.log('HouseNumber reterived:', HouseNumber);
  //const { propertyID } = route.params; 
  const ownerID = authState.ownerId;
 // const propertyID = authState.propertyID;
  //console.log('PropertyID:', propertyID);
  const [propertyMode, setPropertyMode] = useState('');
  const [propertyAge, setPropertyAge] = useState('');
  const [roomCount, setRoomCount] = useState('');
  const [floorCount, setFloorCount] = useState('');
  const [shopCount, setShopCount] = useState('');
  const [tenantCount, setTenantCount] = useState('');
  const [waterHarvesting, setWaterHarvesting] = useState('');
  const [submersible, setSubmersible] = useState('');
  //const [Locality, setLocality] = useState('');
  const [houseNumber, SetHouseNumber] = useState(String(HouseNumber));
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [consent, setConsent] = useState('');
  const createdBy = authState.user;
  // const [Zone, setZone] = useState('');

  //SetHouseNumber(HouseNumber);
  console.log('PropertyID:', propertyID);
  const API_ENDPOINT = `${Config.API_URL}/auth/PropertyDetailsHouse`;
 
 
  
  const validateAndSubmit = async () => {
    try {
      if (!propertyMode ) {
        throw new Error(
          'Property Mode.',
        );
      }

    
      const propertyDetails = {
      
        propertyID,
        propertyMode,
        propertyAge,
        roomCount,
        floorCount,
        shopCount,
       tenantCount,
       waterHarvesting,
       submersible,

        houseNumber,
       bankAccountNumber,
       consent
        };

      console.log('Request Body:', propertyDetails);
      console.log('API_ENDPOINT:', API_ENDPOINT); 
      // Simulate API call with axios
      const response = await axios.post(API_ENDPOINT, propertyDetails);

     
      //const result = await response.json();

      if (response.status === 200) {
        //Alert.alert('Success', 'Property details submitted successfully.');
        navigation.navigate('LiveLocation');
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
      <Text style={AppStyles.label}>Welcome, {authState.user} , {HouseNumber} </Text>

     

      <Text style={AppStyles.label}>House Number</Text>
      <TextInput
    
        style={AppStyles.input}
        //placeholder={String(HouseNumber)}
        value={houseNumber}
        onChangeText={SetHouseNumber}

        // editable={false} // Disabled for auto-fill
      />

      <Text style={AppStyles.label}>Property Mode *</Text>
      <View style={AppStyles.pickerContainer}>
        <Picker
          selectedValue={propertyMode}
          onValueChange={itemValue => setPropertyMode(itemValue)}>
          <Picker.Item label="Select Property Mode" value="" />
          <Picker.Item label="Residential" value="Residential" />
          <Picker.Item label="Commercial" value="Commercial" />
        </Picker>
      </View>

      <Text style={AppStyles.label}>Property Age</Text>
      <Picker
        selectedValue={propertyAge}
        onValueChange={itemValue => setPropertyAge(itemValue)}
        style={AppStyles.picker}>
        <Picker.Item label="Select Property Age" value="" />
        <Picker.Item label="1-5" value="1-5" />
        <Picker.Item label="5-10" value="5-10" />
        <Picker.Item label="10-15" value="10-15" />
        <Picker.Item label="15-20" value="15-20" />
        <Picker.Item label="20-30" value="20-30" />
        <Picker.Item label="30-40" value="30-40" />
        <Picker.Item label="40-50" value="40-50" />
        <Picker.Item label="50-60" value="50-60" />
        <Picker.Item label="60-70" value="60-70" />
        <Picker.Item label="70-80" value="70-80" />
        <Picker.Item label="80-90" value="80-90" />
        <Picker.Item label="90-100" value="90-100" />
        <Picker.Item label="100-110" value="100-110" />
        <Picker.Item label="110-120" value="110-120" />
        <Picker.Item label="120-130" value="120-130" />
        <Picker.Item label="130-140" value="130-140" />
        <Picker.Item label="140-150" value="140-150" />
        <Picker.Item label="150+" value="150+" />
      </Picker>

      <Text style={AppStyles.label}>Room Count</Text>
      <Picker
        selectedValue={roomCount}
        onValueChange={itemValue => setRoomCount(itemValue)}
        style={AppStyles.picker}>
        <Picker.Item label="Select Room Count" value="" />
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
        <Picker.Item label="6" value="6" />
        <Picker.Item label="7" value="7" />
        <Picker.Item label="8" value="8" />
        <Picker.Item label="9" value="9" />
        <Picker.Item label="10" value="10" />
        <Picker.Item label="11" value="11" />
        <Picker.Item label="12" value="12" />
        <Picker.Item label="13" value="13" />
        <Picker.Item label="14" value="14" />
        <Picker.Item label="15" value="15" />
        <Picker.Item label="16" value="16" />
        <Picker.Item label="17" value="17" />
        <Picker.Item label="18" value="18" />
        <Picker.Item label="19" value="19" />
        <Picker.Item label="20" value="20" />
      </Picker>

      <Text style={AppStyles.label}>Floor Count</Text>
      <Picker
        selectedValue={floorCount}
        onValueChange={itemValue => setFloorCount(itemValue)}
        style={AppStyles.picker}>
        <Picker.Item label="Select Floor Count" value="" />
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
        <Picker.Item label="6" value="6" />
        <Picker.Item label="7" value="7" />
      </Picker>

      <Text style={AppStyles.label}>Shop Count</Text>
      <Picker
        selectedValue={shopCount}
        onValueChange={itemValue => setShopCount(itemValue)}
        style={AppStyles.picker}>
        <Picker.Item label="Select Shop Count" value="" />
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
        <Picker.Item label="6" value="6" />
        <Picker.Item label="7" value="7" />
        <Picker.Item label="8" value="8" />
        <Picker.Item label="9" value="9" />
        <Picker.Item label="10" value="10" />
      </Picker>

      <Text style={AppStyles.label}>Tenant Count</Text>
      <Picker
        selectedValue={tenantCount}
        onValueChange={itemValue => setTenantCount(itemValue)}
        style={AppStyles.picker}>
        <Picker.Item label="Select Room Count" value="" />
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
        <Picker.Item label="6" value="6" />
        <Picker.Item label="7" value="7" />
        <Picker.Item label="8" value="8" />
        <Picker.Item label="9" value="9" />
        <Picker.Item label="10" value="10" />
      </Picker>

      <Text style={AppStyles.label}>Water Harvesting</Text>
      <View style={AppStyles.pickerContainer}>
        <Picker
          selectedValue={waterHarvesting}
          onValueChange={itemValue => setWaterHarvesting(itemValue)}>
          <Picker.Item label="Select Water Harvesting" value="" />
          <Picker.Item label="Yes" value="Yes" />
          <Picker.Item label="No" value="No" />
        </Picker>
      </View>

      <Text style={AppStyles.label}>Submersible</Text>
      <View style={AppStyles.pickerContainer}>
        <Picker
          selectedValue={submersible}
          onValueChange={itemValue => setSubmersible(itemValue)}>
          <Picker.Item label="Select Submersible" value="" />
          <Picker.Item label="Yes" value="Yes" />
          <Picker.Item label="No" value="No" />
        </Picker>
      </View>
      {/* <Text style={AppStyles.label}>Live Location</Text>
      <View style={AppStyles.liveLocationContainer}>
        <LiveLocationComponent />
      </View> */}

      <Text style={AppStyles.label}>Bank Account Number</Text>
      <TextInput
        style={AppStyles.input}
        placeholder="Enter Bank Account Number"
        value={bankAccountNumber}
        onChangeText={setBankAccountNumber}
        keyboardType="numeric"
      />

      <Text style={AppStyles.label}>Consent</Text>
      <View style={AppStyles.pickerContainer}>
        <Picker
          selectedValue={consent}
          onValueChange={itemValue => setConsent(itemValue)}>
          <Picker.Item label="Select Consent" value="" />
          <Picker.Item label="Yes" value="Yes" />
          <Picker.Item label="No" value="No" />
        </Picker>
      </View>

      <TouchableOpacity
        style={[AppStyles.button, AppStyles.probutton]}
        onPress={validateAndSubmit}>
        <Text style={AppStyles.buttonText}>Save and Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PropertyHouseComponent;
