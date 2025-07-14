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
import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid, Platform} from 'react-native';
import { FormDataContext } from '../contexts/FormDataContext';
import axios from 'axios';
import { logToFile } from '../utils/Logger'; // <-- Add this line

const PropertyAreaComponent = () => {
  const {authState} = useContext(AuthContext);
  const { updateFormData , formData } = useContext(FormDataContext);
  const {login} = useContext(AuthContext);
  const ownerID = authState.ownerId;
  const [galliNumber, setGalliNumber] = useState('');
  const CreatedBy = authState.user;
  const token = authState.token;
  const [colony, setColony] = useState('');
  const [newColony, setNewColony] = useState('');
  const [showAddColony, setShowAddColony] = useState(false);
  const navigation = useNavigation();
  const [zone, setZone] = useState('');
  const [locality, setLocality] = useState('');
  const [localities, setLocalities] = useState([]);
  const [Colonies, setColonies] = useState([]);
  const [selectedLocality, setSelectedLocality] = useState('');
  const RedStar = () => <Text style={{ color: 'red' }}>*</Text>;

  const route = useRoute();
  const source = route.params?.source; 
  const { newHouseNumber, ownerId, owner } = route.params;
  const API_ENDPOINTloc = `${Config.API_URL}/auth/Locality`;
  const API_ENDPOINTcol = `${Config.API_URL}/auth/Colony`;
  const AddColony = `${Config.API_URL}/auth/AddColony`;
  const API_ENDPOINT = `${Config.API_URL}/auth/PropertyDetails1`;
  const API_ENDPOINTnewHouseNumber = `${Config.API_URL}/auth/getMaxHouseNumber`;
  

  const zoneID = 4;
  const colonyID = 4;



  useEffect(() => {
    if (source === 'Add' && owner) {
      console.log('Owner details (from Add):', owner);
    }
    if (source === 'AllDetails' && formData.propertyDetails) {
      const {
        galliNumber,
        colony,
        zone,
        locality,
      } = formData.propertyDetails;

      setGalliNumber(galliNumber || '');
      setColony(colony || '');
      setZone(zone || '');
      setLocality(locality || '');
    }
  }, [source, formData.propertyDetails, owner]);

  useEffect(() => {
    const fetchLocalities = async zoneId => {
      setLocalities([]);
      try {
        console.log('API_ENDPOINTloc:', API_ENDPOINTloc);
        const response = await axios.post(API_ENDPOINTloc, {
          ZoneID: String(zone),
        }, {
          headers: {
            header_gkey: authState.token,
          },
        });

        if (response.data?.locality && Array.isArray(response.data.locality[0])) {
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

  const fetchColony = async localityId => {
    setColonies([]);

  // useEffect(() => {
    // const fetchColony = async localityId => {
    //   setColonies([]);
      try {
        console.log('API_ENDPOINTcol:', API_ENDPOINTcol);
        const response = await axios.post(API_ENDPOINTcol, {
          LocalityID: String(locality),
        }, {
          headers: {
            header_gkey: authState.token,
          },
        });

        if (response.data?.locality && Array.isArray(response.data.locality[0])) {
          setColonies(response.data.locality[0]);
        } else {
          console.error('Invalid response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching colony:', error);
      }
    };

    useEffect(() => {
      fetchColony(locality);
    }, [locality]);

    const handleAddColony = async () => {
      if (!newColony) {
        Alert.alert('Error', 'Please enter the new colony name.');
        return;
      }
  
      try {
        logToFile('Calling AddColony API');
        const response = await axios.post(AddColony, {
          LocalityID: locality,
          Colony: newColony,
        }, {
          headers: {
            header_gkey: authState.token,
          },
        });
        logToFile(`AddColony response: ${JSON.stringify(response.data)}`);
        if (response.status === 201) {
          Alert.alert('Success', 'New colony added successfully.');
          setShowAddColony(false);
          setNewColony('');
          fetchColony(locality); // Refresh the colonies list
        } else {
          logToFile('Failed to add new colony: Unexpected status');
          Alert.alert('Error', 'Failed to add new colony.');
        }
      } catch (error) {
        logToFile(`Error adding new colony: ${error.message}`);
        console.error('Error adding new colony:', error);
        Alert.alert('Error', 'Failed to add new colony.');
      }
    };
  
    const handleNext = async () => {
      if (!zone) {
        Alert.alert('Error', 'Zone is required.');
        return;
      }
      if (!locality) {
        Alert.alert('Error', 'Locality Ward Sankhya is required.');
        return;
      }
      if (!colony) {
        Alert.alert('Error', 'Colony is required.');
        return;
      }
      if (!galliNumber) {
        Alert.alert('Error', 'Galli Number is required.');
        return;
      }
  
      try {
        logToFile('Calling getMaxHouseNumber API');
        const response = await axios.post(API_ENDPOINTnewHouseNumber, {
          zone,
          galliNumber,
        }, {
          headers: {
            header_gkey: authState.token,
          },
        });
  
        logToFile(`getMaxHouseNumber response: ${JSON.stringify(response.data)}`);
  
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
            prePropertyNo: formData.propertyDetails?.prePropertyNo || '',
            RoadSize: formData.propertyDetails?.RoadSize || '',
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
          logToFile(`Saved propertyDetails: ${JSON.stringify(propertyDetails)}`);
          // navigation.navigate('PropertyHouse', { newHouseNumber } , { source: 'Home' });
  
          if (source === 'Home') {
            logToFile('Navigating to PropertyHouse with source Home');
            navigation.navigate('PropertyHouse', { newHouseNumber, source: 'Home' });
          }
            else if (source === 'Add') {
            logToFile('Navigating to PropertyHouse with source Add');
            navigation.navigate('PropertyHouse', { newHouseNumber, source: 'Add', owner });
          } else if (source === 'AllDetails') {
            logToFile('Navigating to PropertyHouse with source AllDetails');
            navigation.navigate('PropertyHouse', { newHouseNumber, source: 'AllDetails' });
          } else {
            logToFile('Source is not recognized');
          }
        } else {
          logToFile('House number not fetched. Network error.');
          Alert.alert('Network Error', 'House number not fetched. Please logout and try again.');
        }
      } catch (error) {
        logToFile(`Error fetching new house number: ${error.message}`);
        console.error('Error fetching new house number:', error);
        Alert.alert('Network Error', 'House number not fetched. Please logout and try again.');
      }
    };

  return (
    <ScrollView style={AppStyles.container}>
      <Text style={AppStyles.header}>Property Details</Text>

      <Text style={AppStyles.label}>Zone <RedStar /></Text>
      <Picker
        selectedValue={zone}
        onValueChange={itemValue => setZone(itemValue)}
        style={AppStyles.picker}>
        <Picker.Item label="Select Zone" value="" />
        <Picker.Item label="Zone 1" value="1" />
        <Picker.Item label="Zone 2" value="2" />
        <Picker.Item label="Zone 3" value="3" />
        <Picker.Item label="Zone 4" value="4" />
        <Picker.Item label="Zone 5" value="5" />
      </Picker>

      <Text style={AppStyles.label}>Locality Ward Sankhya <RedStar /></Text>
      <Picker
        selectedValue={locality}
        onValueChange={itemValue => setLocality(itemValue)}
        style={AppStyles.picker}>
        <Picker.Item label="Select Locality Ward" value="" />
        {localities.map(loc => (
          <Picker.Item
            key={loc.LocalityID}
            label={loc.Locality}
            value={loc.LocalityID}
          />
        ))}
      </Picker>

      <Text style={AppStyles.label}>Colony <RedStar /></Text>
      <Picker
        selectedValue={colony}
        onValueChange={itemValue => {
          if (itemValue === 'addNewColony') {
            setShowAddColony(true);
          } else {
            setShowAddColony(false);
            setColony(itemValue);
          }
        }}
        style={AppStyles.picker}>
        <Picker.Item label="Select Colony" value="" />
        {Colonies.map(col => (
          <Picker.Item
            key={col.ColonyID}
            label={col.Colony}
            value={col.Colony}
          />
        ))}
        <Picker.Item label="Add New Colony" value="addNewColony" />
      </Picker>

      {showAddColony && (
        <View>
          <TextInput
            style={AppStyles.input}
            placeholder="Enter New Colony Name"
            value={newColony}
            onChangeText={setNewColony}
          />
          <TouchableOpacity
            style={[AppStyles.button, AppStyles.probutton]}
            onPress={handleAddColony}>
            <Text style={AppStyles.buttonText}>Add Colony</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={AppStyles.label}>Galli Number <RedStar /></Text>
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