//tela onde estou testando a implatação do axios (ainda n esta funcionando)

import { setUser } from "../../App";
import { api } from "./api";

interface UserType {
  nome: string,
  renda: number
}

const usuarioFake = {
  user: 'admin',
  senha: '123456',
  nome: 'Maria Rita',
  token: 'fake-jwt-token',
};

export async function fazerLogin(nome: string, senha: string) {
  const idResponse = await api.post("veirficar_usuario", {
    nome, 
    senha
  });

  const userResponse = await api.get<UserType>(`/conta/por_usuario/${idResponse.data}`);

  setUser(userResponse.data);
}

/* export async function fazerLogin(user: string, senha: string) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (user === usuarioFake.user && senha === usuarioFake.senha) {
        resolve({
          nome: usuarioFake.nome,
          user: usuarioFake.user,
          token: usuarioFake.token,
        });
      } else {
        reject(new Error('Usuário ou senha inválidos'));
      }
    }, 800);
  });
} */
