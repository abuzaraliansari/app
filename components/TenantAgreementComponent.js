import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import AppStyles from '../styles/AppStyles';
import {AuthContext} from '../contexts/AuthContext';
import Config from 'react-native-config';
import axios from 'axios';
import {launchCamera} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';

const TenantAgreementComponent = () => {
  //     console.log('owner', authState.ownerId);
  //   console.log('createdby', authState.user);
  //   console.log('2', authState.propertyID)
  //   console.log('3', authState.token)

  const {authState} = useContext(AuthContext);
  const navigation = useNavigation();
  const route = useRoute();
  const {HouseNumber, propertyID} = route.params;
  console.log('HouseNumber reterived:', HouseNumber);
  const FormData = require('form-data');
  const ownerID = authState.ownerId;
  const [propertyMode, setPropertyMode] = useState('');
  const [propertyAge, setPropertyAge] = useState('');
  const [roomCount, setRoomCount] = useState('0');
  const [floorCount, setFloorCount] = useState('0');
  const [shopCount, setShopCount] = useState('0');
  const [OpenArea, setOpenArea] = useState('');
  const [ConstructedArea, setConstructedArea] = useState('');
  const [tenants, setTenants] = useState([]);
  const [tenantCount, setTenantCount] = useState('0');
  const [TenantYearlyRent, setTenantYearlyRent] = useState('0');
  const [HouseType, setHouseType] = useState('');
  const [waterHarvesting, setWaterHarvesting] = useState('No');
  const [submersible, setSubmersible] = useState('No');
  const [houseNumber, SetHouseNumber] = useState(String(HouseNumber));
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [consent, setConsent] = useState('Yes');
  const [IsActive, setIsActive] = useState('');
  const token = authState.token;
  const createdBy = authState.user;

  console.log('PropertyID:', propertyID);
  const API_ENDPOINT = `${Config.API_URL}/auth/PropertyDetailsHouse`;
  const DOCUMENT_API_ENDPOINT = `${Config.API_URL}/auth/uploadDoc`;
  

  const handleNameChange = (index, value) => {
    const updatedTenants = [...tenants];
    updatedTenants[index] = {...updatedTenants[index], name: value};
    setTenants(updatedTenants);
  };

//   const handleDocumentPick = async index => {
//     try {
//       const result = await DocumentPicker.pickSingle({
//         type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
//       });
//       if (result) {
//         const { name: documentName, size: documentSize, type: documentType, uri: documentUri } = result;
  
//         // Log the details of the selected document
//         console.log("Document Name:", documentName);
//         console.log("Document Size:", documentSize);
//         console.log("Document Type:", documentType);
//         console.log("Document URI:", documentUri);
  
//         const updatedTenants = [...tenants];
//         updatedTenants[index] = {
//           ...updatedTenants[index],
//           document: documentUri,
//         };


const handleDocumentPick = async index => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      if (result) {
        const { name: documentName, size: documentSize, type: documentType, uri: documentUri } = result;

        // Log the details of the selected document
        console.log("Document Name:", documentName);
        console.log("Document Size:", documentSize);
        console.log("Document Type:", documentType);
        console.log("Document URI:", documentUri);

        const updatedTenants = [...tenants];
        updatedTenants[index] = {
          ...updatedTenants[index],
          document: {
            documentName,
            documentPath: documentUri,
            documentSize,
            documentType,
          },
        };
        setTenants(updatedTenants);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('Cancelled', 'Document selection was cancelled.');
      } else {
        Alert.alert('Error', 'Document selection failed.');
      }
    }
  };

  const renderTenantFields = () => {
    return Array.from({length: parseInt(tenantCount, 10)}, (_, index) => (
      <View key={index} style={styles.tenantContainer}>
        <Text style={styles.label}>Tenant {index + 1} Name</Text>
        <TextInput
          style={styles.input}
          placeholder={`Enter Tenant ${index + 1} Name`}
          value={tenants[index]?.name || ''}
          onChangeText={value => handleNameChange(index, value)}
        />
       
        <TouchableOpacity
          style={styles.documentButton}
          onPress={() => handleDocumentPick(index)}>
          <Text style={styles.photoButtonText}>
            {tenants[index]?.document ? 'Change Document' : 'Upload Document'}
          </Text>
        </TouchableOpacity>
        {tenants[index]?.document && (
          <Text style={styles.photoText}>
            {/* Document: {tenants[index].document.split('/').pop()} */}
            Document: {tenants[index].document.documentName}
          </Text>
        )}
      </View>
    ));
  };

  const validateAndSubmit = async () => {
    try {
      if (!propertyMode || !HouseType) {
        throw new Error('All fields are required.');
      }

      const propertyDetails = {
        propertyID,
        propertyMode,
        propertyAge,
        OpenArea,
        ConstructedArea,
        tenantDetails: tenants,
        roomCount,
        floorCount,
        shopCount,
        tenantCount,
        TenantYearlyRent,
        waterHarvesting,
        submersible,
        houseNumber,
        bankAccountNumber,
        consent,
        HouseType,
        IsActive,
      };
      console.log('Request Body:', propertyDetails);
      console.log('API_ENDPOINT:', API_ENDPOINT);
//console.log(DOCUMENT_API_ENDPOINT);
      //   const response = await axios.post(API_ENDPOINT, propertyDetails, {
      //     headers: { Authorization: `Bearer ${authState.token}` },
      //   });

      const response = await axios.post(API_ENDPOINT, propertyDetails, {
        headers: {
          header_gkey: authState.token, // Replace 'your-header-value' with the actual value
        },
      });

//       if (response.status === 200) {
//         //Alert.alert('Success', 'Property details submitted successfully.');
//         navigation.navigate('LiveLocation', {propertyID: propertyID});
//       } else {
//         throw new Error(result.error || 'Submission failed.');
//       }
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     }
//   };

if (response.status === 200) {
    // Submit tenant documents
    const data = new FormData();
    // data.append('file', {
    //     uri: document.documentPath,
    //     name: document.documentName,
    //     type: document.documentType,
    //   });
    // formData.append('ownerID', ownerID);
    // formData.append('propertyID', propertyID);
    // formData.append('createdBy', createdBy);
    // formData.append('tenantDetails', JSON.stringify(tenants));
data.append('ownerID', ownerID);
data.append('propertyID', propertyID);
data.append('createdBy', createdBy);
data.append('tenantDetails', JSON.stringify(tenants));
    for (const tenant of tenants) {
      if (tenant.document) {
        data.append('file', {
          uri: tenant.document.documentPath,
          name: tenant.document.documentName,
          type: tenant.document.documentType,
        });
      }
    }

    // const documentResponse = await axios.post(DOCUMENT_API_ENDPOINT, formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     header_gkey: authState.token,
    //   },
    // });
console.log('FormData:', data);
const documentResponse = await axios.post(DOCUMENT_API_ENDPOINT, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          header_gkey: authState.token,
        },
      });
      console.log('Document Response:', documentResponse.data);
    if (documentResponse.status === 201) {
      navigation.navigate('LiveLocation', { propertyID: propertyID });
    } else {
      throw new Error(documentResponse.data.message || 'Document submission failed.');
    }
  } else {
    throw new Error(propertyResponse.data.error || 'Property submission failed.');
  }
} catch (error) {
  Alert.alert('Error', error.message);
}
};


  return (
    <ScrollView style={AppStyles.container}>
      <Text style={AppStyles.header}>Property Details</Text>

      <Text style={AppStyles.label}>House Number</Text>
      <TextInput
        style={AppStyles.input}
        //placeholder={String(HouseNumber)}
        value={houseNumber}
        onChangeText={SetHouseNumber}

        // editable={false} // Disabled for auto-fill
      />

      <Text style={AppStyles.label}>House Type *</Text>
      <Picker
        selectedValue={HouseType}
        style={AppStyles.pickerContainer}
        onValueChange={itemValue => setHouseType(itemValue)}>
        <Picker.Item label="Select House Type" value="" />
        <Picker.Item label="Kuchha" value="Kuchha" />
        <Picker.Item label="Pakka" value="Pakka" />
        <Picker.Item label="Khali plot" value="Khali plot" />
      </Picker>

      {/* <Text style={AppStyles.label}>Area In Sq Meter</Text>
      <TextInput
        style={AppStyles.input}
        placeholder="Enter Area"
        value={Area}
        onChangeText={setArea}
        keyboardType="numeric"
      /> */}

      <Text style={AppStyles.label}>Open Area In Sq Feet</Text>
      <TextInput
        style={AppStyles.input}
        placeholder="Enter Open Area"
        value={OpenArea}
        onChangeText={setOpenArea}
        keyboardType="numeric"
      />

      <Text style={AppStyles.label}>Constructed Area In Sq Feet</Text>
      <TextInput
        style={AppStyles.input}
        placeholder="Enter Constructed Area"
        value={ConstructedArea}
        onChangeText={setConstructedArea}
        keyboardType="numeric"
      />

      <Text style={AppStyles.label}>Property Mode *</Text>
      <View style={AppStyles.pickerContainer}>
        <Picker
          selectedValue={propertyMode}
          onValueChange={itemValue => setPropertyMode(itemValue)}>
          <Picker.Item label="Select Property Mode" value="" />
          <Picker.Item label="Residential" value="Residential" />
          <Picker.Item label="Commercial" value="Commercial" />
        </Picker>
      </View>

      <Text style={AppStyles.label}>Property Age</Text>
      <Picker
        selectedValue={propertyAge}
        onValueChange={itemValue => setPropertyAge(itemValue)}
        style={AppStyles.picker}>
        <Picker.Item label="Select Property Age" value="" />
        <Picker.Item label="1-5" value="1-5" />
        <Picker.Item label="5-10" value="5-10" />
        <Picker.Item label="10-15" value="10-15" />
        <Picker.Item label="15-20" value="15-20" />
        <Picker.Item label="20-30" value="20-30" />
        <Picker.Item label="30-40" value="30-40" />
        <Picker.Item label="40-50" value="40-50" />
        <Picker.Item label="50-60" value="50-60" />
        <Picker.Item label="60-70" value="60-70" />
        <Picker.Item label="70-80" value="70-80" />
        <Picker.Item label="80-90" value="80-90" />
        <Picker.Item label="90-100" value="90-100" />
        <Picker.Item label="100-110" value="100-110" />
        <Picker.Item label="110-120" value="110-120" />
        <Picker.Item label="120-130" value="120-130" />
        <Picker.Item label="130-140" value="130-140" />
        <Picker.Item label="140-150" value="140-150" />
        <Picker.Item label="150+" value="150+" />
      </Picker>

      {/* <Text style={AppStyles.label}>Room Count</Text>
      <Picker
        selectedValue={roomCount}
        onValueChange={itemValue => setRoomCount(itemValue)}
        style={AppStyles.picker}>
        <Picker.Item label="Select Room Count" value="0" />
        <Picker.Item label="0" value="0" />
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
        <Picker.Item label="6" value="6" />
        <Picker.Item label="7" value="7" />
        <Picker.Item label="8" value="8" />
        <Picker.Item label="9" value="9" />
        <Picker.Item label="10" value="10" />
        <Picker.Item label="11" value="11" />
        <Picker.Item label="12" value="12" />
        <Picker.Item label="13" value="13" />
        <Picker.Item label="14" value="14" />
        <Picker.Item label="15" value="15" />
        <Picker.Item label="16" value="16" />
        <Picker.Item label="17" value="17" />
        <Picker.Item label="18" value="18" />
        <Picker.Item label="19" value="19" />
        <Picker.Item label="20" value="20" />
      </Picker> */}

      <Text style={AppStyles.label}>Floor Count</Text>
      <Picker
        selectedValue={floorCount}
        onValueChange={itemValue => setFloorCount(itemValue)}
        style={AppStyles.picker}>
        <Picker.Item label="Select Floor Count" value="0" />
        <Picker.Item label="0" value="0" />
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        {/* <Picker.Item label="5" value="5" />
        <Picker.Item label="6" value="6" />
        <Picker.Item label="7" value="7" /> */}
      </Picker>

      <Text style={AppStyles.label}>Shop Count</Text>
      <Picker
        selectedValue={shopCount}
        onValueChange={itemValue => setShopCount(itemValue)}
        style={AppStyles.picker}>
        <Picker.Item label="Select Shop Count" value="0" />
        <Picker.Item label="0" value="0" />
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
        <Picker.Item label="6" value="6" />
        <Picker.Item label="7" value="7" />
        <Picker.Item label="8" value="8" />
        <Picker.Item label="9" value="9" />
        <Picker.Item label="10" value="10" />
      </Picker>
      <Text style={AppStyles.label}>Tenant Yearly Rent</Text>
      <TextInput
        style={AppStyles.input}
        placeholder="Enter Tenant Yearly Rent"
        value={TenantYearlyRent}
        onChangeText={setTenantYearlyRent}
        keyboardType="numeric"
      />
      <Text style={AppStyles.label}>Tenant Count *</Text>
      <TextInput
        style={AppStyles.input}
        placeholder="Enter Number of Tenants"
        value={tenantCount}
        onChangeText={value => {
          setTenantCount(value);
          setTenants(Array.from({length: parseInt(value, 10)}).map(() => ({})));
        }}
        keyboardType="numeric"
      />

      {renderTenantFields()}

      <Text style={AppStyles.label}>Do You have Water Harvesting ?</Text>
      <View style={styles.radioGroup}>
        {/* Radio Button for "Yes" */}
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setWaterHarvesting('Yes')}>
          <View
            style={[
              styles.radioCircle,
              waterHarvesting === 'Yes' && styles.selectedCircle,
            ]}
          />
          <Text style={styles.radioText}>Yes</Text>
        </TouchableOpacity>

        {/* Radio Button for "No" */}
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setWaterHarvesting('No')}>
          <View
            style={[
              styles.radioCircle,
              waterHarvesting === 'No' && styles.selectedCircle,
            ]}
          />
          <Text style={styles.radioText}>No</Text>
        </TouchableOpacity>
      </View>

      <Text style={AppStyles.label}>Do You Have Submersible ?</Text>

      <View style={styles.radioGroup}>
        {/* Radio Button for "Yes" */}
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setSubmersible('Yes')}>
          <View
            style={[
              styles.radioCircle,
              submersible === 'Yes' && styles.selectedCircle,
            ]}
          />
          <Text style={styles.radioText}>Yes</Text>
        </TouchableOpacity>

        {/* Radio Button for "No" */}
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setSubmersible('No')}>
          <View
            style={[
              styles.radioCircle,
              submersible === 'No' && styles.selectedCircle,
            ]}
          />
          <Text style={styles.radioText}>No</Text>
        </TouchableOpacity>
      </View>
      {/* <Text style={AppStyles.label}>Live Location</Text>
      <View style={AppStyles.liveLocationContainer}>
        <LiveLocationComponent />
      </View> */}

      {/* <Text style={AppStyles.label}>Bank Account Number</Text>
      <TextInput
        style={AppStyles.input}
        placeholder="Enter Bank Account Number"
        value={bankAccountNumber}
        onChangeText={setBankAccountNumber}
        keyboardType="numeric"
      /> */}

      <Text style={AppStyles.label}>
        Do you give consent to provide the above information?
      </Text>
      <View style={styles.radioGroup}>
        {/* Radio Button for "Yes" */}
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setConsent('Yes')}>
          <View
            style={[
              styles.radioCircle,
              consent === 'Yes' && styles.selectedCircle,
            ]}
          />
          <Text style={styles.radioText}>yes</Text>
        </TouchableOpacity>

        {/* Radio Button for "No" */}
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setConsent('No')}>
          <View
            style={[
              styles.radioCircle,
              consent === 'No' && styles.selectedCircle,
            ]}
          />
          <Text style={styles.radioText}>No</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={AppStyles.button} onPress={validateAndSubmit}>
        <Text style={AppStyles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    padding: 16,
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'left',
    //justifyContent: 'space-round',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedCircle: {
    backgroundColor: '#007bff',
  },
  radioText: {
    fontSize: 16,
  },
  selectedText: {
    marginTop: 15,
    fontSize: 16,
    fontStyle: 'italic',
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  picker: {
    height: 50,
    marginBottom: 16,
  },
  tenantContainer: {
    marginBottom: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  documentButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  photoButton: {
    backgroundColor: '#28A745',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  photoButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  photoText: {
    color: '#black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  photoPreview: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 5,
    marginTop: 5,
  },
  button: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TenantAgreementComponent;
