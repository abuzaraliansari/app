import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AppStyles from '../styles/AppStyles';

const SpecialConsiderationComponent = () => {
  const [ownerID, setOwnerID] = useState('');
  const [considerationType, setConsiderationType] = useState('');
  const [description, setDescription] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [modifiedBy, setModifiedBy] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigation = useNavigation();

  const handleAddSpecialConsideration = async () => {
    if (!ownerID || !considerationType || !createdBy) {
      setMessage('OwnerID, Consideration Type, and Created By are required.');
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
      const response = await fetch('http://172.16.2.43000/auth/SpecialConsideration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(specialConsiderationData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Special consideration added successfully.');
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

      <Text style={AppStyles.label}>Owner ID *</Text>
      <TextInput
        style={AppStyles.input}
        placeholder="Enter Owner ID"
        value={ownerID}
        onChangeText={setOwnerID}
        keyboardType="numeric"
      />

      <Text style={AppStyles.label}>Consideration Type *</Text>
      <View style={AppStyles.pickerContainer}>
        <Picker
          selectedValue={considerationType}
          onValueChange={(itemValue) => setConsiderationType(itemValue)}
          style={AppStyles.picker}
        >
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

      <Text style={AppStyles.label}>Created By *</Text>
      <TextInput
        style={AppStyles.input}
        placeholder="Enter Created By"
        value={createdBy}
        onChangeText={setCreatedBy}
      />

      <Text style={AppStyles.label}>Modified By</Text>
      <TextInput
        style={AppStyles.input}
        placeholder="Enter Modified By"
        value={modifiedBy}
        onChangeText={setModifiedBy}
      />

      <TouchableOpacity style={AppStyles.button} onPress={handleAddSpecialConsideration}>
        <Text style={AppStyles.buttonText}>Save and Next</Text>
      </TouchableOpacity>

      {message && (
        <Text style={[AppStyles.message, { color: isError ? 'red' : 'green' }]}>
          {message}
        </Text>
      )}
    </ScrollView>
  );
};


export default SpecialConsiderationComponent;
