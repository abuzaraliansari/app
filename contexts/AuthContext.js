import React, { createContext, useState, useEffect, useContext  } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        token: null,
        user: null,
        ownerId: null,
        MobileNumber: null,
        propertyID: null,
    });

    const login = async (token, user, ownerId, MobileNumber, propertyID) => {
        setAuthState({ isAuthenticated: true, token, user ,ownerId , MobileNumber,propertyID});
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('user', JSON.stringify(user));
        await AsyncStorage.setItem('ownerId', ownerId);
        await AsyncStorage.setItem('MobileNumber', MobileNumber);
        await AsyncStorage.setItem('propertyID', propertyID);
        
     
      
    };

    // const propertyAuth = async (token, user, ownerId, propertyID) => {
    //     setAuthState({ isAuthenticated: true, token, user ,ownerId ,propertyID});
    //     await AsyncStorage.setItem('authToken', token);
    //     await AsyncStorage.setItem('user', JSON.stringify(user));
    //     await AsyncStorage.setItem('ownerId', ownerId);
    //     await AsyncStorage.setItem('propertyID', propertyID);
        
    // };

// const UpdateOwnerID = async () => {
//         setAuthState({ isAuthenticated: true, token, user, ownerID });
//         await AsyncStorage.setItem('authToken', token);
//         await AsyncStorage.setItem('user', JSON.stringify(user));
//         await AsyncStorage.setItem('OwnerID', OwnerID);
//         await AsyncStorage.setItem('OwnerID', JSON.stringify(OwnerID));
       
//     };
    const logout = async () => {
        setAuthState({ isAuthenticated: false, token: null, user: null });
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('ownerId');
        await AsyncStorage.removeItem('propertyID');
        await AsyncStorage.removeItem('MobileNumber');
    };

     const loadToken = async () => {
         const token = await AsyncStorage.getItem('token');
         const user = JSON.parse(await AsyncStorage.getItem('user'));
        // const ownerId = await AsyncStorage.getItem('ownerId');
        // const propertyID = await AsyncStorage.getItem('propertyID');
         if (token) {
             setAuthState({ isAuthenticated: true, token, user });
         }
     };


    useEffect(() => {
        loadToken();
    }, []);

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
