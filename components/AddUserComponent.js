// import React, { useState, useContext } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
// import axios from 'axios';
// import AppStyles from '../styles/AppStyles';
// import { AuthContext } from '../contexts/AuthContext';
// import Config from 'react-native-config';

// const AddUserComponent = () => {
//   const { authState } = useContext(AuthContext);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [mobileNumber, setMobileNumber] = useState('');
//   const createdBy = authState.user;

//   const handleAddUser = async () => {
//     if (!username || !password || !fullName || !email || !mobileNumber) {
//       Alert.alert('Error', 'All fields are required.');
//       return;
//     }

//     try {
//       const response = await axios.post(`${Config.API_URL}/auth/addUser`, {
//         username,
//         password,
//         fullName,
//         email,
//         mobileNumber,
//         createdBy,
//       });

//       if (response.data.success) {
//         Alert.alert('Success', 'User added successfully.');
//         // Clear the form
//         setUsername('');
//         setPassword('');
//         setFullName('');
//         setEmail('');
//         setMobileNumber('');
//       } else {
//         Alert.alert('Error', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error adding user:', error);
//       Alert.alert('Error', 'Failed to add user. Please try again.');
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={AppStyles.container}>
//       <Text style={AppStyles.heading}>Add User</Text>

//       <Text style={AppStyles.label}>Username *</Text>
//       <TextInput
//         style={AppStyles.input}
//         value={username}
//         onChangeText={setUsername}
//         placeholder="Enter username"
//       />

//       <Text style={AppStyles.label}>Password *</Text>
//       <TextInput
//         style={AppStyles.input}
//         value={password}
//         onChangeText={setPassword}
//         placeholder="Enter password"
//         secureTextEntry
//       />

//       <Text style={AppStyles.label}>Full Name *</Text>
//       <TextInput
//         style={AppStyles.input}
//         value={fullName}
//         onChangeText={setFullName}
//         placeholder="Enter full name"
//       />

//       <Text style={AppStyles.label}>Email *</Text>
//       <TextInput
//         style={AppStyles.input}
//         value={email}
//         onChangeText={setEmail}
//         placeholder="Enter email"
//         keyboardType="email-address"
//       />

//       <Text style={AppStyles.label}>Mobile Number *</Text>
//       <TextInput
//         style={AppStyles.input}
//         value={mobileNumber}
//         onChangeText={setMobileNumber}
//         placeholder="Enter mobile number"
//         keyboardType="phone-pad"
//       />

//       <TouchableOpacity style={AppStyles.button} onPress={handleAddUser}>
//         <Text style={AppStyles.buttonText}>Add User</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// export default AddUserComponent;