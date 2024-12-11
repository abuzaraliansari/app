import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    View,
    Text,
    TextInput,
    Button,
    Alert,
    StyleSheet,
} from 'react-native';
import axios from 'axios';

const Family = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [occupation, setOccupation] = useState('');
    const [createdBy, setCreatedBy] = useState('');

    const validateInputs = () => {
        if (!name || !createdBy) {
            throw new Error("Name and Created By are required fields.");
        }

        if (!['M', 'F', 'O'].includes(gender)) {
            throw new Error("Gender must be 'M', 'F', or 'O'.");
        }

        if (age < 0 || isNaN(age)) {
            throw new Error("Age must be a positive number.");
        }
    };

    const handleSubmit = async () => {
        try {
            validateInputs();

            const payload = {
                name,
                age: Number(age),
                gender,
                occupation,
                createdBy,
            };

            const response = await axios.post('http://172.16.2.7:3000/auth/family', payload);

            if (response.data.success) {
                Alert.alert('Success', 'Family member added successfully!');
            } else {
                Alert.alert('Error', response.data.message);
            }
        } catch (error) {
            Alert.alert('Validation Error', error.message || 'Submission failed. Please try again.');
            console.error(error);
        }
    };

    return (
        <View >
            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter name"
            />

            <Text style={styles.label}>Age</Text>
            <TextInput
                style={styles.input}
                value={age}
                onChangeText={setAge}
                placeholder="Enter age"
                keyboardType="numeric"
            />

            <Text style={styles.label}>Gender (M/F/O)</Text>
            <TextInput
                style={styles.input}
                value={gender}
                onChangeText={setGender}
                placeholder="Enter gender"
            />

            <Text style={styles.label}>Occupation</Text>
            <TextInput
                style={styles.input}
                value={occupation}
                onChangeText={setOccupation}
                placeholder="Enter occupation"
            />

            <Text style={styles.label}>Created By</Text>
            <TextInput
                style={styles.input}
                value={createdBy}
                onChangeText={setCreatedBy}
                placeholder="Enter your name"
            />

            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
});

export default Family;
