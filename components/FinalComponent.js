import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppStyles from '../styles/AppStyles';

const FinalComponent = () => {
  const navigation = useNavigation();

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const navigateToProperty = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={AppStyles.container}>
        <Text style={AppStyles.title}>Thank you for your submission!</Text>
        <Text style={AppStyles.text}>Your Details has been successfully added!</Text>
      

      <TouchableOpacity style={[AppStyles.button, AppStyles.nextButton]} onPress={navigateToProperty}>
        <Text style={AppStyles.buttonText}>Add Another Property</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[AppStyles.button, AppStyles.logoutButton]} onPress={navigateToLogin}>
        <Text style={AppStyles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};


export default FinalComponent;
