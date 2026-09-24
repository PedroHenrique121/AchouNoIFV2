import { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const categorias = [
  { id: 1, nome: 'Material Escolar', icone: '📚' },
  { id: 2, nome: 'Eletrônicos', icone: '📱' },
  { id: 3, nome: 'Roupas', icone: '👕' },
  { id: 4, nome: 'Mochilas', icone: '🎒' },
  { id: 5, nome: 'Acessórios', icone: '👜' },
];

const estados = [
  { valor: 'novo', nome: 'Novo' },
  { valor: 'bom', nome: 'Bom' },
  { valor: 'danificado', nome: 'Danificado' },
  { valor: 'quebrado', nome: 'Quebrado' },
];

export default function CriarObjetoScreen({ navigation }) {
  const [nomeObjeto, setNomeObjeto] = useState('');
  const [codigoRastreio, setCodigoRastreio] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataEncontro, setDataEncontro] = useState('');
  const [localEncontro, setLocalEncontro] = useState('');
  const [idCategoria, setIdCategoria] = useState(null);
  const [estadoObjeto, setEstadoObjeto] = useState(null);

  const cadastrarObjeto = () => {
    if (
      !nomeObjeto.trim() ||
      !dataEncontro.trim() ||
      !localEncontro.trim() ||
      !idCategoria ||
      !estadoObjeto
    ) {
      Alert.alert(
        'Atenção',
        'Preencha todos os campos obrigatórios.'
      );
      return;
    }

    const objeto = {
      codigo_rastreio: codigoRastreio.trim() || null,
      nome_objeto: nomeObjeto.trim(),
      descricao: descricao.trim(),
      data_encontro: dataEncontro,
      local_encontro: localEncontro.trim(),
      id_categoria: idCategoria,
      estado_objeto: estadoObjeto,
      status_objeto: 'perdido',

      // Depois será preenchido com o funcionário logado
      id_usuario_cadastro: null,

      // O objeto ainda não possui dono
      id_dono_objeto: null,
    };

    console.log('Objeto:', objeto);

    Alert.alert(
      'Sucesso',
      'Objeto cadastrado com sucesso!',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Cadastrar objeto</Text>

      <Text style={styles.subtitle}>
        Registre um objeto encontrado
      </Text>

      {/* NOME */}
      <Text style={styles.label}>
        Nome do objeto <Text style={styles.required}>*</Text>
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: Mochila preta"
        placeholderTextColor="#999"
        value={nomeObjeto}
        onChangeText={setNomeObjeto}
      />

      {/* CÓDIGO */}
      <Text style={styles.label}>
        Código de rastreio
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: ACH-001"
        placeholderTextColor="#999"
        value={codigoRastreio}
        onChangeText={setCodigoRastreio}
      />

      {/* DESCRIÇÃO */}
      <Text style={styles.label}>
        Descrição
      </Text>

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descreva o objeto..."
        placeholderTextColor="#999"
        multiline
        value={descricao}
        onChangeText={setDescricao}
      />

      {/* DATA */}
      <Text style={styles.label}>
        Data do encontro <Text style={styles.required}>*</Text>
      </Text>

      <TextInput
        style={styles.input}
        placeholder="AAAA-MM-DD"
        placeholderTextColor="#999"
        value={dataEncontro}
        onChangeText={setDataEncontro}
        keyboardType="numeric"
      />

      {/* LOCAL */}
      <Text style={styles.label}>
        Local encontrado <Text style={styles.required}>*</Text>
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: Biblioteca"
        placeholderTextColor="#999"
        value={localEncontro}
        onChangeText={setLocalEncontro}
      />

      {/* CATEGORIA */}
      <Text style={styles.label}>
        Categoria <Text style={styles.required}>*</Text>
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
            <Text style={styles.categoryIcon}>
              {categoria.icone}
            </Text>

            <Text
              style={[
                styles.optionText,
                idCategoria === categoria.id &&
                  styles.optionTextSelected,
              ]}
            >
              {categoria.nome}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ESTADO */}
      <Text style={styles.label}>
        Estado do objeto <Text style={styles.required}>*</Text>
      </Text>

      <View style={styles.optionsContainer}>
        {estados.map((estado) => (
          <TouchableOpacity
            key={estado.valor}
            style={[
              styles.option,
              estadoObjeto === estado.valor &&
                styles.optionSelected,
            ]}
            onPress={() => setEstadoObjeto(estado.valor)}
          >
            <Text
              style={[
                styles.optionText,
                estadoObjeto === estado.valor &&
                  styles.optionTextSelected,
              ]}
            >
              {estado.nome}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* FOTO */}
      <Text style={styles.label}>
        Foto do objeto
      </Text>

      <TouchableOpacity
        style={styles.photoButton}
        onPress={() =>
          Alert.alert(
            'Foto',
            'Vamos adicionar o seletor de imagens nesta etapa.'
          )
        }
      >
        <Text style={styles.photoIcon}>📷</Text>

        <Text style={styles.photoText}>
          Adicionar foto
        </Text>
      </TouchableOpacity>

      {/* CADASTRAR */}
      <TouchableOpacity
        style={styles.button}
        onPress={cadastrarObjeto}
      >
        <Text style={styles.buttonText}>
          Cadastrar objeto
        </Text>
      </TouchableOpacity>

      {/* CANCELAR */}
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelText}>
          Cancelar
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  content: {
    padding: 24,
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 10,
  },

  subtitle: {
    fontSize: 15,
    color: '#64748B',
    marginTop: 6,
    marginBottom: 20,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
    marginTop: 16,
    marginBottom: 8,
  },

  required: {
    color: '#EF4444',
  },

  input: {
    height: 52,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D9E0E8',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 15,
    color: '#1E293B',
  },

  textArea: {
    height: 110,
    paddingTop: 14,
    textAlignVertical: 'top',
  },

  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D9E0E8',
    borderRadius: 20,
    marginBottom: 4,
  },

  optionSelected: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },

  categoryIcon: {
    fontSize: 16,
    marginRight: 5,
  },

  optionText: {
    color: '#475569',
    fontSize: 14,
  },

  optionTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  photoButton: {
    height: 120,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  photoIcon: {
    fontSize: 30,
    marginBottom: 8,
  },

  photoText: {
    color: '#475569',
    fontSize: 14,
    fontWeight: '500',
  },

  button: {
    height: 54,
    backgroundColor: '#2563EB',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    height: 45,
  },

  cancelText: {
    color: '#64748B',
    fontSize: 15,
    fontWeight: '600',
  },
});
