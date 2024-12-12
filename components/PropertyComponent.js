import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    Alert,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const PropertyDetailsComponent = () => {
  
    const [ownerID, setOwnerID] = useState('');
    const [propertyMode, setPropertyMode] = useState('');
    const [propertyAge, setPropertyAge] = useState('');
    const [roomCount, setRoomCount] = useState('');
    const [floorCount, setFloorCount] = useState('');
    const [shopCount, setShopCount] = useState('');
    const [tenantCount, setTenantCount] = useState('');
    const [waterHarvesting, setWaterHarvesting] = useState(false);
    const [submersible, setSubmersible] = useState(false);
    const [geoLocation, setGeoLocation] = useState('');
    const [moholla, setMoholla] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [galliNumber, setGalliNumber] = useState('');
    const [bankAccountNumber, setBankAccountNumber] = useState('');
    const [consent, setConsent] = useState(false);
    const [createdBy, setCreatedBy] = useState('');
    const navigation = useNavigation(); 
    const validateAndSubmit = async () => {
        try {
            if (!propertyMode || !geoLocation || !createdBy) {
                throw new Error('Property Mode, GeoLocation, and Created By are required.');
            }
            if (!ownerID) {
                setMessage('OwnerID is required to add a family member.');
                setIsError(true);
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
                waterHarvesting,
                submersible,
                geoLocation,
                moholla,
                houseNumber,
                galliNumber,
                bankAccountNumber,
                consent,
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
            <TextInput
        style={styles.input}
        placeholder="OwnerID"
        value={ownerID}
        onChangeText={setOwnerID}
        keyboardType="numeric"
      />
            <Text style={styles.label}>Property Mode *</Text>
            <Picker
                selectedValue={propertyMode}
                style={styles.input}
                onValueChange={(itemValue) => setPropertyMode(itemValue)}
            >
                <Picker.Item label="Select Property Mode" value="" />
                <Picker.Item label="Residential" value="Residential" />
                <Picker.Item label="Commercial" value="Commercial" />
            </Picker>

            <Text style={styles.label}>Property Age</Text>
            <TextInput
                style={styles.input}
                value={propertyAge}
                onChangeText={setPropertyAge}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Room Count</Text>
            <TextInput
                style={styles.input}
                value={roomCount}
                onChangeText={setRoomCount}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Floor Count</Text>
            <TextInput
                style={styles.input}
                value={floorCount}
                onChangeText={setFloorCount}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Shop Count</Text>
            <TextInput
                style={styles.input}
                value={shopCount}
                onChangeText={setShopCount}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Tenant Count</Text>
            <TextInput
                style={styles.input}
                value={tenantCount}
                onChangeText={setTenantCount}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Water Harvesting</Text>
            <Picker
                selectedValue={waterHarvesting}
                style={styles.input}
                onValueChange={(value) => setWaterHarvesting(value)}
            >
                <Picker.Item label="No" value={false} />
                <Picker.Item label="Yes" value={true} />
            </Picker>

            <Text style={styles.label}>Submersible</Text>
            <Picker
                selectedValue={submersible}
                style={styles.input}
                onValueChange={(value) => setSubmersible(value)}
            >
                <Picker.Item label="No" value={false} />
                <Picker.Item label="Yes" value={true} />
            </Picker>

            <Text style={styles.label}>Geo Location *</Text>
            <TextInput
                style={styles.input}
                value={geoLocation}
                onChangeText={setGeoLocation}
            />

            <Text style={styles.label}>Moholla</Text>
            <TextInput
                style={styles.input}
                value={moholla}
                onChangeText={setMoholla}
            />

            <Text style={styles.label}>House Number</Text>
            <TextInput
                style={styles.input}
                value={houseNumber}
                onChangeText={setHouseNumber}
            />

            <Text style={styles.label}>Galli Number</Text>
            <TextInput
                style={styles.input}
                value={galliNumber}
                onChangeText={setGalliNumber}
            />

            <Text style={styles.label}>Bank Account Number</Text>
            <TextInput
                style={styles.input}
                value={bankAccountNumber}
                onChangeText={setBankAccountNumber}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Consent</Text>
            <Picker
                selectedValue={consent}
                style={styles.input}
                onValueChange={(value) => setConsent(value)}
            >
                <Picker.Item label="No" value={false} />
                <Picker.Item label="Yes" value={true} />
            </Picker>

            <Text style={styles.label}>Created By *</Text>
            <TextInput
                style={styles.input}
                value={createdBy}
                onChangeText={setCreatedBy}
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
        margin: 20,
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
    buttonContainer: {
        marginVertical: 20,
    },
});

export default PropertyDetailsComponent;
