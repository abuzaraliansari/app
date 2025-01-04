import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
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
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import AppStyles from '../styles/AppStyles';
import Config from 'react-native-config';

const UpdateOwner = () => {
  const navigation = useNavigation();
  const { userToken } = useContext(AuthContext);

  const [ownerDetails, setOwnerDetails] = useState({
    OwnerID: '',
    firstName: '',
    middleName: '',
    lastName: '',
    mobileNumber: '',
    occupation: '',
    age: '',
    gender: '',
    income: '',
    religion: '',
    category: '',
    modifiedBy: '',
    Email: '',
    PanNumber: '',
    AdharNumber: '',
    NumberOfMembers: '',
    Cast: '',
  });

  const handleChange = (key, value) => {
    setOwnerDetails((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!ownerDetails.OwnerID) {
      Alert.alert('Error', 'OwnerID is required to update owner details');
      return;
    }

    try {
      const response = await axios.put(
        `${Config.API_BASE_URL}/api/updateOwner`,
        { ownerDetails },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.data.success) {
        Alert.alert('Success', response.data.message, [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Update Owner Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Owner ID"
        keyboardType="numeric"
        value={ownerDetails.OwnerID}
        onChangeText={(text) => handleChange('OwnerID', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={ownerDetails.firstName}
        onChangeText={(text) => handleChange('firstName', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Middle Name"
        value={ownerDetails.middleName}
        onChangeText={(text) => handleChange('middleName', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={ownerDetails.lastName}
        onChangeText={(text) => handleChange('lastName', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        keyboardType="phone-pad"
        value={ownerDetails.mobileNumber}
        onChangeText={(text) => handleChange('mobileNumber', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Occupation"
        value={ownerDetails.occupation}
        onChangeText={(text) => handleChange('occupation', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        keyboardType="numeric"
        value={ownerDetails.age}
        onChangeText={(text) => handleChange('age', text)}
      />
      <Picker
        selectedValue={ownerDetails.gender}
        onValueChange={(value) => handleChange('gender', value)}
        style={styles.picker}
      >
        <Picker.Item label="Select Gender" value="" />
        <Picker.Item label="Male" value="M" />
        <Picker.Item label="Female" value="F" />
        <Picker.Item label="Other" value="O" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Income"
        value={ownerDetails.income}
        onChangeText={(text) => handleChange('income', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Religion"
        value={ownerDetails.religion}
        onChangeText={(text) => handleChange('religion', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={ownerDetails.category}
        onChangeText={(text) => handleChange('category', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Modified By"
        value={ownerDetails.modifiedBy}
        onChangeText={(text) => handleChange('modifiedBy', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={ownerDetails.Email}
        onChangeText={(text) => handleChange('Email', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="PAN Number"
        value={ownerDetails.PanNumber}
        onChangeText={(text) => handleChange('PanNumber', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Aadhar Number"
        value={ownerDetails.AdharNumber}
        onChangeText={(text) => handleChange('AdharNumber', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Number of Members"
        keyboardType="numeric"
        value={ownerDetails.NumberOfMembers}
        onChangeText={(text) => handleChange('NumberOfMembers', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Caste"
        value={ownerDetails.Cast}
        onChangeText={(text) => handleChange('Cast', text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: AppStyles.colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: AppStyles.colors.primary,
  },
  input: {
    borderWidth: 1,
    borderColor: AppStyles.colors.border,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: AppStyles.colors.inputBackground,
  },
  picker: {
    borderWidth: 1,
    borderColor: AppStyles.colors.border,
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: AppStyles.colors.buttonBackground,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: AppStyles.colors.buttonText,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UpdateOwner;
