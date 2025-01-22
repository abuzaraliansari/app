import React, { useState, useContext, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AppStyles from '../styles/AppStyles';
import { AuthContext } from '../contexts/AuthContext';
import Config from 'react-native-config';

const SpecialConsiderationComponent = () => {
  const { authState } = useContext(AuthContext);
  const navigation = useNavigation();
  const route = useRoute();
  const { consideration } = route.params;

  const [considerationType, setConsiderationType] = useState(consideration.ConsiderationType || 'None');
  const [description, setDescription] = useState(consideration.Description || '');
  const token = authState.token;
  const ModifiedBy = authState.user;
  const DateModified = new Date().toISOString();
  const API_ENDPOINT = `${Config.API_URL}/auth/updateSpecial`;

  const handleUpdate = async () => {
    if (!considerationType) {
      Alert.alert('Error', 'Please fill in the special consideration.');
      return;
    }

    const updatedConsideration = {
      ConsiderationID: consideration.ConsiderationID,
      ConsiderationType: considerationType,
      Description: description,
      ModifiedBy: ModifiedBy,
      DateModified: DateModified,
    };

    try {
      const response = await axios.post(API_ENDPOINT, updatedConsideration, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        Alert.alert(
          'Success',
          'Special consideration updated successfully.',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      } else {
        Alert.alert('Error', 'Failed to update special consideration.');
      }
    } catch (error) {
      console.error('Error updating special consideration:', error);
      Alert.alert('Error', 'Failed to update special consideration.');
    }
  };

  return (
    <ScrollView contentContainerStyle={AppStyles.container}>
      <Text style={AppStyles.heading}>Special Consideration Details</Text>

      <Text style={AppStyles.label}>Consideration Type *</Text>
      <View style={AppStyles.pickerContainer}>
        <Picker
          selectedValue={considerationType}
          onValueChange={itemValue => setConsiderationType(itemValue)}
          style={AppStyles.picker}
        >
          <Picker.Item label="Select Consideration Type" value="None" />
          <Picker.Item label="Senior Citizen" value="Senior Citizen" />
          <Picker.Item label="Freedom Fighter" value="Freedom Fighter" />
          <Picker.Item label="Armed Forces" value="Armed Forces" />
          <Picker.Item label="Handicapped" value="Handicapped" />
          <Picker.Item label="Widow" value="Widow" />
          <Picker.Item label="None" value="None" />
        </Picker>
      </View>

      <Text style={AppStyles.label}>Description</Text>
      <TextInput
        style={AppStyles.input}
        placeholder="Enter Description"
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity
        style={AppStyles.button}
        onPress={handleUpdate}
      >
        <Text style={AppStyles.buttonText}>Save and Update</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SpecialConsiderationComponent;