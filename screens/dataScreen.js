import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';

const API_ENDPOINT = `http://192.168.29.56:3000/auth/data`;

const OwnerDetailsScreen = () => {
  const [ownerData, setOwnerData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [fetchError, setFetchError] = useState(null);

  // Function to fetch owner details
  const fetchOwnerDetails = async () => {
    // setLoading(true);
    // setFetchError(null);
    try {
        console.log('API_ENDPOINT:', API_ENDPOINT);
      

      const response = await axios.post(API_ENDPOINT, { MobileNumber: '4345353344' });
      setOwnerData(response.data);
      console.log('API Response:', response.data);
    } catch (error) {
      console.error('Error fetching owner details:', error.message);
      setFetchError('Failed to fetch owner details.');
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Owner Details</Text>

      {/* Button to fetch data */}
      <Button title="Fetch Owner Details" onPress={fetchOwnerDetails} />

      {/* {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      {fetchError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{fetchError}</Text>
        </View>
      )} */}

      {ownerData && (
        <>
          {/* Owner Information */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Owner Info</Text>
            <Text>Owner ID: {ownerData.owner.OwnerID}</Text>
            <Text>Name: {`${ownerData.owner.FirstName} ${ownerData.owner.LastName}`}</Text>
            <Text>Mobile: {ownerData.owner.MobileNumber}</Text>
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
                  <Text>Colony: {item.Colony}</Text>
                  <Text>House No: {item.HouseNumber}</Text>
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
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
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
});

export default OwnerDetailsScreen;
