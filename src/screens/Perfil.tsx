import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

type PerfilType = {
  foto: string | null;
  nome: string;
  nascimento: string;
  email: string;
  telefone: string;
};

export default function Perfil() {
  const [perfil, setPerfil] = useState<PerfilType>({
    foto: null,
    nome: "",
    nascimento: "",
    email: "",
    telefone: "",
  });

  useEffect(() => {
    const carregarPerfil = async () => {
      try {
        const dados = await AsyncStorage.getItem("perfil");
        if (dados) setPerfil(JSON.parse(dados));
      } catch (e) {
        console.log("Erro ao carregar perfil:", e);
      }
    };
    carregarPerfil();
  }, []);

  const salvarPerfil = async () => {
    try {
      await AsyncStorage.setItem("perfil", JSON.stringify(perfil));
      Alert.alert("Perfil salvo!", "Seus dados foram atualizados.");
    } catch (e) {
      console.log("Erro ao salvar perfil:", e);
    }
  };

  const selecionarImagem = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setPerfil({ ...perfil, foto: result.assets[0].uri });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Espaço superior para deixar mais confortável */}
        <View style={{ height:150 }} />

        <TouchableOpacity onPress={selecionarImagem} style={{ alignItems: "center" }}>
          <Image
            source={
              perfil.foto
                ? { uri: perfil.foto }
                : { uri: "https://i.pravatar.cc/150?img=12" }
            }
            style={styles.avatar}
          />
          <Text style={styles.alterarFoto}>Alterar Foto</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={perfil.nome}
          onChangeText={(text) => setPerfil({ ...perfil, nome: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Data de Nascimento (AAAA-MM-DD)"
          value={perfil.nascimento}
          onChangeText={(text) => setPerfil({ ...perfil, nascimento: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={perfil.email}
          keyboardType="email-address"
          onChangeText={(text) => setPerfil({ ...perfil, email: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={perfil.telefone}
          keyboardType="phone-pad"
          onChangeText={(text) => setPerfil({ ...perfil, telefone: text })}
        />

        <TouchableOpacity style={styles.button} onPress={salvarPerfil}>
          <Text style={styles.buttonText}>Salvar Perfil</Text>
        </TouchableOpacity>

        {/* Espaço inferior para não colar no final */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#3f51b5",
  },
  alterarFoto: {
    textAlign: "center",
    color: "#3f51b5",
    fontWeight: "bold",
    marginTop: 6,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    width: "100%",
    backgroundColor: "#3f51b5",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
