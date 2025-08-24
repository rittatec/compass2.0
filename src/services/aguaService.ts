import axios from 'axios';

interface AguaData {
  amount: string;
}

const api = axios.create({
  baseURL: 'http://SEU_BACKEND_URL_AQUI/api', // ajuste para seu backend
});

export async function salvarAgua(data: AguaData) {
  try {
    const response = await api.post('/agua', data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao salvar valor de água');
  }
}
