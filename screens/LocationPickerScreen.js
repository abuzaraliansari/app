import React from 'react';
import {ScrollView, View, StyleSheet } from 'react-native'; // Removed duplicate imports
import LocationPicker from '../components/LocationPicker'; // Ensure the path is correct

const LocationPickerScreen = () => {
  return (
    <ScrollView >
    <View >
      <LocationPicker />
    </View>
    </ScrollView>
  );
};

export default LocationPickerScreen;