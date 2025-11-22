import { api } from "./api";

// Aqui vou colocar a URL real da API quando eu tiver essa url
const API_URL = 'https://sua-api.com/api/usuarios';


export async function cadastrarUsuario(usuario: {
  senha: string,
  nome: string,
  email: string
}) {
  try {
    api.post("/cadastrar_usuario", usuario);
  } catch(error) {
    console.error(error);
  }
}