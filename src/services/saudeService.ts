// services/poupancaService.ts

export interface SaudeData {
  amount: number; // valor que será debitado
}

// Função simulando integração com backend
export async function salvarSaude(data: SaudeData) {
  try {
    // Simula uma chamada ao backend (POST /saude)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "Valor para reservar pra saúde salvo com sucesso.",
          data,
        });
      }, 1000); // atraso de 1 segundo para parecer requisição real
    });
  } catch (error: any) {
    console.error("Erro ao salvar valor para reservar pra saúde:", error.message);
    throw new Error("Não foi possível salvar o valor para reservar pra saúde .");
  }
}
