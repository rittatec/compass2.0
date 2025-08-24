// services/extraService.ts

export interface ReceberData {
  amount: number; // valor que será somado
}

// Função simulando integração com backend
export async function salvarReceber(data: ReceberData) {
  try {
    // Simula uma chamada ao backend (POST /receber)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "Valor de renda extra salvo com sucesso.",
          data,
        });
      }, 1000); // atraso de 1 segundo para parecer requisição real
    });
  } catch (error: any) {
    console.error("Erro ao salvar valor de receber:", error.message);
    throw new Error("Não foi possível salvar o valor de receber.");
  }
}
