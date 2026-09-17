<<<<<<< HEAD
import { useState } from "react";
import {
  ActivityIndicator,
=======
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
>>>>>>> 76bc0a53c6c01c8f29dea2d54a309ed71f2dd73c
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
<<<<<<< HEAD
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

=======
  ActivityIndicator,
} from "react-native";
>>>>>>> 76bc0a53c6c01c8f29dea2d54a309ed71f2dd73c
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

function mensagemDeErro(codigo) {
  switch (codigo) {
    case "auth/invalid-email":
      return "Digite um e-mail válido.";
<<<<<<< HEAD

=======
>>>>>>> 76bc0a53c6c01c8f29dea2d54a309ed71f2dd73c
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "E-mail ou senha inválidos.";
<<<<<<< HEAD

    case "auth/too-many-requests":
      return "Muitas tentativas. Tente novamente mais tarde.";

    case "auth/network-request-failed":
      return "Sem conexão com a internet.";

    case "auth/user-disabled":
      return "Esta conta está desativada.";

=======
    case "auth/too-many-requests":
      return "Muitas tentativas. Tente novamente mais tarde.";
    case "auth/network-request-failed":
      return "Sem conexão com a internet.";
>>>>>>> 76bc0a53c6c01c8f29dea2d54a309ed71f2dd73c
    default:
      return "Não foi possível entrar. Tente novamente.";
  }
}

<<<<<<< HEAD
export default function LoginScreen({
  onCadastrar,
  onEsqueciSenha,
}) {
=======
export default function LoginScreen({ onLoginSuccess }) {
>>>>>>> 76bc0a53c6c01c8f29dea2d54a309ed71f2dd73c
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function fazerLogin() {
<<<<<<< HEAD
    const emailLimpo = email.trim();

    if (!emailLimpo || !senha) {
      Alert.alert(
        "Atenção",
        "Preencha o e-mail e a senha."
      );
=======
    if (!email.trim() || !senha) {
      Alert.alert("Atenção", "Preencha o e-mail e a senha.");
>>>>>>> 76bc0a53c6c01c8f29dea2d54a309ed71f2dd73c
      return;
    }

    setCarregando(true);
<<<<<<< HEAD

    try {
      await signInWithEmailAndPassword(
        auth,
        emailLimpo,
        senha
      );
    } catch (error) {
      console.error("Erro no login:", error);

      Alert.alert(
        "Erro no login",
        mensagemDeErro(error?.code)
      );
=======
    try {
      const credencial = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        senha
      );
      onLoginSuccess?.(credencial.user);
    } catch (error) {
      Alert.alert("Erro no login", mensagemDeErro(error.code));
>>>>>>> 76bc0a53c6c01c8f29dea2d54a309ed71f2dd73c
    } finally {
      setCarregando(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboard}
<<<<<<< HEAD
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
=======
      behavior={Platform.OS === "ios" ? "padding" : undefined}
>>>>>>> 76bc0a53c6c01c8f29dea2d54a309ed71f2dd73c
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.card}>
<<<<<<< HEAD

            <Text style={styles.titulo}>
              Achados e Perdidos
            </Text>

            <Text style={styles.subtitulo}>
              Entre na sua conta
            </Text>
=======
            <Text style={styles.titulo}>Achados e Perdidos</Text>
            <Text style={styles.subtitulo}>Entre na sua conta</Text>
>>>>>>> 76bc0a53c6c01c8f29dea2d54a309ed71f2dd73c

            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
<<<<<<< HEAD
              autoComplete="email"
=======
>>>>>>> 76bc0a53c6c01c8f29dea2d54a309ed71f2dd73c
              value={email}
              onChangeText={setEmail}
              editable={!carregando}
            />

            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#999"
              secureTextEntry
<<<<<<< HEAD
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="password"
              value={senha}
              onChangeText={setSenha}
              editable={!carregando}
              onSubmitEditing={fazerLogin}
            />

            {/* ENTRAR */}
            <TouchableOpacity
              style={[
                styles.botao,
                carregando &&
                  styles.botaoDesabilitado,
              ]}
=======
              value={senha}
              onChangeText={setSenha}
              editable={!carregando}
            />

            <TouchableOpacity
              style={[styles.botao, carregando && styles.botaoDesabilitado]}
>>>>>>> 76bc0a53c6c01c8f29dea2d54a309ed71f2dd73c
              onPress={fazerLogin}
              disabled={carregando}
              activeOpacity={0.8}
            >
              {carregando ? (
                <ActivityIndicator color="#fff" />
              ) : (
<<<<<<< HEAD
                <Text style={styles.textoBotao}>
                  Entrar
                </Text>
              )}
            </TouchableOpacity>

            {/* CADASTRO */}
            <TouchableOpacity
              style={styles.botaoCadastro}
              onPress={onCadastrar}
              disabled={carregando}
              activeOpacity={0.8}
            >
              <Text style={styles.textoCadastro}>
                Cadastro
              </Text>
            </TouchableOpacity>

            {/* ESQUECI A SENHA */}
            <TouchableOpacity
              style={styles.botaoEsqueciSenha}
              onPress={onEsqueciSenha}
              disabled={carregando}
              activeOpacity={0.8}
            >
              <Text style={styles.textoEsqueciSenha}>
                Esqueci minha senha
              </Text>
            </TouchableOpacity>

=======
                <Text style={styles.textoBotao}>Entrar</Text>
              )}
            </TouchableOpacity>
>>>>>>> 76bc0a53c6c01c8f29dea2d54a309ed71f2dd73c
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
  keyboard: {
    flex: 1,
  },

  scroll: {
    flexGrow: 1,
  },

=======
  keyboard: { flex: 1 },
  scroll: { flexGrow: 1 },
>>>>>>> 76bc0a53c6c01c8f29dea2d54a309ed71f2dd73c
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2563eb",
    padding: 20,
  },
<<<<<<< HEAD

  card: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#fff",
    padding: 35,
    borderRadius: 15,

    elevation: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },

=======
  card: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#ffffff",
    padding: 35,
    borderRadius: 15,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
>>>>>>> 76bc0a53c6c01c8f29dea2d54a309ed71f2dd73c
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e3a8a",
    textAlign: "center",
  },
<<<<<<< HEAD

=======
>>>>>>> 76bc0a53c6c01c8f29dea2d54a309ed71f2dd73c
  subtitulo: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 20,
  },
<<<<<<< HEAD

=======
>>>>>>> 76bc0a53c6c01c8f29dea2d54a309ed71f2dd73c
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginVertical: 8,
    color: "#222",
    backgroundColor: "#fff",
  },
<<<<<<< HEAD

=======
>>>>>>> 76bc0a53c6c01c8f29dea2d54a309ed71f2dd73c
  botao: {
    width: "100%",
    height: 48,
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
  },
<<<<<<< HEAD

  botaoDesabilitado: {
    backgroundColor: "#93c5fd",
  },

  textoBotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  botaoCadastro: {
    width: "100%",
    height: 48,
    marginTop: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
  },

  textoCadastro: {
    color: "#2563eb",
    fontSize: 16,
    fontWeight: "bold",
  },

  botaoEsqueciSenha: {
    marginTop: 18,
    alignItems: "center",
  },

  textoEsqueciSenha: {
    color: "#6b7280",
    fontSize: 14,
    fontWeight: "600",
  },
=======
  botaoDesabilitado: { backgroundColor: "#93c5fd" },
  textoBotao: { color: "#fff", fontSize: 16, fontWeight: "bold" },
>>>>>>> 76bc0a53c6c01c8f29dea2d54a309ed71f2dd73c
});
