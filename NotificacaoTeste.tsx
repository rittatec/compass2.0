import { View, Text, Button } from "react-native";

export default function NotificacaoTeste({ expoPushToken }: any) {
  function enviarToken() {
    fetch("http://localhost:3000/tokens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: expoPushToken }),
    });
  }

  return (
    <View style={{ marginTop: 80, padding: 20 }}>
      <Text style={{ marginBottom: 20, fontSize: 18 }}>
        Token atual:
      </Text>

      <Text selectable style={{ marginBottom: 20 }}>
        {expoPushToken || "Nenhum token ainda"}
      </Text>

      <Button title="Enviar token ao servidor" onPress={enviarToken} />
    </View>
  );
}