import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AppStyles from '../styles/AppStyles';
import axios from 'axios';
import Config from 'react-native-config';
import { AuthContext } from '../contexts/AuthContext';

const UpdateOwnerInfo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { authState } = useContext(AuthContext);
  const { owner } = route.params;

  const [ownerDetails, setOwnerDetails] = useState({
    OwnerID: owner.OwnerID,
    FirstName: owner.FirstName || '',
    MiddleName: owner.MiddleName || '',
    LastName: owner.LastName || '',
    FatherName: owner.FatherName || '',
    MobileNumber: owner.MobileNumber || '',
    Occupation: owner.Occupation || '',
    Age: owner.Age || '',
    DOB: owner.DOB || '',
    Gender: owner.Gender || '',
    Income: owner.Income || '',
    Religion: owner.Religion || '',
    Category: owner.Category || '',
    AdharNumber: owner.AdharNumber || '',
    PanNumber: owner.PanNumber || '',
    Email: owner.Email || '',
    NumberOfMembers: owner.NumberOfMembers || '',
    ModifiedBy: authState.user,
    DateModified: new Date().toISOString(),
  });

  const handleChange = (key, value) => {
    setOwnerDetails((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `${Config.API_URL}/auth/updateOwner`,
        ownerDetails,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
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
    <ScrollView style={AppStyles.container}>
      <View style={AppStyles.content}>
        <Text style={AppStyles.header}>Update Owner Info</Text>
        <TextInput
          style={AppStyles.input}
          placeholder="First Name"
          value={ownerDetails.FirstName}
          onChangeText={(text) => handleChange('FirstName', text)}
        />
        <TextInput
          style={AppStyles.input}
          placeholder="Middle Name"
          value={ownerDetails.MiddleName}
          onChangeText={(text) => handleChange('MiddleName', text)}
        />
        <TextInput
          style={AppStyles.input}
          placeholder="Last Name"
          value={ownerDetails.LastName}
          onChangeText={(text) => handleChange('LastName', text)}
        />
        <TextInput
          style={AppStyles.input}
          placeholder="Father Name"
          value={ownerDetails.FatherName}
          onChangeText={(text) => handleChange('FatherName', text)}
        />
        <TextInput
          style={AppStyles.input}
          placeholder="Mobile Number"
          keyboardType="phone-pad"
          value={ownerDetails.MobileNumber}
          onChangeText={(text) => handleChange('MobileNumber', text)}
        />
        <TextInput
          style={AppStyles.input}
          placeholder="Occupation"
          value={ownerDetails.Occupation}
          onChangeText={(text) => handleChange('Occupation', text)}
        />
        <TextInput
          style={AppStyles.input}
          placeholder="Age"
          keyboardType="numeric"
          value={ownerDetails.Age}
          onChangeText={(text) => handleChange('Age', text)}
        />
        <TextInput
          style={AppStyles.input}
          placeholder="DOB"
          value={ownerDetails.DOB}
          onChangeText={(text) => handleChange('DOB', text)}
        />
        <TextInput
          style={AppStyles.input}
          placeholder="Gender"
          value={ownerDetails.Gender}
          onChangeText={(text) => handleChange('Gender', text)}
        />
        <TextInput
          style={AppStyles.input}
          placeholder="Income"
          value={ownerDetails.Income}
          onChangeText={(text) => handleChange('Income', text)}
        />
        <TextInput
          style={AppStyles.input}
          placeholder="Religion"
          value={ownerDetails.Religion}
          onChangeText={(text) => handleChange('Religion', text)}
        />
        <TextInput
          style={AppStyles.input}
          placeholder="Category"
          value={ownerDetails.Category}
          onChangeText={(text) => handleChange('Category', text)}
        />
        <TextInput
          style={AppStyles.input}
          placeholder="Aadhar Number"
          value={ownerDetails.AdharNumber}
          onChangeText={(text) => handleChange('AdharNumber', text)}
        />
        <TextInput
          style={AppStyles.input}
          placeholder="PAN Number"
          value={ownerDetails.PanNumber}
          onChangeText={(text) => handleChange('PanNumber', text)}
        />
        <TextInput
          style={AppStyles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={ownerDetails.Email}
          onChangeText={(text) => handleChange('Email', text)}
        />
        <TextInput
          style={AppStyles.input}
          placeholder="Number of Members"
          keyboardType="numeric"
          value={ownerDetails.NumberOfMembers}
          onChangeText={(text) => handleChange('NumberOfMembers', text)}
        />
        <TouchableOpacity style={AppStyles.button} onPress={handleSubmit}>
          <Text style={AppStyles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UpdateOwnerInfo;