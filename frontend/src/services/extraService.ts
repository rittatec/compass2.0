// services/extraService.ts

export interface ExtraData {
  amount: number; // valor de renda extra
}

// Simula armazenamento local do valor extra
let extraStorage: ExtraData = { amount: 0 };

// Função para salvar o valor extra
export async function salvarExtra(data: ExtraData) {
  return new Promise<{ success: boolean; message: string; data: ExtraData }>((resolve) => {
    setTimeout(() => {
      extraStorage = data; // atualiza o "banco"
      resolve({
        success: true,
        message: "Valor de renda extra salvo com sucesso.",
        data,
      });
    }, 1000); // atraso de 1 segundo para simular backend
  });
}

// Função para obter o valor extra
export async function getExtra(): Promise<ExtraData> {
  return new Promise<ExtraData>((resolve) => {
    setTimeout(() => {
      resolve(extraStorage);
    }, 300); // atraso rápido para simular leitura
  });
}
