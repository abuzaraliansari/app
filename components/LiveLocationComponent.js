import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet , TouchableOpacity } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Config from 'react-native-config';
import {useNavigation} from '@react-navigation/native';

const LiveLocationComponent = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
   const navigation = useNavigation();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        if (position.coords.accuracy <= 20) {
          setLocation(position.coords);
        } else {
          setError('The location accuracy is insufficient. Please move to an open area.');
        }
      },
      error => {
        setError(error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);
  const addlocation = () => {
    if (location && location.accuracy <= 20) {
      console.log('Location submitted:', location);
      // Logic to handle submitting the location
      navigation.navigate('SpecialConsideration', { latitude: location. latitude, longitude:location.longitude });
    } else {
      setError('The location accuracy is insufficient. Please move to an open area.');
    }
  };
  


  return (
    <View style={styles.container}>
      {location ? (
        <View>
          <Text style={styles.text}>Live Location:</Text>
          <Text>Latitude: {location.latitude}</Text>
          <Text>Longitude: {location.longitude}</Text>
          <Text>Accuracy: {location.accuracy} m</Text>
        </View>
      ) : (
        <View>
          <Text>Fetching live location...</Text>
          {error && <Text style={styles.error}>{error}</Text>}
        </View>
      )}
      
  <TouchableOpacity style={styles.addButton} onPress={addlocation}>
        <Text style={styles.addButtonText}> Submit Location</Text>
      </TouchableOpacity>
      
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});



export default LiveLocationComponent;
