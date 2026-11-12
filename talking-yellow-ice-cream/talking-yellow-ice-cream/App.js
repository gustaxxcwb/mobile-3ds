import { useState } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert
} from 'react-native';

export default function App() {
  // Lista inicial de receitas
  const [listaReceitas, setListaReceitas] = useState([
    {
      id: '1',
      nome: '🥕 Bolo de Cenoura',
      ingredientes:
        '• 3 cenouras médias\n• 4 ovos e 1 xícara de óleo\n• 2 xícaras de açúcar\n• 2 e 1/2 xícaras de farinha de trigo\n• 1 colher (sopa) de fermento',
      modoPreparo:
        'Bata no liquidificador as cenouras, os ovos e o óleo. Em uma tigela, misture com o açúcar e a farinha. Adicione o fermento por último e asse por 40 minutos.'
    },
    {
      id: '2',
      nome: '🥧 Torta de Frango',
      ingredientes:
        '• 2 xícaras de farinha de trigo\n• 2 xícaras de leite\n• 1/2 xícara de óleo\n• 3 ovos\n• 1 peito de frango cozido e desfiado',
      modoPreparo:
        'Bata os ingredientes da massa no liquidificador. Coloque metade em uma forma untada, adicione o recheio de frango, cubra com o restante da massa e asse por 35 minutos.'
    }
  ]);

  // Estados para o Modal de Visualização
  const [verReceitaVisivel, setVerReceitaVisivel] = useState(false);
  const [receitaSelecionada, setReceitaSelecionada] = useState(null);

  // Estados para o Modal de Cadastro
  const [cadastroVisivel, setCadastroVisivel] = useState(false);
  const [nomeReceita, setNomeReceita] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [modoPreparo, setModoPreparo] = useState('');

  // Abre o modal exibindo a receita clicada
  const abrirDetalhesReceita = (receita) => {
    setReceitaSelecionada(receita);
    setVerReceitaVisivel(true);
  };

  // Valida e salva a nova receita na lista
  const salvarReceita = () => {
    if (!nomeReceita.trim() || !ingredientes.trim() || !modoPreparo.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos!');
      return;
    }

    const novaReceita = {
      id: String(Date.now()),
      nome: nomeReceita,
      ingredientes: ingredientes,
      modoPreparo: modoPreparo
    };

    setListaReceitas([...listaReceitas, novaReceita]);
    Alert.alert('Sucesso', 'Receita cadastrada com sucesso!');
    limparEFecharCadastro();
  };

  // Limpa os inputs e fecha o modal de cadastro
  const limparEFecharCadastro = () => {
    setNomeReceita('');
    setIngredientes('');
    setModoPreparo('');
    setCadastroVisivel(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📱 App de Receitas</Text>
      <Text style={styles.subtitle}>Colecione suas receitas preferidas</Text>

      {/* Lista de cartões com ScrollView */}
      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent}>
        {listaReceitas.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardTitle}>{item.nome}</Text>
            <Button
              title="Ver Receita"
              color="#E65100"
              onPress={() => abrirDetalhesReceita(item)}
            />
          </View>
        ))}
      </ScrollView>

      {/* Modal 1: Ver Detalhes da Receita */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={verReceitaVisivel}
        onRequestClose={() => setVerReceitaVisivel(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {receitaSelecionada && (
              <>
                <Text style={styles.recipeTitle}>{receitaSelecionada.nome}</Text>

                <Text style={styles.sectionTitle}>Ingredientes:</Text>
                <Text style={styles.recipeText}>{receitaSelecionada.ingredientes}</Text>

                <Text style={styles.sectionTitle}>Modo de Preparo:</Text>
                <Text style={styles.recipeText}>{receitaSelecionada.modoPreparo}</Text>
              </>
            )}

            <Button
              title="Fechar"
              color="#D84315"
              onPress={() => setVerReceitaVisivel(false)}
            />
          </View>
        </View>
      </Modal>

      {/* Modal 2: Cadastrar Nova Receita */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={cadastroVisivel}
        onRequestClose={limparEFecharCadastro}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.recipeTitle}>Nova Receita</Text>

            <TextInput
              style={styles.input}
              placeholder="Nome da Receita (ex: Panqueca)"
              value={nomeReceita}
              onChangeText={setNomeReceita}
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Ingredientes"
              multiline={true}
              value={ingredientes}
              onChangeText={setIngredientes}
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Modo de Preparo"
              multiline={true}
              value={modoPreparo}
              onChangeText={setModoPreparo}
            />

            <View style={styles.modalButtons}>
              <View style={styles.buttonWrapper}>
                <Button title="Cancelar" color="#757575" onPress={limparEFecharCadastro} />
              </View>
              <View style={styles.buttonWrapper}>
                <Button title="Salvar" color="#2E7D32" onPress={salvarReceita} />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Botão Flutuante (FAB) */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setCadastroVisivel(true)}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: '#FFF3E0'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#5D4037',
    marginBottom: 20
  },
  scrollArea: {
    width: '100%',
    paddingHorizontal: 20
  },
  scrollContent: {
    paddingBottom: 100
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5D4037',
    marginBottom: 10
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    width: '88%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    elevation: 5
  },
  recipeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: 15,
    textAlign: 'center'
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5D4037',
    marginTop: 10,
    marginBottom: 5
  },
  recipeText: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
    marginBottom: 15
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    marginBottom: 12,
    backgroundColor: '#FAFAFA'
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top'
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E65100',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4
  },
  fabText: {
    fontSize: 30,
    color: '#FFFFFF',
    fontWeight: 'bold'
  }
});
