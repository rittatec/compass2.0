// services/wifiService.ts

export interface WifiData {
  amount: number; // valor que será debitado
}

// Simula armazenamento local do valor do wifi
let wifiStorage: WifiData = { amount: 0 };

// Função para salvar o valor do wifi
export async function salvarWifi(data: WifiData) {
  return new Promise<{ success: boolean; message: string; data: WifiData }>((resolve) => {
    setTimeout(() => {
      wifiStorage = data; // atualiza o "banco"
      resolve({
        success: true,
        message: "Pagamento de wifi salvo com sucesso.",
        data,
      });
    }, 1000); // atraso de 1 segundo para simular backend
  });
}

// Função para obter o valor do wifi
export async function getWifi(): Promise<WifiData> {
  return new Promise<WifiData>((resolve) => {
    setTimeout(() => {
      resolve(wifiStorage);
    }, 300); // atraso rápido para simular leitura
  });
}
