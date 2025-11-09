import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity, Image, StyleSheet } from "react-native";
import { fazerLogin } from "../services/loginServise";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { UserContext } from "../context/userContext";
import { api } from "../services/api";

export default function Login() {
  const [nome, setnome] = useState("");
  const [senha, setSenha] = useState("");

  type RootStackParamList = {
    Menu: undefined;
    RecuperarSenha: undefined; // caso queira criar uma tela futura
  };

  const user = useContext(UserContext);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    async function getResponse() {
      const response = await api.get("/conta/por_usuario/{idUsuario}");
    }
  }, []);

  const handleLogin = async () => {
    try {
      const userResponse = await fazerLogin(nome, senha);
      user?.setUser(userResponse);
      Alert.alert("Login realizado!", `Bem-vindo(a), ${nome}`);
      navigation.navigate("Menu");
    } catch (erro: any) {
      Alert.alert("Erro no login", erro.message);
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate("RecuperarSenha");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        style={styles.logoImage}
      />

      <Text style={styles.loginTitle}>Login</Text>
      <Text style={styles.subTitle}>Bem vindo(a) de volta!</Text>

      <TextInput
        placeholder="Usuário"
        value={nome}
        onChangeText={setnome}
        autoCapitalize="none"
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        style={styles.input}
        secureTextEntry
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      {/* link de esqueci minha senha */}
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logoImage: {
    width: 100,
    height: 100,
    marginBottom: 30,
    resizeMode: "contain",
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  subTitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 30,
    marginTop: 5,
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
  forgotPasswordText: {
    marginTop: 15,
    color: "#3B55A1",
    fontWeight: "bold",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
