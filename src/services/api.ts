import axios from 'axios';
import Config from 'react-native-config';

// Aqui vou colocar a URL real da  API quando eu tiver essa url
const API_URL = Config.REACT_APP_API_URL || 'http://localhost:8080';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});
