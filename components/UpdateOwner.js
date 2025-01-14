import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
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
  console.log(owner.OwnerID);
  const OwnerID = owner.OwnerID;
  const [firstName, setFirstName] = useState(owner.FirstName || '');
  const [middleName, setMiddleName] = useState(owner.MiddleName || '');
  const [lastName, setLastName] = useState(owner.LastName || '');
  const [FatherName, setFatherName] = useState(owner.FatherName || '');
  const [mobileNumber, setMobileNumber] = useState(owner.MobileNumber || '');
  const [occupation, setOccupation] = useState(owner.Occupation || '');
  const [age, setAge] = useState(owner.Age || '');
  const [DOB, setDob] = useState(owner.DOB ? new Date(owner.DOB) : null);
  const [gender, setGender] = useState(owner.Gender || '');
  const [income, setIncome] = useState(owner.Income || '');
  const [religion, setReligion] = useState(owner.Religion || '');
  const [category, setCategory] = useState(owner.Category || '');
  const [Email, setEmail] = useState(owner.Email || '');
  const [PanNumber, setPanNumber] = useState(owner.PanNumber || '');
  const [AdharNumber, setAdharNumber] = useState(owner.AdharNumber || '');
  const [NumberOfMembers, setNumberOfMembers] = useState(owner.NumberOfMembers || '');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const ModifiedBy = authState.user;
  const DateModified = new Date().toISOString();

  const handleSubmit = async () => {
    if (!firstName || !lastName || !mobileNumber || !ModifiedBy || !FatherName) {
      Alert.alert('Error', 'First Name, Last Name, Mobile Number, Modified By, and Father Name are required fields.');
      return;
    }

    if (!age || !gender || !religion || !category || !AdharNumber) {
      Alert.alert('Error', 'Age, Gender, Religion, Category, and Aadhar Number are required fields.');
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

    const aadharRegex = /^\d{12}$/;
    if (!aadharRegex.test(AdharNumber)) {
      Alert.alert('Invalid Aadhar number', 'It must be 12 digits.');
      return;
    }
console.log(owner.OwnerID);
    const ownerDetails = {
      OwnerID: owner.OwnerID,
      FirstName: firstName,
      MiddleName: middleName,
      LastName: lastName,
      FatherName: FatherName,
      MobileNumber: mobileNumber,
      Occupation: occupation,
      Age: age,
      DOB: DOB ? DOB.toISOString().split('T')[0] : null,
      Gender: gender,
      Income: income,
      Religion: religion,
      Category: category,
      AdharNumber: AdharNumber,
      PanNumber: PanNumber,
      Email: Email,
      NumberOfMembers: NumberOfMembers,
      ModifiedBy: ModifiedBy,
      DateModified: DateModified,
    };

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

  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || DOB;
    setShowDatePicker(Platform.OS === 'ios');
    setDob(currentDate);
  };

  return (
    <ScrollView style={AppStyles.container}>
      <View style={AppStyles.content}>
        <Text style={AppStyles.header}>Update Owner Info {OwnerID}</Text>

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

        <Text style={AppStyles.label}>Father Name *</Text>
        <TextInput
          style={AppStyles.input}
          value={FatherName}
          onChangeText={setFatherName}
          placeholder="Enter Father Name"
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

        <Text style={AppStyles.label}>Religion *</Text>
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

        <Text style={AppStyles.label}>Category *</Text>
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

        <Text style={AppStyles.label}>Adhar Number *</Text>
        <TextInput
          style={AppStyles.input}
          value={AdharNumber}
          onChangeText={setAdharNumber}
          keyboardType="numeric"
          placeholder="Enter AdharNumber"
        />

        <TouchableOpacity style={AppStyles.button} onPress={handleSubmit}>
          <Text style={AppStyles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UpdateOwnerInfo;