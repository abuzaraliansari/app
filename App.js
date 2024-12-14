import React from 'react';
//import { SafeAreaView, StyleSheet } from 'react-native';
import AppWrapper from './contexts/AuthProvider'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import LoginScreen from './screens/LoginScreen';
import FormScreen from './screens/FormScreen';
import OwnerScreen from './screens/OwnerScreen';
import FamilyScreen from './screens/FamilyScreen';
import FormWithPhoto from './screens/FormWithPhoto';
import PropertyScreen from './screens/PropertyScreen';
import SpecialConsiderationScreen from './screens/SpecialConsiderationScreen';






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
      
        <Stack.Screen name="Login" component={FamilyScreen} />
        <Stack.Screen name="Home" component={OwnerScreen} />
        <Stack.Screen name="Family" component={FamilyScreen} />
        <Stack.Screen name="Property" component={PropertyScreen} />
        <Stack.Screen name="SpecialConsideration" component={SpecialConsiderationScreen} />
        <Stack.Screen name="FormWithPhoto" component={FormWithPhoto} />
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
