import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";

// Define os tipos de navegação (as telas disponíveis no stack)
type RootStackParamList = {
  Login: undefined;
  RecuperarSenha: undefined;
};

export default function RecuperarSenha() {
  const [email, setEmail] = useState<string>("");

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleRecuperar = async () => {
    if (!email.trim()) {
      Alert.alert("Erro", "Por favor, insira seu e-mail.");
      return;
    }

    try {
      // API de recuperação de senha, ex:
      // await api.post("/recuperar-senha", { email });

      Alert.alert(
        "Verifique seu e-mail",
        "Enviamos um link de redefinição de senha para o e-mail informado."
      );
      navigation.navigate("Login"); // retorna pra tela de login
    } catch (error) {
      Alert.alert("Erro", "Não foi possível enviar o e-mail de recuperação.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Senha</Text>
      <Text style={styles.subtitle}>
        Digite o e-mail associado à sua conta para redefinir sua senha.
      </Text>

      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.button} onPress={handleRecuperar}>
        <Text style={styles.buttonText}>Enviar Link</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.voltarTexto}>Voltar ao Login</Text>
      </TouchableOpacity>
    </View>
  );
}

// 💅 Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#F0F0F0",
    width: "100%",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  button: {
    backgroundColor: "#3B55A1",
    paddingVertical: 15,
    width: "100%",
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
  voltarTexto: {
    color: "#3B55A1",
    marginTop: 20,
    fontSize: 16,
  },
});
