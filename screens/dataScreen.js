import React, {useState, useContext} from 'react';
import { View, Text,TextInput, FlatList, StyleSheet, Button, ActivityIndicator,ScrollView } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import AppStyles from '../styles/AppStyles';
import {AuthContext} from '../contexts/AuthContext';

const API_ENDPOINT = `${Config.API_URL}/auth/data`;
const API_ENDPOINT_update = `${Config.API_URL}/auth/update`;

const OwnerDetailsScreen = () => {
  const {authState} = useContext(AuthContext);
  const {login} = useContext(AuthContext);

  const [ownerData, setOwnerData] = useState(null);
  const mobileNumber = authState.MobileNumber;
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
    } catch (error) {
      console.error('Error updating IsActive:', error.message);
      setUpdateError('Failed to update IsActive status.');
    }
  };

  
  return (
    <ScrollView style={AppStyles.container}>
    <View style={styles.container}>
      <Text style={styles.header}>Owner Details</Text>

      <TextInput
          style={AppStyles.input}
          placeholder="Enter Mobile Number"
          value={mobileNumber}
          onChangeText={(text) => setMobileNumber(text)}
          keyboardType="numeric"
        />

      {/* Button to fetch data */}
      <Button title="Fetch Owner Details" onPress={fetchOwnerDetails} />


      {ownerData && (
        <>
          {/* Owner Information */}
          <View style={styles.section}>
        <Text style={styles.sectionHeader}>Owner Info</Text>
        <Text>Owner ID: {ownerData.owner.OwnerID}</Text>
        <Text>Name: {`${ownerData.owner.FirstName} ${ownerData.owner.MiddleName} ${ownerData.owner.LastName}`}</Text>
        <Text>Mobile: {ownerData.owner.MobileNumber}</Text>
        <Text>Occupation: {ownerData.owner.Occupation}</Text>
        <Text>Age: {ownerData.owner.Age}</Text>
        <Text>Gender: {ownerData.owner.Gender}</Text>
        <Text>Income: {ownerData.owner.Income}</Text>
        <Text>Religion: {ownerData.owner.Religion}</Text>
        <Text>Category: {ownerData.owner.Category}</Text>
        <Text>Cast: {ownerData.owner.Cast}</Text>
        <Text>Aadhar Number: {ownerData.owner.AdharNumber}</Text>
        <Text>PAN Number: {ownerData.owner.PanNumber}</Text>
        <Text>Email: {ownerData.owner.Email}</Text>
        <Text>Number of Members: {ownerData.owner.NumberOfMembers}</Text>
      </View>

          {/* Family Members */}
          <View style={styles.section}>
        <Text style={styles.sectionHeader}>Family Members</Text>
        <FlatList
          data={ownerData.familyMembers}
          keyExtractor={(item) => item.FamilyMemberID.toString()}
          renderItem={({ item }) => (
            <View style={styles.familyMember}>
              <Text>Member ID: {item.FamilyMemberID}</Text>
              <Text>Name: {`${item.FirstName} ${item.LastName}`}</Text>
              <Text>Age: {item.Age}</Text>
              <Text>Gender: {item.Gender}</Text>
              <Text>Occupation: {item.Occupation}</Text>
            </View>
          )}
        />
      </View>

          {/* Properties */}
          <View style={styles.section}>
        <Text style={styles.sectionHeader}>Properties</Text>
        <FlatList
          data={ownerData.properties}
          keyExtractor={(item) => item.PropertyID.toString()}
          renderItem={({ item }) => (
            <View style={styles.property}>
              <Text>Property ID: {item.PropertyID}</Text>
              <Text>Mode: {item.PropertyMode}</Text>
              <Text>Age: {item.PropertyAge}</Text>
              <Text>Rooms: {item.RoomCount}</Text>
              <Text>Floors: {item.FloorCount}</Text>
              <Text>Tenant: {item.TenantCount}</Text>
              <Text>ZoneID: {item.ZoneID}</Text>
              <Text>Locality: {item.Locality}</Text>
              <Text>Colony: {item.Colony}</Text>
              <Text>Galli: {item.GalliNumber}</Text>
              <Text>House No: {item.HouseNumber}</Text>
              <Text>House Type: {item.HouseType}</Text>
              <Text>Open Area: {item.OpenArea}</Text>
              <Text>Constructed Area: {item.ConstructedArea}</Text>
              <Text>BankAccount: {item.BankAccountNumber}</Text>
              <Text>Water Harvesting: {item.WaterHarvesting ? 'Yes' : 'No'}</Text>
              <Text>Submersible: {item.Submersible ? 'Yes' : 'No'}</Text>
              <Text>Consent: {item.Consent ? 'Yes' : 'No'}</Text>
            </View>
          )}
        />
      </View>

          {/* Considerations */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Considerations</Text>
            <FlatList
              data={ownerData.considerations}
              keyExtractor={(item) => item.ConsiderationID.toString()}
              renderItem={({ item }) => (
                <View style={styles.consideration}>
                  <Text>Consideration ID: {item.ConsiderationID}</Text>
                  <Text>Type: {item.ConsiderationType}</Text>
                  <Text>Description: {item.Description}</Text>
                  <Text>GeoLocation: {item.GeoLocation}</Text>
                </View>
              )}
            />
          </View>

          {/* Files (if any) */}
          {ownerData.files.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Files</Text>
              <FlatList
                data={ownerData.files}
                keyExtractor={(item) => item.FileID.toString()}
                renderItem={({ item }) => (
                  <View style={styles.file}>
                    <Text>File ID: {item.FileID}</Text>
                    <Text>Original Name: {item.OriginalName}</Text>
                    <Text>File Name: {item.FileName}</Text>
                    <Text>File Path: {item.FilePath}</Text>
                    <Text>File Size: {item.FileSize} bytes</Text>
                  </View>
                )}
              />
            </View>
          )}
           <Button
              title="Submit Details"
              onPress={handleUpdateIsActive}
              disabled={!ownerData}
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
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
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
  file: {
    marginBottom: 10,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
  },
    successContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  successText: {
    color: 'green',
  },
});

export default OwnerDetailsScreen;
