import { api } from "./api";

import { ContextType } from "../context/userContext";

export interface categoriaType {
  amount: number; // valor que será debitado
  category: string;
}

export interface MovimentoType {
  id: number,
  data: string,
  valor: number,
  tipo_movimento: string,
  idConta: number,
  idCategoria: number,
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


export async function atualizarRenda(user: ContextType | undefined): Promise<number> {
  const response = await api.get<MovimentoType[]>("/movimentos")
  const listaDeMovimentos = response.data

  let novaRenda = user?.user.renda ?? 0;

  listaDeMovimentos.forEach(item => {
    if(item.idConta ===  user?.user.id) {
      if(item.tipo_movimento === "DEBITAR") {
        novaRenda -= item.valor;
      } else if(item.tipo_movimento === "CREDITAR") {
        novaRenda += item.valor;
      }
    }
  })

  return novaRenda;
}