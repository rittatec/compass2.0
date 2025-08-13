import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

export default function Menu() {
  const navigation = useNavigation<any>();

return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Bem vindo(a), Cliente.</Text>

      {/* Card de Renda Mensal */}
      <View style={styles.card}>
        <View>
          <Text style={styles.cardTitle}>Renda Mensal</Text>
          <Text style={styles.cardValue}>R$ 0,00</Text>
        </View>
        <TouchableOpacity style={styles.buttonAlterar}>
          <Text style={styles.buttonText}>Alterar</Text>
        </TouchableOpacity>
      </View>

      {/* Pagamentos Mensais */}
      <Text style={styles.sectionTitle}>Pagamentos mensais</Text>
      <View style={styles.grid}>
        <TouchableOpacity style={[styles.item, { backgroundColor: '#4DB6FF' }]} onPress={() => navigation.navigate('Agua')}>
          <Ionicons name="water" size={35} color="#fff" />
          <Text style={styles.itemText}>Água</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.item, { backgroundColor: '#4CAF50' }]} onPress={() => navigation.navigate('Energia')}>
          <MaterialIcons name="bolt" size={35} color="#fff" />
          <Text style={styles.itemText}>Energia</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.item, { backgroundColor: '#BA68C8' }]} onPress={() => navigation.navigate('Wifi')}>
          <Ionicons name="wifi" size={35} color="#fff" />
          <Text style={styles.itemText}>Wi-Fi</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.item, { backgroundColor: '#FF8A65' }]} onPress={() => navigation.navigate('Alimento')}>
          <MaterialIcons name="restaurant" size={35} color="#fff" />
          <Text style={styles.itemText}>Alimento</Text>
        </TouchableOpacity>
      </View>

      {/* Categorias */}
      <Text style={styles.sectionTitle}>Categorias</Text>
      <View style={styles.grid}>
        <TouchableOpacity style={[styles.item, { backgroundColor: '#8E24AA' }]} onPress={() => navigation.navigate('Extra')}>
          <MaterialIcons name="attach-money" size={28} color="#fff" />
          <Text style={styles.itemText}>Extra</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.item, { backgroundColor: '#26A69A' }]} onPress={() => navigation.navigate('Poupanca')}>
          <FontAwesome name="bank" size={28} color="#fff" />
          <Text style={styles.itemText}>Poupança</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.item, { backgroundColor: '#FFEB3B' }]} onPress={() => navigation.navigate('Investido')}>
        <MaterialCommunityIcons name="chart-line" size={28} color="#fff" />
          <Text style={[styles.itemText, { color: '#000' }]}>Investido</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.item, { backgroundColor: '#FF7043' }]} onPress={() => navigation.navigate('Receber')}>
          <MaterialCommunityIcons name="cash-plus" size={28} color="#fff" />
          <Text style={styles.itemText}>Receber</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.item, { backgroundColor: '#E91E63' }]} onPress={() => navigation.navigate('Saude')}>
          <FontAwesome name="heartbeat" size={28} color="#fff" />
          <Text style={styles.itemText}>Saúde</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    padding: 20 },
    
  welcome: { 
    fontSize: 20, 
    fontWeight: 'bold',
    marginBottom: 20 },

  card: {
    backgroundColor: '#3f51b5',
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16 },

  cardValue: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold' },

  buttonAlterar: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5 },

  buttonText: {
    color: '#000',
    fontWeight: 'bold' },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10 },

  grid: { 
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12 },

  item: { 
    width: '22%', 
    height: '5%',
    aspectRatio: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center' },

  itemText: { 
    color: '#fff',
    marginTop: 5, 
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12 },
});
