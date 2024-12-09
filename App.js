import React from 'react';
//import { SafeAreaView, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import LoginScreen from './screens/LoginScreen';
import FormScreen from './screens/FormScreen';
import TestScreen from './screens/TestScreen';
import FormWithPhoto from './screens/FormWithPhoto';





const Stack = createStackNavigator();

//  const App = () => (
//    <SafeAreaView style={styles.safeArea}>
//      <FormScreen />
//    </SafeAreaView>
//  );


 const App = () => (
  <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={FormScreen} />
        <Stack.Screen name="Home" component={TestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
 );

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#f8f9fa', // Optional: Matches the app's theme
//   },
// });

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Login">
//         <Stack.Screen name="Login" component={FormScreen} />
//         <Stack.Screen name="Home" component={TestScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

export default App;
