import React, { useState, useContext  } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
    ImageBackground,
    Image,
    ScrollView,
} from 'react-native';
import axios from 'axios';


const LoginComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext); 
    const navigation = useNavigation();

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Error', 'Please enter your username and password.');
            return;
        }

        try {
            const response = await axios.post('http://172.16.2.4:3000/auth/login', {
                username,
                password,
            });

            if (response.data.success) {
                login(password, username, null);///-- need to reterive token
              //  Alert.alert('Success', 'Login successful!');
                navigation.navigate('Home');
            } else {
                Alert.alert('Error', response.data.message);
            }
        } catch (error) {
            Alert.alert('Error', 'Login failed. Please try again.' + error);
            console.error(error);
        }
    };

    return (
        
        <ImageBackground
            source={require('../logo.jpg')} // Local background image
            style={styles.background}
        ><ScrollView >
            <View style={styles.container}>
                <Image source={require('../logo.jpg')} style={styles.logo} />

                <Text style={styles.title}>Babrala House No. Allocation App!</Text>
                <Text style={styles.subtitle}>Login to your account</Text>

                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Enter your username"
                    placeholderTextColor="#888"
                />

                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    placeholderTextColor="#888"
                    secureTextEntry
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </ImageBackground>
        
    );
};

const styles = StyleSheet.create({
    background: {           // Full screen background image
        resizeMode: 'cover', 
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        height: '100%',
    },
    container: {
        flex: 1,                          // Full height and width
        justifyContent: 'center',          // Center the form vertically
        alignItems: 'center',              // Center the form horizontally
        paddingHorizontal: 20,             // Padding on left and right
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Background with slight transparency
        paddingTop: '10%',                 // Top padding to account for safe area
        paddingBottom: '10%',              // Bottom padding to ensure content is fully centered vertically
        minHeight: '100%',                 // Ensure container takes full height
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 20,
        color: '#555',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 3,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 20,
        marginBottom: 15,
        backgroundColor: '#f9f9f9',
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 20,
        padding: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
});
// const styles = StyleSheet.create({
//     background: {           // Full screen background image
//         resizeMode: 'cover', 
//         backgroundColor: 'rgba(255, 255, 255, 0.8)', 
//         height: '100%',
//     },
//     container: {
//         flex: 1,                      // Full height and width
//         justifyContent: 'center',      // Center the form vertically
//         alignItems: 'center',          // Center the form horizontally
//         paddingHorizontal: 10,         // Padding on left and right
//         backgroundColor: 'rgba(255, 255, 255, 0.8)', // Background with slight transparency
//         paddingTop: '50%', 
//         paddingBottom: '50%', 
//     },
//     title: {
//         fontSize: 30,
//         fontWeight: 'bold',
//         color: '#333',
//         textAlign: 'center',
//         marginBottom: 10,
//     },
//     subtitle: {
//         fontSize: 20,
//         color: '#555',
//         textAlign: 'center',
//         marginBottom: 20,
//     },
//     input: {
//         height: 50,
//         borderColor: '#ddd',
//         borderWidth: 3,
//         borderRadius: 8,
//         paddingHorizontal: 15,
//         fontSize: 20,
//         marginBottom: 15,
//         backgroundColor: '#f9f9f9',
//     },
//     button: {
//         backgroundColor: '#4CAF50',
//         paddingVertical: 10,
//         borderRadius: 15,
//         alignItems: 'center',
//         marginTop: 20,
//         padding: 10,
//     },
//     buttonText: {
//         color: '#fff',
//         fontSize: 25,
//         fontWeight: 'bold',
//     },
//     logo: {
//         width: 100,
//         height: 100,
//         marginBottom: 20,
//     },
//});

export default LoginComponent;
