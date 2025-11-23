import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ScrollView, KeyboardAvoidingView, Platform } from "react-native"
import { Feather } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";

type RootStackParamList = {
  Login: undefined;
};

// Importando função para cadastrar usuários
import { cadastrarUsuario } from "../services/cadastroService"

export default function Cadastrar({ navigation }: { navigation: NavigationProp<RootStackParamList> }) {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [senhaVisivel, setSenhaVisivel] = useState(false)
  const [confirmarSenhaVisivel, setConfirmarSenhaVisivel] = useState(false)

  const handleCadastro = async () => {
    try {
      await cadastrarUsuario({ 
        senha,
        nome: username,
        email,
      });
      Alert.alert("Cadastro realizado!", "Você pode fazer login agora.");
      navigation.navigate("Login");
    } catch (error: any) {
      Alert.alert("Erro ao cadastrar", error.message || "Tente novamente.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo */}
        <Image
          source={require("../assets/logo.png")}
          style={styles.logoImage}
        />

        {/* Título */}
        <Text style={styles.title}>Cadastre-se</Text>
        <Text style={styles.subTitle}>
          Venha fazer seu próprio controle financeiro
        </Text>

        {/* Formulário */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="User"
            placeholderTextColor="#999"
            style={styles.input}
            onChangeText={setUsername}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#999"
            style={styles.input}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Senha"
              placeholderTextColor="#999"
              secureTextEntry={!senhaVisivel}
              style={styles.inputPassword}
              onChangeText={setSenha}
            />
            <Feather
              name={senhaVisivel ? "eye" : "eye-off"}
              size={20}
              color="#999"
              onPress={() => setSenhaVisivel(!senhaVisivel)}
            />
          </View>

          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Confirmar Senha"
              placeholderTextColor="#999"
              secureTextEntry={!confirmarSenhaVisivel}
              style={styles.inputPassword}
              onChangeText={setConfirmarSenha}
            />
            <Feather
              name={confirmarSenhaVisivel ? "eye" : "eye-off"}
              size={20}
              color="#999"
              onPress={() => setConfirmarSenhaVisivel(!confirmarSenhaVisivel)}
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleCadastro}
          >
            <Text style={styles.buttonText}>Registre-se</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  logoImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  subTitle: {
    fontSize: 14,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 12,
    borderRadius: 15,
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  inputPassword: {
    flex: 1,
    paddingVertical: 12,
  },
  button: {
    backgroundColor: "#3B55A1",
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
})
