// src/services/wifiService.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // ajuste conforme seu back-end

export interface WifiData {
  amount: number;
}

export const salvarWifi = async (data: WifiData) => {
  try {
    const response = await axios.post(`${API_URL}/wifi`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao salvar valor do WiFi');
  }
};
