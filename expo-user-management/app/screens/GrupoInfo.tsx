import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { supabase } from "../config/supabase";

const GrupoInfo = ({ route }) => {
  const { grupoId } = route.params;
  const [grupo, setGrupo] = useState(null);
  const [alunos, setAlunos] = useState([]);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchGrupoInfo = async () => {
      try {
        // Fetch grupo data
        let { data: grupoData, error: grupoError } = await supabase
          .from("Grupo")
          .select()
          .eq("id", grupoId)
          .single();

        // Fetch alunos data
        let { data: alunosData, error: alunosError } = await supabase
          .from("Alunos")
          .select()
          .eq("grupo_id", grupoId);

        // Fetch avaliacoes data
        let { data: avaliacoesData, error: avaliacoesError } = await supabase
          .from("Avaliacao")
          .select()
          .eq("grupo_id", grupoId);

        if (grupoError || alunosError || avaliacoesError) {
          setFetchError("Erro ao buscar informações do grupo.");
        } else {
          setGrupo(grupoData);
          setAlunos(alunosData);
          setAvaliacoes(avaliacoesData);
          setFetchError(null);
        }
      } catch (error) {
        setFetchError("Erro ao buscar informações do grupo.");
      }
    };

    fetchGrupoInfo();
  }, [grupoId]);

  return (
    <View style={styles.container}>
      {fetchError && <Text style={styles.error}>{fetchError}</Text>}
      {grupo && (
        <View style={styles.card}>
          <Text style={styles.title}>{grupo.nome}</Text>
          <Text style={styles.subtitle}>Tema: {grupo.tema}</Text>
        </View>
      )}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Alunos</Text>
        <FlatList
          data={alunos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text style={styles.itemText}>- {item.nome}</Text>
          )}
          contentContainerStyle={styles.listContainer}
        />
      </View>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Avaliações</Text>
        <FlatList
          data={avaliacoes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text style={styles.itemText}>Nota: {item.nota}</Text>
          )}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2", // Light gray background
    padding: 20,
  },
  card: {
    backgroundColor: "#fff", // White background for cards
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333", // Dark text
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666", // Lighter text
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333", // Dark text
    marginBottom: 8,
  },
  itemText: {
    fontSize: 14,
    color: "#333", // Dark text
    marginBottom: 4,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  listContainer: {
    paddingBottom: 16,
  },
});

export default GrupoInfo;
