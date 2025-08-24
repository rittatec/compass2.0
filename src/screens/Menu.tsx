import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from "react-native";
import type { ColorValue } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialIcons, MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRenda } from "../context/RendaContext";

export default function Menu() {
  const navigation = useNavigation<any>();
  const { rendaMensal } = useRenda(); // pega do contexto da renda

  // Arrays para mapear os itens

  const pagamentos = [
    { name: "Água", icon: <Ionicons name="water" size={35} color="#fff" />, colors: ["#4DB6FF", "#1976D2"] as readonly [ColorValue, ColorValue], screen: "Agua" },
    { name: "Energia", icon: <MaterialIcons name="bolt" size={35} color="#fff" />, colors: ["#4CAF50", "#2E7D32"] as readonly [ColorValue, ColorValue], screen: "Energia" },
    { name: "Wi-Fi", icon: <Ionicons name="wifi" size={35} color="#fff" />, colors: ["#BA68C8", "#6A1B9A"] as readonly [ColorValue, ColorValue], screen: "Wifi" },
    { name: "Alimento", icon: <MaterialIcons name="restaurant" size={35} color="#fff" />, colors: ["#FF8A65", "#D84315"] as readonly [ColorValue, ColorValue], screen: "Alimento" },
  ];

  const categorias = [
    { name: "Extra", icon: <MaterialIcons name="attach-money" size={28} color="#fff" />, colors: ["#8E24AA", "#4A148C"] as readonly [ColorValue, ColorValue], screen: "Extra" },
    { name: "Poupança", icon: <FontAwesome name="bank" size={28} color="#fff" />, colors: ["#26A69A", "#004D40"] as readonly [ColorValue, ColorValue], screen: "Poupanca" },
    { name: "Investido", icon: <MaterialCommunityIcons name="finance" size={28} color="#fff" />, colors: ["#FFD54F", "#F57F17"] as readonly [ColorValue, ColorValue], screen: "Investido" },
    { name: "Receber", icon: <MaterialCommunityIcons name="cash-plus" size={28} color="#fff" />, colors: ["#FF7043", "#BF360C"] as readonly [ColorValue, ColorValue], screen: "Receber" },
    { name: "Saúde", icon: <FontAwesome name="heartbeat" size={28} color="#fff" />, colors: ["#E91E63", "#880E4F"] as readonly [ColorValue, ColorValue], screen: "Saude" },
  ];

  return (
 <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.welcome}>Bem vindo(a), Cliente.</Text>

      <View style={[styles.card, styles.shadow]}>
        <View>
          <Text style={styles.cardTitle}>Renda Mensal</Text>
          <Text style={styles.cardValue}>R$ {rendaMensal.toFixed(2)}</Text>
        </View>
        <TouchableOpacity 
          style={styles.buttonAlterar}
          onPress={() => navigation.navigate("AlterarRenda")} // futuramente tela de alterar
        >
          <Text style={styles.buttonText}>Alterar</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionTitle}>Pagamentos mensais</Text>
      <View style={styles.grid}>
        {pagamentos.map((item, index) => (
          <TouchableOpacity key={index} style={styles.item} onPress={() => navigation.navigate(item.screen)}>
            <LinearGradient colors={item.colors} style={[styles.gradient, styles.shadow]}>
              {item.icon}
            </LinearGradient>
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Categorias</Text>
      <View style={styles.grid}>
        {categorias.map((item, index) => (
          <TouchableOpacity key={index} style={styles.item} onPress={() => navigation.navigate(item.screen)}>
            <LinearGradient colors={item.colors} style={[styles.gradient, styles.shadow]}>
              {item.icon}
            </LinearGradient>
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? 50 : 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
    backgroundColor: "#fff",
  },

  welcome: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#3f51b5",
    borderRadius: 10,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  cardTitle: { color: "#fff", fontSize: 16 },
  cardValue: { color: "#fff", fontSize: 22, fontWeight: "bold" },

  buttonAlterar: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },

  buttonText: { color: "#000", fontWeight: "bold" },

  sectionTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  item: {
    width: "22%",
    alignItems: "center",
    marginBottom: 20,
  },

  gradient: {
    width: 70,
    height: 70,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  itemText: {
    marginTop: 5,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 12,
    color: "#333",
  },

  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
});
