import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthContext';
import { Picker } from '@react-native-picker/picker';
import AppStyles from '../styles/AppStyles';
import Config from 'react-native-config';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

const UpdateFamily = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { authState } = useContext(AuthContext);
  const { member } = route.params;
  console.log(member.FamilyMemberID);
  const FamilyMemberID = member.FamilyMemberID;
  const [firstName, setFirstName] = useState(member.FirstName || '');
  const [lastName, setLastName] = useState(member.LastName || '');
  const [relation, setRelation] = useState(member.Relation || '');
  const [age, setAge] = useState(member.Age || '');
  const [DOB, setDob] = useState(member.DOB ? new Date(member.DOB) : null);
  const [gender, setGender] = useState(member.Gender || '');
  const [occupation, setOccupation] = useState(member.Occupation || '');
  const [income, setIncome] = useState(member.Income || '');
  const [isActive, setIsActive] = useState(member.IsActive || false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const ModifiedBy = authState.user;
  const DateModified = new Date().toISOString();
  const CreatedBy = authState.user;
  const token = authState.token;


  const handleSubmit = async () => {
    if (!firstName || !lastName || !relation || !age || !gender) {
      Alert.alert('Error', 'First Name, Last Name, Relation, Age, and Gender are required fields.');
      return;
    }

    if (!['M', 'F', 'O'].includes(gender)) {
      Alert.alert('Error', "Gender must be 'M', 'F', or 'O'.");
      return;
    }

    const familyMemberDetails = {
      FamilyMemberID: member.FamilyMemberID,
      OwnerID: member.OwnerID,
      FirstName: firstName,
      LastName: lastName,
      Relation: relation,
      Age: age,
      DOB: DOB ? DOB.toISOString().split('T')[0] : null,
      Gender: gender,
      Occupation: occupation,
      Income: income,
      IsActive: isActive,
      ModifiedBy: ModifiedBy,
      DateModified: DateModified,
    };

    try {
      console.log('Sending family member details to API:', familyMemberDetails);
      const response = await axios.post(
        `${Config.API_URL}/auth/updateFamily`,
        familyMemberDetails,
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
      console.error('API call error:', error);
      Alert.alert('Error', error.response?.data?.message || 'An error occurred');
    }
  };

  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || DOB;
    setShowDatePicker(Platform.OS === 'ios');
    setDob(currentDate);
  };

  return (
    <ScrollView contentContainerStyle={AppStyles.container}>
    <View style={AppStyles.container}>
      <Text style={AppStyles.header}>Update Family Member</Text>

      <Text style={AppStyles.label}>Relation *</Text>
      <Picker
        selectedValue={relation}
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

      <Text style={AppStyles.label}>First Name *</Text>
      <TextInput
        style={AppStyles.input}
        placeholder="Enter Name"
        value={firstName}
        onChangeText={setFirstName}
      />

      <Text style={AppStyles.label}>Last Name *</Text>
      <TextInput
        style={AppStyles.input}
        placeholder="Enter Last Name"
        value={lastName}
        onChangeText={setLastName}
      />

      <Text style={AppStyles.label}>Age *</Text>
      <Picker
        selectedValue={age}
        style={AppStyles.picker}
        onValueChange={itemValue => setAge(itemValue)}>
        <Picker.Item label="Select age" value="" />
        <Picker.Item label="01-05" value="01-05" />
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

      <Text style={AppStyles.label}>Date of Birth *</Text>
      <TouchableOpacity onPress={showDatePickerHandler} style={AppStyles.input}>
        <Text>{DOB ? DOB.toDateString() : 'Select Date of Birth'}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={DOB || new Date()}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

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

      <Text style={AppStyles.label}>Income</Text>
      <Picker
        selectedValue={income}
        style={AppStyles.picker}
        onValueChange={itemValue => setIncome(itemValue)}>
        <Picker.Item label="Select an Income range" value="0" />
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

      <TouchableOpacity style={AppStyles.button} onPress={handleSubmit}>
          <Text style={AppStyles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

export default UpdateFamily;