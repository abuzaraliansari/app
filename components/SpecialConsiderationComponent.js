import React, {useState, useContext, useEffect } from 'react';
import {useNavigation, useRoute } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import AppStyles from '../styles/AppStyles';
import {AuthContext} from '../contexts/AuthContext';
import { FormDataContext } from '../contexts/FormDataContext';

import Config from 'react-native-config';

const SpecialConsiderationComponent = () => {
  const {authState} = useContext(AuthContext);
  const { updateFormData, formData } = useContext(FormDataContext);

  const ownerID = authState.ownerId;
  const propertyID = authState.propertyID;
  const [considerationType, setConsiderationType] = useState('None');
  const [description, setDescription] = useState('');
  const token = authState.token;
  const CreatedBy = authState.user;
  const [modifiedBy, setmodifiedBy] = useState('');
  const [IsActive, setIsActive] = useState('0');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigation = useNavigation(); 

  const route = useRoute(); // Access the route object
  const { latitude, longitude  } = route.params; 
  console.log('Latitude:', latitude, longitude);
  const API_ENDPOINT = `${Config.API_URL}/auth/SpecialConsideration`;


  useEffect(() => {
    // Update the context with the latitude, longitude, considerationType, and description
    updateFormData({
      specialConsideration: {
        ...formData.specialConsideration,
        latitude,
        longitude,
        considerationType,
        description,
        CreatedBy: CreatedBy,
      },
    });
  }, [latitude, longitude, considerationType, description]);

  const handleNext = () => {
    if (!considerationType) {
      Alert.alert('Error', 'Please fill in the special consideration.');
      return;
    }

    console.log('Special Consideration:', formData.specialConsideration);
    console.log('data:', formData); // Log the temporary data to verify
    navigation.replace('dataScreen');
  };


  return (
    <ScrollView contentContainerStyle={AppStyles.container}>
      <Text style={AppStyles.heading}>Special Consideration Details</Text>
      {/* <Text style={AppStyles.label}>Welcome, {authState.user}{} </Text> */}
      <Text style={AppStyles.label}>Consideration Type *</Text>
      <View style={AppStyles.pickerContainer}>
        <Picker
          selectedValue={considerationType}
          onValueChange={itemValue => setConsiderationType(itemValue)}
          style={AppStyles.picker}>
          <Picker.Item label="Select Consideration Type" value="None" />
          <Picker.Item label="Senior Citizen" value="Senior Citizen" />
          <Picker.Item label="Freedom Fighter" value="Freedom Fighter" />
          <Picker.Item label="Armed Forces" value="Armed Forces" />
          <Picker.Item label="Handicapped" value="Handicapped" />
          <Picker.Item label="Widow" value="Widow" />
          <Picker.Item label="None" value="None" />
        </Picker>
      </View>

      <Text style={AppStyles.label}>Description</Text>
      <TextInput
        style={AppStyles.input}
        placeholder="Enter Description"
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity
        style={AppStyles.button}
        onPress={handleNext}>
        <Text style={AppStyles.buttonText}>Save and Next</Text>
      </TouchableOpacity>

      {message && (
        <Text style={[AppStyles.message, {color: isError ? 'red' : 'green'}]}>
          {message}
        </Text>
      )}
    </ScrollView>
  );
};

export default SpecialConsiderationComponent;
