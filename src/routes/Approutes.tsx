import React from "react";  
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Importação das telas com stack
import Inicio from "../screens/Inicio/Inicio";
import Login from "../screens/Login";  
import Cadastro from "../screens/Cadastro"; 
import Menu from "../screens/Menu"; 
import Agua from "../screens/Agua";
import Energia from "../screens/Energia";
import Wifi from "../screens/Wifi";
import Feira from "../screens/Feira";
import Extra from  "../screens/Extra";
import Poupanca from "../screens/Poupanca";
import Investido from "../screens/Investido";
import Receber from "../screens/Receber";
import Saude from "../screens/Saude";
import AlterarRenda from "../screens/AlterarRenda";
import RecuperarSenha from "../screens/RecuperarSenha";


// Importação das telas com tab
import Orcamento from "../screens/Orcamento";
import Perfil from "../screens/Perfil";
import Notificacoes from "../screens/Notificacoes";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// NAVBAR COM TAB 
function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // oculta header do stack dentro das tabs
        tabBarShowLabel: true,
        tabBarStyle: { backgroundColor: "#fff", height: 60 },
        tabBarActiveTintColor: "#3f51b5",
        tabBarInactiveTintColor: "#777",
      }}
    >
      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
        <Tab.Screen
        name="Orçamento"
        component={Orcamento}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="pie-chart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notificações"
        component={Notificacoes}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

//  STACK PRINCIPAL NAVEGAÇÃO
export default function AppRoutes() {
  return (
    <Stack.Navigator initialRouteName="Inicio">
      <Stack.Screen name="Inicio" component={Inicio} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} />

      {/* Colocamos o TabRoutes como rota do Stack */}
      <Stack.Screen 
        name="Menu" 
        component={TabRoutes} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="AlterarRenda" 
        component={AlterarRenda} 
        options={{ title: "Alterar Renda" }}
      />


      {/* Telas de categorias chamadas a partir do Menu */}
      <Stack.Screen name="Agua" component={Agua} />
      <Stack.Screen name="Energia" component={Energia} />
      <Stack.Screen name="Wifi" component={Wifi} />
      <Stack.Screen name="Feira" component={Feira} />
      <Stack.Screen name="Extra" component={Extra} />
      <Stack.Screen name="Poupanca" component={Poupanca} /> 
      <Stack.Screen name="Investido" component={Investido} />
      <Stack.Screen name="Receber" component={Receber} />
      <Stack.Screen name="Saude" component={Saude} />
    </Stack.Navigator>
  );
}
