import { api } from "./api";
import { Alert } from "react-native";

export async function alterarRenda(renda: number, user: any) {    
  try {
    const idConta = user?.id; // AGORA ESTÁ CERTO

    if (!idConta) {
      throw new Error("ID da conta não encontrado");
    }

    await api.put(`atualizar_conta/${idConta}`, {
      nome: user?.nome,
      renda: renda,
    });

    return true;

  } catch (err) {
    console.error("Erro ao atualizar renda:", err);
    Alert.alert("Erro", "Não foi possível atualizar a renda.");
    return false;
  }
}
