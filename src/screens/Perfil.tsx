import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
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

  // Carregar dados do AsyncStorage
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

  // Salvar dados no AsyncStorage
  const salvarPerfil = async () => {
    try {
      await AsyncStorage.setItem("perfil", JSON.stringify(perfil));
      Alert.alert("Perfil salvo!", "Seus dados foram atualizados.");
    } catch (e) {
      console.log("Erro ao salvar perfil:", e);
    }
  };

  // Selecionar imagem do dispositivo
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
    <View style={styles.container}>
      {/* Foto do perfil */}
      <TouchableOpacity onPress={selecionarImagem}>
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

      {/* Campos de edição */}
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

      {/* Botão Salvar */}
      <TouchableOpacity style={styles.button} onPress={salvarPerfil}>
        <Text style={styles.buttonText}>Salvar Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 20,
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
