// src/services/api.js
import axios from 'axios';

// Create an axios instance with default configuration
const api = axios.create({
  baseURL: 'https://api-demo-4gqb.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to handle user login
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/users/login', credentials);
    return response.data; // Ensure this includes the user's name and token
  } catch (error) {
    // Extract error message from API response
    const message = error.response?.data?.message || "Login failed";
    throw new Error(message);
  }
};

// Function to fetch products
export const fetchProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data.data; // Assuming API returns { data: [...] }
  } catch (error) {
    const message = error.response?.data?.message || "Failed to fetch products";
    throw new Error(message);
  }
};
