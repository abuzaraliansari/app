// import React from 'react';
// import { View } from 'react-native';
// import PropertyComponent from '../components/PropertyComponent';

// const TestScreen = () => (
//   <View>
//     <PropertyComponent />
//   </View>
// );

import React from 'react';
import {ScrollView, View, StyleSheet } from 'react-native'; // Removed duplicate imports
import OwnerComponent from '../components/OwnerComponent'; // Ensure the path is correct

const OwnerScreen = () => {
  return (
    <ScrollView >
    <View >
      <OwnerComponent />
    </View>
    </ScrollView>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center', // Optional styling to center content
//     alignItems: 'center', // Optional styling to center content
//     backgroundColor: '#f8f8f8', // Optional background color
//   },
// });

export default OwnerScreen;

