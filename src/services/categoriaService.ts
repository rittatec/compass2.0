// services/wifiService.ts

import { api } from "./api";

export interface categoriaType {
  amount: number; // valor que será debitado
  category: string;
}

// Simula armazenamento local do valor do wifi
// let wifiStorage: WifiData = { amount: 0 };

// Função para salvar o valor do wifi
export async function salvarDebito(data: categoriaType, user: any) {
    const idConta = user?.user.id;
    const category = data.category;
    const amount =  data.amount;

  await api.post(`criar_movimentacao/${idConta}`, {
    categoria: { nome: category },
    movimento: { valor: amount, tipo_movimento: "DEBITAR" }
  })
}

// Função para obter o valor do wifi
/* export async function getWifi(): Promise<WifiData> {
  return new Promise<WifiData>((resolve) => {
    setTimeout(() => {
      resolve(wifiStorage);
    }, 300); // atraso rápido para simular leitura
  });
} */
