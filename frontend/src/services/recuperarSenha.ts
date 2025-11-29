import axios from "axios";

const API_URL = "http://192.168.3.14:8080"; 

type RecuperarSenhaPayload = {
  email: string;
  novaSenha: string;
};

export const recuperarSenha = async (data: RecuperarSenhaPayload) => {
  try {
    const response = await axios.post(`${API_URL}/senha/reset`, data);
    return response.data; // retorna a mensagem do backend
  } catch (error: any) {
    // Se der erro, retorna a mensagem do servidor ou um genérico
    if (error.response?.data) {
      throw new Error(error.response.data);
    }
    throw new Error("Erro ao tentar recuperar a senha.");
  }
};
