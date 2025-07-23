import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined; // Adicionando Cadastro aqui para tipagem correta
  // o proprio visual me falou pra colocar isso, ainda n entendi oq eh mas nao ta dando mais erros
};

export default function Inicio() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Compass</Text>
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
      <Button title="Cadastre-se" onPress={() => navigation.navigate('Cadastro')} /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
