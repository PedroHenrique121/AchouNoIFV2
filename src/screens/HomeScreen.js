<<<<<<< HEAD
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

=======
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
>>>>>>> 76bc0a53c6c01c8f29dea2d54a309ed71f2dd73c
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

export default function HomeScreen({ user }) {
  async function sair() {
<<<<<<< HEAD
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
=======
    await signOut(auth);
>>>>>>> 76bc0a53c6c01c8f29dea2d54a309ed71f2dd73c
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
<<<<<<< HEAD
        <Text style={styles.titulo}>
          Bem-vindo ao AchouNoIF!
        </Text>

        <Text style={styles.email}>
          {user?.email}
        </Text>

        <Text style={styles.texto}>
          Você está conectado com sucesso.
        </Text>
=======
        <Text style={styles.titulo}>Bem-vindo ao AchouNoIF!</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <Text style={styles.texto}>Você está conectado com sucesso.</Text>
>>>>>>> 76bc0a53c6c01c8f29dea2d54a309ed71f2dd73c

        <TouchableOpacity
          style={styles.botao}
          onPress={sair}
          activeOpacity={0.8}
        >
<<<<<<< HEAD
          <Text style={styles.textoBotao}>
            Sair
          </Text>
=======
          <Text style={styles.textoBotao}>Sair</Text>
>>>>>>> 76bc0a53c6c01c8f29dea2d54a309ed71f2dd73c
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
<<<<<<< HEAD

  card: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#fff",
=======
  card: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#ffffff",
>>>>>>> 76bc0a53c6c01c8f29dea2d54a309ed71f2dd73c
    padding: 35,
    borderRadius: 15,
    alignItems: "center",
    elevation: 6,
<<<<<<< HEAD

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },

=======
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
>>>>>>> 76bc0a53c6c01c8f29dea2d54a309ed71f2dd73c
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e3a8a",
    textAlign: "center",
    marginBottom: 8,
  },
<<<<<<< HEAD

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

=======
  email: { color: "#2563eb", fontWeight: "600", marginBottom: 6 },
  texto: { color: "#6b7280", textAlign: "center", marginBottom: 24 },
>>>>>>> 76bc0a53c6c01c8f29dea2d54a309ed71f2dd73c
  botao: {
    width: "100%",
    height: 48,
    borderRadius: 8,
    backgroundColor: "#dc2626",
    justifyContent: "center",
    alignItems: "center",
  },
<<<<<<< HEAD

  textoBotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
=======
  textoBotao: { color: "#fff", fontSize: 16, fontWeight: "bold" },
>>>>>>> 76bc0a53c6c01c8f29dea2d54a309ed71f2dd73c
});
