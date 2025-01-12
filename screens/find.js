import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import AppStyles from '../styles/AppStyles';
import axios from 'axios';
import Config from 'react-native-config';

const Find = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!mobileNumber) {
      Alert.alert('Error', 'Please enter a mobile number.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${Config.API_URL}/data`, {
        MobileNumber: mobileNumber,
      });

      if (response.data) {
        setData(response.data);
      } else {
        Alert.alert('Error', 'No data found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Failed to fetch data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={AppStyles.container}>
      <View style={AppStyles.content}>
        <Text style={AppStyles.header}>Find Owner Details</Text>
        <TextInput
          style={AppStyles.input}
          placeholder="Enter Mobile Number"
          value={mobileNumber}
          onChangeText={setMobileNumber}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={AppStyles.button}
          onPress={handleSearch}
          disabled={loading}
        >
          <Text style={AppStyles.buttonText}>{loading ? 'Searching...' : 'Search'}</Text>
        </TouchableOpacity>

        {data && (
          <View style={AppStyles.displayContent}>
            <Text style={AppStyles.displayHeader}>Owner Info</Text>
            <View style={AppStyles.displayTable}>
              <View style={AppStyles.displayRow}>
                <Text style={AppStyles.displayCellHeader}>First Name</Text>
                <Text style={AppStyles.displayCell}>{data.owner.FirstName || 'N/A'}</Text>
              </View>
              <View style={AppStyles.displayRow}>
                <Text style={AppStyles.displayCellHeader}>Middle Name</Text>
                <Text style={AppStyles.displayCell}>{data.owner.MiddleName || 'N/A'}</Text>
              </View>
              <View style={AppStyles.displayRow}>
                <Text style={AppStyles.displayCellHeader}>Last Name</Text>
                <Text style={AppStyles.displayCell}>{data.owner.LastName || 'N/A'}</Text>
              </View>
              <View style={AppStyles.displayRow}>
                <Text style={AppStyles.displayCellHeader}>Mobile Number</Text>
                <Text style={AppStyles.displayCell}>{data.owner.MobileNumber || 'N/A'}</Text>
              </View>
              <View style={AppStyles.displayRow}>
                <Text style={AppStyles.displayCellHeader}>Occupation</Text>
                <Text style={AppStyles.displayCell}>{data.owner.Occupation || 'N/A'}</Text>
              </View>
              <View style={AppStyles.displayRow}>
                <Text style={AppStyles.displayCellHeader}>Age</Text>
                <Text style={AppStyles.displayCell}>{data.owner.Age || 'N/A'}</Text>
              </View>
              <View style={AppStyles.displayRow}>
                <Text style={AppStyles.displayCellHeader}>Gender</Text>
                <Text style={AppStyles.displayCell}>{data.owner.Gender || 'N/A'}</Text>
              </View>
              <View style={AppStyles.displayRow}>
                <Text style={AppStyles.displayCellHeader}>Income</Text>
                <Text style={AppStyles.displayCell}>{data.owner.Income || 'N/A'}</Text>
              </View>
              <View style={AppStyles.displayRow}>
                <Text style={AppStyles.displayCellHeader}>Religion</Text>
                <Text style={AppStyles.displayCell}>{data.owner.Religion || 'N/A'}</Text>
              </View>
              <View style={AppStyles.displayRow}>
                <Text style={AppStyles.displayCellHeader}>Category</Text>
                <Text style={AppStyles.displayCell}>{data.owner.Category || 'N/A'}</Text>
              </View>
              <View style={AppStyles.displayRow}>
                <Text style={AppStyles.displayCellHeader}>Email</Text>
                <Text style={AppStyles.displayCell}>{data.owner.Email || 'N/A'}</Text>
              </View>
              <View style={AppStyles.displayRow}>
                <Text style={AppStyles.displayCellHeader}>Pan Card Number</Text>
                <Text style={AppStyles.displayCell}>{data.owner.PanNumber || 'N/A'}</Text>
              </View>
              <View style={AppStyles.displayRow}>
                <Text style={AppStyles.displayCellHeader}>Adhar Card Number</Text>
                <Text style={AppStyles.displayCell}>{data.owner.AdharNumber || 'N/A'}</Text>
              </View>
              <View style={AppStyles.displayRow}>
                <Text style={AppStyles.displayCellHeader}>Number Of Members</Text>
                <Text style={AppStyles.displayCell}>{data.owner.NumberOfMembers || 'N/A'}</Text>
              </View>
            </View>

            <Text style={AppStyles.displayHeader}>Family Members</Text>
            <View style={AppStyles.displayTable}>
              {data.familyMembers && data.familyMembers.length > 0 ? (
                data.familyMembers.map((member, index) => (
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
                      <Text style={AppStyles.displayCell}>{member.Age || 'N/A'}</Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Gender</Text>
                      <Text style={AppStyles.displayCell}>{member.Gender || 'N/A'}</Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Occupation</Text>
                      <Text style={AppStyles.displayCell}>{member.Occupation || 'N/A'}</Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={AppStyles.displayNoDataText}>No family members available</Text>
              )}
            </View>

            <Text style={AppStyles.displayHeader}>Property Details</Text>
            <View style={AppStyles.displayTable}>
              {data.properties && data.properties.length > 0 ? (
                data.properties.map((property, index) => (
                  <View key={index} style={AppStyles.displayTenantContainer}>
                    <Text style={AppStyles.displayLabel}>Property {index + 1}</Text>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Property Mode</Text>
                      <Text style={AppStyles.displayCell}>{property.PropertyMode || 'N/A'}</Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Property Age</Text>
                      <Text style={AppStyles.displayCell}>{property.PropertyAge || 'N/A'}</Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Room Count</Text>
                      <Text style={AppStyles.displayCell}>{property.RoomCount || 'N/A'}</Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Floor Count</Text>
                      <Text style={AppStyles.displayCell}>{property.FloorCount || 'N/A'}</Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Shop Count</Text>
                      <Text style={AppStyles.displayCell}>{property.ShopCount || 'N/A'}</Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Tenant Count</Text>
                      <Text style={AppStyles.displayCell}>{property.TenantCount || 'N/A'}</Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Water Harvesting</Text>
                      <Text style={AppStyles.displayCell}>{property.WaterHarvesting ? 'Yes' : 'No'}</Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Submersible</Text>
                      <Text style={AppStyles.displayCell}>{property.Submersible ? 'Yes' : 'No'}</Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Zone ID</Text>
                      <Text style={AppStyles.displayCell}>{property.ZoneID || 'N/A'}</Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Locality</Text>
                      <Text style={AppStyles.displayCell}>{property.Locality || 'N/A'}</Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Colony</Text>
                      <Text style={AppStyles.displayCell}>{property.Colony || 'N/A'}</Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Galli Number</Text>
                      <Text style={AppStyles.displayCell}>{property.GalliNumber || 'N/A'}</Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>House Number</Text>
                      <Text style={AppStyles.displayCell}>{property.HouseNumber || 'N/A'}</Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>House Type</Text>
                      <Text style={AppStyles.displayCell}>{property.HouseType || 'N/A'}</Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Open Area</Text>
                      <Text style={AppStyles.displayCell}>{property.OpenArea || 'N/A'}</Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Constructed Area</Text>
                      <Text style={AppStyles.displayCell}>{property.ConstructedArea || 'N/A'}</Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Bank Account Number</Text>
                      <Text style={AppStyles.displayCell}>{property.BankAccountNumber || 'N/A'}</Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Consent</Text>
                      <Text style={AppStyles.displayCell}>{property.Consent ? 'Yes' : 'No'}</Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={AppStyles.displayNoDataText}>No properties available</Text>
              )}
            </View>

            <Text style={AppStyles.displayHeader}>Special Considerations</Text>
            <View style={AppStyles.displayTable}>
              {data.considerations && data.considerations.length > 0 ? (
                data.considerations.map((consideration, index) => (
                  <View key={index} style={AppStyles.displayTenantContainer}>
                    <Text style={AppStyles.displayLabel}>Consideration {index + 1}</Text>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Consideration Type</Text>
                      <Text style={AppStyles.displayCell}>{consideration.ConsiderationType || 'N/A'}</Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Description</Text>
                      <Text style={AppStyles.displayCell}>{consideration.Description || 'N/A'}</Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>GeoLocation</Text>
                      <Text style={AppStyles.displayCell}>{consideration.GeoLocation || 'N/A'}</Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Created By</Text>
                      <Text style={AppStyles.displayCell}>{consideration.CreatedBy || 'N/A'}</Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={AppStyles.displayNoDataText}>No special considerations available</Text>
              )}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Find;