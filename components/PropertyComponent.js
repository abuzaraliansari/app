import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform } from 'react-native';


const PropertyDetailsComponent = () => {
    const [ownerID, setOwnerID] = useState('');
    const [propertyMode, setPropertyMode] = useState('');
    const [propertyAge, setPropertyAge] = useState('');
    const [roomCount, setRoomCount] = useState('');
    const [floorCount, setFloorCount] = useState('');
    const [shopCount, setShopCount] = useState('');
    const [tenantCount, setTenantCount] = useState('');
    const [waterHarvesting, setWaterHarvesting] = useState('');
    const [submersible, setSubmersible] = useState('');
    const [geoLocation, setGeoLocation] = useState('');
    const [moholla, setMoholla] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [galliNumber, setGalliNumber] = useState('');
    const [bankAccountNumber, setBankAccountNumber] = useState('');
    const [consent, setConsent] = useState('');
    const [createdBy, setCreatedBy] = useState('');
    const navigation = useNavigation();

    const validateAndSubmit = async () => {
        try {
            if (!propertyMode || !geoLocation || !createdBy) {
                throw new Error('Property Mode, GeoLocation, and Created By are required.');
            }
            if (!ownerID) {
                Alert.alert('Error', 'OwnerID is required to add a property.');
                return;
            }

            const propertyDetails = {
                ownerID,
                propertyMode,
                propertyAge: parseInt(propertyAge, 10) || 0,
                roomCount: parseInt(roomCount, 10) || 0,
                floorCount: parseInt(floorCount, 10) || 0,
                shopCount: parseInt(shopCount, 10) || 0,
                tenantCount: parseInt(tenantCount, 10) || 0,
                waterHarvesting: waterHarvesting === 'Yes',
                submersible: submersible === 'Yes',
                geoLocation,
                moholla,
                houseNumber,
                galliNumber,
                bankAccountNumber,
                consent: consent === 'Yes',
                createdBy,
            };

            const response = await fetch('http://192.168.29.56:3000/auth/PropertyDetails', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ PropertyDetails: propertyDetails }),
            });

            const result = await response.json();

            if (response.ok) {
                Alert.alert('Success', 'Property details submitted successfully.');
                navigation.navigate('SpecialConsideration');
            } else {
                throw new Error(result.error || 'Submission failed.');
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Property Details</Text>

            <Text style={styles.label}>OwnerID *</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter OwnerID"
                value={ownerID}
                onChangeText={setOwnerID}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Property Mode *</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={propertyMode}
                    onValueChange={(itemValue) => setPropertyMode(itemValue)}
                >
                    <Picker.Item label="Select Property Mode" value="" />
                    <Picker.Item label="Residential" value="Residential" />
                    <Picker.Item label="Commercial" value="Commercial" />
                </Picker>
            </View>

            <Text style={styles.label}>Property Age</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Property Age"
                value={propertyAge}
                onChangeText={setPropertyAge}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Room Count</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Room Count"
                value={roomCount}
                onChangeText={setRoomCount}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Floor Count</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Floor Count"
                value={floorCount}
                onChangeText={setFloorCount}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Shop Count</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Shop Count"
                value={shopCount}
                onChangeText={setShopCount}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Tenant Count</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Tenant Count"
                value={tenantCount}
                onChangeText={setTenantCount}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Water Harvesting</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={waterHarvesting}
                    onValueChange={(itemValue) => setWaterHarvesting(itemValue)}
                >
                    <Picker.Item label="Select Water Harvesting" value="" />
                    <Picker.Item label="Yes" value="Yes" />
                    <Picker.Item label="No" value="No" />
                </Picker>
            </View>

            <Text style={styles.label}>Submersible</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={submersible}
                    onValueChange={(itemValue) => setSubmersible(itemValue)}
                >
                    <Picker.Item label="Select Submersible" value="" />
                    <Picker.Item label="Yes" value="Yes" />
                    <Picker.Item label="No" value="No" />
                </Picker>
            </View>

            <Text style={styles.label}>GeoLocation *</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter GeoLocation"
                value={geoLocation}
                onChangeText={setGeoLocation}
            />

            <Text style={styles.label}>Moholla</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Moholla"
                value={moholla}
                onChangeText={setMoholla}
            />

            <Text style={styles.label}>House Number</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter House Number"
                value={houseNumber}
                onChangeText={setHouseNumber}
            />

            <Text style={styles.label}>Galli Number</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Galli Number"
                value={galliNumber}
                onChangeText={setGalliNumber}
            />

            <Text style={styles.label}>Bank Account Number</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Bank Account Number"
                value={bankAccountNumber}
                onChangeText={setBankAccountNumber}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Consent</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={consent}
                    onValueChange={(itemValue) => setConsent(itemValue)}
                >
                    <Picker.Item label="Select Consent" value="" />
                    <Picker.Item label="Yes" value="Yes" />
                    <Picker.Item label="No" value="No" />
                </Picker>
            </View>

            <Text style={styles.label}>Created By *</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Created By"
                value={createdBy}
                onChangeText={setCreatedBy}
            />

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
    pickerContainer: {
        borderWidth: 3,
        borderColor: '#ddd',
        borderRadius: 15,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 40,
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

export default PropertyDetailsComponent;
