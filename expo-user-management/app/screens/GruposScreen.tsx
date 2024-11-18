import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { supabase } from "../config/supabase";

const GruposScreen = ({ navigation }) => {
  const [grupos, setGrupos] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchGrupos = async () => {
      const { data, error } = await supabase.from("Grupo").select();

      if (error) {
        setFetchError("Erro ao buscar Grupos.");
        setGrupos([]);
      } else {
        setGrupos(data);
        setFetchError(null);
      }
    };

    fetchGrupos();
  }, []);

  return (
    <View style={styles.container}>
      {fetchError && <Text style={styles.error}>{fetchError}</Text>}
      <FlatList
        data={grupos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("GrupoInfo", { grupoId: item.id })}
          >
            <Text style={styles.title}>{item.nome}</Text>
            <Text style={styles.subtitle}>Tema: {item.tema}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f5",
    padding: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default GruposScreen;
