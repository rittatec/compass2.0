import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Conta = {
  id: string;
  nome: string;
  vencimento: string; // formato: "YYYY-MM-DD"
  mensagem: string; // mensagem da notificação
};

export default function Notificacoes() {
  const [contas, setContas] = useState<Conta[]>([
    { id: "wifi", nome: "Wifi", vencimento: "", mensagem: "Pagar Wifi" },
    { id: "energia", nome: "Energia", vencimento: "", mensagem: "Pagar Energia" },
    { id: "agua", nome: "Água", vencimento: "", mensagem: "Pagar Água" },
    { id: "feira", nome: "Feira", vencimento: "", mensagem: "Comprar feira" },
    { id: "saude", nome: "Saúde", vencimento: "", mensagem: "Consulta médica" },
    { id: "poupanca", nome: "Poupança", vencimento: "", mensagem: "Depositar poupança" },
    { id: "investido", nome: "Investido", vencimento: "", mensagem: "Aplicar investimento" },
  ]);

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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📌 Notificações</Text>

      <FlatList
        data={contas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const ehHoje = item.vencimento === hoje;
          return (
            <View
              style={[
                styles.notificacao,
                ehHoje && styles.notificacaoHoje,
              ]}
            >
              <Text style={[styles.nomeConta, ehHoje && styles.nomeContaHoje]}>
                {ehHoje ? `⚠️ ${item.nome}` : item.nome}
              </Text>

              <View style={styles.row}>
                {/* Campo para editar a data */}
                <TextInput
                  style={styles.inputData}
                  placeholder="AAAA-MM-DD"
                  value={item.vencimento}
                  onChangeText={(text) =>
                    atualizarConta(item.id, "vencimento", text)
                  }
                />
              </View>

              {/* Campo para editar a mensagem */}
              <TextInput
                style={styles.inputMensagem}
                placeholder="Mensagem da notificação"
                value={item.mensagem}
                onChangeText={(text) =>
                  atualizarConta(item.id, "mensagem", text)
                }
              />

              {item.vencimento ? (
                <Text style={styles.vencimento}>
                  {ehHoje ? "📢 Vence hoje!" : `Vencimento: ${item.vencimento}`}
                </Text>
              ) : (
                <Text style={styles.vencimento}>⏳ Defina uma data</Text>
              )}
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3f51b5",
    marginBottom: 16,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 8,
  },
  nomeConta: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  nomeContaHoje: {
    color: "#d32f2f", // vermelho se vence hoje
  },
  inputData: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    width: 120,
    textAlign: "center",
    backgroundColor: "#fafafa",
    marginRight: 8,
  },
  inputMensagem: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#fafafa",
    fontSize: 14,
    marginBottom: 6,
  },
  notificacao: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  notificacaoHoje: {
    backgroundColor: "#ffebee",
  },
  vencimento: {
    fontSize: 14,
    color: "#555",
  },
});
