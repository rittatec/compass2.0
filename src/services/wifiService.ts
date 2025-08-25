// services/wifiService.ts

export interface WifiData {
  amount: number; // valor que será debitado
}

// Função simulando integração com backend
export async function salvarWifi(data: WifiData) {
  try {
    // Simula uma chamada ao backend (POST /wifi)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "Pagamento de energia salvo com sucesso.",
          data,
        });
      }, 1000); // atraso de 1 segundo para parecer requisição real
    });
  } catch (error: any) {
    console.error("Erro ao salvar valor do wifi:", error.message);
    throw new Error("Não foi possível salvar o pagamento do wifi.");
  }
}
