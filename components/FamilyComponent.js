import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthContext';
import { Picker } from '@react-native-picker/picker';
import AppStyles from '../styles/AppStyles';
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
  const RedStar = () => <Text style={{ color: 'red' }}>*</Text>;

  const navigation = useNavigation();

  const { NumberOfMembers, index } = route.params || {};
  const isEdit = source === 'edite';

  // Set member number for heading
  const memberNumber =
    isEdit && index !== undefined
      ? Number(index) + 1
      : (formData.familyMembers?.length || 0) + 1;

  useEffect(() => {
    // Only set fields if editing and index is valid
    if (
      isEdit &&
      index !== undefined &&
      formData.familyMembers &&
      formData.familyMembers[index]
    ) {
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
  }, [isEdit, index, formData.familyMembers]);

  const handleSaveAndNext = () => {
    if (!Relation) {
      setMessage('Relation is required.');
      setIsError(true);
      return;
    }
    if (!FirstName) {
      setMessage('First Name is required.');
      setIsError(true);
      return;
    }
    if (!age) {
      setMessage('Age is required.');
      setIsError(true);
      return;
    }
    if (!gender) {
      setMessage('Gender is required.');
      setIsError(true);
      return;
    }

    // Only block adding new members, not editing
    if (
      (!isEdit && (index === undefined || index === null)) &&
      formData.familyMembers &&
      formData.familyMembers.length >= NumberOfMembers
    ) {
      setMessage('You have reached the limit of family members.');
      setIsError(true);
      return;
    }

    const newFamilyMember = {
      Relation,
      FirstName,
      LastName,
      age,
      DOB: DOB ? DOB.toISOString().split('T')[0] : null,
      gender,
      occupation,
      Income,
    };

    let updatedFamilyMembers;
    if (isEdit && index !== undefined && formData.familyMembers && formData.familyMembers[index]) {
      updatedFamilyMembers = formData.familyMembers.map((member, i) =>
        i === index ? newFamilyMember : member
      );
    } else {
      updatedFamilyMembers = [...(formData.familyMembers || []), newFamilyMember];
    }

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

    // If editing, after save, go to FamilyData
    if (isEdit) {
      navigation.replace('FamilyData', { NumberOfMembers, source: 'Home' });
      return;
    }

    // If adding new, check if limit reached
    if (
      (index === undefined || index === null) &&
      updatedFamilyMembers.length >= NumberOfMembers
    ) {
      navigation.replace('FamilyData', { NumberOfMembers, source: 'Home' });
    } else if (!isEdit) {
      // If not edit and not limit, stay and allow next member entry
      setMessage('Family member added. Please add next member.');
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

  // Only show "No family members to add" if not editing and NumberOfMembers is 0
  if (
    !isEdit &&
    (!NumberOfMembers || NumberOfMembers === 0 || NumberOfMembers === '0')
  ) {
    return (
      <View style={AppStyles.container}>
        <Text>No family members to add.</Text>
      </View>
    );
  }

  return (
    <View style={AppStyles.container}>
      <Text style={AppStyles.header}>
        {isEdit
          ? `Edit Family Member ${memberNumber}`
          : `Family Member ${memberNumber}`}
      </Text>

      <Text style={AppStyles.label}>Relation <RedStar /></Text>
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

      <Text style={AppStyles.label}>First Name <RedStar /></Text>
      <TextInput
        style={AppStyles.input}
        placeholder="Enter Name"
        value={FirstName}
        onChangeText={setFirstName}
      />

      <Text style={AppStyles.label}>Last Name <RedStar /></Text>
      <TextInput
        style={AppStyles.input}
        placeholder="Enter Last Name"
        value={LastName}
        onChangeText={setLastName}
      />

      <Text style={AppStyles.label}>Age <RedStar /></Text>
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
        <TouchableOpacity
          style={AppStyles.button}
          onPress={handleSaveAndNext}>
          <Text style={AppStyles.buttonText}>Save Member</Text>
        </TouchableOpacity>
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