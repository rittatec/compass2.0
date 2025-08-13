// tela placeholder momentanea de AGUA so para as rotas funcionarem
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AguaScreen() {
  return (
    <View style={styles.container}>
      <Text>Tela de Água</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
