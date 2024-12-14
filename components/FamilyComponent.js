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

const FamilyMember = () => {
  const { authState } = useContext(AuthContext);
  const ownerID = authState.ownerID;
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [occupation, setOccupation] = useState('');
  const [createdBy, setCreatedBy] = useState('');
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

    navigation.navigate('Property', { ownerID });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Family Member</Text>

      <Text style={styles.label}>Owner ID  {authState.ownerID}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter OwnerID"
        value={ownerID}
       
        keyboardType="numeric"
      />

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
      />

<Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

<Text style={styles.label}>Gender</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Gender"
        value={gender}
        onChangeText={setGender}
      />

<Text style={styles.label}>Occupation</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Occupation"
        value={occupation}
        onChangeText={setOccupation}
      />

<Text style={styles.label}>Created By</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Created By"
        value={createdBy}
        onChangeText={setCreatedBy}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#1E90FF" />
      ) : (
        <>
          <TouchableOpacity style={styles.button} onPress={handleSaveFamilyMember}>
            <Text style={styles.buttonText}>Save and Add Member</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.nextButton]} onPress={handleAddFamilyMember}>
            <Text style={styles.buttonText}>Save and Next</Text>
          </TouchableOpacity>
        </>
      )}

      {message && (
        <Text style={[styles.message, { color: isError ? 'red' : 'green' }]}>{message}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f4f7',
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#555',
},
  input: {
    borderWidth: 3,
    borderColor: '#ddd',
    borderRadius: 15,
    padding: 10,
    fontSize: 20,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  nextButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  message: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
  },
});

export default FamilyMember;
