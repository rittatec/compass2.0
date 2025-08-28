// services/aguaService.ts

export interface AguaData {
  amount: number; // valor que será debitado
}

// Simula armazenamento local do valor de água
let aguaStorage: AguaData = { amount: 0 };

// Função para salvar o valor da água
export async function salvarAgua(data: AguaData) {
  return new Promise<{ success: boolean; message: string; data: AguaData }>((resolve) => {
    setTimeout(() => {
      aguaStorage = data; // atualiza o "banco"
      resolve({
        success: true,
        message: "Pagamento de água salvo com sucesso.",
        data,
      });
    }, 1000); // atraso de 1 segundo para simular backend
  });
}

// Função para obter o valor da água
export async function getAgua(): Promise<AguaData> {
  return new Promise<AguaData>((resolve) => {
    setTimeout(() => {
      resolve(aguaStorage);
    }, 300); // atraso rápido para simular leitura
  });
}
