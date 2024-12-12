import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import FamilyComponent from '../components/FamilyComponent'; // Ensure the path is correct

const FamilyScreen = () => {
  return (
    <ScrollView >
      <View>
        <FamilyComponent />
      </View>
    </ScrollView>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#f8f8f8',
//   },
// });

export default FamilyScreen;
