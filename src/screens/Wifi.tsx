// src/screens/Wifi.tsx
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { salvarWifi } from '../services/wifiservice'; // import do service

type RootStackParamList = {
  Menu: undefined;
};

export default function Wifi() {
  const [amount, setAmount] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleSave = async () => {
    try {
      // chama o service passando o valor
      await salvarWifi({ amount: parseFloat(amount) });
      Alert.alert('Sucesso', `Valor do WiFi salvo: R$ ${amount}`);
      navigation.navigate('Menu'); // volta para o Menu
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personalize seus pagamentos</Text>

      {/* Card da Renda Mensal */}
      <View style={styles.card}>
        <Text style={styles.subtitle}>Renda Mensal</Text>
        <View style={styles.incomeBox}>
          <Text style={styles.income}>R$ 0,00</Text>
        </View>
      </View>

      {/* Box para pagamento do WiFi */}
      <View style={styles.paymentBox}>
        <Text style={styles.paymentTitle}>WiFi</Text>
        <Text style={styles.paymentLabel}>Insira o valor:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="R$ 0,00"
          value={amount}
          onChangeText={setAmount}
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#3A53A4',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
  },
  subtitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  incomeBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  income: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  paymentBox: {
    backgroundColor: '#F7F7F7',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  paymentTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  paymentLabel: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 15,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: '#4CAF50',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 40,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
