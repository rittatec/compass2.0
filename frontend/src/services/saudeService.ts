// services/saudeService.ts

export interface SaudeData {
  amount: number; // valor que será debitado
}

// Simula armazenamento local do valor de saúde
let saudeStorage: SaudeData = { amount: 0 };

// Função para salvar o valor de saúde
export async function salvarSaude(data: SaudeData) {
  return new Promise<{ success: boolean; message: string; data: SaudeData }>((resolve) => {
    setTimeout(() => {
      saudeStorage = data; // atualiza o "banco"
      resolve({
        success: true,
        message: "Valor para reservar pra saúde salvo com sucesso.",
        data,
      });
    }, 1000); // atraso de 1 segundo para simular backend
  });
}

// Função para obter o valor de saúde
export async function getSaude(): Promise<SaudeData> {
  return new Promise<SaudeData>((resolve) => {
    setTimeout(() => {
      resolve(saudeStorage);
    }, 300); // atraso rápido para simular leitura
  });
}
