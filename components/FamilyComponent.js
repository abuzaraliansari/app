import React, { useState ,useContext} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthContext'; 
import {Picker} from '@react-native-picker/picker';
import AppStyles from '../styles/AppStyles';

const FamilyMember = () => {
  const { authState } = useContext(AuthContext);
  const ownerID = authState.ownerID;
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [occupation, setOccupation] = useState('');
  const createdBy = authState.user;
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const familyMemberData = {
    familyMember: {
      ownerID,
      name,
      age,
      gender,
      occupation,
      createdBy,
    },
  };

  const handleSaveFamilyMember = async () => {
    if (!ownerID || !name || !age || !gender || !occupation) {
      setMessage('All fields are required.');
      setIsError(true);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://172.16.2.4:3000/auth/family', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(familyMemberData),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        setMessage('Family member saved successfully.');
        setIsError(false);
        // Clear fields for next family member entry
        setName('');
        setAge('');
        setGender('');
        setOccupation('');
        setCreatedBy('');
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
    if (!ownerID) {
      setMessage('OwnerID is required to add a family member.');
      setIsError(true);
      return;
    }
    login(authState.password, authState.username, response.data.fa);
    navigation.navigate('Property', { ownerID });
  };

  return (
    <View style={AppStyles.container}>
      <Text style={AppStyles.header}>Add Family Member</Text>

      <Text style={AppStyles.label}>Owner ID  {authState.ownerID}</Text>
      <TextInput
        style={AppStyles.input}
        placeholder="Enter OwnerID"
        value={ownerID}
        onChangeText={authState.ownerID}
      />

      <Text style={AppStyles.label}>Full Name</Text>
      <TextInput
        style={AppStyles.input}
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
      />

<Text style={AppStyles.label}>Age *</Text>
      <Picker
        selectedValue={age}
        style={AppStyles.picker}
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
      <TextInput
        style={AppStyles.input}
        placeholder="Enter Occupation"
        value={occupation}
        onChangeText={setOccupation}
      />

<Text style={AppStyles.label}>Created By {authState.user}</Text>
      <TextInput
        style={AppStyles.input}
        placeholder="Enter Created By"
        value={createdBy}
        onChangeText={authState.user}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#1E90FF" />
      ) : (
        <>
          <TouchableOpacity style={AppStyles.button} onPress={handleSaveFamilyMember}>
            <Text style={AppStyles.buttonText}>Save and Add Member</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[AppStyles.button, AppStyles.nextButton]} onPress={handleAddFamilyMember}>
            <Text style={AppStyles.buttonText}>Save and Next</Text>
          </TouchableOpacity>
        </>
      )}

      {message && (
        <Text style={[AppStyles.message, { color: isError ? 'red' : 'green' }]}>{message}</Text>
      )}
    </View>
  );
};


export default FamilyMember;
