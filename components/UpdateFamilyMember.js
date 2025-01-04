import React, { useState, useContext } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthContext';
import { Picker } from '@react-native-picker/picker';
import AppStyles from '../styles/AppStyles';
import Config from 'react-native-config';

const UpdateFamilyMember = () => {
  const navigation = useNavigation();
  const { userToken } = useContext(AuthContext);

  const [familyMemberDetails, setFamilyMemberDetails] = useState({
    MemberID: '',
    firstName: '',
    lastName: '',
    gender: '',
    age: '',
    relationship: '',
    occupation: '',
    modifiedBy: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setFamilyMemberDetails((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!familyMemberDetails.MemberID) {
      Alert.alert('Error', 'MemberID is required to update family member details');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${Config.API_BASE_URL}/api/updateFamilyMember`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ familyMemberDetails }),
      });

      const data = await response.json();
      setLoading(false);

      if (data.success) {
        Alert.alert('Success', data.message, [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', error.message || 'An error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Family Member Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Member ID"
        keyboardType="numeric"
        value={familyMemberDetails.MemberID}
        onChangeText={(text) => handleChange('MemberID', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={familyMemberDetails.firstName}
        onChangeText={(text) => handleChange('firstName', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={familyMemberDetails.lastName}
        onChangeText={(text) => handleChange('lastName', text)}
      />
      <Picker
        selectedValue={familyMemberDetails.gender}
        onValueChange={(value) => handleChange('gender', value)}
        style={styles.picker}
      >
        <Picker.Item label="Select Gender" value="" />
        <Picker.Item label="Male" value="M" />
        <Picker.Item label="Female" value="F" />
        <Picker.Item label="Other" value="O" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Age"
        keyboardType="numeric"
        value={familyMemberDetails.age}
        onChangeText={(text) => handleChange('age', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Relationship"
        value={familyMemberDetails.relationship}
        onChangeText={(text) => handleChange('relationship', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Occupation"
        value={familyMemberDetails.occupation}
        onChangeText={(text) => handleChange('occupation', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Modified By"
        value={familyMemberDetails.modifiedBy}
        onChangeText={(text) => handleChange('modifiedBy', text)}
      />
      {loading ? (
        <ActivityIndicator size="large" color={AppStyles.colors.primary} />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: AppStyles.colors.background,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: AppStyles.colors.primary,
  },
  input: {
    borderWidth: 1,
    borderColor: AppStyles.colors.border,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: AppStyles.colors.inputBackground,
  },
  picker: {
    borderWidth: 1,
    borderColor: AppStyles.colors.border,
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: AppStyles.colors.buttonBackground,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: AppStyles.colors.buttonText,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UpdateFamilyMember;
