import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { recuperarSenha } from "../services/recuperarSenha";

type RootStackParamList = {
  Login: undefined;
};

export default function RecuperarSenha() {
  const [email, setEmail] = useState<string>("");
  const [novaSenha, setNovaSenha] = useState<string>("");
  const [forcaSenha, setForcaSenha] = useState("");

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const verificarForcaSenha = (senha: string) => {
    if (senha.length < 4) return "Fraca";
    const forteRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;
    const mediaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
    if (forteRegex.test(senha)) return "Forte";
    if (mediaRegex.test(senha)) return "Média";
    return "Fraca";
  };

  const handleRecuperar = async () => {
    if (!email.trim() || !novaSenha.trim()) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    if (novaSenha.length < 4) {
      Alert.alert("Erro", "A senha deve ter pelo menos 4 caracteres.");
      return;
    }

    const senhaForteRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;
    if (!senhaForteRegex.test(novaSenha)) {
      Alert.alert(
        "Erro",
        "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um símbolo."
      );
      return;
    }

    try {
      const result = await recuperarSenha({ email, novaSenha });
      let mensagem = "";

      if (typeof result === "string") mensagem = result;
      else if (result && typeof result === "object" && (result as any).message)
        mensagem = (result as any).message;
      else mensagem = "Senha redefinida com sucesso.";

      Alert.alert("Sucesso", mensagem);
      navigation.navigate("Login");
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Não foi possível conectar ao servidor.");
    }
  };

  // Verificações para dicas
  const temMaiuscula = /[A-Z]/.test(novaSenha);
  const temMinuscula = /[a-z]/.test(novaSenha);
  const temNumero = /\d/.test(novaSenha);
  const temSimbolo = /[@$!%*?&]/.test(novaSenha);
  const temMinimo = novaSenha.length >= 4;

  const barraCor = () =>
    forcaSenha === "Forte" ? "green" : forcaSenha === "Média" ? "orange" : "red";
  const barraLargura = () =>
    forcaSenha === "Forte" ? "100%" : forcaSenha === "Média" ? "66%" : "33%";
  const dicaCor = (condicao: boolean) => (condicao ? "green" : "red");

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Recuperar Senha</Text>
          <Text style={styles.subtitle}>
            Digite seu e-mail e a nova senha desejada.
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

          <TextInput
            placeholder="Nova Senha"
            value={novaSenha}
            onChangeText={(value) => {
              setNovaSenha(value);
              setForcaSenha(verificarForcaSenha(value));
            }}
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#999"
          />

          {/* Barra horizontal de força */}
          {novaSenha.length > 0 && (
            <View style={styles.barraContainerHorizontal}>
              <View
                style={[
                  styles.barraForcaHorizontal,
                  { width: barraLargura(), backgroundColor: barraCor() },
                ]}
              />
            </View>
          )}

          {/* Dicas de senha */}
          {novaSenha.length > 0 && (
            <View style={{ marginBottom: 15 }}>
              <Text style={{ color: dicaCor(temMinimo) }}>• Mínimo 4 caracteres</Text>
              <Text style={{ color: dicaCor(temMaiuscula) }}>• Pelo menos uma letra maiúscula</Text>
              <Text style={{ color: dicaCor(temMinuscula) }}>• Pelo menos uma letra minúscula</Text>
              <Text style={{ color: dicaCor(temNumero) }}>• Pelo menos um número</Text>
              <Text style={{ color: dicaCor(temSimbolo) }}>• Pelo menos um símbolo (@$!%*?&)</Text>
            </View>
          )}

          <TouchableOpacity style={styles.button} onPress={handleRecuperar}>
            <Text style={styles.buttonText}>Redefinir Senha</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.voltarTexto}>Voltar ao Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, backgroundColor: "#F9F9F9" },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: { fontSize: 26, fontWeight: "bold", color: "#000", marginBottom: 10 },
  subtitle: { fontSize: 15, color: "#555", textAlign: "center", marginBottom: 30 },
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
  buttonText: { fontSize: 18, color: "#FFF", fontWeight: "bold" },
  voltarTexto: { color: "#3B55A1", marginTop: 20, fontSize: 16 },

  // Barra horizontal
  barraContainerHorizontal: {
    width: "100%",
    height: 10,
    backgroundColor: "#eee",
    borderRadius: 5,
    marginBottom: 10,
  },
  barraForcaHorizontal: {
    height: "100%",
    borderRadius: 5,
  },
});
