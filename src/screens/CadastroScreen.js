import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import {
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";

import { auth } from "../config/firebase";

function mensagemDeErro(codigo) {
  switch (codigo) {
    case "auth/invalid-email":
      return "Digite um e-mail válido.";

    case "auth/email-already-in-use":
      return "Este e-mail já está cadastrado.";

    case "auth/weak-password":
      return "A senha precisa ter pelo menos 6 caracteres.";

    case "auth/network-request-failed":
      return "Sem conexão com a internet.";

    case "auth/operation-not-allowed":
      return "O cadastro por e-mail não está habilitado no Firebase.";

    default:
      return "Não foi possível criar a conta. Tente novamente.";
  }
}

export default function CadastroScreen({ onVoltar }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function cadastrar() {
    const nomeLimpo = nome.trim();
    const emailLimpo = email.trim();

    if (!nomeLimpo || !emailLimpo || !senha || !confirmarSenha) {
      Alert.alert(
        "Atenção",
        "Preencha todos os campos."
      );
      return;
    }

    if (senha.length < 6) {
      Alert.alert(
        "Atenção",
        "A senha precisa ter pelo menos 6 caracteres."
      );
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert(
        "Atenção",
        "As senhas não coincidem."
      );
      return;
    }

    setCarregando(true);

    try {
      const credencial =
        await createUserWithEmailAndPassword(
          auth,
          emailLimpo,
          senha
        );

      await updateProfile(credencial.user, {
        displayName: nomeLimpo,
      });

      Alert.alert(
        "Cadastro realizado!",
        "Sua conta foi criada com sucesso."
      );

      // O Firebase já autentica o usuário automaticamente.
      // O onAuthStateChanged do App.js vai detectar o login.
    } catch (error) {
      console.error("Erro no cadastro:", error);

      Alert.alert(
        "Erro no cadastro",
        mensagemDeErro(error?.code)
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboard}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.card}>

            <Text style={styles.titulo}>
              Criar conta
            </Text>

            <Text style={styles.subtitulo}>
              Cadastre-se no AchouNoIF
            </Text>

            {/* NOME */}
            <TextInput
              style={styles.input}
              placeholder="Nome completo"
              placeholderTextColor="#999"
              value={nome}
              onChangeText={setNome}
              editable={!carregando}
              autoCapitalize="words"
            />

            {/* E-MAIL */}
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
              editable={!carregando}
            />

            {/* SENHA */}
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#999"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              value={senha}
              onChangeText={setSenha}
              editable={!carregando}
            />

            {/* CONFIRMAR SENHA */}
            <TextInput
              style={styles.input}
              placeholder="Confirmar senha"
              placeholderTextColor="#999"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              editable={!carregando}
            />

            {/* BOTÃO CADASTRAR */}
            <TouchableOpacity
              style={[
                styles.botao,
                carregando &&
                  styles.botaoDesabilitado,
              ]}
              onPress={cadastrar}
              disabled={carregando}
              activeOpacity={0.8}
            >
              {carregando ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.textoBotao}>
                  Criar conta
                </Text>
              )}
            </TouchableOpacity>

            {/* VOLTAR PARA LOGIN */}
            <TouchableOpacity
              style={styles.botaoVoltar}
              onPress={onVoltar}
              disabled={carregando}
              activeOpacity={0.7}
            >
              <Text style={styles.textoVoltar}>
                Já tenho uma conta
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },

  scroll: {
    flexGrow: 1,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2563eb",
    padding: 20,
  },

  card: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#ffffff",
    padding: 30,
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

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e3a8a",
    textAlign: "center",
  },

  subtitulo: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 20,
  },

  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginVertical: 7,
    color: "#222",
    backgroundColor: "#fff",
  },

  botao: {
    width: "100%",
    height: 48,
    marginTop: 12,
    borderRadius: 8,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
  },

  botaoDesabilitado: {
    backgroundColor: "#93c5fd",
  },

  textoBotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  botaoVoltar: {
    marginTop: 18,
    alignItems: "center",
  },

  textoVoltar: {
    color: "#2563eb",
    fontSize: 14,
    fontWeight: "600",
  },
});
