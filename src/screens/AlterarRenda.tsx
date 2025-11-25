import React, { useContext, useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRenda } from "../context/RendaContext";
import { alterarRenda } from "../services/alterarRenda";
import { UserContext } from "../context/userContext";

export default function AlterarRenda() {
  const { rendaMensal, setRendaMensal } = useRenda();
  const [novoValor, setNovoValor] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();
  const context = useContext(UserContext);

  const formatCurrency = (value: number) => {
    return (value / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  useEffect(() => {
    setNovoValor(formatCurrency((rendaMensal ?? 0) * 100));
  }, [rendaMensal]);

  const handleChangeText = (text: string) => {
    const onlyNums = text.replace(/\D/g, "");
    setNovoValor(formatCurrency(parseInt(onlyNums || "0")));
  };

  const handleSalvar = async () => {
    const valorNumerico = parseInt(novoValor.replace(/\D/g, "")) / 100;

    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      return Alert.alert("Erro", "Digite um valor válido!");
    }

    setLoading(true);

    try {
      const ok = await alterarRenda(valorNumerico, context?.user);
      if (!ok) return;

      context?.setUser({ renda: valorNumerico });
      setRendaMensal(valorNumerico);

      Alert.alert("Sucesso", "Renda mensal atualizada!");
      navigation.goBack();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Renda Mensal</Text>

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
          <Text style={styles.buttonText}>{loading ? "Salvando..." : "Salvar"}</Text>
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
    elevation: 4,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    color: "green",
    marginBottom: 25,
  },
  button: {
    backgroundColor: "#34C759",
    borderRadius: 25,
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
