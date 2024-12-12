import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Alert,
    ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const SpecialConsiderationComponent = () => {
    const navigation = useNavigation();
    const [ownerID, setOwnerID] = useState('');
    const [considerationType, setConsiderationType] = useState('');
    const [description, setDescription] = useState('');
    const [createdBy, setCreatedBy] = useState('Admin');
    const [modifiedBy, setModifiedBy] = useState('Admin');

    const validConsiderationTypes = [
        'Senior Citizen',
        'Freedom Fighter',
        'Armed Forces',
        'Handicapped',
        'Widow'
    ];

    const validateAndSubmit = async () => {
        try {
            // Validate form data
            if (!ownerID || !considerationType || !description) {
                throw new Error('Owner ID, Consideration Type, and Description are required.');
            }
    
            // Check if ownerID is a valid number
            if (isNaN(ownerID)) {
                throw new Error('Owner ID must be a valid number.');
            }
    
            // Check if considerationType is valid
            if (!validConsiderationTypes.includes(considerationType)) {
                throw new Error('Invalid consideration type selected.');
            }
    
            const specialConsideration = {
                ownerID: parseInt(ownerID), // Ensure ownerID is treated as an integer
                considerationType,
                description,
                createdBy,
                modifiedBy,
            };
    
            // Send the POST request to the backend
            const response = await fetch('http://192.168.29.56:3000/auth/SpecialConsideration', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ SpecialConsideration: specialConsideration }),
            });
    
            const result = await response.json();
    
            if (response.ok) {
                Alert.alert('Success', 'Special consideration submitted successfully.');
                navigation.navigate('Property'); // or another screen as required
            } else {
                throw new Error(result.error || 'Submission failed.');
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Owner ID *</Text>
            <TextInput
                style={styles.input}
                value={ownerID}
                onChangeText={setOwnerID}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Consideration Type *</Text>
            <Picker
                selectedValue={considerationType}
                onValueChange={(itemValue) => setConsiderationType(itemValue)}
                style={styles.input}
            >
                <Picker.Item label="Select consideration type" value="" />
                {validConsiderationTypes.map((type) => (
                    <Picker.Item key={type} label={type} value={type} />
                ))}
            </Picker>

            <Text style={styles.label}>Description *</Text>
            <TextInput
                style={[styles.input, styles.descriptionInput]}
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
            />

            <Text style={styles.label}>Created By *</Text>
            <TextInput
                style={styles.input}
                value={createdBy}
                onChangeText={setCreatedBy}
            />

            <Text style={styles.label}>Modified By *</Text>
            <TextInput
                style={styles.input}
                value={modifiedBy}
                onChangeText={setModifiedBy}
            />

            <View style={styles.buttonContainer}>
                <Button title="Save and Submit" onPress={validateAndSubmit} />
            </View>
        </ScrollView>
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
        marginBottom: 10,
    },
    descriptionInput: {
        height: 100,
    },
    buttonContainer: {
        marginVertical: 20,
    },
});

export default SpecialConsiderationComponent;
