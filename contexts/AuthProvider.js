import React from 'react';
import { AuthContext, AuthProvider } from './AuthContext'; // Import AuthContext

const AppWrapper = ({ children }) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
};

export default AppWrapper;
