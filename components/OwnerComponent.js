import React, { useState, useContext, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import AppStyles from '../styles/AppStyles';
import Config from 'react-native-config';
import { FormDataContext } from '../contexts/FormDataContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet } from 'react-native';

const OwnerComponent = () => {
  const { authState } = useContext(AuthContext);
  const { formData, updateFormData } = useContext(FormDataContext);
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [FatherName, setFatherName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [occupation, setOccupation] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [income, setIncome] = useState('');
  const [religion, setReligion] = useState('');
  const [category, setCategory] = useState('');
  const CreatedBy = authState.user;
  const token = authState.token;
  const [Email, setEmail] = useState('');
  const [PanNumber, setPanNumber] = useState('');
  const [AdharNumber, setAdharNumber] = useState('');
  const [NumberOfMembers, setNumberOfMembers] = useState('');
  const [DOB, setDob] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const route = useRoute();
  const source = route.params?.source; // Get the source parameter
  const RedStar = () => <Text style={{ color: 'red' }}>*</Text>;

  const navigation = useNavigation();
  const API_ENDPOINT = `${Config.API_URL}/auth/owner`;

  console.log('token:', authState.token);

  useEffect(() => {
    if (source === 'AllDetails' && formData.ownerDetails) {
      const {
        firstName,
        middleName,
        lastName,
        FatherName,
        mobileNumber,
        occupation,
        age,
        DOB,
        gender,
        income,
        religion,
        category,
        Email,
        PanNumber,
        AdharNumber,
        NumberOfMembers,
      } = formData.ownerDetails;

      setFirstName(firstName || '');
      setMiddleName(middleName || '');
      setLastName(lastName || '');
      setFatherName(FatherName || '');
      setMobileNumber(mobileNumber || '');
      setOccupation(occupation || '');
      setAge(age || '');
      setDob(DOB ? new Date(DOB) : null);
      setGender(gender || '');
      setIncome(income || '');
      setReligion(religion || '');
      setCategory(category || '');
      setEmail(Email || '');
      setPanNumber(PanNumber || '');
      setAdharNumber(AdharNumber || '');
      setNumberOfMembers(NumberOfMembers || '');
    }
  }, [source, formData.ownerDetails]);

  const checkMobileNumber = async (mobileNumber) => {
    try {
      const response = await axios.post(`${Config.API_URL}/auth/check`, {
        mobileNumber,
      });
      if (response.data.exists) {
        Alert.alert('Error', 'This mobile number is already present. Please change the number.');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error checking mobile number:', error);
      Alert.alert('Error', 'Failed to check mobile number. Please try again.');
      return true;
    }
  };

  const handleMobileNumberChange = (number) => {
    setMobileNumber(number);
    if (number.length === 10) {
      checkMobileNumber(number);
    }
  };

  const handleNext = async () => {
    console.log('handleNext called');
    console.log('source:', source);

    if (!firstName) {
      Alert.alert('Error', 'First Name is required.');
      return;
    }
    if (!lastName) {
      Alert.alert('Error', 'Last Name is required.');
      return;
    }
    if (!mobileNumber) {
      Alert.alert('Error', 'Mobile Number is required.');
      return;
    }
    if (!CreatedBy) {
      Alert.alert('Error', 'Created By is required.');
      return;
    }
    if (!FatherName) {
      Alert.alert('Error', 'Father Name is required.');
      return;
    }
    if (!age) {
      Alert.alert('Error', 'Age is required.');
      return;
    }
    if (!gender) {
      Alert.alert('Error', 'Gender is required.');
      return;
    }
    if (!religion) {
      Alert.alert('Error', 'Religion is required.');
      return;
    }
    if (!category) {
      Alert.alert('Error', 'Category is required.');
      return;
    }

    if (!['M', 'F', 'O'].includes(gender)) {
      Alert.alert('Error', "Gender must be 'M', 'F', or 'O'.");
      return;
    }

    const emailRegex = /^[^\s@]+@gmail\.com$/;
    if (Email.trim() !== '' && !emailRegex.test(Email)) {
      Alert.alert('Error', 'Invalid email format. Email must end with gmail.com.');
      return;
    }
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobileNumber)) {
      Alert.alert('Invalid Mobile number', 'It must be 10 digits.');
      return;
    }
    // const aadharRegex = /^\d{12}$/;
    // if (!aadharRegex.test(AdharNumber)) {
    //   Alert.alert('Invalid Aadhar number', 'It must be 12 digits.');
    //   return;
    // }

    const mobileExists = await checkMobileNumber(mobileNumber);
    if (mobileExists) {
      return; // Stop execution if the mobile number exists
    }
// Empty all the familyMembers, propertyDetails, specialConsideration before navigation
updateFormData({
  ...formData,
  familyMembers: [],
  propertyDetails: {},
  specialConsideration: {},
});


    const ownerDetails = {
      firstName,
      middleName,
      lastName,
      FatherName,
      mobileNumber,
      occupation,
      age,
      DOB,
      gender,
      income,
      religion,
      category,
      CreatedBy,
      Email,
      PanNumber,
      AdharNumber,
      NumberOfMembers,
      DOB: DOB ? DOB.toISOString().split('T')[0] : null, // Format the date as YYYY-MM-DD
    };

    updateFormData({
      ...formData,
      ownerDetails,
      familyMembers: [],
      propertyDetails: {},
      specialConsideration: {},
    });
  
    console.log('Temporary saved data:', ownerDetails);
    console.log('Temporary saved data:', ownerDetails.NumberOfMembers);

    // Navigate based on NumberOfMembers
    if (!NumberOfMembers || NumberOfMembers === '0' || NumberOfMembers === 0) {
      // If 0 or null family members, go to FamilyData
      navigation.navigate('FamilyData', { NumberOfMembers, source: 'Home' });
  } else if (NumberOfMembers && NumberOfMembers !== '0') {
    // If any family members, go to Family
    navigation.navigate('Family', { NumberOfMembers, source: 'Home' });
  } else if (source === 'AllDetails') {
    navigation.navigate('AllDetails');
  } else {
    console.log('Source is not recognized');
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
      <Text style={AppStyles.heading}>Owner Details</Text>

      <Text style={AppStyles.label}>First Name <RedStar /></Text>
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

      <Text style={AppStyles.label}>Last Name <RedStar /></Text>
      <TextInput
        style={AppStyles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Enter last name"
      />

      <Text style={AppStyles.label}>Father Name <RedStar /></Text>
      <TextInput
        style={AppStyles.input}
        value={FatherName}
        onChangeText={setFatherName}
        placeholder="Enter FatherName"
      />

      <Text style={AppStyles.label}>Mobile Number <RedStar /></Text>
      <TextInput
        style={AppStyles.input}
        value={mobileNumber}
        onChangeText={handleMobileNumberChange}
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

      <Text style={AppStyles.label}>Age <RedStar /></Text>
      <Picker
        selectedValue={age}
        style={AppStyles.picker}
        onValueChange={itemValue => setAge(itemValue)}>
        <Picker.Item label="Select age" value="" />
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
      <Text style={AppStyles.label}>Date of Birth</Text>
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

      <Text style={AppStyles.label}>Gender <RedStar /></Text>
      <Picker
        selectedValue={gender}
        onValueChange={itemValue => setGender(itemValue)}
        style={AppStyles.picker}>
        <Picker.Item label="Select Gender" value="" />
        <Picker.Item label="Male" value="M" />
        <Picker.Item label="Female" value="F" />
        <Picker.Item label="Other" value="O" />
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
      <Text style={AppStyles.label}>Religion <RedStar /></Text>
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

      <Text style={AppStyles.label}>Category <RedStar /></Text>
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

      <Text style={AppStyles.label}>Number of Family Members</Text>
      <TextInput
        style={AppStyles.input}
        value={NumberOfMembers}
        onChangeText={setNumberOfMembers}
        keyboardType="numeric"
        placeholder="Enter Number Of Members"
      />

      <Text style={AppStyles.label}>Email</Text>
      <TextInput
        style={AppStyles.input}
        value={Email}
        onChangeText={setEmail}
        placeholder="Enter Email"
      />

      <Text style={AppStyles.label}>PanNumber</Text>
      <TextInput
        style={AppStyles.input}
        value={PanNumber}
        onChangeText={(text) => setPanNumber(text.toUpperCase())}
        placeholder="Enter PanNumber"
      />
      <Text style={AppStyles.label}>Adhar Number</Text>
      <TextInput
        style={AppStyles.input}
        value={AdharNumber}
        onChangeText={setAdharNumber}
        keyboardType="numeric"
        placeholder="Enter AdharNumber"
      />

      <TouchableOpacity style={AppStyles.button} onPress={handleNext}>
        <Text style={AppStyles.buttonText}>Save and Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default OwnerComponent;