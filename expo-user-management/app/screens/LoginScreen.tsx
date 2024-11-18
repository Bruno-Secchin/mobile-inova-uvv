import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { supabase } from '../config/supabase';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const navigation = useNavigation();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setLoginError("Erro ao fazer login: " + error.message);
    else {
      setLoginError(null);
      navigation.navigate("Grupos");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>
        {loginError && <Text style={styles.error}>{loginError}</Text>}
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Senha"   
 value={password} onChangeText={(text) => setPassword(text)} secureTextEntry />
        <Button title="Entrar" onPress={handleLogin}   
 />
        <View style={styles.buttonContainer}>
          <Button title="Esqueci minha senha" onPress={() => navigation.navigate('ForgotPassword')} />
          <View style={styles.buttonSpacer} /> {/* Espaçador entre os botões */}
          <Button title="Registrar-se" onPress={() => navigation.navigate('Register')} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2', // Fundo cinza claro
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff', // Fundo branco
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation:   
 5, // Sombra para Android
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  buttonSpacer: {
    width: 10,
  },
});