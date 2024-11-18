import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import GruposScreen from "./screens/GruposScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import GrupoInfo from "./screens/GrupoInfo"; // Importar a nova tela

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} // Oculta o header na tela de login
        />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: "Registrar" }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: "Recuperar Senha" }} />
        <Stack.Screen name="Grupos" component={GruposScreen} options={{ title: "Grupos Inova Week 2024" }} />
        <Stack.Screen name="GrupoInfo" component={GrupoInfo} options={{ title: "Detalhes do Grupo" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
