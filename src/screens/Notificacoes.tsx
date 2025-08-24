import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Notificacoes() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Notificações 🚧</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3f51b5",
  },
});
