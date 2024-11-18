import { View, Text, StyleSheet } from "react-native";

const AlunoCard = ({ aluno }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{aluno.nome}</Text>
      <Text>Curso: {aluno.curso}</Text>
      <Text>Idade: {aluno.idade}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    backgroundColor: "#fff",
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AlunoCard;
