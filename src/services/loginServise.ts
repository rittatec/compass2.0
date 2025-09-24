//tela onde estou testando a implatação do axios (ainda n esta funcionando)

import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { api } from "./api";

interface UserType {
  nome: string,
  renda: number
}

/* const usuarioFake = {
  user: 'admin',
  senha: '123456',
  nome: 'Maria Rita',
  token: 'fake-jwt-token',
}; */

export async function fazerLogin(nome: string, senha: string) {
  // const user = useContext(UserContext);

  const idResponse = await api.post("verificar_usuario", {
    nome, 
    senha
  });

  const userResponse = await api.get<UserType>(`/conta/por_usuario/${idResponse.data}`);

  return userResponse.data;

  // user?.setUser(userResponse.data);
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
