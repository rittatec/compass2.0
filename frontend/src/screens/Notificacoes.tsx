import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, Dimensions, Button } from "react-native"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../services/api"; // <-- importe sua instância do axios

type Conta = {
  id: string;
  nome: string;
  vencimento: string; // formato: "YYYY-MM-DD"
  mensagem: string; // mensagem da notificação
};

export default function Notificacoes({ expoPushToken }: any) {
  const [contas, setContas] = useState<Conta[]>([
    { id: "wifi", nome: "Wifi", vencimento: "", mensagem: "Pagar Wifi" },
    { id: "energia", nome: "Energia", vencimento: "", mensagem: "Pagar Energia" },
    { id: "agua", nome: "Água", vencimento: "", mensagem: "Pagar Água" },
    { id: "feira", nome: "Feira", vencimento: "", mensagem: "Comprar feira" },
    { id: "saude", nome: "Saúde", vencimento: "", mensagem: "Consulta médica" },
    { id: "poupanca", nome: "Poupança", vencimento: "", mensagem: "Depositar poupança" },
    { id: "investido", nome: "Investido", vencimento: "", mensagem: "Aplicar investimento" },
  ]);

  const enviarParaBackend = async (conta: Conta) => {
  if (!conta.vencimento) {
    alert("Defina uma data antes de agendar!");
    return;
  }
  if (!expoPushToken) {
    alert("Token não encontrado!");
    return;
  }

  const datetime = `${conta.vencimento}T09:00:00`;

  try {
    await api.post("/notificacoes/agendar", {
      expoPushToken,
      titulo: conta.nome,
      mensagem: conta.mensagem,
      dataHora: datetime
    });

    alert("Notificação agendada com sucesso!");
  } catch (error) {
    console.log("Erro ao enviar:", error);
    alert("Erro ao enviar para o servidor.");
  }
};


  // Carregar dados salvos
  useEffect(() => {
    const carregar = async () => {
      try {
        const salvas = await AsyncStorage.getItem("contas");
        if (salvas) setContas(JSON.parse(salvas));
      } catch (e) {
        console.log("Erro ao carregar:", e);
      }
    };
    carregar();
  }, []);

  // Salvar sempre que mudar
  useEffect(() => {
    AsyncStorage.setItem("contas", JSON.stringify(contas));
  }, [contas]);

  const atualizarConta = (
    id: string,
    campo: "vencimento" | "mensagem",
    valor: string
  ) => {
    setContas((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [campo]: valor } : c))
    );
  };

  const hoje = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
  const screenHeight = Dimensions.get("window").height;

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={[styles.container, { paddingTop: screenHeight * 0.05 }]}>
        <Text style={styles.header}>Notificações</Text>

        {contas.map((item) => {
          const ehHoje = item.vencimento === hoje;
          return (
            <View
              key={item.id}
              style={[styles.notificacao, ehHoje && styles.notificacaoHoje]}
            >
              <Text style={[styles.nomeConta, ehHoje && styles.nomeContaHoje]}>
                {ehHoje ? `⚠️ ${item.nome}` : item.nome}
              </Text>

              <View style={styles.row}>
                <TextInput
                  style={styles.inputData}
                  placeholder="AAAA-MM-DD"
                  value={item.vencimento}
                  onChangeText={(text) =>
                    atualizarConta(item.id, "vencimento", text)
                  }
                />
              </View>

              <TextInput
                style={styles.inputMensagem}
                placeholder="Mensagem da notificação"
                value={item.mensagem}
                onChangeText={(text) =>
                  atualizarConta(item.id, "mensagem", text)
                }
              />

              <Text style={styles.vencimento}>
                {item.vencimento
                  ? ehHoje
                    ? "📢 Vence hoje!"
                    : `Vencimento: ${item.vencimento}`
                  : "⏳ Defina uma data"}
              </Text>

              <Button 
                title="Agendar notificação" 
                onPress={() => enviarParaBackend(item)} 
              />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, paddingHorizontal: 16 },
  header: { fontSize: 26, fontWeight: "bold", color: "#3f51b5", marginBottom: 20, textAlign: "center" },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "flex-start", marginBottom: 10 },
  nomeConta: { fontSize: 18, fontWeight: "bold", color: "#333", marginBottom: 10 },
  nomeContaHoje: { color: "#d32f2f" },
  inputData: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, width: 130, textAlign: "center", backgroundColor: "#fafafa", marginRight: 10, fontSize: 16 },
  inputMensagem: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, backgroundColor: "#fafafa", fontSize: 16, marginBottom: 8 },
  notificacao: { backgroundColor: "#f5f5f5", padding: 16, borderRadius: 12, marginBottom: 16 },
  notificacaoHoje: { backgroundColor: "#ffebee" },
  vencimento: { fontSize: 16, color: "#555" },
});
