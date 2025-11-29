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
import { PerfilService, PerfilResponse } from "../services/PerfilService";

export default function Perfil() {
  const [usuarioId, setUsuarioId] = useState<number | null>(null);

  const [perfil, setPerfil] = useState<PerfilResponse>({
    foto: null,
    nome: "",
    nascimento: "",
    email: "",
    telefone: "",
  });

  // ---------------------- FORMATAÇÕES ----------------------

  const formatarData = (texto: string) => {
    const n = texto.replace(/\D/g, "");

    if (n.length <= 2) return n;
    if (n.length <= 4) return n.replace(/(\d{2})(\d{0,2})/, "$1/$2");

    return n.replace(/(\d{2})(\d{2})(\d{0,4})/, "$1/$2/$3");
  };

  const formatarTelefone = (texto: string) => {
    let n = texto.replace(/\D/g, "");

    // Limita tamanho máximo (DDD + 9 dígitos)
    if (n.length > 11) n = n.slice(0, 11);

    // (XX
    if (n.length <= 2) return `(${n}`;

    // (XX) 9
    if (n.length <= 7)
      return `(${n.slice(0, 2)}) ${n.slice(2)}`;

    // (XX) 99999-9999
    return `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`;
  };


  // ----------------------------------------------------------

  useEffect(() => {
    carregarPerfil();
  }, []);

  const carregarPerfil = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");

      if (!userId) {
        console.log("Usuário não encontrado no AsyncStorage.");
        return;
      }

      const idConvertido = Number(userId);
      setUsuarioId(idConvertido);

      const dados = await PerfilService.buscarPerfil(idConvertido);

      if (!dados) {
        console.log("Perfil não encontrado no backend");
        return;
      }

      setPerfil({
        foto: dados.foto ?? null,
        nome: dados.nome ?? "",
        nascimento: dados.nascimento ? formatarData(dados.nascimento) : "",
        email: dados.email ?? "",
        telefone: dados.telefone ? formatarTelefone(dados.telefone) : "",
      });

      await AsyncStorage.setItem("perfil", JSON.stringify(dados));

    } catch (e) {
      console.log("Backend offline. Buscando perfil salvo localmente...");

      const local = await AsyncStorage.getItem("perfil");
      if (local) setPerfil(JSON.parse(local));
    }
  };

  const salvarPerfil = async () => {
    if (!usuarioId) {
      Alert.alert("Erro", "Usuário não encontrado.");
      return;
    }

    try {
      await PerfilService.atualizarPerfil(usuarioId, perfil);
      await AsyncStorage.setItem("perfil", JSON.stringify(perfil));

      Alert.alert("Sucesso!", "Seu perfil foi atualizado.");
    } catch (e) {
      console.log("Erro ao salvar:", e);
      Alert.alert("Erro", "Não foi possível salvar no servidor.");
    }
  };

  const selecionarImagem = async () => {
    if (!usuarioId) {
      Alert.alert("Erro", "Usuário não encontrado.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      setPerfil((prev) => ({ ...prev, foto: uri }));

      try {
        await PerfilService.enviarImagem(usuarioId, uri);
        Alert.alert("Imagem enviada com sucesso!");
      } catch (error) {
        console.log(error);
        Alert.alert("Erro", "Não foi possível enviar a imagem.");
      }
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
        <View style={{ height: 150 }} />

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

        {/* DATA DE NASCIMENTO FORMATADA */}
        <TextInput
          style={styles.input}
          placeholder="Data de Nascimento (DD/MM/AAAA)"
          value={perfil.nascimento}
          onChangeText={(text) =>
            setPerfil({ ...perfil, nascimento: formatarData(text) })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={perfil.email}
          keyboardType="email-address"
          onChangeText={(text) => setPerfil({ ...perfil, email: text })}
        />

        {/* TELEFONE FORMATADO */}
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={perfil.telefone}
          keyboardType="phone-pad"
          onChangeText={(text) =>
            setPerfil({ ...perfil, telefone: formatarTelefone(text) })
          }
        />

        <TouchableOpacity style={styles.button} onPress={salvarPerfil}>
          <Text style={styles.buttonText}>Salvar Perfil</Text>
        </TouchableOpacity>

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
