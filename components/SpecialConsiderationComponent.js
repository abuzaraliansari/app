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
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import AppStyles from '../styles/AppStyles';
import {AuthContext} from '../contexts/AuthContext';
import Config from 'react-native-config';

const SpecialConsiderationComponent = () => {
  const {authState} = useContext(AuthContext);
  const ownerID = authState.ownerId;
  const [considerationType, setConsiderationType] = useState('');
  const [description, setDescription] = useState('');
  const createdBy = authState.user;
  const [modifiedBy, setmodifiedBy] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigation = useNavigation();
  const API_ENDPOINT = `${Config.API_URL}/auth/SpecialConsideration`;
  const handleAddSpecialConsideration = async () => {
    if (!ownerID || !considerationType) {
      setMessage('Consideration Type, and Created By are required.');
      setIsError(true);
      return;
    }

    const specialConsiderationData = {
      ownerID,
      considerationType,
      description,
      createdBy,
      modifiedBy,
    };

    try {
      console.log('API_ENDPOINT:', API_ENDPOINT); 
      const response = await fetch(
        API_ENDPOINT,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(specialConsiderationData),
        },
      );

      const data = await response.json();

      if (response.status === 201) {
        //setMessage('Special consideration added successfully.');
        setIsError(false);
        navigation.navigate('FormWithPhoto');
      } else {
        setMessage(data.message || 'Failed to add special consideration.');
        setIsError(true);
      }
    } catch (err) {
      setMessage('Error: ' + err.message);
      setIsError(true);
    }
  };

  return (
    <ScrollView contentContainerStyle={AppStyles.container}>
      <Text style={AppStyles.heading}>Special Consideration Details</Text>
      <Text style={AppStyles.label}>Welcome, {authState.user}</Text>
      <Text style={AppStyles.label}>Consideration Type *</Text>
      <View style={AppStyles.pickerContainer}>
        <Picker
          selectedValue={considerationType}
          onValueChange={itemValue => setConsiderationType(itemValue)}
          style={AppStyles.picker}>
          <Picker.Item label="Select Consideration Type" value="" />
          <Picker.Item label="Senior Citizen" value="Senior Citizen" />
          <Picker.Item label="Freedom Fighter" value="Freedom Fighter" />
          <Picker.Item label="Armed Forces" value="Armed Forces" />
          <Picker.Item label="Handicapped" value="Handicapped" />
          <Picker.Item label="Widow" value="Widow" />
        </Picker>
      </View>

      <Text style={AppStyles.label}>Description</Text>
      <TextInput
        style={AppStyles.input}
        placeholder="Enter Description"
        value={description}
        onChangeText={setDescription}
      />

      <Text style={AppStyles.label}>Modified By </Text>
      <TextInput
        style={AppStyles.input}
        placeholder="Enter ModifiedBy"
        value={modifiedBy}
        onChangeText={setmodifiedBy}
      />

      <TouchableOpacity
        style={AppStyles.button}
        onPress={handleAddSpecialConsideration}>
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
