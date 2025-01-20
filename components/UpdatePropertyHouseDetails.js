import React, { useState, useContext ,useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import AppStyles from '../styles/AppStyles';
import { AuthContext } from '../contexts/AuthContext';
import Config from 'react-native-config';
import axios from 'axios';
import { FormDataContext } from '../contexts/FormDataContext';

const PropertyHouseComponent = () => {
  const { authState } = useContext(AuthContext);
  const { updateFormData, formData } = useContext(FormDataContext);

  const navigation = useNavigation();
  const route = useRoute();
  const source = route.params?.source; 
  const { updatedPropertyDetails, newHouseNumber } = route.params;
  const FormData = require('form-data');
  //const ownerID = authState.ownerId;
  const propertyID = updatedPropertyDetails.PropertyID;
  const ownerID = updatedPropertyDetails.OwnerID;
  const [propertyMode, setPropertyMode] = useState(updatedPropertyDetails.PropertyMode || '');
  const [propertyAge, setPropertyAge] = useState(updatedPropertyDetails.PropertyAge || '');
  const [roomCount, setRoomCount] = useState(String(updatedPropertyDetails.RoomCount || '0'));
  const [floorCount, setFloorCount] = useState(String(updatedPropertyDetails.FloorCount || '0'));
  const [shopCount, setShopCount] = useState(String(updatedPropertyDetails.ShopCount || '0'));
  const [ShopArea, setShopArea] = useState(String(updatedPropertyDetails.ShopArea || '0'));
  const [OpenArea, setOpenArea] = useState(String(updatedPropertyDetails.OpenArea || ''));
  const [ConstructedArea, setConstructedArea] = useState(String(updatedPropertyDetails.ConstructedArea || ''));
  const [tenantCount, setTenantCount] = useState(String(updatedPropertyDetails.TenantCount || '0'));
  const [TenantYearlyRent, setTenantYearlyRent] = useState(String(updatedPropertyDetails.TenantYearlyRent || '0'));
  const [HouseType, setHouseType] = useState(updatedPropertyDetails.HouseType || '');
  const [waterHarvesting, setWaterHarvesting] = useState(updatedPropertyDetails.WaterHarvesting ? 'Yes' : 'No');
  const [submersible, setSubmersible] = useState(updatedPropertyDetails.Submersible ? 'Yes' : 'No');
  const [houseNumber, SetHouseNumber] = useState(String(newHouseNumber || updatedPropertyDetails.HouseNumber));
  const [bankAccountNumber, setBankAccountNumber] = useState(updatedPropertyDetails.BankAccountNumber || '');
  const [consent, setConsent] = useState(updatedPropertyDetails.Consent ? 'Yes' : 'No');
  const [IsActive, setIsActive] = useState(updatedPropertyDetails.IsActive ? 'Yes' : 'No');
  const token = authState.token;
  const CreatedBy = authState.user;
  const ModifiedBy = authState.user;
  const DateModified = new Date().toISOString();
console.log(houseNumber);
console.log('hy');
  const API_ENDPOINT = `${Config.API_URL}/auth/updatePropertyDetails`;
  const DOCUMENT_API_ENDPOINT = `${Config.API_URL}/auth/uploadDoc`;

  const handleUpdate = async () => {
    if (!propertyMode || !HouseType) {
      Alert.alert('Error', 'Please fill all the required fields.');
      return;
    }
    if (!HouseType) {
      Alert.alert('Error', 'Please select a house type.');
      return;
    }
    
    // Validation for houseNumber
    if (!houseNumber) {
      Alert.alert('Error', 'House number cannot be blank.');
      return;
    }
    
    // Validation for consent
    if (consent !== 'Yes') {
      Alert.alert('Error', 'You must give consent to proceed.');
      return;
    }

    const propertyDetails = {
      PropertyID: updatedPropertyDetails.PropertyID,
      OwnerID: updatedPropertyDetails.OwnerID,
      PropertyMode: propertyMode,
      PropertyAge: propertyAge,
      RoomCount: roomCount,
      FloorCount: floorCount,
      ShopCount: shopCount,
      ShopArea: ShopArea,
      TenantCount: tenantCount,
      TenantYearlyRent: TenantYearlyRent,
      WaterHarvesting: waterHarvesting === 'No',
      Submersible: submersible === 'No',
      ZoneID: updatedPropertyDetails.ZoneID,
      Locality: updatedPropertyDetails.Locality,
      Colony: updatedPropertyDetails.Colony,
      GalliNumber: updatedPropertyDetails.GalliNumber,
      HouseNumber: houseNumber,
      HouseType: HouseType,
      OpenArea: OpenArea,
      ConstructedArea: ConstructedArea,
      BankAccountNumber: bankAccountNumber,
      Consent: consent === 'Yes',
      CreatedBy: updatedPropertyDetails.CreatedBy,
      DateCreated: updatedPropertyDetails.DateCreated,
      ModifiedBy: ModifiedBy,
      DateModified: DateModified,
      IsActive: updatedPropertyDetails.IsActive
    };

    try {
      console.log('Sending property details to API:', propertyDetails);
      const response = await axios.post(API_ENDPOINT, { PropertyDetails: propertyDetails }, {
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Property details updated successfully.');
        navigation.navigate('Find', { updatedPropertyDetails , newHouseNumber });
      } else {
        Alert.alert('Error', 'Failed to update property details.');
      }
    } catch (error) {
      console.error('Error updating property details:', error);
      Alert.alert('Error', 'Failed to update property details.');
    }
  };
  console.log(houseNumber);
  console.log('hyyy');
  return (
    <ScrollView style={AppStyles.container}>
      <Text style={AppStyles.header}>Property Details</Text>

      <Text style={AppStyles.label}>House Number * </Text>
      <TextInput
        style={AppStyles.input}
        value={String(houseNumber)}
        onChangeText={SetHouseNumber}
      />

      <Text style={AppStyles.label}>House Type *</Text>
      <Picker
        selectedValue={HouseType}
        style={AppStyles.pickerContainer}
        onValueChange={itemValue => setHouseType(itemValue)}
      >
        <Picker.Item label="Select House Type" value="" />
        <Picker.Item label="Kuchha" value="Kuchha" />
        <Picker.Item label="Pakka" value="Pakka" />
        <Picker.Item label="Khali plot" value="Khali plot" />
        <Picker.Item label="Semi-pakka" value="Semi-pakka" />
      </Picker>

      <Text style={AppStyles.label}>Open Area In Sq Feet</Text>
      <TextInput
        style={AppStyles.input}
        placeholder="Enter Open Area"
        value={OpenArea}
        onChangeText={setOpenArea}
        keyboardType="numeric"
      />

      <Text style={AppStyles.label}>Constructed Area In Sq Feet</Text>
      <TextInput
        style={AppStyles.input}
        placeholder="Enter Constructed Area"
        value={ConstructedArea}
        onChangeText={setConstructedArea}
        keyboardType="numeric"
      />

      <Text style={AppStyles.label}>Property Mode *</Text>
      <View style={AppStyles.pickerContainer}>
        <Picker
          selectedValue={propertyMode}
          onValueChange={itemValue => setPropertyMode(itemValue)}
        >
          <Picker.Item label="Select Property Mode" value="" />
          <Picker.Item label="Residential" value="Residential" />
          <Picker.Item label="Commercial" value="Commercial" />
          <Picker.Item label="both Commercial & Residential" value="both Commercial & Residential" />
        </Picker>
      </View>

      <Text style={AppStyles.label}>Property Age</Text>
      <Picker
        selectedValue={propertyAge}
        onValueChange={itemValue => setPropertyAge(itemValue)}
        style={AppStyles.picker}
      >
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

      <Text style={AppStyles.label}>Floor Count</Text>
      <Picker
        selectedValue={floorCount}
        onValueChange={itemValue => setFloorCount(itemValue)}
        style={AppStyles.picker}
      >
        <Picker.Item label="Select Floor Count" value="0" />
        <Picker.Item label="0" value="0" />
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
      </Picker>

      <Text style={AppStyles.label}>Shop Count</Text>
      <Picker
        selectedValue={shopCount}
        onValueChange={itemValue => setShopCount(itemValue)}
        style={AppStyles.picker}
      >
        <Picker.Item label="Select Shop Count" value="0" />
        <Picker.Item label="0" value="0" />
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

      <Text style={AppStyles.label}>Total Shop Area In Sq Feet</Text>
      <TextInput
        style={AppStyles.input}
        placeholder="Enter Open Shop Area"
        value={ShopArea}
        onChangeText={setShopArea}
        keyboardType="numeric"
      />

      <Text style={AppStyles.label}>Tenant Yearly Rent</Text>
      <TextInput
        style={AppStyles.input}
        placeholder="Enter Tenant Yearly Rent"
        value={TenantYearlyRent}
        onChangeText={setTenantYearlyRent}
        keyboardType="numeric"
      />

      <Text style={AppStyles.label}>Tenant Count</Text>
      <TextInput
        style={AppStyles.input}
        placeholder="Enter Number of Tenants"
        value={tenantCount}
        onChangeText={setTenantCount}
        keyboardType="numeric"
      />

      <Text style={AppStyles.label}>Do You have Water Harvesting ?</Text>
      <View style={AppStyles.radioGroup}>
        <TouchableOpacity
          style={AppStyles.radioButton}
          onPress={() => setWaterHarvesting('Yes')}
        >
          <View
            style={[
              AppStyles.radioCircle,
              waterHarvesting === 'Yes' && AppStyles.selectedCircle,
            ]}
          />
          <Text style={AppStyles.radioText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={AppStyles.radioButton}
          onPress={() => setWaterHarvesting('No')}
        >
          <View
            style={[
              AppStyles.radioCircle,
              waterHarvesting === 'No' && AppStyles.selectedCircle,
            ]}
          />
          <Text style={AppStyles.radioText}>No</Text>
        </TouchableOpacity>
      </View>

      <Text style={AppStyles.label}>Do You Have Submersible ?</Text>
      <View style={AppStyles.radioGroup}>
        <TouchableOpacity
          style={AppStyles.radioButton}
          onPress={() => setSubmersible('Yes')}
        >
          <View
            style={[
              AppStyles.radioCircle,
              submersible === 'Yes' && AppStyles.selectedCircle,
            ]}
          />
          <Text style={AppStyles.radioText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={AppStyles.radioButton}
          onPress={() => setSubmersible('No')}
        >
          <View
            style={[
              AppStyles.radioCircle,
              submersible === 'No' && AppStyles.selectedCircle,
            ]}
          />
          <Text style={AppStyles.radioText}>No</Text>
        </TouchableOpacity>
      </View>

      <Text style={AppStyles.label}>
        Do you give consent to provide the above information? *
      </Text>
      <View style={AppStyles.radioGroup}>
        <TouchableOpacity
          style={AppStyles.radioButton}
          onPress={() => setConsent('Yes')}
        >
          <View
            style={[
              AppStyles.radioCircle,
              consent === 'Yes' && AppStyles.selectedCircle,
            ]}
          />
          <Text style={AppStyles.radioText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={AppStyles.radioButton}
          onPress={() => setConsent('No')}
        >
          <View
            style={[
              AppStyles.radioCircle,
              consent === 'No' && AppStyles.selectedCircle,
            ]}
          />
          <Text style={AppStyles.radioText}>No</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={AppStyles.button} onPress={handleUpdate}>
        <Text style={AppStyles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PropertyHouseComponent;