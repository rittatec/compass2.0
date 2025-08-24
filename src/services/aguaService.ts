// services/aguaService.ts

export interface AguaData {
  amount: number; // valor que será debitado
}

// Função simulando integração com backend
export async function salvarAgua(data: AguaData) {
  try {
    // Simula uma chamada ao backend (POST /agua)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "Pagamento de água salvo com sucesso.",
          data,
        });
      }, 1000); // atraso de 1 segundo para parecer requisição real
    });
  } catch (error: any) {
    console.error("Erro ao salvar água:", error.message);
    throw new Error("Não foi possível salvar o pagamento da água.");
  }
}
