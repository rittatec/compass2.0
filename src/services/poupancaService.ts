// services/poupancaService.ts

export interface PoupancaData {
  amount: number; // valor que será debitado
}

// Função simulando integração com backend
export async function salvarPoupanca(data: PoupancaData) {
  try {
    // Simula uma chamada ao backend (POST /poupança)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "Valor para guardar na poupança salvo com sucesso.",
          data,
        });
      }, 1000); // atraso de 1 segundo para parecer requisição real
    });
  } catch (error: any) {
    console.error("Erro ao salvar valor para guardar na poupança:", error.message);
    throw new Error("Não foi possível salvar o valor para guardar na poupança .");
  }
}
