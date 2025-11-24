import { api } from "./api";

export interface categoriaType {
  amount: number; // valor que será debitado
  category: string;
}

// Função para salvar o valor do movimento
export async function salvarMovimento(data: categoriaType, user: any, tipo_movimento: string) {
    const idConta = user?.user.id;
    const category = data.category;
    const amount =  data.amount;

  await api.post(`criar_movimentacao/${idConta}`, {
    categoria: { nome: category },
    movimento: { valor: amount, tipo_movimento }
  })
}