import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

export default function HomeScreen({ user }) {
  async function sair() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>
          Bem-vindo ao AchouNoIF!
        </Text>

        <Text style={styles.email}>
          {user?.email}
        </Text>

        <Text style={styles.texto}>
          Você está conectado com sucesso.
        </Text>

        <TouchableOpacity
          style={styles.botao}
          onPress={sair}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotao}>
            Sair
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f7fb",
    padding: 20,
  },

  card: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#fff",
    padding: 35,
    borderRadius: 15,
    alignItems: "center",
    elevation: 6,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },

  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e3a8a",
    textAlign: "center",
    marginBottom: 8,
  },

  email: {
    color: "#2563eb",
    fontWeight: "600",
    marginBottom: 6,
  },

  texto: {
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 24,
  },

  botao: {
    width: "100%",
    height: 48,
    borderRadius: 8,
    backgroundColor: "#dc2626",
    justifyContent: "center",
    alignItems: "center",
  },

  textoBotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
