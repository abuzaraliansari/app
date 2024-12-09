// import axios from 'axios';

// // Base URL for the API
// const API_URL = process.env.REACT_APP_API_URL || 'http://192.168.29.56:3000/api/form/submit';

// /**
//  * Submits the form data to the backend API.
//  * @param {Object} formData - The data to be submitted.
//  * @param {string} formData.name - The name of the user.
//  * @param {string} formData.age - The age of the user.
//  * @param {string} formData.category - The category chosen by the user.
//  * @param {Object} formData.location - The user's location (latitude and longitude).
//  * @returns {Promise<Object>} - The response data from the API.
//  * @throws {Error} - Throws an error if the request fails.
//  */
// export const submitForm = async (formData) => {
//   try {
//     const response = await axios.post(API_URL, formData, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       timeout: 10000, // Set a timeout of 10 seconds for the request
//     });
//     console.log('Form submitted successfully:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error submitting form:', error.response?.data || error.message);
//     throw new Error(
//       error.response?.data?.message || 'An error occurred while submitting the form. Please try again.'
//     );
//   }
// };
