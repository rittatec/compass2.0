// services/investidoService.ts

export interface InvestidoData {
  amount: number; // valor investido
}

// Simula armazenamento local do valor investido
let investidoStorage: InvestidoData = { amount: 0 };

// Função para salvar o valor investido
export async function salvarInvestido(data: InvestidoData) {
  return new Promise<{ success: boolean; message: string; data: InvestidoData }>((resolve) => {
    setTimeout(() => {
      investidoStorage = data; // atualiza o "banco"
      resolve({
        success: true,
        message: "Valor de investimento salvo com sucesso.",
        data,
      });
    }, 1000); // atraso de 1 segundo para simular backend
  });
}

// Função para obter o valor investido
export async function getInvestido(): Promise<InvestidoData> {
  return new Promise<InvestidoData>((resolve) => {
    setTimeout(() => {
      resolve(investidoStorage);
    }, 300); // atraso rápido para simular leitura
  });
}
