import axios from 'axios';

// Aqui vou colocar a URL real da  API quando eu tiver essa url
const API_URL = 'http://192.168.100.19:8080';

export const api = axios.create({
  baseURL: API_URL,
})