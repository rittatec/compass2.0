// services/energiaService.ts

export interface EnergiaData {
  amount: number; // valor que será debitado
}

// Função simulando integração com backend
export async function salvarEnergia(data: EnergiaData) {
  try {
    // Simula uma chamada ao backend (POST /energia)
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
    console.error("Erro ao salvar valor da energia:", error.message);
    throw new Error("Não foi possível salvar o pagamento da energia.");
  }
}
