import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppStyles from '../styles/AppStyles';
import Config from 'react-native-config';
import { AuthContext } from '../contexts/AuthContext';
import { useState, useContext } from 'react';

const HomeComponent = () => {
  const { authState } = useContext(AuthContext);
  const navigation = useNavigation();
  const createdBy = authState.user;

  const navigateToAddProperty = () => {
    navigation.navigate('Owner', { source: 'Home' }); // Pass the source parameter
  };

  const navigateToFindAndUpdate = () => {
    navigation.replace('Find'); // Replace with your actual screen name
  };

  const navigateToLogout = () => {
    navigation.replace('Login'); // Assuming 'Login' is the screen name for logout
  };

  // const navigateToAddUser = () => {
  //   navigation.navigate('AddUser'); // Replace with your actual screen name for adding a user
  // };

  // const navigateToUserDetails = () => {
  //   navigation.navigate('UserDetails'); // Replace with your actual screen name for user details
  // };

  return (
    <View style={AppStyles.container}>
      <Text style={AppStyles.title}>Welcome {authState.user}</Text>
      <Text style={AppStyles.text}>Babrala House No. Allocation App!</Text>

      <TouchableOpacity
        style={[AppStyles.button, AppStyles.nextButton]}
        onPress={navigateToAddProperty}
      >
        <Text style={AppStyles.buttonText}>Add Property</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[AppStyles.button, AppStyles.nextButton]}
        onPress={navigateToFindAndUpdate}
      >
        <Text style={AppStyles.buttonText}>Find & Update Property</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[AppStyles.button, AppStyles.logoutButton]}
        onPress={navigateToLogout}
      >
        <Text style={AppStyles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeComponent;