// services/extraService.ts

export interface ExtraData {
  amount: number; // valor que será somado
}

// Função simulando integração com backend
export async function salvarExtra(data: ExtraData) {
  try {
    // Simula uma chamada ao backend (POST /extra)
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
    console.error("Erro ao salvar valor da renda extra:", error.message);
    throw new Error("Não foi possível salvar o valor da renda extra.");
  }
}
