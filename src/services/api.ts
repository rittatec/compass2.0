import axios from 'axios';

// Aqui vou colocar a URL real da  API quando eu tiver essa url
const API_URL = 'http://172.20.10.4:8080';
export const api = axios.create({
  baseURL: API_URL,
})