// apiService.js
import axios from 'axios';

const apiService = {
    submitFormData: async (data) => {
        try {
            const response = await axios.post('http://172.16.2.4:3000/auth/login', data); // Replace with your API URL
            return response;
        } catch (error) {
            throw error;
        }
    },
};


export default apiService;
