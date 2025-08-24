// src/services/poupancaService.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // ajuste para o endereço do seu back-end

export interface PoupancaData {
  amount: number;
}

export const salvarPoupanca = async (data: PoupancaData) => {
  try {
    const response = await axios.post(`${API_URL}/poupanca`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao salvar valor da Poupança');
  }
};
