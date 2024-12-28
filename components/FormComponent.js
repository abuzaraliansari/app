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
import Config from 'react-native-config';


const LoginComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext); 
    const navigation = useNavigation();
    const API_ENDPOINT = `${Config.API_URL}/auth/login`;
    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Error', 'Please enter your username and password.');
            return;
        }

        try {
            console.log('API_ENDPOINT:', API_ENDPOINT); 
            const response = await axios.post(API_ENDPOINT, {
                username,
                password,
            });
console.log('response:', response.data);
            if (response.data.success) {
                login(response.data.token, username,null, null);///-- need to reterive token

                //  Alert.alert('Success', 'Login successful!');
                navigation.replace('Home');
            } else {
                console.log('response:', response.data.message);
                Alert.alert('Error', response.data.message + API_ENDPOINT);
            }
        } catch (error) {
            console.log('error:', error);
            Alert.alert('Error', 'Login failed. Please try again.' + error + API_ENDPOINT);
            console.error(error + API_ENDPOINT);
        
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
        borderRadius: 8,//
        paddingHorizontal: 15,
        fontSize: 20,
        marginBottom: 15,
        backgroundColor: '#f9f9f9',
        width: '60%', 
        textAlign: 'center',
       
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

export default LoginComponent;
