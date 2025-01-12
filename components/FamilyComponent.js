import React, { useState, useContext, useEffect }  from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useNavigation ,useRoute } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthContext';
import { Picker } from '@react-native-picker/picker';
import AppStyles from '../styles/AppStyles';
import Config from 'react-native-config';
import { FormDataContext } from '../contexts/FormDataContext';
import DateTimePicker from '@react-native-community/datetimepicker';

const FamilyMember = () => {
  const { authState } = useContext(AuthContext);
  const route = useRoute();
  const source = route.params?.source; 
  const ownerID = authState.ownerId;
  const [Relation, setRelation] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [occupation, setOccupation] = useState('');
  const [Income, setIncome] = useState('');
  const [IsActive, setIsActive] = useState('');
  const CreatedBy = authState.user;
  const token = authState.token;
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { updateFormData, formData } = useContext(FormDataContext);
  const [DOB, setDob] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const navigation = useNavigation();

  const { NumberOfMembers, index } = route.params || {}; // Get the index parameter if passed

  console.log('members:', NumberOfMembers);


  useEffect(() => {
    if (index !== undefined && formData.familyMembers && formData.familyMembers[index]) {
      const member = formData.familyMembers[index];
      setRelation(member.Relation || '');
      setFirstName(member.FirstName || '');
      setLastName(member.LastName || '');
      setAge(member.age || '');
      setGender(member.gender || '');
      setOccupation(member.occupation || '');
      setIncome(member.Income || '');
      setDob(member.DOB ? new Date(member.DOB) : null);
    }
  }, [index, formData.familyMembers]);


  const handleAddFamilyMember = () => {
    console.log('mobile:', authState.MobileNumber);
    console.log('members:', NumberOfMembers);

    if (!Relation || !FirstName || !age || !gender) {
      setMessage('Relation, FirstName, Age, Gender fields are required.');
      setIsError(true);
      return;
    }

    if (formData.familyMembers && formData.familyMembers.length >= NumberOfMembers) {
      setMessage('You have reached the limit of family members.');
      setIsError(true);
      return;
    }

    const newFamilyMember = {
      Relation,
      FirstName,
      LastName,
      age,
      DOB,
      gender,
      occupation,
      Income,
      DOB: DOB ? DOB.toISOString().split('T')[0] : null, // Format the date as YYYY-MM-DD
    };

    let updatedFamilyMembers;
    if (index !== undefined && formData.familyMembers && formData.familyMembers[index]) {
      updatedFamilyMembers = formData.familyMembers.map((member, i) =>
        i === index ? newFamilyMember : member
      );
    } else {
      updatedFamilyMembers = [...(formData.familyMembers || []), newFamilyMember];
    }

    // updateFormData({
    //   familyMembers: [...(formData.familyMembers || []), newFamilyMember],
    // });

    updateFormData({
      familyMembers: updatedFamilyMembers,
    });


    setRelation('');
    setFirstName('');
    setLastName('');
    setAge('');
    setGender('');
    setOccupation('');
    setIncome('');
    setDob('');
    setMessage('Family member added successfully.');
    setIsError(false);
  };

  const handleNext = () => {
    console.log('familyMembers:', formData.familyMembers);
    if (source === 'Home') {
      console.log('Navigating to Family');
      navigation.navigate('FamilyData', { NumberOfMembers });
    } else if (source === 'AllDetails') {
      console.log('Navigating to AllDetails');
      navigation.navigate('AllDetails', { source: 'AllDetails' });
    } else {
      console.log('Source is not recognized');
    }
  };

  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDatePicker(Platform.OS === 'ios');
    setDob(currentDate);
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

      <Text style={AppStyles.label}>First Name *</Text>
      <TextInput
        style={AppStyles.input}
        placeholder="Enter Name"
        value={FirstName}
        onChangeText={setFirstName}
      />

      <Text style={AppStyles.label}>Last Name *</Text>
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
        selectedValue={Income}
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
        <Text style={[AppStyles.message, { color: isError ? 'red' : 'green' }]}>
          {message}
        </Text>
      )}
    </View>
  );
};

export default FamilyMember;