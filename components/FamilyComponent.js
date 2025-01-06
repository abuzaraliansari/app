import React, {useState, useContext} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../contexts/AuthContext';
import {Picker} from '@react-native-picker/picker';
import AppStyles from '../styles/AppStyles';
import Config from 'react-native-config';
import { FormDataContext } from '../contexts/FormDataContext';

const FamilyMember = () => {
  const {authState} = useContext(AuthContext);

  const ownerID = authState.ownerId;
  const [Relation, setRelation] = useState('');
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
  const { updateFormData, formData } = useContext(FormDataContext);
  //const API_ENDPOINT = `${Config.API_URL}/auth/family`;

  const navigation = useNavigation();

    const handleAddFamilyMember = () => {
      console.log('mobile:', authState.MobileNumber);
    if (!Relation || !FirstName || !age || !gender) {
      setMessage('Relation, FirstName, Age, Gender fields are required.');
      setIsError(true);
      return;
    }
  
    const newFamilyMember  ={
      Relation,
      FirstName,
      LastName,
      age,
      gender,
      occupation,
      createdBy
    };

    updateFormData({
      familyMembers: [...(formData.familyMembers || []), newFamilyMember],
    });

    setRelation('');
    setFirstName('');
    setLastName('');
    setAge('');
    setGender('');
    setOccupation('');
    setMessage('Family member added successfully.');
    setIsError(false);
  };

  
      const handleNext = () => {
       
console.log('familyMembers:', formData.familyMembers);
    navigation.navigate('PropertyArea');
  };

  return (
    <View style={AppStyles.container}>
      <Text style={AppStyles.header}>Add Family Member</Text>

      <Text style={AppStyles.label}>Relation *</Text>
      <Picker
        selectedValue={Relation}
        style={AppStyles.picker}
        onValueChange={itemValue => setRelation(itemValue)}>
        <Picker.Item label="Select Relation" value="" />
        <Picker.Item label="Father" value="Father" />
        <Picker.Item label="Mother" value="Mother" />
        <Picker.Item label="Wife" value="Wife" />
        <Picker.Item label="Husband" value="Husband" />
        <Picker.Item label="Son" value="Son" />
        <Picker.Item label="Daughter" value="Daughter" />
        <Picker.Item label="Brother" value="Brother" />
        <Picker.Item label="Sister" value="Sister" />
        <Picker.Item label="Grandfather" value="Grandfather" />
        <Picker.Item label="Grandmother" value="Grandmother" />
        <Picker.Item label="Uncle" value="Uncle" />
        <Picker.Item label="Aunt" value="Aunt" />
        <Picker.Item label="Other" value="Other" />
      </Picker>

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
            onPress={handleAddFamilyMember}>
            <Text style={AppStyles.buttonText}>Save Member</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[AppStyles.button, AppStyles.nextButton]}
            onPress={handleNext}>
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
