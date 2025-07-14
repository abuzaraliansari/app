import React, { useState, useContext } from 'react';
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
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthContext';

const maskAadhaarNumber = (aadhaarNumber) => {
  if (aadhaarNumber && aadhaarNumber.length === 12) {
    return '********' + aadhaarNumber.slice(-4);
  }
  return 'N/A';
};

const Find = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { login } = useContext(AuthContext);

  const handleSearch = async () => {
    if (!mobileNumber) {
      Alert.alert('Error', 'Please enter a mobile number.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${Config.API_URL}/auth/data`, {
        MobileNumber: mobileNumber,
      });

      if (response.data) {
        setData(response.data);
      } else {
        Alert.alert('Error', 'No data found.');
      }
    } catch (error) {
      if (error.response && error.response.status === 204) {
        Alert.alert('Error', 'No owner found.');
      } else {
        console.error('Error fetching data:', error);
        Alert.alert('Error', 'An error occurred while fetching data.');
      }
    } finally {
      setLoading(false);
    }
  };
  console.log('response', data);
  return (
    <ScrollView style={AppStyles.containerfind}>
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
          <Text style={AppStyles.buttonText}>
            {loading ? 'Searching...' : 'Search'}
          </Text>
        </TouchableOpacity>

        {data && (
          <View style={AppStyles.displayContent}>
            <Text style={AppStyles.displayHeader}>Owner Info</Text>
            <View style={AppStyles.displayTable}>
              <View style={AppStyles.displayRow}>
                <Text style={AppStyles.displayCellHeader}>First Name</Text>
                <Text style={AppStyles.displayCell}>
                  {data.owner.FirstName || 'N/A'}
                </Text>
              </View>
              <View style={AppStyles.displayRow}>
                <Text style={AppStyles.displayCellHeader}>Middle Name</Text>
                <Text style={AppStyles.displayCell}>
                  {data.owner.MiddleName || 'N/A'}
                </Text>
              </View>
              <View style={AppStyles.displayRow}>
                <Text style={AppStyles.displayCellHeader}>Last Name</Text>
                <Text style={AppStyles.displayCell}>
                  {data.owner.LastName || 'N/A'}
                </Text>
              </View>
              <View style={AppStyles.displayRow}>
                <Text style={AppStyles.displayCellHeader}>Father Name</Text>
                <Text style={AppStyles.displayCell}>
                  {data.owner.FatherName || 'N/A'}
                </Text>
              </View>
              <View style={AppStyles.displayRow}>
                <Text style={AppStyles.displayCellHeader}>Mobile Number</Text>
                <Text style={AppStyles.displayCell}>
                  {data.owner.MobileNumber || 'N/A'}
                </Text>
              </View>
              <View style={AppStyles.displayRow}>
                <Text style={AppStyles.displayCellHeader}>Occupation</Text>
                <Text style={AppStyles.displayCell}>
                  {data.owner.Occupation || 'N/A'}
                </Text>
              </View>
              <View style={AppStyles.displayRow}>
                <Text style={AppStyles.displayCellHeader}>Age</Text>
                <Text style={AppStyles.displayCell}>{data.owner.Age || 'N/A'}</Text>
              </View>
              <View style={AppStyles.displayRow}>
                <Text style={AppStyles.displayCellHeader}>DOB</Text>
                <Text style={AppStyles.displayCell}>{data.owner.DOB || 'N/A'}</Text>
              </View>
              <View style={AppStyles.displayRow}>
                <Text style={AppStyles.displayCellHeader}>Gender</Text>
                <Text style={AppStyles.displayCell}>
                  {data.owner.Gender || 'N/A'}
                </Text>
              </View>
              <View style={AppStyles.displayRow}>
                <Text style={AppStyles.displayCellHeader}>Income</Text>
                <Text style={AppStyles.displayCell}>
                  {data.owner.Income || 'N/A'}
                </Text>
              </View>
              <View style={AppStyles.displayRow}>
                <Text style={AppStyles.displayCellHeader}>Religion</Text>
                <Text style={AppStyles.displayCell}>
                  {data.owner.Religion || 'N/A'}
                </Text>
              </View>
              <View style={AppStyles.displayRow}>
                <Text style={AppStyles.displayCellHeader}>Category</Text>
                <Text style={AppStyles.displayCell}>
                  {data.owner.Category || 'N/A'}
                </Text>
              </View>
              <View style={AppStyles.displayRow}>
                <Text style={AppStyles.displayCellHeader}>Email</Text>
                <Text style={AppStyles.displayCell}>{data.owner.Email || 'N/A'}</Text>
              </View>
              <View style={AppStyles.displayRow}>
                <Text style={AppStyles.displayCellHeader}>Pan Card Number</Text>
                <Text style={AppStyles.displayCell}>
                  {data.owner.PanNumber || 'N/A'}
                </Text>
              </View>
              <View style={AppStyles.displayRow}>
                <Text style={AppStyles.displayCellHeader}>Adhar Card Number</Text>
                <Text style={AppStyles.displayCell}>
                  {maskAadhaarNumber(data.owner.AdharNumber)}
                </Text>
              </View>
              <View style={AppStyles.displayRow}>
                <Text style={AppStyles.displayCellHeader}>Number Of Members</Text>
                <Text style={AppStyles.displayCell}>
                  {data.owner.NumberOfMembers || 'N/A'}
                </Text>
              </View>
              <View style={AppStyles.displayRow}>
                <Text style={AppStyles.displayCellHeader}>Created By</Text>
                <Text style={AppStyles.displayCell}>
                  {data.owner.CreatedBy || 'N/A'}
                </Text>
              </View>
              <View style={AppStyles.displayRow}>
                <Text style={AppStyles.displayCellHeader}>Modified By</Text>
                <Text style={AppStyles.displayCell}>
                  {data.owner.ModifiedBy || 'N/A'}
                </Text>
              </View>
              {/* <TouchableOpacity
            style={AppStyles.button}
            onPress={() => navigation.navigate('UpdateOwner', { owner: data.owner  ,source: 'AllDetails' })}>
            <Text style={AppStyles.buttonText}>Edit Owner</Text>
          </TouchableOpacity> */}
            </View>

            {/* <Text style={AppStyles.displayHeader}>Family Members</Text>
            <View style={AppStyles.displayTable}>
              {data.familyMembers && data.familyMembers.length > 0 ? (
                data.familyMembers.map((member, index) => (
                  <View key={index} style={AppStyles.displayTenantContainer}>
                    <Text style={AppStyles.displayLabel}>Family Member {index + 1}</Text>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Relation</Text>
                      <Text style={AppStyles.displayCell}>{member.Relation || 'N/A'}</Text>
                    </View>
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
                      <Text style={AppStyles.displayCellHeader}>DOB</Text>
                      <Text style={AppStyles.displayCell}>{member.DOB || 'N/A'}</Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Gender</Text>
                      <Text style={AppStyles.displayCell}>{member.Gender || 'N/A'}</Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Occupation</Text>
                      <Text style={AppStyles.displayCell}>{member.Occupation || 'N/A'}</Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Income</Text>
                      <Text style={AppStyles.displayCell}>{member.Income || 'N/A'}</Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Created By</Text>
                      <Text style={AppStyles.displayCell}>{member.CreatedBy || 'N/A'}</Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Modified By</Text>
                      <Text style={AppStyles.displayCell}>{member.ModifiedBy || 'N/A'}</Text>
                    </View>
                    <TouchableOpacity
                      style={AppStyles.button}
                      onPress={() => navigation.navigate('UpdateFamily', { member })}
                    >
                      <Text style={AppStyles.buttonText}>Edit Family Member {index + 1}</Text>
                    </TouchableOpacity>
                 
                  </View>
                ))
              ) : (
                <Text style={AppStyles.displayNoDataText}>No family members available</Text>
              )}
            </View>
*/}
            <Text style={AppStyles.displayHeader}>Property Details</Text>
            <View style={AppStyles.displayTable}>
              {data.properties && data.properties.length > 0 ? (
                data.properties.map((property, index) => (
                  <View key={index} style={AppStyles.displayTenantContainer}>
                    <Text style={AppStyles.displayLabel}>Property {index + 1}</Text>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Property Mode</Text>
                      <Text style={AppStyles.displayCell}>
                        {property.PropertyMode || 'N/A'}
                      </Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Property Age</Text>
                      <Text style={AppStyles.displayCell}>
                        {property.PropertyAge || 'N/A'}
                      </Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Room Count</Text>
                      <Text style={AppStyles.displayCell}>
                        {property.RoomCount || 'N/A'}
                      </Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Floor Count</Text>
                      <Text style={AppStyles.displayCell}>
                        {property.FloorCount || 'N/A'}
                      </Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Shop Count</Text>
                      <Text style={AppStyles.displayCell}>
                        {property.ShopCount || 'N/A'}
                      </Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Shop Area</Text>
                      <Text style={AppStyles.displayCell}>
                        {property.ShopArea || 'N/A'}
                      </Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Tenant Count</Text>
                      <Text style={AppStyles.displayCell}>
                        {property.TenantCount || 'N/A'}
                      </Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Tenant Yearly Rent</Text>
                      <Text style={AppStyles.displayCell}>
                        {property.TenantYearlyRent || 'N/A'}
                      </Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Water Harvesting</Text>
                      <Text style={AppStyles.displayCell}>
                        {property.WaterHarvesting ? 'Yes' : 'No'}
                      </Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Submersible</Text>
                      <Text style={AppStyles.displayCell}>
                        {property.Submersible ? 'Yes' : 'No'}
                      </Text>
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
                      <Text style={AppStyles.displayCell}>
                        {property.ConstructedArea || 'N/A'}
                      </Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Bank Account Number</Text>
                      <Text style={AppStyles.displayCell}>
                        {property.BankAccountNumber || 'N/A'}
                      </Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Consent</Text>
                      <Text style={AppStyles.displayCell}>{property.Consent ? 'Yes' : 'No'}</Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Created By</Text>
                      <Text style={AppStyles.displayCell}>
                        {property.CreatedBy || 'N/A'}
                      </Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Date Created</Text>
                      <Text style={AppStyles.displayCell}>{property.DateCreated || 'N/A'}</Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Modified By</Text>
                      <Text style={AppStyles.displayCell}>
                        {property.ModifiedBy || 'N/A'}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={AppStyles.button}
                      onPress={() => navigation.navigate('UpdateArea', { property })}
                    >
                      <Text style={AppStyles.buttonText}>Edit Property</Text>
                    </TouchableOpacity>
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
                      <Text style={AppStyles.displayCell}>
                        {consideration.ConsiderationType || 'N/A'}
                      </Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Description</Text>
                      <Text style={AppStyles.displayCell}>
                        {consideration.Description || 'N/A'}
                      </Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>GeoLocation</Text>
                      <Text style={AppStyles.displayCell}>
                        {consideration.GeoLocation || 'N/A'}
                      </Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Created By</Text>
                      <Text style={AppStyles.displayCell}>
                        {consideration.CreatedBy || 'N/A'}
                      </Text>
                    </View>
                    <View style={AppStyles.displayRow}>
                      <Text style={AppStyles.displayCellHeader}>Modified By</Text>
                      <Text style={AppStyles.displayCell}>
                        {consideration.ModifiedBy || 'N/A'}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={AppStyles.button}
                      onPress={() => navigation.navigate('UpdateSpecial', { consideration })}
                    >
                      <Text style={AppStyles.buttonText}>Edit Consideration </Text>
                    </TouchableOpacity>
                  </View>
                ))
              ) : (
                <Text style={AppStyles.displayNoDataText}>No special considerations available</Text>
              )}
            </View>

            {data && data.owner && data.owner.OwnerID && (
              <TouchableOpacity
                style={AppStyles.button}
                onPress={() => {
                  navigation.navigate('PropertyArea', {
                    source: 'Add',
                    owner: data.owner,
                    ownerId: data.owner.OwnerID,
                  });
                }}
              >
                <Text style={AppStyles.buttonText}>Add Property</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Find;