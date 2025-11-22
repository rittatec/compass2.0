import { api } from "./api";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import { Alert } from "react-native";

export async function alterarRenda(renda: number, user: any){    
  const idConta = user?.user.id
    await api.put(`atualizar_conta/${idConta}`, {
      nome: user?.user.nome,
      renda,
    })
}