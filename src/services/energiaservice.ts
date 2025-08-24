// src/services/energiaService.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // ajuste conforme seu back-end

export interface EnergiaData {
  amount: number;
}

export const salvarEnergia = async (data: EnergiaData) => {
  try {
    const response = await axios.post(`${API_URL}/energia`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao salvar valor da energia');
  }
};
