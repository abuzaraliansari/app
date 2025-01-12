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
import { useNavigation } from '@react-navigation/native';
import Config from 'react-native-config';

const DisplayAllDetails = () => {
  const { formData } = useContext(FormDataContext);
  const {login} = useContext(AuthContext);
  const { authState } = useContext(AuthContext);
  const navigation = useNavigation();
  const CreatedBy = authState.user;
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    try {
      if (!formData.ownerDetails) {
        throw new Error('Owner details are required');
      }
      // if (!formData.familyMembers) {
      //   throw new Error('Family members are required');
      // }
      if (!formData.propertyDetails) {
        throw new Error('Property details are required');
      }
      if (!formData.specialConsideration) {
        throw new Error('Special consideration details are required');
      }

      const requestBody = {
        ownerDetails: formData.ownerDetails,
        familyMembers: Array.isArray(formData.familyMembers)
        ? formData.familyMembers
        : [formData.familyMembers], 
        propertyDetails: formData.propertyDetails,
        specialConsideration: formData.specialConsideration,
      };

      console.log('Request Body:', JSON.stringify(requestBody));

      const response = await fetch(`${Config.API_URL}/auth/addOwnerProperty`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'header_gkey': authState.token,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log('API Response:', data);
console.log(data.ownerID);
console.log(data.propertyID);


if (response.ok && data.success) {
  const { ownerID, propertyID } = data;
  console.log('OwnerID:', ownerID); // Log the generated ownerID
  console.log('PropertyID:', propertyID); // Log the generated propertyID

  // Navigate to the next screen
  navigation.navigate('FormWithPhoto', {
    ownerID,
    propertyID,
    tenantCount: formData.propertyDetails.tenantCount,
    CreatedBy: formData.ownerDetails.CreatedBy,
  });
} else {
  throw new Error(data.message || 'Failed to create owner and property');
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

      {/* Owner Information Section */}
      <View style={AppStyles.displaySection}>
        <Text style={AppStyles.displaySectionHeader}>Owner Info</Text>
        <View style={AppStyles.displayTable}>
          <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>First Name</Text>
            <Text style={AppStyles.displayCell}>{formData.ownerDetails.firstName || 'N/A'}</Text>
          </View>
          <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>Middle Name</Text>
            <Text style={AppStyles.displayCell}>{formData.ownerDetails.middleName || 'N/A'}</Text>
          </View>
          <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>Last Name</Text>
            <Text style={AppStyles.displayCell}>{formData.ownerDetails.lastName || 'N/A'}</Text>
          </View>
          <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>Father Name</Text>
            <Text style={AppStyles.displayCell}>{formData.ownerDetails.FatherName || 'N/A'}</Text>
          </View>
          <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>Mobile Number</Text>
            <Text style={AppStyles.displayCell}>{formData.ownerDetails.mobileNumber || 'N/A'}</Text>
          </View>
          <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>Occupation</Text>
            <Text style={AppStyles.displayCell}>{formData.ownerDetails.occupation || 'N/A'}</Text>
          </View>
          <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>Age</Text>
            <Text style={AppStyles.displayCell}>{formData.ownerDetails.age || 'N/A'}</Text>
          </View>
          <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>DOB</Text>
            <Text style={AppStyles.displayCell}>{formData.ownerDetails.DOB || 'N/A'}</Text>
          </View>
          <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>Gender</Text>
            <Text style={AppStyles.displayCell}>{formData.ownerDetails.gender || 'N/A'}</Text>
          </View>
          <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>Income</Text>
            <Text style={AppStyles.displayCell}>{formData.ownerDetails.income || 'N/A'}</Text>
          </View>
          <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>Religion</Text>
            <Text style={AppStyles.displayCell}>{formData.ownerDetails.religion || 'N/A'}</Text>
          </View>
          <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>Category</Text>
            <Text style={AppStyles.displayCell}>{formData.ownerDetails.category || 'N/A'}</Text>
          </View>
          <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>Email</Text>
            <Text style={AppStyles.displayCell}>{formData.ownerDetails.Email || 'N/A'}</Text>
          </View>
          <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>Pan Card Number</Text>
            <Text style={AppStyles.displayCell}>{formData.ownerDetails.PanNumber || 'N/A'}</Text>
          </View>
          <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>Adhar Card Number</Text>
            <Text style={AppStyles.displayCell}>{formData.ownerDetails.AdharNumber || 'N/A'}</Text>
          </View>
          <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>Number Of Members</Text>
            <Text style={AppStyles.displayCell}>{formData.ownerDetails.NumberOfMembers || 'N/A'}</Text>
          </View>
          <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>Created By</Text>
            <Text style={AppStyles.displayCell}>{formData.ownerDetails.CreatedBy || 'N/A'}</Text>
          </View>
        </View>
        <TouchableOpacity
            style={AppStyles.button}
            onPress={() => navigation.navigate('Owner', { source: 'AllDetails' })}>
            <Text style={AppStyles.buttonText}>Edit Owner</Text>
          </TouchableOpacity>
      </View>

      {/* Family Members Section */}
      <View style={AppStyles.displaySection}>
        <Text style={AppStyles.displaySectionHeader}>Family Members</Text>
        <View style={AppStyles.displayTable}>
          {formData.familyMembers && formData.familyMembers.length > 0 ? (
            formData.familyMembers.map((member, index) => (
              <View key={index} style={AppStyles.displayTenantContainer}>
                <Text style={AppStyles.displayLabel}>Family Member {index + 1}</Text>
                <View style={AppStyles.displayRow}>
                  <Text style={AppStyles.displayCellHeader}>First Name</Text>
                  <Text style={AppStyles.displayCell}>{member.FirstName || 'N/A'}</Text>
                </View>
                <View style={AppStyles.displayRow}>
                  <Text style={AppStyles.displayCellHeader}>Last Name</Text>
                  <Text style={AppStyles.displayCell}>{member.LastName || 'N/A'}</Text>
                </View>
                <View style={AppStyles.displayRow}>
                  <Text style={AppStyles.displayCellHeader}>Age</Text>
                  <Text style={AppStyles.displayCell}>{member.age || 'N/A'}</Text>
                </View>
                <View style={AppStyles.displayRow}>
                  <Text style={AppStyles.displayCellHeader}>DOB</Text>
                  <Text style={AppStyles.displayCell}>{member.DOB || 'N/A'}</Text>
                </View>
                <View style={AppStyles.displayRow}>
                  <Text style={AppStyles.displayCellHeader}>Gender</Text>
                  <Text style={AppStyles.displayCell}>{member.gender || 'N/A'}</Text>
                </View>
                <View style={AppStyles.displayRow}>
                  <Text style={AppStyles.displayCellHeader}>Occupation</Text>
                  <Text style={AppStyles.displayCell}>{member.occupation || 'N/A'}</Text>
                </View>
                <View style={AppStyles.displayRow}>
                  <Text style={AppStyles.displayCellHeader}>Income</Text>
                  <Text style={AppStyles.displayCell}>{member.Income || 'N/A'}</Text>
                </View>
                <View style={AppStyles.displayRow}>
                  <Text style={AppStyles.displayCellHeader}>Relation</Text>
                  <Text style={AppStyles.displayCell}>{member.Relation || 'N/A'}</Text>
                </View>
                <View style={AppStyles.displayRow}>
                  <Text style={AppStyles.displayCellHeader}>Created By</Text>
                  <Text style={AppStyles.displayCell}>{formData.ownerDetails.CreatedBy || 'N/A'}</Text>
                </View>
               
              </View>
              
            ))
          ) : (
            <Text style={AppStyles.displayNoDataText}>No family members available</Text>
          )}
           <TouchableOpacity
            style={AppStyles.button}
            onPress={() => navigation.navigate('FamilyData', { source: 'AllDetails' })}>
            <Text style={AppStyles.buttonText}>Edit Family</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Property Section */}
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
          <TouchableOpacity
            style={AppStyles.button}
            onPress={() => navigation.navigate('PropertyArea', { source: 'AllDetails' })}>
            <Text style={AppStyles.buttonText}>Edit Property Area</Text>
          </TouchableOpacity>
        </View>

        {/* Special Considerations Section */}
        <View style={AppStyles.displaySection}>
          <Text style={AppStyles.displaySectionHeader}>Special Considerations</Text>
          <View style={AppStyles.displayTable}>
            <View style={AppStyles.displayRow}>
              <Text style={AppStyles.displayCellHeader}>Consideration Type</Text>
              <Text style={AppStyles.displayCell}>{formData.specialConsideration.considerationType || 'N/A'}</Text>
            </View>
            <View style={AppStyles.displayRow}>
              <Text style={AppStyles.displayCellHeader}>Description</Text>
              <Text style={AppStyles.displayCell}>{formData.specialConsideration.description || 'N/A'}</Text>
            </View>
            <View style={AppStyles.displayRow}>
              <Text style={AppStyles.displayCellHeader}>Latitude</Text>
              <Text style={AppStyles.displayCell}>{formData.specialConsideration.latitude || 'N/A'}</Text>
            </View>
            <View style={AppStyles.displayRow}>
              <Text style={AppStyles.displayCellHeader}>Longitude</Text>
              <Text style={AppStyles.displayCell}>{formData.specialConsideration.longitude || 'N/A'}</Text>
            </View>
            <View style={AppStyles.displayRow}>
            <Text style={AppStyles.displayCellHeader}>Created By</Text>
            <Text style={AppStyles.displayCell}>{formData.specialConsideration.CreatedBy || 'N/A'}</Text>
          </View>
          <TouchableOpacity
            style={AppStyles.button}
            onPress={() => navigation.navigate('LiveLocation', { source: 'AllDetails' })}>
            <Text style={AppStyles.buttonText}>Edit Special Consideration</Text>
          </TouchableOpacity>
          </View>
        </View>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default DisplayAllDetails;