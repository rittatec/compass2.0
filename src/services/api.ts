import axios from 'axios';

// Aqui vou colocar a URL real da  API quando eu tiver essa url
<<<<<<< HEAD
const API_URL = 'http://192.168.3.14:8080';
=======
// const API_URL = 'http://192.168.100.19:8080';
>>>>>>> c375a4b9c69b2279feecc3efb0212da1a54c5f1f

const API_URL = 'http://10.125.60.71:8080';
export const api = axios.create({
  baseURL: API_URL,
})