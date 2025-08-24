// services/feiraService.ts

export interface FeiraData {
  amount: number; // valor que será debitado
}

// Função simulando integração com backend
export async function salvarFeira(data: FeiraData) {
  try {
    // Simula uma chamada ao backend (POST /feira)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "Pagamento da feira salvo com sucesso.",
          data,
        });
      }, 1000); // atraso de 1 segundo para parecer requisição real
    });
  } catch (error: any) {
    console.error("Erro ao salvar valor da feira:", error.message);
    throw new Error("Não foi possível salvar o pagamento da feira.");
  }
}
