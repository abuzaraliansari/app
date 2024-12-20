import React, { createContext, useState, useEffect, useContext  } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        token: null,
        user: null,
        ownerId: null,
        propertyID: null,
    });

    const login = async (token, user, ownerId, propertyID) => {
        setAuthState({ isAuthenticated: true, token, user ,ownerId });
        await AsyncStorage.setItem('authToken', token);
        await AsyncStorage.setItem('user', JSON.stringify(user));
        await AsyncStorage.setItem('ownerId', ownerId);
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
        await AsyncStorage.removeItem('authToken');
        await AsyncStorage.removeItem('user');
    };

    const loadToken = async () => {
        const token = await AsyncStorage.getItem('authToken');
        const user = JSON.parse(await AsyncStorage.getItem('user'));
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
