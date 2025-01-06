import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FormScreen from './screens/FormScreen';
import OwnerScreen from './screens/OwnerScreen';
import DisplayAllDetails from './screens/DisplayAllDetails';
import { FormDataProvider } from './contexts/FormDataContext';
import { AuthProvider } from './contexts/AuthContext';
import AppStyles from './styles/AppStyles';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import AppWrapper from './contexts/AuthProvider';
import HomeScreen from './screens/HomeScreen';
import FamilyScreen from './screens/FamilyScreen';
import FormWithPhoto from './screens/FormWithPhoto';
import TenantAgreement from './screens/TenantAgreement';
import PropertyScreenArea from './screens/PropertyScreenArea';
import PropertyScreenHouse from './screens/PropertyScreenHouse';
import SpecialConsiderationScreen from './screens/SpecialConsiderationScreen';
import LiveLocationScreen from './screens/LiveLocationScreen';
import TestComponent from './components/test';
import dataScreen from './screens/dataScreen';
import FinalScreen from './screens/FinalScreen';

const Stack = createStackNavigator();

const CustomButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={AppStyles.customButton}>
    <Text style={AppStyles.customButtonText}>{title}</Text>
  </TouchableOpacity>
);

const App = () => (
  <AuthProvider>
    <FormDataProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: 'bold',
            },
            headerStyle: {
              backgroundColor: '#f0f4f7',
            },
          }}
        >
          <Stack.Screen name="Login" component={FormScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="Owner"
            component={OwnerScreen}
            options={({ navigation }) => ({
              title: 'Owner',
              headerLeft: () => (
                <CustomButton
                  onPress={() => navigation.replace('Home')}
                  title="Home"
                />
              ),
              headerRight: () => (
                <CustomButton
                  onPress={() => navigation.goBack()}
                  title="Back"
                />
              ),
            })}
          />
          <Stack.Screen
            name="Family"
            component={FamilyScreen}
            options={({ navigation }) => ({
              title: 'Family',
              headerLeft: () => (
                <CustomButton
                  onPress={() => navigation.replace('Home')}
                  title="Home"
                />
              ),
              headerRight: () => (
                <CustomButton
                  onPress={() => navigation.goBack()}
                  title="Back"
                />
              ),
            })}
          />
          <Stack.Screen
            name="PropertyArea"
            component={PropertyScreenArea}
            options={({ navigation }) => ({
              title: 'PropertyArea',
              headerLeft: () => (
                <CustomButton
                  onPress={() => navigation.replace('Home')}
                  title="Home"
                />
              ),
              headerRight: () => (
                <CustomButton
                  onPress={() => navigation.goBack()}
                  title="Back"
                />
              ),
            })}
          />
          <Stack.Screen
            name="PropertyHouse"
            component={PropertyScreenHouse}
            options={({ navigation }) => ({
              title: 'PropertyHouse',
              headerLeft: () => (
                <CustomButton
                  onPress={() => navigation.replace('Home')}
                  title="Home"
                />
              ),
              headerRight: () => (
                <CustomButton
                  onPress={() => navigation.goBack()}
                  title="Back"
                />
              ),
            })}
          />
          <Stack.Screen
            name="LiveLocation"
            component={LiveLocationScreen}
            options={({ navigation }) => ({
              title: 'LiveLocation',
              headerLeft: () => (
                <CustomButton
                  onPress={() => navigation.replace('Home')}
                  title="Home"
                />
              ),
              headerRight: () => (
                <CustomButton
                  onPress={() => navigation.goBack()}
                  title="Back"
                />
              ),
            })}
          />
          <Stack.Screen
            name="SpecialConsideration"
            component={SpecialConsiderationScreen}
            options={({ navigation }) => ({
              title: 'SpecialConsideration',
              headerLeft: () => (
                <CustomButton
                  onPress={() => navigation.replace('Home')}
                  title="Home"
                />
              ),
              headerRight: () => (
                <CustomButton
                  onPress={() => navigation.goBack()}
                  title="Back"
                />
              ),
            })}
          />
          <Stack.Screen
            name="FormWithPhoto"
            component={FormWithPhoto}
            options={({ navigation }) => ({
              title: 'FormWithPhoto',
              headerLeft: () => (
                <CustomButton
                  onPress={() => navigation.replace('Home')}
                  title="Home"
                />
              ),
              headerRight: () => (
                <CustomButton
                  onPress={() => navigation.goBack()}
                  title="Back"
                />
              ),
            })}
          />
          <Stack.Screen
            name="dataScreen"
            component={DisplayAllDetails}
            options={({ navigation }) => ({
              title: 'dataScreen',
              headerLeft: () => (
                <CustomButton
                  onPress={() => navigation.replace('Home')}
                  title="Home"
                />
              ),
              headerRight: () => (
                <CustomButton
                  onPress={() => navigation.goBack()}
                  title="Back"
                />
              ),
            })}
          />
          <Stack.Screen
            name="Final"
            component={FinalScreen}
            options={({ navigation }) => ({
              title: 'Final',
              headerLeft: () => (
                <CustomButton
                  onPress={() => navigation.replace('Home')}
                  title="Home"
                />
              ),
              headerRight: () => (
                <CustomButton
                  onPress={() => navigation.goBack()}
                  title="Back"
                />
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FormDataProvider>
  </AuthProvider>
);

export default App;