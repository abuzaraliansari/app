import React from 'react';
import {ScrollView, View, StyleSheet } from 'react-native'; // Removed duplicate imports
import LiveLocationComponent from '../components/LiveLocationComponent'; // Ensure the path is correct

const LiveLocationScreen = () => {
  return (
    <ScrollView >
    <View >
      <LiveLocationComponent />
    </View>
    </ScrollView>
  );
};

export default LiveLocationScreen;