import React, {useState, useContext, useEffect} from 'react';
import { View, Text,TextInput, FlatList, StyleSheet, Button, ActivityIndicator,ScrollView } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import AppStyles from '../styles/AppStyles';
import {AuthContext} from '../contexts/AuthContext';
import {useNavigation} from '@react-navigation/native';

const API_ENDPOINT = `${Config.API_URL}/auth/data`;
const API_ENDPOINT_update = `${Config.API_URL}/auth/update`;

const OwnerDetailsScreen = () => {
  const {authState} = useContext(AuthContext);
  const {login} = useContext(AuthContext);

  const [ownerData, setOwnerData] = useState(null);
  const mobileNumber = authState.MobileNumber;
  const navigation = useNavigation();
  const [updateSuccess, setUpdateSuccess] = useState(false);


  console.log('MobileNumber:', authState.MobileNumber);

  // Function to fetch owner details
  const fetchOwnerDetails = async () => {
    
    try {
        console.log('API_ENDPOINT:', API_ENDPOINT);
      

      const response = await axios.post(API_ENDPOINT, { MobileNumber: mobileNumber });
      setOwnerData(response.data);
      console.log('API Response:', response.data);
    } catch (error) {
      console.error('Error fetching owner details:', error.message);
      setFetchError('Failed to fetch owner details.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateIsActive = async () => {

    try {
      const response = await axios.post(API_ENDPOINT_update, { OwnerID: ownerData.owner.OwnerID });
      console.log('Update Response:', response.data);
      setUpdateSuccess(true); // Set update success status
      navigation.replace('Owner');
    } catch (error) {
      console.error('Error updating IsActive:', error.message);
      setUpdateError('Failed to update IsActive status.');
    }
  };

  useEffect(() => {
    fetchOwnerDetails();
  }, []);


  return (
    
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.header}>Owner Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Mobile Number"
            value={mobileNumber}
            keyboardType="numeric"
          />
  
          {ownerData && (
            <>
              {/* Owner Information Section */}
              <View style={styles.section}>
                <Text style={styles.sectionHeader}>Owner Info</Text>
                <View style={styles.table}>
                  <View style={styles.row}>
                    <Text style={styles.cellHeader}>Owner ID</Text>
                    <Text style={styles.cell}>{ownerData.owner.OwnerID}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.cellHeader}>Name</Text>
                    <Text style={styles.cell}>{`${ownerData.owner.FirstName} ${ownerData.owner.MiddleName} ${ownerData.owner.LastName}`}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.cellHeader}>Mobile</Text>
                    <Text style={styles.cell}>{ownerData.owner.MobileNumber}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.cellHeader}>Occupation</Text>
                    <Text style={styles.cell}>{ownerData.owner.Occupation}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.cellHeader}>Age</Text>
                    <Text style={styles.cell}>{ownerData.owner.Age}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.cellHeader}>Gender</Text>
                    <Text style={styles.cell}>{ownerData.owner.Gender}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.cellHeader}>Income</Text>
                    <Text style={styles.cell}>{ownerData.owner.Income}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.cellHeader}>Religion</Text>
                    <Text style={styles.cell}>{ownerData.owner.Religion}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.cellHeader}>Category</Text>
                    <Text style={styles.cell}>{ownerData.owner.Category}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.cellHeader}>Cast</Text>
                    <Text style={styles.cell}>{ownerData.owner.Cast}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.cellHeader}>Aadhar Number</Text>
                    <Text style={styles.cell}>{ownerData.owner.AdharNumber}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.cellHeader}>PAN Number</Text>
                    <Text style={styles.cell}>{ownerData.owner.PanNumber}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.cellHeader}>Email</Text>
                    <Text style={styles.cell}>{ownerData.owner.Email}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.cellHeader}>Number of Members</Text>
                    <Text style={styles.cell}>{ownerData.owner.NumberOfMembers}</Text>
                  </View>
                </View>
              </View>
  
              {/* Family Members Section */}
              <View style={styles.section}>
                <Text style={styles.sectionHeader}>Family Members</Text>
                <FlatList
                  data={ownerData.familyMembers}
                  keyExtractor={(item) => item.FamilyMemberID.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.familyMember}>
                      <Text style={styles.cellHeader}>Member ID:</Text>
                      <Text style={styles.cell}>{item.FamilyMemberID}</Text>
                      <Text style={styles.cellHeader}>Name:</Text>
                      <Text style={styles.cell}>{`${item.FirstName} ${item.LastName}`}</Text>
                      <Text style={styles.cellHeader}>Age:</Text>
                      <Text style={styles.cell}>{item.Age}</Text>
                      <Text style={styles.cellHeader}>Gender:</Text>
                      <Text style={styles.cell}>{item.Gender}</Text>
                      <Text style={styles.cellHeader}>Occupation:</Text>
                      <Text style={styles.cell}>{item.Occupation}</Text>
                    </View>
                  )}
                />
              </View>
  
              {/* Properties Section */}
              <View style={styles.section}>
                <Text style={styles.sectionHeader}>Properties</Text>
                <FlatList
                  data={ownerData.properties}
                  keyExtractor={(item) => item.PropertyID.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.property}>
                      <Text style={styles.cellHeader}>Property ID:</Text>
                      <Text style={styles.cell}>{item.PropertyID}</Text>
                      <Text style={styles.cellHeader}>Mode:</Text>
                      <Text style={styles.cell}>{item.PropertyMode}</Text>
                      <Text style={styles.cellHeader}>Age:</Text>
                      <Text style={styles.cell}>{item.PropertyAge}</Text>
                      <Text style={styles.cellHeader}>Rooms:</Text>
                      <Text style={styles.cell}>{item.RoomCount}</Text>
                      <Text style={styles.cellHeader}>Floors:</Text>
                      <Text style={styles.cell}>{item.FloorCount}</Text>
                      <Text style={styles.cellHeader}>Tenant:</Text>
                      <Text style={styles.cell}>{item.TenantCount}</Text>
                      <Text style={styles.cellHeader}>ZoneID:</Text>
                      <Text style={styles.cell}>{item.ZoneID}</Text>
                      <Text style={styles.cellHeader}>Locality:</Text>
                      <Text style={styles.cell}>{item.Locality}</Text>
                      <Text style={styles.cellHeader}>Colony:</Text>
                      <Text style={styles.cell}>{item.Colony}</Text>
                      <Text style={styles.cellHeader}>Galli:</Text>
                      <Text style={styles.cell}>{item.GalliNumber}</Text>
                      <Text style={styles.cellHeader}>House No:</Text>
                      <Text style={styles.cell}>{item.HouseNumber}</Text>
                      <Text style={styles.cellHeader}>House Type:</Text>
                      <Text style={styles.cell}>{item.HouseType}</Text>
                      <Text style={styles.cellHeader}>Open Area:</Text>
                      <Text style={styles.cell}>{item.OpenArea}</Text>
                      <Text style={styles.cellHeader}>Constructed Area:</Text>
                      <Text style={styles.cell}>{item.ConstructedArea}</Text>
                      <Text style={styles.cellHeader}>BankAccount:</Text>
                      <Text style={styles.cell}>{item.BankAccountNumber}</Text>
                      <Text style={styles.cellHeader}>Water Harvesting:</Text>
                      <Text style={styles.cell}>{item.WaterHarvesting ? 'Yes' : 'No'}</Text>
                      <Text style={styles.cellHeader}>Submersible:</Text>
                      <Text style={styles.cell}>{item.Submersible ? 'Yes' : 'No'}</Text>
                      <Text style={styles.cellHeader}>Consent:</Text>
                      <Text style={styles.cell}>{item.Consent ? 'Yes' : 'No'}</Text>
                    </View>
                  )}
                />
              </View>
  
              {/* Considerations Section */}
              <View style={styles.section}>
                <Text style={styles.sectionHeader}>Considerations</Text>
                <FlatList
                  data={ownerData.considerations}
                  keyExtractor={(item) => item.ConsiderationID.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.consideration}>
                      <Text style={styles.cellHeader}>Consideration ID:</Text>
                      <Text style={styles.cell}>{item.ConsiderationID}</Text>
                      <Text style={styles.cellHeader}>Type:</Text>
                      <Text style={styles.cell}>{item.ConsiderationType}</Text>
                      <Text style={styles.cellHeader}>Description:</Text>
                      <Text style={styles.cell}>{item.Description}</Text>
                      <Text style={styles.cellHeader}>GeoLocation:</Text>
                      <Text style={styles.cell}>{item.GeoLocation}</Text>
                    </View>
                  )}
                />
              </View>
  
              {/* Submit Button */}
              <Button
                title="Submit Details"
                onPress={handleUpdateIsActive}
                disabled={!ownerData}
                color="#007BFF"
              />
  
              {updateSuccess && (
                <View style={styles.successContainer}>
                  <Text style={styles.successText}>IsActive status updated successfully!</Text>
                </View>
              )}
            </>
          )}
        </View>
      </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    content: {
      padding: 16,
    },
    header: {
      fontSize: 40,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      marginBottom: 16,
      paddingHorizontal: 8,
      borderRadius: 4,
    },
    section: {
      marginBottom: 20,
      borderBottomWidth: 1,
      borderColor: '#ddd',
      paddingBottom: 10,
    },
    sectionHeader: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    table: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 4,
    },
    row: {
      flexDirection: 'row',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderColor: '#ddd',
    },
    cellHeader: {
      fontWeight: 'bold',
      width: '50%',
      paddingHorizontal: 8,
      fontSize: 18,
    },
    cell: {
      width: '50%',
      paddingHorizontal: 8,
      fontSize: 18,
    },
    familyMember: {
      marginBottom: 10,
    },
    property: {
      marginBottom: 10,
    },
    consideration: {
      marginBottom: 10,
    },
    successContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    successText: {
      color: 'green',
      fontWeight: 'bold',
    },
  });
  
  export default OwnerDetailsScreen;