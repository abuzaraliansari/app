import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const OwnerComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [occupation, setOccupation] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [income, setIncome] = useState('');
    const [religion, setReligion] = useState('');
    const [category, setCategory] = useState('');
    const [createdBy, setCreatedBy] = useState('');
    const navigation = useNavigation();

    const validateAndSubmit = async () => {
        try {
            // Validation
            if (!firstName || !lastName || !mobileNumber || !createdBy) {
                throw new Error("First Name, Last Name, Mobile Number, and Created By are required fields.");
            }

            if (!['M', 'F', 'O'].includes(gender)) {
                throw new Error("Gender must be 'M', 'F', or 'O'.");
            }

            if (age <= 18) {
                throw new Error("Age must be greater than 18.");
            }

            if (isNaN(income) || income < 0) {
                throw new Error("Income must be a positive number.");
            }

            const ownerDetails = {
                firstName,
                middleName,
                lastName,
                mobileNumber,
                occupation,
                age: parseInt(age, 10),
                gender,
                income: parseFloat(income),
                religion,
                category,
                createdBy,
            };

            // Simulate API call with axios
            const response = await axios.post('http://192.168.29.56:3000/auth/owner', { ownerDetails });

            if (response.status === 201) {
                Alert.alert("Success", "Owner details submitted successfully.");
                navigation.navigate('Family', { ownerID: response.data.ownerID }); // Adjust the navigation target if needed
            } else {
                Alert.alert("Success", response.status+ response.data);
            }
        } catch (error) {
            Alert.alert("Validation Error", error.message);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Owner Details</Text>

            <Text style={styles.label}>First Name *</Text>
            <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} placeholder="Enter first name" />

            <Text style={styles.label}>Middle Name</Text>
            <TextInput style={styles.input} value={middleName} onChangeText={setMiddleName} placeholder="Enter middle name" />

            <Text style={styles.label}>Last Name *</Text>
            <TextInput style={styles.input} value={lastName} onChangeText={setLastName} placeholder="Enter last name" />

            <Text style={styles.label}>Mobile Number *</Text>
            <TextInput style={styles.input} value={mobileNumber} onChangeText={setMobileNumber} keyboardType="phone-pad" placeholder="Enter mobile number" />

            <Text style={styles.label}>Occupation</Text>
            <TextInput style={styles.input} value={occupation} onChangeText={setOccupation} placeholder="Enter occupation" />

            <Text style={styles.label}>Age *</Text>
            <TextInput style={styles.input} value={age} onChangeText={setAge} keyboardType="numeric" placeholder="Enter age" />

            <Text style={styles.label}>Gender *</Text>
            <Picker
                selectedValue={gender}
                onValueChange={(itemValue) => setGender(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Select Gender" value="" />
                <Picker.Item label="Male" value="M" />
                <Picker.Item label="Female" value="F" />
                <Picker.Item label="Other" value="O" />
            </Picker>

            <Text style={styles.label}>Income *</Text>
            <TextInput style={styles.input} value={income} onChangeText={setIncome} keyboardType="numeric" placeholder="Enter income" />

            <Text style={styles.label}>Religion</Text>
            <TextInput style={styles.input} value={religion} onChangeText={setReligion} placeholder="Enter religion" />

            <Text style={styles.label}>Category</Text>
            <TextInput style={styles.input} value={category} onChangeText={setCategory} placeholder="Enter category" />

            <Text style={styles.label}>Created By *</Text>
            <TextInput style={styles.input} value={createdBy} onChangeText={setCreatedBy} placeholder="Enter created By" />

            <TouchableOpacity style={styles.button} onPress={validateAndSubmit}>
                <Text style={styles.buttonText}>Save and Next</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f0f4f7',
    },
    heading: {
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
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 15,
        padding: 10,
        fontSize: 20,
        backgroundColor: '#fff',
        marginBottom: 15,
    },
    picker: {
        borderWidth: 3,
        borderColor: '#ddd',
        borderRadius: 15,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
        fontSize: 30, 
    },
   
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default OwnerComponent;
