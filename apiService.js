// apiService.js
import axios from 'axios';
import Config from 'react-native-config';
const API_ENDPOINT = `${Config.API_URL}/auth/login`;


const apiService = {
    submitFormData: async (data) => {
        try {
            console.log('API_ENDPOINT:', API_ENDPOINT); 
            const response = await axios.post(API_ENDPOINT, data); // Replace with your API URL
            return response;
        } catch (error) {
            throw error;
        }
    },
};


export default apiService;
