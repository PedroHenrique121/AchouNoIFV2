import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import {
  ActivityIndicator,
  StyleSheet,
  View,
} from "react-native";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./src/config/firebase";

import LoginScreen from "./src/screens/LoginScreen";
import CadastroScreen from "./src/screens/CadastroScreen";
import EsqueciSenhaScreen from "./src/screens/EsqueciSenhaScreen";
=======
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./src/config/firebase";
import LoginScreen from "./src/screens/LoginScreen";
>>>>>>> 76bc0a53c6c01c8f29dea2d54a309ed71f2dd73c
import HomeScreen from "./src/screens/HomeScreen";

export default function App() {
  const [user, setUser] = useState(undefined);
<<<<<<< HEAD
  const [tela, setTela] = useState("login");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (usuario) => {
        setUser(usuario);
      }
    );

    return unsubscribe;
  }, []);

  // Verificando o estado do Firebase
  if (user === undefined) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator
          size="large"
          color="#2563eb"
        />
=======

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  if (user === undefined) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#2563eb" />
>>>>>>> 76bc0a53c6c01c8f29dea2d54a309ed71f2dd73c
      </View>
    );
  }

<<<<<<< HEAD
  // Usuário está logado
  if (user) {
    return <HomeScreen user={user} />;
  }

  // Tela de cadastro
  if (tela === "cadastro") {
    return (
      <CadastroScreen
        onVoltar={() => setTela("login")}
      />
    );
  }

  // Tela de recuperação de senha
  if (tela === "esqueciSenha") {
    return (
      <EsqueciSenhaScreen
        onVoltar={() => setTela("login")}
      />
    );
  }

  // Tela de login
  return (
    <LoginScreen
      onCadastrar={() => setTela("cadastro")}
      onEsqueciSenha={() => setTela("esqueciSenha")}
    />
=======
  return user ? (
    <HomeScreen user={user} />
  ) : (
    <LoginScreen onLoginSuccess={setUser} />
>>>>>>> 76bc0a53c6c01c8f29dea2d54a309ed71f2dd73c
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
<<<<<<< HEAD
    backgroundColor: "#fff",
=======
>>>>>>> 76bc0a53c6c01c8f29dea2d54a309ed71f2dd73c
  },
});
