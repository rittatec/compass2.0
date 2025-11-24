import { useRenda } from "../context/RendaContext";
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { salvarMovimento } from "../services/categoriaService";
import { UserContext } from "../context/userContext";

type RootStackParamList = {
  Menu: undefined;
};

export default function Agua() {
  const [amount, setAmount] = useState("");      // valor formatado
  const [rawValue, setRawValue] = useState(0);   // valor real numérico
  const { rendaMensal } = useRenda();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const category = "Água";
  const tipo_movimento = "DEBITAR"

  const contexto = useContext(UserContext);

  // --- mesma formatação das outras telas ---
  function formatCurrency(value: number) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function handleChange(text: string) {
    const onlyNums = text.replace(/\D/g, "");
    const numericValue = Number(onlyNums) / 100;

    setRawValue(numericValue);
    setAmount(formatCurrency(numericValue));
  }

  const handleSave = async () => {
    if (rawValue <= 0) {
      Alert.alert("Erro", "Digite um valor válido!");
      return;
    }

    try {
      await salvarMovimento({ amount: rawValue, category }, contexto, tipo_movimento);

      Alert.alert("Sucesso", `Valor de água salvo: ${formatCurrency(rawValue)}`);
      navigation.navigate("Menu");
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personalize seus pagamentos</Text>

      <View style={styles.card}>
        <Text style={styles.subtitle}>Renda Mensal</Text>

        <View style={styles.incomeBox}>
          <Text style={styles.income}>
            {formatCurrency(contexto?.user.renda ?? 0)}
          </Text>
        </View>
      </View>

      <View style={styles.paymentBox}>
        <Text style={styles.paymentTitle}>Água</Text>
        <Text style={styles.paymentLabel}>Insira o valor:</Text>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="R$ 0,00"
          value={amount}
          onChangeText={handleChange}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 30, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: '#3A53A4', borderRadius: 12, padding: 20, marginBottom: 30 },
  subtitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
  incomeBox: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  income: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  paymentBox: { backgroundColor: '#F7F7F7', borderRadius: 20, padding: 25, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  paymentTitle: { fontSize: 25, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  paymentLabel: { textAlign: 'center', fontSize: 20, marginBottom: 15 },
  input: { borderBottomWidth: 2, borderBottomColor: '#4CAF50', fontSize: 22, fontWeight: 'bold', color: '#4CAF50', textAlign: 'center', marginBottom: 40 },
  saveButton: { backgroundColor: '#4CAF50', paddingVertical: 12, borderRadius: 25, alignItems: 'center' },
  saveText: { color: '#fff', fontWeight: 'bold', fontSize: 20 },
});
