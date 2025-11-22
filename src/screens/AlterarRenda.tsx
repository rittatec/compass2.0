import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet,} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRenda } from "../context/RendaContext";
import { alterarRenda } from "../services/alterarRenda";
import { UserContext } from "../context/userContext";

export default function AlterarRenda() {
  const { rendaMensal, setRendaMensal } = useRenda();
  const [novoValor, setNovoValor] = useState(formatCurrency(rendaMensal));
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();

  const context = useContext(UserContext);

  // Função de formatação em R$
  function formatCurrency(value: number | string) {
    if (!value) return "R$ 0,00";

    // Mantém apenas números
    const onlyNums = value.toString().replace(/\D/g, "");

    // Divide por 100 para virar centavos
    const numberValue = parseFloat(onlyNums) / 100;

    return numberValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  const handleChangeText = (text: string) => {
    setNovoValor(formatCurrency(text));
  };

  const handleSalvar = async () => {
    // Converte de volta para número puro
    const valorNumerico = Number(
      novoValor.replace(/\D/g, "")
    ) / 100;

    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      Alert.alert("Erro", "Digite um valor válido!");
      return;
    }

    setLoading(true);

    try {
      // Aqui eh pra ficar o backend real
      // const response = await axios.put("http://SEU_BACKEND/api/renda", { renda: valorNumerico });

      // Mock de backend (simulação de resposta)
      /* const response = await new Promise((resolve) =>
        setTimeout(() => resolve({ data: { renda: valorNumerico } }), 1200)
      ); */

      // @ts-ignore (o chat que falou que colocar isso seria relevante mas n entendi mt bem)
      // setRendaMensal(response.data.renda);

      alterarRenda(valorNumerico, context)

      Alert.alert("Sucesso", "Renda mensal alterada!");
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao salvar renda:", error);
      Alert.alert("Erro", "Não foi possível salvar.");
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
    backgroundColor: "#34C759", // verde estilo iOS
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
