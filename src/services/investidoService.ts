// services/investidoService.ts

export interface InvestidoData {
  amount: number; // valor que será debitado
}

// Função simulando integração com backend
export async function salvarInvestido(data: InvestidoData) {
  try {
    // Simula uma chamada ao backend (POST /investido)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "Valor de investimento salvo com sucesso.",
          data,
        });
      }, 1000); // atraso de 1 segundo para parecer requisição real
    });
  } catch (error: any) {
    console.error("Erro ao salvar o valor que você investiu:", error.message);
    throw new Error("Não foi possível salvar o valor que você investiu.");
  }
}
