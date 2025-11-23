import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ScrollView, KeyboardAvoidingView, Platform } from "react-native"
import { Feather } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import { cadastrarUsuario } from "../services/cadastroService"

type RootStackParamList = {
  Login: undefined;
};

export default function Cadastrar({ navigation }: { navigation: NavigationProp<RootStackParamList> }) {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [senhaVisivel, setSenhaVisivel] = useState(false)
  const [confirmarSenhaVisivel, setConfirmarSenhaVisivel] = useState(false)
  const [forcaSenha, setForcaSenha] = useState(""); // "Fraca", "Média", "Forte"

  const verificarForcaSenha = (senha: string) => {
    if (senha.length < 4) return "Fraca";
    const forteRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;
    const mediaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
    if (forteRegex.test(senha)) return "Forte";
    if (mediaRegex.test(senha)) return "Média";
    return "Fraca";
  };

  const handleCadastro = async () => {
    if (!username.trim() || !email.trim() || !senha.trim() || !confirmarSenha.trim()) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    if (senha.length < 4) {
      Alert.alert("Erro", "A senha deve ter pelo menos 4 caracteres.");
      return;
    }

    const senhaForteRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;
    if (!senhaForteRegex.test(senha)) {
      Alert.alert(
        "Erro",
        "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um símbolo."
      );
      return;
    }

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

  // Funções auxiliares para barra e cores
  const barraCor = () => forcaSenha === "Forte" ? "green" : forcaSenha === "Média" ? "orange" : "red";
  const barraLargura = () => forcaSenha === "Forte" ? "100%" : forcaSenha === "Média" ? "66%" : "33%";
  const dicaCor = (condicao: boolean) => condicao ? "green" : "red";

  const temMaiuscula = /[A-Z]/.test(senha);
  const temMinuscula = /[a-z]/.test(senha);
  const temNumero = /\d/.test(senha);
  const temSimbolo = /[@$!%*?&]/.test(senha);
  const temMinimo = senha.length >= 4;

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Image source={require("../assets/logo.png")} style={styles.logoImage} />
        <Text style={styles.title}>Cadastre-se</Text>
        <Text style={styles.subTitle}>Venha fazer seu próprio controle financeiro</Text>

        <View style={styles.inputContainer}>
          <TextInput placeholder="User" placeholderTextColor="#999" style={styles.input} onChangeText={setUsername} />
          <TextInput placeholder="Email" placeholderTextColor="#999" style={styles.input} onChangeText={setEmail} keyboardType="email-address" />

          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Senha"
              placeholderTextColor="#999"
              secureTextEntry={!senhaVisivel}
              style={styles.inputPassword}
              onChangeText={(value) => {
                setSenha(value);
                setForcaSenha(verificarForcaSenha(value));
              }}
            />
            <Feather name={senhaVisivel ? "eye" : "eye-off"} size={20} color="#999" onPress={() => setSenhaVisivel(!senhaVisivel)} />
          </View>

          {senha.length > 0 && (
            <>
              {/* Barra de força */}
              <View style={styles.barraContainer}>
                <View style={[styles.barraForca, { width: barraLargura(), backgroundColor: barraCor() }]} />
              </View>
              <Text style={{ color: barraCor(), fontWeight: "bold", marginBottom: 5 }}>Força da senha: {forcaSenha}</Text>

              {/* Dicas */}
              <Text style={{ color: dicaCor(temMinimo) }}>• Mínimo 4 caracteres</Text>
              <Text style={{ color: dicaCor(temMaiuscula) }}>• Pelo menos uma letra maiúscula</Text>
              <Text style={{ color: dicaCor(temMinuscula) }}>• Pelo menos uma letra minúscula</Text>
              <Text style={{ color: dicaCor(temNumero) }}>• Pelo menos um número</Text>
              <Text style={{ color: dicaCor(temSimbolo) }}>• Pelo menos um símbolo (@$!%*?&)</Text>
            </>
          )}

          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Confirmar Senha"
              placeholderTextColor="#999"
              secureTextEntry={!confirmarSenhaVisivel}
              style={styles.inputPassword}
              onChangeText={setConfirmarSenha}
            />
            <Feather name={confirmarSenhaVisivel ? "eye" : "eye-off"} size={20} color="#999" onPress={() => setConfirmarSenhaVisivel(!confirmarSenhaVisivel)} />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleCadastro}>
            <Text style={styles.buttonText}>Registre-se</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#f9f9f9", alignItems: "center", justifyContent: "center", paddingHorizontal: 20, paddingVertical: 20 },
  logoImage: { width: 100, height: 100, marginBottom: 20, resizeMode: "contain" },
  title: { fontSize: 28, fontWeight: "bold", color: "#000" },
  subTitle: { fontSize: 14, color: "#333", marginBottom: 20, textAlign: "center" },
  inputContainer: { width: "100%" },
  input: { backgroundColor: "#fff", borderColor: "#ccc", borderWidth: 1, padding: 12, borderRadius: 15, marginBottom: 10 },
  passwordContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderColor: "#ccc", borderWidth: 1, borderRadius: 15, paddingHorizontal: 12, marginBottom: 10 },
  inputPassword: { flex: 1, paddingVertical: 12 },
  barraContainer: { height: 6, width: "100%", backgroundColor: "#eee", borderRadius: 5, marginBottom: 5 },
  barraForca: { height: "100%", borderRadius: 5 },
  button: { backgroundColor: "#3B55A1", paddingVertical: 15, borderRadius: 20, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
})
