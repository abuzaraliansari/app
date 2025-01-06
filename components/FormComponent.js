import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { FormDataContext } from '../contexts/FormDataContext';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import AppStyles from '../styles/AppStyles';

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const { updateFormData } = useContext(FormDataContext);
  const navigation = useNavigation();
  const API_ENDPOINT = `${Config.API_URL}/auth/login`;

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter your username and password.');
      return;
    }

    setLoading(true);

    try {
      console.log('API_ENDPOINT:', API_ENDPOINT);
      const response = await axios.post(API_ENDPOINT, {
        username,
        password,
      });
      console.log('response:', response.data);
      if (response.data.success) {
        login(response.data.token, username, null, null);
        updateFormData({
          token: response.data.token,
          username,
        });
        console.log('response:', response.data);
        console.log('response:', username);
        navigation.replace('Home');
      } else {
        console.log('response:', response.data.message);
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            Alert.alert('Error', 'Invalid username or password'+ error);
          } else {
            Alert.alert('Error', 'Login failed. Please try again.' + error);
          }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../logo.jpg')}
      style={AppStyles.loginBackground}
    >
      <ScrollView>
        <View style={AppStyles.loginContainer}>
          <Image source={require('../logo.jpg')} style={AppStyles.loginLogo} />
          <Text style={AppStyles.loginTitle}>Babrala House No. Allocation App!</Text>
          <Text style={AppStyles.loginSubtitle}>Login to your account</Text>

          <TextInput
            style={AppStyles.loginInput}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter your username"
            placeholderTextColor="#888"
          />

          <TextInput
            style={AppStyles.loginInput}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor="#888"
            secureTextEntry
          />

          <TouchableOpacity
            style={AppStyles.loginButton}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={AppStyles.loginButtonText}>Login</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default LoginComponent;