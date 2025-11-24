import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
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
import { getMovimentos, getCategoriaById } from "../services/movimentosService";

interface MovimentoType {
  id: number,
  data: string,
  valor: number,
  tipo_movimento: string,
  idConta: number,
  idCategoria: number,
  categoria?: string,
}

/* interface MovsComCategoriaType {
  id: number,
  data: string,
  valor: number,
  tipo_movimento: string,
  idConta: number,
  categoria?: string
} */

export default function Orcamento() {
  const { rendaMensal } = useRenda();
  const [categorias, setCategorias] = useState<MovimentoType[]>([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      async function getCategorias() {
        const listaDeMovimentos = await getMovimentos();
            const movsComCategoria = await Promise.all(
                listaDeMovimentos.map(async (m: MovimentoType) => ({
                ...m,
                categoria: await getCategoriaById(m.idCategoria),
              }))
            ) ;
        setCategorias(movsComCategoria);
        setLoading(false);
      }

      getCategorias();
    }, []);

  const totalEntradas = categorias
    .filter((c) => c.tipo_movimento === "CREDITAR")
    .reduce((acc, c) => acc + c.valor, 0);

  const totalSaidas = categorias
    .filter((c) => c.tipo_movimento === "DEBITAR")
    .reduce((acc, c) => acc + c.valor, 0);

/*   if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3A53A4" />
      </View>
    );
  } */

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.headerBox}>
        <Text style={styles.headerText}>Histórico</Text>
      </View>

      {/* Histórico responsivo */}
      <View style={styles.listContainer}>
        <FlatList
          data={categorias}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <View>
                <Text style={styles.catName}>{item.categoria}</Text>
                <Text style={styles.date}>{item.data}</Text>
              </View>
              <Text
                style={[
                  styles.catValue,
                  { color: item.tipo_movimento === "DEBITAR" ? "red" : "green" },
                ]}
              >
                {item.tipo_movimento === "DEBITAR" ? "-" : "+"} R$ {item.valor.toFixed(2)}
              </Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>

      {/* Rodapé com totais */}
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
    marginHorizontal: 15,
    marginTop: 40
  },
  headerText: { color: "#fff", fontSize: 22, fontWeight: "bold", textAlign: "center" },
  listContainer: {
    flex: 1,
    paddingHorizontal: 0,
  },
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
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#f9f9f9",
  },
  total: { fontSize: 18, fontWeight: "bold", textAlign: "center" },
});
