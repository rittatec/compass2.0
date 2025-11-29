import { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { salvarMovimento } from "../services/categoriaService";

import { UserContext } from "../context/userContext";

type RootStackParamList = {
  Menu: undefined;
};

export default function Wifi() {
  const [amount, setAmount] = useState(""); // valor formatado p/ exibição
  const [rawValue, setRawValue] = useState(0); // valor numérico real

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const contexto = useContext(UserContext);

  const category = "Wi-fi";
  const tipo_movimento = "DEBITAR"

  // ---------- FUNÇÃO DE FORMATAÇÃO ----------
  function formatCurrency(value: number) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  // ---------- MÁSCARA ENQUANTO DIGITA ----------
  function handleChange(text: string) {
    const onlyNums = text.replace(/\D/g, ""); // remove tudo que não é número
    const numericValue = Number(onlyNums) / 100; // transforma para centavos

    setRawValue(numericValue); // guarda valor numérico real
    setAmount(formatCurrency(numericValue)); // mostra formatado pro usuário
  }

  // ----------- SALVAR ----------------
  const handleSave = async () => {
    if (rawValue <= 0) {
      Alert.alert("Erro", "Digite um valor válido!");
      return;
    }

    try {
      await salvarMovimento({ amount: rawValue, category }, contexto, tipo_movimento);

      Alert.alert("Sucesso", `Valor do pagamento do Wifi salvo: ${formatCurrency(rawValue)}`);
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
        <Text style={styles.paymentTitle}>Wifi</Text>
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
