import React from 'react';
import { View } from 'react-native';
import PropertyDetailsComponent from '../components/PropertyComponent';

const PropertyScreen = () => (
  <View>
    <PropertyDetailsComponent />
  </View>
);

// Uncomment and customize the styles if needed
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 20,
//   },
// });

export default PropertyScreen;
