import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./api";

interface UserType {
  id: number
  nome: string,
  renda: number
}

export async function fazerLogin(nome: string, senha: string) {

  const idResponse = await api.post("/verificar_usuario", {  
    nome, 
    senha
  });

  const usuarioId = idResponse.data;

  await AsyncStorage.setItem("userId", String(usuarioId));

  const userResponse = await api.get<UserType>(`/conta/por_usuario/${usuarioId}`);

  return userResponse.data;
}

