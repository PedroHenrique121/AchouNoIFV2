import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { auth } from "../config/firebase";
import { API_URL } from "../config/api";

const categorias = [
  { id: 1, nome: "Material Escolar", icone: "📚" },
  { id: 2, nome: "Eletrônicos", icone: "📱" },
  { id: 3, nome: "Roupas", icone: "👕" },
  { id: 4, nome: "Mochilas", icone: "🎒" },
  { id: 5, nome: "Acessórios", icone: "👜" },
];

const estados = [
  { valor: "novo", nome: "Novo" },
  { valor: "bom", nome: "Bom" },
  { valor: "danificado", nome: "Danificado" },
  { valor: "quebrado", nome: "Quebrado" },
];

export default function CriarObjetoScreen({ navigation }) {
  const [nomeObjeto, setNomeObjeto] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataEncontro, setDataEncontro] = useState("");
  const [localEncontro, setLocalEncontro] = useState("");
  const [idCategoria, setIdCategoria] = useState(null);
  const [estadoObjeto, setEstadoObjeto] = useState(null);
  const [foto, setFoto] = useState(null);
  const [salvando, setSalvando] = useState(false);

  async function adicionarFoto() {
    try {
      const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissao.granted) {
        Alert.alert(
          "Permissão necessária",
          "Permita o acesso às fotos para selecionar uma imagem."
        );
        return;
      }

      const resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!resultado.canceled && resultado.assets?.length) {
        const imagem = resultado.assets[0];

        if (imagem.fileSize && imagem.fileSize > 5 * 1024 * 1024) {
          Alert.alert("Imagem muito grande", "Escolha uma imagem de até 5 MB.");
          return;
        }

        setFoto(imagem);
      }
    } catch (error) {
      console.error("Erro ao selecionar foto:", error);
      Alert.alert("Erro", "Não foi possível selecionar a foto.");
    }
  }

  async function cadastrarObjeto() {
    if (
      !nomeObjeto.trim() ||
      !dataEncontro.trim() ||
      !localEncontro.trim() ||
      !idCategoria ||
      !estadoObjeto
    ) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios.");
      return;
    }

    const usuario = auth.currentUser;

    if (!usuario) {
      Alert.alert("Sessão expirada", "Faça login novamente.");
      return;
    }

    setSalvando(true);

    try {
      const token = await usuario.getIdToken();

      const formData = new FormData();

      formData.append("nome_objeto", nomeObjeto.trim());
      formData.append("descricao", descricao.trim());
      formData.append("data_encontro", dataEncontro.trim());
      formData.append("local_encontro", localEncontro.trim());
      formData.append("id_categoria", String(idCategoria));
      formData.append("estado_objeto", estadoObjeto);
      formData.append("status_objeto", "perdido");

      if (foto?.uri) {
        const nomeArquivo = foto.fileName || `foto-${Date.now()}.jpg`;
        const tipo = foto.mimeType || "image/jpeg";

        formData.append("foto", {
          uri: foto.uri,
          name: nomeArquivo,
          type: tipo,
        });
      }

      const resposta = await fetch(`${API_URL}/itens`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // Não defina Content-Type manualmente.
          // O React Native adiciona o boundary correto do multipart.
        },
        body: formData,
      });

      const data = await resposta.json().catch(() => ({}));

      if (!resposta.ok) {
        throw new Error(data.erro || "Não foi possível cadastrar o objeto.");
      }

      Alert.alert("Sucesso", "Objeto cadastrado e foto armazenada com sucesso.", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.error("Erro ao cadastrar objeto:", error);
      Alert.alert("Erro", error.message || "Erro de conexão com o servidor.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Cadastrar objeto</Text>
        <Text style={styles.subtitle}>Registre um objeto encontrado</Text>

        <Text style={styles.label}>
          Nome do objeto<Text style={styles.required}> *</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Mochila preta"
          placeholderTextColor="#999"
          value={nomeObjeto}
          onChangeText={setNomeObjeto}
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Descreva o objeto..."
          placeholderTextColor="#999"
          multiline
          value={descricao}
          onChangeText={setDescricao}
        />

        <Text style={styles.label}>
          Data do encontro<Text style={styles.required}> *</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="AAAA-MM-DD"
          placeholderTextColor="#999"
          value={dataEncontro}
          onChangeText={setDataEncontro}
          keyboardType="numeric"
        />

        <Text style={styles.label}>
          Local encontrado<Text style={styles.required}> *</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Biblioteca"
          placeholderTextColor="#999"
          value={localEncontro}
          onChangeText={setLocalEncontro}
        />

        <Text style={styles.label}>
          Categoria<Text style={styles.required}> *</Text>
        </Text>
        <View style={styles.optionsContainer}>
          {categorias.map((categoria) => (
            <TouchableOpacity
              key={categoria.id}
              style={[
                styles.option,
                idCategoria === categoria.id && styles.optionSelected,
              ]}
              onPress={() => setIdCategoria(categoria.id)}
            >
              <Text style={styles.categoryIcon}>{categoria.icone}</Text>
              <Text
                style={[
                  styles.optionText,
                  idCategoria === categoria.id && styles.optionTextSelected,
                ]}
              >
                {categoria.nome}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>
          Estado do objeto<Text style={styles.required}> *</Text>
        </Text>
        <View style={styles.optionsContainer}>
          {estados.map((estado) => (
            <TouchableOpacity
              key={estado.valor}
              style={[
                styles.option,
                estadoObjeto === estado.valor && styles.optionSelected,
              ]}
              onPress={() => setEstadoObjeto(estado.valor)}
            >
              <Text
                style={[
                  styles.optionText,
                  estadoObjeto === estado.valor && styles.optionTextSelected,
                ]}
              >
                {estado.nome}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Foto do objeto</Text>

        <TouchableOpacity
          style={styles.photoButton}
          onPress={adicionarFoto}
          activeOpacity={0.8}
        >
          {foto?.uri ? (
            <Image source={{ uri: foto.uri }} style={styles.photoPreview} />
          ) : (
            <>
              <Text style={styles.photoIcon}>📷</Text>
              <Text style={styles.photoText}>Adicionar foto</Text>
            </>
          )}
        </TouchableOpacity>

        {foto?.uri ? (
          <TouchableOpacity onPress={() => setFoto(null)}>
            <Text style={styles.removePhoto}>Remover foto</Text>
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity
          style={[styles.button, salvando && styles.buttonDisabled]}
          onPress={cadastrarObjeto}
          disabled={salvando}
        >
          <Text style={styles.buttonText}>
            {salvando ? "Salvando..." : "Cadastrar objeto"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
          disabled={salvando}
        >
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#2563EB" },
  content: { flexGrow: 1, padding: 20, justifyContent: "center" },
  card: {
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    padding: 30,
    borderRadius: 15,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E3A8A",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginTop: 12,
    marginBottom: 7,
  },
  required: { color: "#DC2626" },
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    color: "#222",
    backgroundColor: "#FFFFFF",
  },
  textArea: { height: 100, paddingTop: 12, textAlignVertical: "top" },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 13,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 20,
  },
  optionSelected: { backgroundColor: "#2563EB", borderColor: "#2563EB" },
  categoryIcon: { fontSize: 16, marginRight: 5 },
  optionText: { color: "#4B5563", fontSize: 14 },
  optionTextSelected: { color: "#FFFFFF", fontWeight: "600" },
  photoButton: {
    width: "100%",
    height: 180,
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
    borderStyle: "dashed",
    borderRadius: 10,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  photoIcon: { fontSize: 30, marginBottom: 7 },
  photoText: { color: "#4B5563", fontSize: 14, fontWeight: "600" },
  photoPreview: { width: "100%", height: "100%", resizeMode: "cover" },
  removePhoto: {
    textAlign: "center",
    color: "#DC2626",
    fontWeight: "600",
    marginTop: 10,
  },
  button: {
    width: "100%",
    height: 48,
    marginTop: 28,
    borderRadius: 8,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDisabled: { backgroundColor: "#93C5FD" },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
  cancelButton: {
    height: 45,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelText: { color: "#6B7280", fontSize: 15, fontWeight: "600" },
});
