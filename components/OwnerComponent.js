import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const PropertyComponent = () => {
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
               // throw new Error("Failed to submit owner details."+ response.message + response.status );
            }
        } catch (error) {
            Alert.alert("Validation Error", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>First Name *</Text>
            <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />

            <Text style={styles.label}>Middle Name</Text>
            <TextInput style={styles.input} value={middleName} onChangeText={setMiddleName} />

            <Text style={styles.label}>Last Name *</Text>
            <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />

            <Text style={styles.label}>Mobile Number *</Text>
            <TextInput style={styles.input} value={mobileNumber} onChangeText={setMobileNumber} keyboardType="phone-pad" />

            <Text style={styles.label}>Occupation</Text>
            <TextInput style={styles.input} value={occupation} onChangeText={setOccupation} />

            <Text style={styles.label}>Age *</Text>
            <TextInput style={styles.input} value={age} onChangeText={setAge} keyboardType="numeric" />

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
            <TextInput style={styles.input} value={income} onChangeText={setIncome} keyboardType="numeric" />

            <Text style={styles.label}>Religion</Text>
            <TextInput style={styles.input} value={religion} onChangeText={setReligion} />

            <Text style={styles.label}>Category</Text>
            <TextInput style={styles.input} value={category} onChangeText={setCategory} />

            <Text style={styles.label}>Created By *</Text>
            <TextInput style={styles.input} value={createdBy} onChangeText={setCreatedBy} />

            <Button title="Save and Next" onPress={validateAndSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        marginVertical: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        fontSize: 16,
    },
    picker: {
        height: 50,
        width: '100%',
    },
});

export default PropertyComponent;