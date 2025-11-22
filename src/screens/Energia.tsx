import { useRenda } from "../context/RendaContext";
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { salvarEnergia } from '../services/energiaService';
import { salvarDebito } from "../services/categoriaService";
import { UserContext } from "../context/userContext";

type RootStackParamList = {
  Menu: undefined;
};

export default function Energia() {
  const [amount, setAmount] = useState("");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const contexto = useContext(UserContext);

  const category = "Energia";

  function formatInputCurrency(text: string) {
    const onlyNums = text.replace(/\D/g, ""); // limpa tudo que não for número

    if (!onlyNums) {
      setAmount("");
      return;
    }

    const value = (parseInt(onlyNums) / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    setAmount(value);
  }

  const handleSave = async () => {
    // Converte "R$ 120,50" → 120.50
    const numericValue = parseFloat(
      amount.replace("R$", "").replace(/\./g, "").replace(",", ".")
    );

    if (isNaN(numericValue) || numericValue <= 0) {
      Alert.alert("Erro", "Digite um valor válido!");
      return;
    }

    try {
      await salvarDebito({ amount: numericValue, category }, contexto);

      Alert.alert("Sucesso", `Valor de energia salvo: R$ ${numericValue.toFixed(2)}`);
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
            R$ {contexto?.user.renda.toFixed(2)}
          </Text>
        </View>
      </View>

      <View style={styles.paymentBox}>
        <Text style={styles.paymentTitle}>Energia</Text>
        <Text style={styles.paymentLabel}>Insira o valor:</Text>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="R$ 0,00"
          value={amount}
          onChangeText={formatInputCurrency}
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
