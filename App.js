import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
//import { SafeAreaView, StyleSheet } from 'react-native';
import AppWrapper from './contexts/AuthProvider';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import FormScreen from './screens/FormScreen';
import OwnerScreen from './screens/OwnerScreen';
import FamilyScreen from './screens/FamilyScreen';
import FormWithPhoto from './screens/FormWithPhoto';
//import PropertyScreen from './screens/PropertyScreen';
import PropertyScreenArea from './screens/PropertyScreenArea';
import PropertyScreenHouse from './screens/PropertyScreenHouse';
import SpecialConsiderationScreen from './screens/SpecialConsiderationScreen';
import LiveLocationScreen from './screens/LiveLocationScreen';
import PropertyAreaComponent from './components/PropertyAreaComponent';


import dataScreen from './screens/dataScreen';


import FinalScreen from './screens/FinalScreen';

const Stack = createStackNavigator();

//  const App = () => (
//    <SafeAreaView style={styles.safeArea}>
//      <FormScreen />
//    </SafeAreaView>
//  );

const App = () => (
  <AppWrapper>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">


        <Stack.Screen name="Login" component={FormScreen}/>

        
<Stack.Screen name="Home" component={HomeScreen} /> 

        {/* <Stack.Screen name="Login" component={LiveLocationScreen} /> */}
        <Stack.Screen
          name="Owner"
          component={OwnerScreen}
          options={({navigation}) => ({
            title: 'Owner',
            headerRight: () => (
              <Button
                onPress={() => navigation.replace('Home')}
                title="Home"
                color="black"
              />
            ),
          })}
        />
        <Stack.Screen
          name="Family"
          component={FamilyScreen}
          options={({navigation}) => ({
            title: 'Family',
            headerRight: () => (
              <Button
                onPress={() => navigation.replace('Home')}
                title="Home"
                color="black"
              />
            ),
          })}
        />
        {/* <Stack.Screen name="Property" component={PropertyScreen} /> */}
        <Stack.Screen
          name="PropertyArea"
          component={PropertyScreenArea}
          options={({navigation}) => ({
            title: 'PropertyArea',
            headerRight: () => (
              <Button
                onPress={() => navigation.replace('Home')}
                title="Home"
                color="black"
              />
            ),
          })}
        />
        <Stack.Screen
          name="PropertyHouse"
          component={PropertyScreenHouse}
          options={({navigation}) => ({
            title: 'PropertyHouse',
            headerRight: () => (
              <Button
                onPress={() => navigation.replace('Home')}
                title="Home"
                color="black"
              />
            ),
          })}
        />
        <Stack.Screen
          name="SpecialConsideration"
          component={SpecialConsiderationScreen}
          options={({navigation}) => ({
            title: 'SpecialConsideration',
            headerRight: () => (
              <Button
                onPress={() => navigation.replace('Home')}
                title="Home"
                color="black"
              />
            ),
          })}
        />
        <Stack.Screen
          name="FormWithPhoto"
          component={FormWithPhoto}
          options={({navigation}) => ({
            title: 'FormWithPhoto',
            headerRight: () => (
              <Button
                onPress={() => navigation.replace('Home')}
                title="Home"
                color="black"
              />
            ),
          })}
        />
        <Stack.Screen
          name="LiveLocation"
          component={LiveLocationScreen}
          options={({navigation}) => ({
            title: 'LiveLocation',
            headerRight: () => (
              <Button
                onPress={() => navigation.replace('Home')}
                title="Home"
                color="black"
              />
            ),
          })}
        />
<Stack.Screen
          name="dataScreen"
          component={dataScreen}
          options={({navigation}) => ({
            title: 'dataScreen',
            headerRight: () => (
              <Button
                onPress={() => navigation.replace('Home')}
                title="Home"
                color="black"
              />
            ),
          })}
        /> 
        
        <Stack.Screen
          name="Final"
          component={FinalScreen}
          options={({navigation}) => ({
            title: 'Final',
            headerRight: () => (
              <Button
                onPress={() => navigation.replace('Home')}
                title="Home"
                color="black"
              />
            ),
          })}
        />

        
      </Stack.Navigator>
    </NavigationContainer>
  </AppWrapper>
);

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#f8f9fa', // Optional: Matches the app's theme
//   },
// });

export default App;
