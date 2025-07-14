import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Button,
  Alert,
} from 'react-native';
import AppStyles from '../styles/AppStyles';
import { FormDataContext } from '../contexts/FormDataContext';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import Config from 'react-native-config';

const AddProperty = () => {
  const { formData, updateFormData } = useContext(FormDataContext);
  const {login} = useContext(AuthContext);
  const { authState } = useContext(AuthContext);
  const navigation = useNavigation();
  const route = useRoute();
  const owner = route.params?.owner;
  const CreatedBy = authState.user;
  const [errorMessage, setErrorMessage] = useState('');

  // Get AddUser from authState
  const addUser = authState.AddUser;

  // Ensure formData.ownerDetails is set from owner param if present
  React.useEffect(() => {
    if (owner) {
      updateFormData({
        ownerDetails: {
          ...owner,
        },
      });
    }
  }, [owner, updateFormData]);

  const handleSubmit = async () => {
    try {
      if (!formData.propertyDetails) {
        throw new Error('Property details are required');
      }
      if (!owner || !owner.OwnerID) {
        throw new Error('Owner details are required');
      }

      // Prepare propertyDetails with correct types and required fields
      const pd = {
        ...formData.propertyDetails,
        ownerID: owner.OwnerID,
        roomCount: Number(formData.propertyDetails.roomCount) || 0,
        floorCount: Number(formData.propertyDetails.floorCount) || 0,
        shopCount: Number(formData.propertyDetails.shopCount) || 0,
        tenantCount: Number(formData.propertyDetails.tenantCount) || 0,
        TenantYearlyRent: Number(formData.propertyDetails.TenantYearlyRent) || 0,
        waterHarvesting: formData.propertyDetails.waterHarvesting === 'Yes' || formData.propertyDetails.waterHarvesting === true,
        submersible: formData.propertyDetails.submersible === 'Yes' || formData.propertyDetails.submersible === true,
        consent: formData.propertyDetails.consent === 'Yes' || formData.propertyDetails.consent === true,
        IsActive: true,
        CreatedBy: owner.CreatedBy || CreatedBy || 'admin',
      };

      // Remove any undefined/null fields not needed by backend
      Object.keys(pd).forEach(key => {
        if (pd[key] === undefined) delete pd[key];
      });

      const requestBody = { propertyDetails: pd };
      console.log('Request Body:', JSON.stringify(requestBody));

      const response = await fetch('https://babralaapi-d3fpaphrckejgdd5.centralindia-01.azurewebsites.net/auth/PropertyDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (response.ok && data.success) {
        const { propertyID } = data;
        console.log('PropertyID:', propertyID);
        navigation.navigate('Home', {
          propertyID,
          tenantCount: pd.tenantCount,
          CreatedBy: pd.CreatedBy,
        });
      } else {
        throw new Error(data.error || data.message || 'Failed to create property');
      }
    } catch (error) {
      setErrorMessage(error.message);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView style={AppStyles.displayContainer}>
    <View style={AppStyles.displayContent}>
      <Text style={AppStyles.displayHeader}>Check Details</Text>

      {/* Show Owner Name and ID from navigation param */}
      {owner && (
        <View style={AppStyles.displaySection}>
          <Text style={AppStyles.displaySectionHeader}>Owner Info</Text>
          <View style={AppStyles.displayTable}>
            <View style={AppStyles.displayRow}>
              <Text style={AppStyles.displayCellHeader}>Owner Name</Text>
              <Text style={AppStyles.displayCell}>{`${owner.FirstName || ''} ${owner.MiddleName || ''} ${owner.LastName || ''}`.trim() || 'N/A'}</Text>
            </View>
            <View style={AppStyles.displayRow}>
              <Text style={AppStyles.displayCellHeader}>Owner ID</Text>
              <Text style={AppStyles.displayCell}>{owner.OwnerID || 'N/A'}</Text>
            </View>
          </View>
        </View>
      )}

      <View style={AppStyles.displaySection}>
        <Text style={AppStyles.displaySectionHeader}>Property Details</Text>
        <View style={AppStyles.displayTable}>
          <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>Zone</Text>
            <Text style={AppStyles.displayCell}>{formData.propertyDetails.zone || 'N/A'}</Text>
          </View>
          <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>Locality</Text>
            <Text style={AppStyles.displayCell}>{formData.propertyDetails.locality || 'N/A'}</Text>
          </View>
          <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>Colony</Text>
            <Text style={AppStyles.displayCell}>{formData.propertyDetails.colony || 'N/A'}</Text>
          </View>
          <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>Galli Number</Text>
            <Text style={AppStyles.displayCell}>{formData.propertyDetails.galliNumber || 'N/A'}</Text>
          </View>
          <View style={AppStyles.displayRow}>
              <Text style={AppStyles.displayCellHeader}>House Number</Text>
              <Text style={AppStyles.displayCell}>{formData.propertyDetails.houseNumber || 'N/A'}</Text>
            </View>
            <View style={AppStyles.displayRow}>
              <Text style={AppStyles.displayCellHeader}>House Type</Text>
              <Text style={AppStyles.displayCell}>{formData.propertyDetails.HouseType || 'N/A'}</Text>
            </View>
            <View style={AppStyles.displayRow}>
              <Text style={AppStyles.displayCellHeader}>Property Mode</Text>
              <Text style={AppStyles.displayCell}>{formData.propertyDetails.propertyMode || 'N/A'}</Text>
            </View>
            <View style={AppStyles.displayRow}>
              <Text style={AppStyles.displayCellHeader}>Property Age</Text>
              <Text style={AppStyles.displayCell}>{formData.propertyDetails.propertyAge || 'N/A'}</Text>
            </View>
            <View style={AppStyles.displayRow}>
              <Text style={AppStyles.displayCellHeader}>Floor Count</Text>
              <Text style={AppStyles.displayCell}>{formData.propertyDetails.floorCount || 'N/A'}</Text>
            </View>
            <View style={AppStyles.displayRow}>
              <Text style={AppStyles.displayCellHeader}>Shop Count</Text>
              <Text style={AppStyles.displayCell}>{formData.propertyDetails.shopCount || 'N/A'}</Text>
            </View>
            <View style={AppStyles.displayRow}>
              <Text style={AppStyles.displayCellHeader}>Shop Area</Text>
              <Text style={AppStyles.displayCell}>{formData.propertyDetails.ShopArea || 'N/A'}</Text>
            </View>
            <View style={AppStyles.displayRow}>
              <Text style={AppStyles.displayCellHeader}>Open Area</Text>
              <Text style={AppStyles.displayCell}>{formData.propertyDetails.OpenArea || 'N/A'}</Text>
            </View>
            <View style={AppStyles.displayRow}>
              <Text style={AppStyles.displayCellHeader}>Constructed Area</Text>
              <Text style={AppStyles.displayCell}>{formData.propertyDetails.ConstructedArea || 'N/A'}</Text>
            </View>
            <View style={AppStyles.displayRow}>
              <Text style={AppStyles.displayCellHeader}>Tenant Count</Text>
              <Text style={AppStyles.displayCell}>{formData.propertyDetails.tenantCount || 'N/A'}</Text>
            </View>
            <View style={AppStyles.displayRow}>
              <Text style={AppStyles.displayCellHeader}>Tenant Yearly Rent</Text>
              <Text style={AppStyles.displayCell}>{formData.propertyDetails.TenantYearlyRent || 'N/A'}</Text>
            </View>
            <View style={AppStyles.displayRow}>
              <Text style={AppStyles.displayCellHeader}>Water Harvesting</Text>
              <Text style={AppStyles.displayCell}>{formData.propertyDetails.waterHarvesting || 'N/A'}</Text>
            </View>
            <View style={AppStyles.displayRow}>
              <Text style={AppStyles.displayCellHeader}>Submersible</Text>
              <Text style={AppStyles.displayCell}>{formData.propertyDetails.submersible || 'N/A'}</Text>
            </View>
            <View style={AppStyles.displayRow}>
              <Text style={AppStyles.displayCellHeader}>Consent</Text>
              <Text style={AppStyles.displayCell}>{formData.propertyDetails.consent || 'N/A'}</Text>
            </View>
            <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>Created By</Text>
            <Text style={AppStyles.displayCell}>{formData.propertyDetails.CreatedBy || 'N/A'}</Text>
          </View>
          </View>
          {/* <TouchableOpacity
            style={AppStyles.button}
            onPress={() => navigation.navigate('PropertyArea', { source: 'AllDetails' })}>
            <Text style={AppStyles.buttonText}>Edit Property Area</Text>
          </TouchableOpacity> */}
        </View>
        
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default AddProperty;