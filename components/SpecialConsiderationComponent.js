import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

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
      const response = await fetch('http://192.168.29.56:3000/auth/SpecialConsideration', {
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Special Consideration Details</Text>

      <Text style={styles.label}>Owner ID *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Owner ID"
        value={ownerID}
        onChangeText={setOwnerID}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Consideration Type *</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={considerationType}
          onValueChange={(itemValue) => setConsiderationType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Consideration Type" value="" />
          <Picker.Item label="Senior Citizen" value="Senior Citizen" />
          <Picker.Item label="Freedom Fighter" value="Freedom Fighter" />
          <Picker.Item label="Armed Forces" value="Armed Forces" />
          <Picker.Item label="Handicapped" value="Handicapped" />
          <Picker.Item label="Widow" value="Widow" />
        </Picker>
      </View>

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Description"
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Created By *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Created By"
        value={createdBy}
        onChangeText={setCreatedBy}
      />

      <Text style={styles.label}>Modified By</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Modified By"
        value={modifiedBy}
        onChangeText={setModifiedBy}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddSpecialConsideration}>
        <Text style={styles.buttonText}>Save and Next</Text>
      </TouchableOpacity>

      {message && (
        <Text style={[styles.message, { color: isError ? 'red' : 'green' }]}>
          {message}
        </Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f4f7',
  },
  heading: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#555',
  },
  input: {
    borderWidth: 3,
    borderColor: '#ddd',
    borderRadius: 15,
    padding: 10,
    fontSize: 20,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  pickerContainer: {
    borderWidth: 3,
    borderColor: '#ddd',
    borderRadius: 15,
    marginBottom: 15,
    fontSize: 20,
    backgroundColor: '#fff',
  },
  picker: {
    borderRadius: 15,
    borderColor: '#ddd',
    borderWidth: 3,
    backgroundColor: '#fff',
    
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  message: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 20,
  },
});

export default SpecialConsiderationComponent;
