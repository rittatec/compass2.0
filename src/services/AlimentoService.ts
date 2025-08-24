import axios from 'axios';

export type AlimentoData = {
  amount: number; // valor do alimento como número
};

const API_URL = 'https://seu-backend.com'; // ajuste para a URL do seu backend

export async function salvarAlimento(data: AlimentoData) {
  try {
    const response = await axios.post(`${API_URL}/alimento`, data);
    return response.data;
  } catch (error: any) {
    // captura o erro do Axios
    if (error.response) {
      // erro retornado pelo backend
      throw new Error(error.response.data.message || 'Erro ao salvar o alimento');
    } else if (error.request) {
      // erro de conexão
      throw new Error('Não foi possível conectar ao servidor');
    } else {
      throw new Error(error.message);
    }
  }
}
