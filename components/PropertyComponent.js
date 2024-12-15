import React, {useState , useContext} from 'react';
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
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid, Platform} from 'react-native';
import AppStyles from '../styles/AppStyles';
import {AuthContext} from '../contexts/AuthContext';

const PropertyDetailsComponent = () => {
  const {authState} = useContext(AuthContext);

  const ownerID = authState.ownerId;
  const [propertyMode, setPropertyMode] = useState('');
  const [propertyAge, setPropertyAge] = useState('');
  const [roomCount, setRoomCount] = useState('');
  const [floorCount, setFloorCount] = useState('');
  const [shopCount, setShopCount] = useState('');
  const [tenantCount, setTenantCount] = useState('');
  const [waterHarvesting, setWaterHarvesting] = useState('');
  const [submersible, setSubmersible] = useState('');
  const [geoLocation, setGeoLocation] = useState('');
  const [Locality, setLocality] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [galliNumber, setGalliNumber] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [consent, setConsent] = useState('');
  const createdBy = authState.user;
  const [Zone, setZone] = useState('');
  const [Colony, setColony] = useState('');
  const navigation = useNavigation();
  const [localities, setLocalities] = useState([]);  // Array to hold localities
  const [selectedLocality, setSelectedLocality] = useState('');
  const zoneID = 4;

  const validateAndSubmit = async () => {
    try {
      if (!propertyMode || !geoLocation ) {
        throw new Error(
          'Property Mode, GeoLocation, and Created By are required.',
        );
      }
      useEffect(() => {
        // Fetch data from API
        const fetchLocalities = async () => {
          try {
            const response = await axios.post('http://192.168.29.56:3000/auth/Locality', {
              ZoneID: zoneID, // Send ZoneID in the payload
            });
    
            if (response.data && response.data.message) {
              setLocalities(response.data.message); // Set localities from the response
            } else {
              console.error('Invalid response format:', response.data);
            }
          } catch (error) {
            console.error('Error fetching localities:', error);
          }
        };
    
        fetchLocalities();
      }, []);

      const propertyDetails = {
        ownerID,
        propertyMode,
        propertyAge,
        roomCount: parseInt(roomCount, 10) || 0,
        floorCount: parseInt(floorCount, 10) || 0,
        shopCount: parseInt(shopCount, 10) || 0,
        tenantCount: parseInt(tenantCount, 10) || 0,
        waterHarvesting: waterHarvesting === 'Yes',
        submersible: submersible === 'Yes',
        geoLocation,
        Locality,
        houseNumber,
        galliNumber,
        bankAccountNumber,
        consent: consent === 'Yes',
        createdBy,
        Zone,
        Colony,
      };

      const response = await fetch(
        'http://192.168.29.56:3000/auth/PropertyDetails',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({PropertyDetails: propertyDetails}),
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
        selectedValue={Zone}
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
      selectedValue={Locality}
      onValueChange={(itemValue) => setLocality(itemValue)}
      style={AppStyles.picker}
    >
      <Picker.Item label="Select Locality" value="" />
      {localities.map((locality) => (
        <Picker.Item
          key={locality.LocalityID}
          label={locality.Locality}
          value={locality.LocalityID}
        />
      ))}
    </Picker>


<Text style={AppStyles.label}>Colony</Text>
<Picker
  selectedValue={Colony}
  onValueChange={itemValue => setColony(itemValue)}
  style={AppStyles.picker}>
  <Picker.Item label="Select Colony" value="" />
  <Picker.Item label="Colony 1" value="Colony 1" />
  <Picker.Item label="Colony 2" value="Colony 2" />
  <Picker.Item label="Colony 3" value="Colony 3" />
</Picker>
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

      <Text style={AppStyles.label}>GeoLocation *</Text>
      <TextInput
        style={AppStyles.input}
        placeholder="Enter GeoLocation"
        value={geoLocation}
        onChangeText={setGeoLocation}
      />

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

      <TouchableOpacity style={[AppStyles.button, AppStyles.probutton]} onPress={validateAndSubmit}>
        <Text style={AppStyles.buttonText}>Save and Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};



export default PropertyDetailsComponent;
