// src/services/extraService.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // ajuste para o endereço do seu back-end

export interface ExtraData {
  amount: number;
}

export const salvarExtra = async (data: ExtraData) => {
  try {
    const response = await axios.post(`${API_URL}/extra`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao salvar valor de Extra');
  }
};
