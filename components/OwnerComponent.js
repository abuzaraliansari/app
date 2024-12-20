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
import {AuthContext} from '../contexts/AuthContext';
import axios from 'axios';
import AppStyles from '../styles/AppStyles';
import Config from 'react-native-config';


const OwnerComponent = () => {
  const {authState} = useContext(AuthContext);
  const {login} = useContext(AuthContext);

  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [occupation, setOccupation] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [income, setIncome] = useState('');
  const [religion, setReligion] = useState('');
  const [category, setCategory] = useState('');
  const createdBy = authState.user;
  const [Email, setEmail] = useState('');
  const navigation = useNavigation();
  const API_ENDPOINT = `${Config.API_URL}/auth/owner`;

  const validateAndSubmit = async () => {
    try {
      // Validation
      if (!firstName || !lastName || !mobileNumber || !createdBy) {
        throw new Error(
          'First Name, Last Name, Mobile Number, and Created By are required fields.',
        );
      }

      if (!['M', 'F', 'O'].includes(gender)) {
        throw new Error("Gender must be 'M', 'F', or 'O'.");
      }

      const ownerDetails = {
        firstName,
        middleName,
        lastName,
        mobileNumber,
        occupation,
        age,
        gender,
        income,
        religion,
        category,
        createdBy,
        Email,
      };

      console.log('API_ENDPOINT:', API_ENDPOINT); 
      // Simulate API call with axios
      const response = await axios.post(API_ENDPOINT, {
        ownerDetails,
      });

      if (response.status === 201) {
        //Alert.alert('Success', 'Owner details submitted successfully.');
        login(authState.password, authState.user, response.data.ownerID);
        navigation.navigate('PropertyScreen', {ownerID: response.data.ownerID}); // Adjust the navigation target if needed
      }// else {
      //   Alert.alert('Success', response.status + response.data);
      // }
    } catch (error) {
      Alert.alert('Validation Error', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={AppStyles.container}>
      

      <Text style={AppStyles.heading}>Owner Details</Text>
      <Text style={AppStyles.label}>Welcome, {authState.user}!</Text>

      <Text style={AppStyles.label}>First Name *</Text>
      <TextInput
        style={AppStyles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="Enter first name"
      />

      <Text style={AppStyles.label}>Middle Name</Text>
      <TextInput
        style={AppStyles.input}
        value={middleName}
        onChangeText={setMiddleName}
        placeholder="Enter middle name"
      />

      <Text style={AppStyles.label}>Last Name *</Text>
      <TextInput
        style={AppStyles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Enter last name"
      />

      <Text style={AppStyles.label}>Mobile Number *</Text>
      <TextInput
        style={AppStyles.input}
        value={mobileNumber}
        onChangeText={setMobileNumber}
        keyboardType="phone-pad"
        placeholder="Enter mobile number"
      />

      <Text style={AppStyles.label}>Occupation</Text>
       <Picker
        selectedValue={occupation}
        onValueChange={(itemValue) => setOccupation(itemValue)}
        style={AppStyles.picker}
      >
        <Picker.Item label="Select an occupation" value="" />
        <Picker.Item label="Government Employee" value="Government Employee" />
        <Picker.Item label="Private Employee" value="Private Employee" />
        <Picker.Item label="Self-Employed" value="Self-Employed" />
        <Picker.Item label="Farmer" value="Farmer" />
        <Picker.Item label="Student" value="Student" />
        <Picker.Item label="Unemployed" value="Unemployed" />
        <Picker.Item label="Retired" value="Retired" />
        <Picker.Item label="Housewife" value="Housewife" />
        <Picker.Item label="Teacher" value="Teacher" />
        <Picker.Item label="Engineer" value="Engineer" />
        <Picker.Item label="Doctor" value="Doctor" />
        <Picker.Item label="Lawyer" value="Lawyer" />
        <Picker.Item label="Artist" value="Artist" />
        <Picker.Item label="Business Owner" value="Business Owner" />
        <Picker.Item label="Freelancer" value="Freelancer" />
        <Picker.Item label="Others" value="Others" />
      </Picker>

      <Text style={AppStyles.label}>Age *</Text>
      <Picker
        selectedValue={age}
        style={AppStyles.picker}
        onValueChange={itemValue => setAge(itemValue)}>
        <Picker.Item label="Select age" value="" />
        <Picker.Item label="18-20" value="18-20" />
        <Picker.Item label="21-30" value="21-30" />
        <Picker.Item label="31-40" value="31-40" />
        <Picker.Item label="41-50" value="41-50" />
        <Picker.Item label="51-60" value="51-60" />
        <Picker.Item label="61-70" value="61-70" />
        <Picker.Item label="71-80" value="71-80" />
        <Picker.Item label="81-90" value="81-90" />
        <Picker.Item label="90+" value="90+" />
      </Picker>
      <Text style={AppStyles.label}>Gender *</Text>
      <Picker
        selectedValue={gender}
        onValueChange={itemValue => setGender(itemValue)}
        style={AppStyles.picker}>
        <Picker.Item label="Select Gender" value="" />
        <Picker.Item label="Male" value="M" />
        <Picker.Item label="Female" value="F" />
        <Picker.Item label="Other" value="O" />
      </Picker>

      <Text style={AppStyles.label}>Income *</Text>
      <Picker
        selectedValue={income}
        style={AppStyles.picker}
        onValueChange={itemValue => setIncome(itemValue)}>
        <Picker.Item label="Select an Income range" value="" />
        <Picker.Item label="Below 10,000" value="Below 10,000" />
        <Picker.Item label="10,000 - 20,000" value="10,000 - 20,000" />
        <Picker.Item label="20,001 - 30,000" value="20,001 - 30,000" />
        <Picker.Item label="30,001 - 40,000" value="30,001 - 40,000" />
        <Picker.Item label="40,001 - 50,000" value="40,001 - 50,000" />
        <Picker.Item label="50,001 - 100,000" value="50,001 - 100,000" />
        <Picker.Item label="100,001 - 200,000" value="100,001 - 200,000" />
        <Picker.Item label="200,001 - 300,000" value="200,001 - 300,000" />
        <Picker.Item label="300,001 - 400,000" value="300,001 - 400,000" />
        <Picker.Item label="400,001 - 500,000" value="400,001 - 500,000" />
        <Picker.Item label="500,001 - 1,000,000" value="500,001 - 1,000,000" />
        <Picker.Item
          label="1,000,001 - 10,000,000"
          value="1,000,001 - 10,000,000"
        />
        <Picker.Item label="10,000,000+" value="10,000,000+" />
      </Picker>
      <Text style={AppStyles.label}>Religion</Text>
      <Picker
        selectedValue={religion}
        style={AppStyles.picker}
        onValueChange={itemValue => setReligion(itemValue)}>
        <Picker.Item label="Select an Religion range" value="" />
        <Picker.Item label="Hindu" value="Hindu" />
        <Picker.Item label="Muslim" value="Muslim" />
        <Picker.Item label="Christian" value="Christian" />
        <Picker.Item label="Sikh" value="Sikh" />
        <Picker.Item label="Other" value="Other" />
      </Picker>

      <Text style={AppStyles.label}>Category</Text>
      <Picker
        selectedValue={category}
        style={AppStyles.picker}
        onValueChange={itemValue => setCategory(itemValue)}>
        <Picker.Item label="Select an Category range" value="" />
        <Picker.Item label="General" value="General" />
        <Picker.Item label="OBC" value="OBC" />
        <Picker.Item label="SC" value="SC" />
        <Picker.Item label="ST" value="ST" />
        <Picker.Item label="Other" value="Other" />
      </Picker>

      <Text style={AppStyles.label}>Email</Text>
      <TextInput
        style={AppStyles.input}
        value={Email}
        onChangeText={setEmail}
        placeholder="Enter Email"
      />

      <TouchableOpacity style={AppStyles.button} onPress={validateAndSubmit}>
        <Text style={AppStyles.buttonText}>Save and Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default OwnerComponent;