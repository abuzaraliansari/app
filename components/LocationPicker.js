import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import React, {useState, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {AuthContext} from '../contexts/AuthContext';
import axios from 'axios';
import AppStyles from '../styles/AppStyles';
import Config from 'react-native-config'

const LocationPicker = () => {
  const [location, setLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch current location
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setMapRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      },
      error => {
        Alert.alert('Error', 'Failed to get location');
        console.error(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  // When the map is pressed
  const handleMapPress = e => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setLocation({ latitude, longitude });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setModalVisible(true);
          getCurrentLocation();
        }}
      >
        <Text style={styles.buttonText}>Send Location</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <MapView
            style={styles.map}
            region={mapRegion}
            onPress={handleMapPress}
          >
            {location && (
              <Marker coordinate={location} title="Selected Location" />
            )}
          </MapView>

          <GooglePlacesAutocomplete
            placeholder="Search nearby places"
            onPress={(data, details = null) => {
              const { lat, lng } = details.geometry.location;
              setLocation({ latitude: lat, longitude: lng });
              setMapRegion({
                latitude: lat,
                longitude: lng,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              });
            }}
            query={{
              key: 'YOUR_GOOGLE_MAPS_API_KEY',
              language: 'en',
            }}
            styles={{
              container: { flex: 0 },
              textInput: { height: 40 },
            }}
          />

          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => {
              setModalVisible(false);
              Alert.alert('Location Sent', JSON.stringify(location));
            }}
          >
            <Text style={styles.sendButtonText}>Send Location</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  button: {
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  sendButton: {
    padding: 15,
    backgroundColor: '#28a745',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default LocationPicker;
