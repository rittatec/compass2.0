// services/poupancaService.ts

export interface PoupancaData {
  amount: number; // valor que será debitado
}

// Variável interna simulando o "banco de dados"
let poupancaStorage: PoupancaData = { amount: 0 };

// Função para salvar o valor
export async function salvarPoupanca(data: PoupancaData) {
  try {
    return new Promise<{ success: boolean; message: string; data: PoupancaData }>(
      (resolve) => {
        setTimeout(() => {
          poupancaStorage = data; // salva internamente
          resolve({
            success: true,
            message: "Valor para guardar na poupança salvo com sucesso.",
            data,
          });
        }, 1000);
      }
    );
  } catch (error: any) {
    console.error("Erro ao salvar valor para guardar na poupança:", error.message);
    throw new Error("Não foi possível salvar o valor para guardar na poupança.");
  }
}

// Função para recuperar o valor salvo
export async function getPoupanca(): Promise<PoupancaData> {
  try {
    return new Promise<PoupancaData>((resolve) => {
      setTimeout(() => {
        resolve(poupancaStorage); // retorna o valor atual
      }, 500);
    });
  } catch (error: any) {
    console.error("Erro ao recuperar valor da poupança:", error.message);
    throw new Error("Não foi possível recuperar o valor da poupança.");
  }
}
