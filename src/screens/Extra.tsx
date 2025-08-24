import { useRenda } from "../context/RendaContext";
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { salvarExtra } from '../services/extraService'; // serviço simulado

type RootStackParamList = {
  Menu: undefined;
};

export default function Extra() {
  const [amount, setAmount] = useState("");
  const { rendaMensal, somarRenda } = useRenda(); // pega renda global
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleSave = async () => {
    const valor = parseFloat(amount);
    if (isNaN(valor) || valor <= 0) {
      Alert.alert("Erro", "Digite um valor válido!");
      return;
    }

  try {
      await salvarExtra({ amount: valor });
      somarRenda(valor); // soma da renda global 
      Alert.alert("Sucesso", `Valor da renda Extra salvo: R$ ${valor.toFixed(2)}`);
      navigation.navigate("Menu");
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Tela de Extra</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
