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
  const navigation = useNavigation();

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
      };

      // Simulate API call with axios
      const response = await axios.post('http://172.16.2.4:3000/auth/owner', {
        ownerDetails,
      });

      if (response.status === 201) {
        Alert.alert('Success', 'Owner details submitted successfully.');
        login(authState.password, authState.username, response.data.ownerID);
        navigation.navigate('Family', {ownerID: response.data.ownerID}); // Adjust the navigation target if needed
      } else {
        Alert.alert('Success', response.status + response.data);
      }
    } catch (error) {
      Alert.alert('Validation Error', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Welcome, {authState.user}!</Text>

      <Text style={styles.heading}>Owner Details</Text>

      <Text style={styles.label}>First Name *</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="Enter first name"
      />

      <Text style={styles.label}>Middle Name</Text>
      <TextInput
        style={styles.input}
        value={middleName}
        onChangeText={setMiddleName}
        placeholder="Enter middle name"
      />

      <Text style={styles.label}>Last Name *</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Enter last name"
      />

      <Text style={styles.label}>Mobile Number *</Text>
      <TextInput
        style={styles.input}
        value={mobileNumber}
        onChangeText={setMobileNumber}
        keyboardType="phone-pad"
        placeholder="Enter mobile number"
      />

      <Text style={styles.label}>Occupation</Text>
      <TextInput
        style={styles.input}
        value={occupation}
        onChangeText={setOccupation}
        placeholder="Enter occupation"
      />

      <Text style={styles.label}>Age *</Text>
      <Picker
        selectedValue={age}
        style={styles.picker}
        onValueChange={itemValue => setAge(itemValue)}>
        <Picker.Item label="Select an age range" value="" />
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
      <Text style={styles.label}>Gender *</Text>
      <Picker
        selectedValue={gender}
        onValueChange={itemValue => setGender(itemValue)}
        style={styles.picker}>
        <Picker.Item label="Select Gender" value="" />
        <Picker.Item label="Male" value="M" />
        <Picker.Item label="Female" value="F" />
        <Picker.Item label="Other" value="O" />
      </Picker>

      <Text style={styles.label}>Income *</Text>
      <Picker
        selectedValue={income}
        style={styles.picker}
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
      <Text style={styles.label}>Religion</Text>
      <Picker
        selectedValue={religion}
        style={styles.picker}
        onValueChange={itemValue => setReligion(itemValue)}>
        <Picker.Item label="Select an Religion range" value="" />
        <Picker.Item label="Hindu" value="Hindu" />
        <Picker.Item label="Muslim" value="Muslim" />
        <Picker.Item label="Christian" value="Christian" />
        <Picker.Item label="Sikh" value="Sikh" />
        <Picker.Item label="Other" value="Other" />
      </Picker>

      <Text style={styles.label}>Category</Text>
      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={itemValue => setCategory(itemValue)}>
        <Picker.Item label="Select an Category range" value="" />
        <Picker.Item label="General" value="General" />
        <Picker.Item label="OBC" value="OBC" />
        <Picker.Item label="SC" value="SC" />
        <Picker.Item label="ST" value="ST" />
        <Picker.Item label="Other" value="Other" />
      </Picker>

      <TouchableOpacity style={styles.button} onPress={validateAndSubmit}>
        <Text style={styles.buttonText}>Save and Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f4f7',
  },
  heading: {
    fontSize: 40,
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
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    padding: 10,
    fontSize: 20,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  picker: {
    borderWidth: 3,
    borderColor: '#ddd',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 30,
  },

  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default OwnerComponent;
