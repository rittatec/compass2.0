// services/energiaService.ts

export interface EnergiaData {
  amount: number; // valor que será debitado
}

// Simula armazenamento local do valor de energia
let energiaStorage: EnergiaData = { amount: 0 };

// Função para salvar o valor da energia
export async function salvarEnergia(data: EnergiaData) {
  return new Promise<{ success: boolean; message: string; data: EnergiaData }>((resolve) => {
    setTimeout(() => {
      energiaStorage = data; // atualiza o "banco"
      resolve({
        success: true,
        message: "Pagamento de energia salvo com sucesso.",
        data,
      });
    }, 1000); // atraso de 1 segundo para simular backend
  });
}

// Função para obter o valor da energia
export async function getEnergia(): Promise<EnergiaData> {
  return new Promise<EnergiaData>((resolve) => {
    setTimeout(() => {
      resolve(energiaStorage);
    }, 300); // atraso rápido para simular leitura
  });
}
