import React, { useContext, useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRenda } from "../context/RendaContext";
import { alterarRenda } from "../services/alterarRenda";
import { UserContext } from "../context/userContext";

export default function AlterarRenda() {
  const { rendaMensal, setRendaMensal } = useRenda();
  const [novoValor, setNovoValor] = useState(""); // string para input
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();
  const context = useContext(UserContext);

  // Formata número em moeda BRL
  const formatCurrency = (value: number) => {
    return (value / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  // Atualiza input sempre que rendaMensal mudar
  useEffect(() => {
    if (rendaMensal !== null && rendaMensal !== undefined) {
      setNovoValor(formatCurrency(rendaMensal * 100)); // multiplica por 100 para centavos
    }
  }, [rendaMensal]);

  const handleChangeText = (text: string) => {
    // Remove tudo que não é número
    const onlyNums = text.replace(/\D/g, "");
    setNovoValor(formatCurrency(parseInt(onlyNums || "0")));
  };

  const handleSalvar = async () => {
    // Converte string de input para número
    const valorNumerico = parseInt(novoValor.replace(/\D/g, "")) / 100;

    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      Alert.alert("Erro", "Digite um valor válido!");
      return;
    }

    setLoading(true);
    try {
      const ok = await alterarRenda(valorNumerico, context?.user);
      if (!ok) return;

      context?.setUser({ ...context.user, renda: valorNumerico });
      setRendaMensal(valorNumerico);

      Alert.alert("Sucesso", "Renda mensal alterada!");
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao salvar renda:", error);
      Alert.alert("Erro", "Erro ao salvar renda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Renda Mensal</Text>
        <Text style={styles.subtitle}>Insira o valor:</Text>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={novoValor}
          onChangeText={handleChangeText}
        />

        <TouchableOpacity
          style={[styles.button, loading && { backgroundColor: "#7fcf9e" }]}
          onPress={handleSalvar}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Salvando..." : "Salvar"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    color: "green",
    marginBottom: 25,
    paddingVertical: 8,
  },
  button: {
    backgroundColor: "#34C759",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
