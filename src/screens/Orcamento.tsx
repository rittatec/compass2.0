import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useRenda } from "../context/RendaContext";

// Serviços
import { getWifi } from "../services/wifiService";
import { getEnergia } from "../services/energiaService";
import { getAgua } from "../services/aguaService";
import { getFeira } from "../services/feiraService";
import { getSaude } from "../services/saudeService";
import { getPoupanca } from "../services/poupancaService";
import { getReceber } from "../services/receberService";
import { getExtra } from "../services/extraService";
import { getInvestido } from "../services/investidoService";

type Categoria = {
  id: string;
  nome: string;
  valor: number;
  tipo: "despesa" | "receita";
  data?: string;
};

export default function Orcamento() {
  const { rendaMensal } = useRenda();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregar = async () => {
      try {
        const [
          wifi,
          energia,
          agua,
          feira,
          saude,
          poupanca,
          receber,
          extra,
          investido,
        ] = await Promise.all([
          getWifi(),
          getEnergia(),
          getAgua(),
          getFeira(),
          getSaude(),
          getPoupanca(),
          getReceber(),
          getExtra(),
          getInvestido(),
        ]);

        const agora = new Date();
        const dataHora = agora.toLocaleString("pt-BR");

        setCategorias([
          { id: "wifi", nome: "Wifi", valor: wifi.amount || 0, tipo: "despesa", data: dataHora },
          { id: "energia", nome: "Energia", valor: energia.amount || 0, tipo: "despesa", data: dataHora },
          { id: "agua", nome: "Água", valor: agua.amount || 0, tipo: "despesa", data: dataHora },
          { id: "feira", nome: "Feira", valor: feira.amount || 0, tipo: "despesa", data: dataHora },
          { id: "saude", nome: "Saúde", valor: saude.amount || 0, tipo: "despesa", data: dataHora },
          { id: "poupanca", nome: "Poupança", valor: poupanca.amount || 0, tipo: "despesa", data: dataHora },
          { id: "investido", nome: "Investido", valor: investido.amount || 0, tipo: "despesa", data: dataHora },
          { id: "extra", nome: "Extra", valor: extra.amount || 0, tipo: "receita", data: dataHora },
          { id: "receber", nome: "Receber", valor: receber.amount || 0, tipo: "receita", data: dataHora },
        ]);
      } catch (e) {
        console.error("Erro ao carregar orçamento:", e);
      } finally {
        setLoading(false);
      }
    };

    carregar();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3A53A4" />
      </View>
    );
  }

  // Totais
  const totalEntradas = categorias
    .filter((c) => c.tipo === "receita")
    .reduce((acc, c) => acc + c.valor, 0);

  const totalSaidas = categorias
    .filter((c) => c.tipo === "despesa")
    .reduce((acc, c) => acc + c.valor, 0);

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.headerBox}>
        <Text style={styles.headerText}>Histórico</Text>
      </View>

      {/* Lista de histórico */}
      <FlatList
        data={categorias}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View>
              <Text style={styles.catName}>{item.nome}</Text>
              <Text style={styles.date}>{item.data}</Text>
            </View>
            <Text
              style={[
                styles.catValue,
                { color: item.tipo === "despesa" ? "red" : "green" },
              ]}
            >
              {item.tipo === "despesa" ? "-" : "+"} R$ {item.valor.toFixed(2)}
            </Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Rodapé fixo com totais */}
      <View style={styles.footer}>
        <Text style={[styles.total, { color: "green" }]}>
          Total de Entradas: R$ {totalEntradas.toFixed(2)}
        </Text>
        <Text style={[styles.total, { color: "red" }]}>
          Total de Saídas: R$ {totalSaidas.toFixed(2)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  headerBox: {
    backgroundColor: "#3A53A4",
    padding: 12,
    borderRadius: 8,
    margin: 20,
  },
  headerText: { color: "#fff", fontSize: 22, fontWeight: "bold", textAlign: "center" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  catName: { fontSize: 16, fontWeight: "600" },
  catValue: { fontSize: 16, fontWeight: "bold" },
  date: { fontSize: 12, color: "#555" },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  total: { fontSize: 18, fontWeight: "bold", textAlign: "center" },
});
