import axios from "axios";

const API_BASE_URL = "http://192.168.3.14:8080";

export type PerfilResponse = {
  foto: string | null;
  nome: string;
  nascimento: string;
  email: string;
  telefone: string;
};

export const PerfilService = {
  // ------------------- ENVIO DE IMAGEM -------------------
  enviarImagem: async (usuarioId: number, fotoUri: string) => {
    try {
      const formData = new FormData();

      formData.append("imagem", {
        uri: fotoUri,
        type: "image/jpeg",
        name: "perfil.jpg",
      } as any);

      const response = await axios.post(
        `${API_BASE_URL}/usuario/${usuarioId}/imagem`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
      throw error;
    }
  },

  // ------------------- ATUALIZAR PERFIL -------------------
  atualizarPerfil: async (usuarioId: number, dados: PerfilResponse) => {
    try {
      const payload = {
        nome: dados.nome,
        email: dados.email,
        nascimento: dados.nascimento,
        telefone: dados.telefone,
        // ❌ NÃO ENVIAR senha
        // ❌ NÃO ENVIAR foto
      };

      const response = await axios.put(
        `${API_BASE_URL}/atualizar_usuario/${usuarioId}`,
        payload
      );

      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      throw error;
    }
  },

  // ------------------- BUSCAR PERFIL -------------------
  buscarPerfil: async (usuarioId: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/usuario/${usuarioId}`);

      const data = response.data;

      // ✔ Transformar base64 para formato válido do React Native
      if (data.foto) {
        data.foto = `data:image/jpeg;base64,${data.foto}`;
      }

      return data;
    } catch (error) {
      console.error("Erro ao buscar perfil:", error);
      throw error;
    }
  },
};
