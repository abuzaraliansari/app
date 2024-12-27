import React, {useState, useContext} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../contexts/AuthContext';
import {Picker} from '@react-native-picker/picker';
import AppStyles from '../styles/AppStyles';
import Config from 'react-native-config';

const FamilyMember = () => {
  const {authState} = useContext(AuthContext);

  const ownerID = authState.ownerId;
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [occupation, setOccupation] = useState('');
  const [IsActive, setIsActive] = useState('');
  const createdBy = authState.user;
  const token = authState.token;
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const API_ENDPOINT = `${Config.API_URL}/auth/family`;

  const navigation = useNavigation();

  const familyMemberData = {
    familyMember: {
      ownerID,
      FirstName,
      LastName,
      age,
      gender,
      occupation,
      createdBy,
      IsActive,
    },
  };

  const handleSaveFamilyMember = async () => {
    if (!FirstName || !age || !gender) {
      setMessage('All fields are required.');
      setIsError(true);
      return;
    }

    setLoading(true);

    try {
      console.log('API_ENDPOINT:', API_ENDPOINT); 
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'header_gkey': authState.token,
        },
        body: JSON.stringify(familyMemberData),
        
      });

      const data = await response.json();
      //console.log('Response:', responseData);
      setLoading(false);

      if (response.status === 201) {
        setMessage('Family member saved successfully.');
        setIsError(false);
        // Clear fields for next family member entry
        setFirstName('');
        setLastName('');
        setAge('');
        setGender('');
        setOccupation('');
      } else {
        setMessage(data.message || 'Failed to save family member.');
        setIsError(true);
      }
    } catch (err) {
      setMessage('Error: ' + err.message);
      setIsError(true);
      setLoading(false);
    }
  };

  const handleAddFamilyMember = () => {
    navigation.replace('PropertyArea');
  };

  return (
    <View style={AppStyles.container}>
      <Text style={AppStyles.header}>Add Family Member</Text>
      <Text style={AppStyles.label}>Welcome, {authState.user}</Text>

      <Text style={AppStyles.label}>First Name</Text>
      <TextInput
        style={AppStyles.input}
        placeholder="Enter Name"
        value={FirstName}
        onChangeText={setFirstName}
      />

      <Text style={AppStyles.label}>Last Name</Text>
      <TextInput
        style={AppStyles.input}
        placeholder="Enter Last Name"
        value={LastName}
        onChangeText={setLastName}
      />
      <Text style={AppStyles.label}>Age *</Text>
      <Picker
        selectedValue={age}
        style={AppStyles.picker}
        onValueChange={itemValue => setAge(itemValue)}>
        <Picker.Item label="Select age" value="" />
        <Picker.Item label="01-05" value="05-10" />
        <Picker.Item label="05-10" value="05-10" />
        <Picker.Item label="10-16" value="10-16" />
        <Picker.Item label="16-20" value="16-20" />
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

      {loading ? (
        <ActivityIndicator size="large" color="#1E90FF" />
      ) : (
        <>
          <TouchableOpacity
            style={AppStyles.button}
            onPress={handleSaveFamilyMember}>
            <Text style={AppStyles.buttonText}>Save Member</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[AppStyles.button, AppStyles.nextButton]}
            onPress={handleAddFamilyMember}>
            <Text style={AppStyles.buttonText}>Next</Text>
          </TouchableOpacity>
        </>
      )}

      {message && (
        <Text style={[AppStyles.message, {color: isError ? 'red' : 'green'}]}>
          {message}
        </Text>
      )}
    </View>
  );
};

export default FamilyMember;
