import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const FamilyMember = () => {
  const [ownerID, setOwnerID] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [occupation, setOccupation] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const navigation = useNavigation(); 
  const handleAddFamilyMember = async () => {
    if (!ownerID) {
      setMessage('OwnerID is required to add a family member.');
      setIsError(true);
      return;
    }

    const familyMemberData = {
      familyMember: {
        ownerID,
        name,
        age,
        gender,
        occupation,
        createdBy
      },
      
    };

    try {
      const response = await fetch('http://192.168.29.56:3000/auth/family', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(familyMemberData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Family member added successfully');
        setIsError(false);
         navigation.navigate('Property');
      } else {
        setMessage(data.message || 'Failed to add family member');
        setIsError(true);
      }
    } catch (err) {
      setMessage('Error: ' + err.message);
      setIsError(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Family Member</Text>
      <TextInput
        style={styles.input}
        placeholder="OwnerID"
        value={ownerID}
        onChangeText={setOwnerID}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Gender"
        value={gender}
        onChangeText={setGender}
      />
      <TextInput
        style={styles.input}
        placeholder="Occupation"
        value={occupation}
        onChangeText={setOccupation}
      />
      <TextInput
        style={styles.input}
        placeholder="Created By"
        value={createdBy}
        onChangeText={setCreatedBy}
      />
      <Button title="Add Family Member" onPress={handleAddFamilyMember} />
      {message && (
        <Text style={[styles.message, { color: isError ? 'red' : 'green' }]}>
          {message}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8
  },
  message: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16
  }
});

export default FamilyMember;
