// services/feiraService.ts

export interface FeiraData {
  amount: number; // valor que será debitado
}

// Simula armazenamento local do valor da feira
let feiraStorage: FeiraData = { amount: 0 };

// Função para salvar o valor da feira
export async function salvarFeira(data: FeiraData) {
  return new Promise<{ success: boolean; message: string; data: FeiraData }>((resolve) => {
    setTimeout(() => {
      feiraStorage = data; // atualiza o "banco"
      resolve({
        success: true,
        message: "Pagamento da feira salvo com sucesso.",
        data,
      });
    }, 1000); // atraso de 1 segundo para simular backend
  });
}

// Função para obter o valor da feira
export async function getFeira(): Promise<FeiraData> {
  return new Promise<FeiraData>((resolve) => {
    setTimeout(() => {
      resolve(feiraStorage);
    }, 300); // atraso rápido para simular leitura
  });
}
