import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppStyles from '../styles/AppStyles';

const FinalComponent = () => {
  const navigation = useNavigation();

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const navigateToOwner = () => {
    navigation.navigate('Home');
  };

  const navigateToProperty = () => {
    navigation.navigate('PropertyArea');
  };

  return (
    <View style={AppStyles.container}>
      <TouchableOpacity style={[AppStyles.button, AppStyles.nextButton]} onPress={navigateToLogin}>
        <Text style={AppStyles.buttonText}>Go to Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[AppStyles.button, AppStyles.nextButton]} onPress={navigateToOwner}>
        <Text style={AppStyles.buttonText}>Add Another Owner</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[AppStyles.button, AppStyles.nextButton]} onPress={navigateToProperty}>
        <Text style={AppStyles.buttonText}>Add Another Property</Text>
      </TouchableOpacity>
    </View>
  );
};


export default FinalComponent;
