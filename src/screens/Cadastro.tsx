import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";

type RootStackParamList = {
  Login: undefined;
  // add other routes here if needed
};

export default function Cadastro() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Tela de Cadastro</Text>
        <Button title="Voltar" onPress={() => navigation.goBack()} />
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
