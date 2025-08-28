// services/receberService.ts

export interface ReceberData {
  amount: number; // valor que será somado
}

// Simula armazenamento local do valor a receber
let receberStorage: ReceberData = { amount: 0 };

// Função para salvar o valor a receber
export async function salvarReceber(data: ReceberData) {
  return new Promise<{ success: boolean; message: string; data: ReceberData }>((resolve) => {
    setTimeout(() => {
      receberStorage = data; // atualiza o "banco"
      resolve({
        success: true,
        message: "Valor a receber salvo com sucesso.",
        data,
      });
    }, 1000); // atraso de 1 segundo para simular backend
  });
}

// Função para obter o valor a receber
export async function getReceber(): Promise<ReceberData> {
  return new Promise<ReceberData>((resolve) => {
    setTimeout(() => {
      resolve(receberStorage);
    }, 300); // atraso rápido para simular leitura
  });
}
