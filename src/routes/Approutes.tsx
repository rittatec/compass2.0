import React from "react";  
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Inicio from "../screens/Inicio/Inicio";
import Login from "../screens/Login";  
import Cadastro from "../screens/Cadastro"; 
import Menu from "../screens/Menu"; 
import Agua from "../screens/Agua";
import Energia from "../screens/Energia";
import Wifi from "../screens/Wifi";
import Alimento from "../screens/Alimento";
import Extra from  "../screens/Extra";
import Poupanca from "../screens/Poupanca";
import Investido from "../screens/Investido";
import Receber from "../screens/Receber";
import Saude from "../screens/Saude";

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <Stack.Navigator initialRouteName="Inicio">
      <Stack.Screen name="Inicio" component={Inicio} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name= "Menu" component={Menu} />
      <Stack.Screen name="Agua" component={Agua} />
      <Stack.Screen name="Energia" component={Energia} />
      <Stack.Screen name="Wifi" component={Wifi} />
      <Stack.Screen name="Alimento" component={Alimento} />
      <Stack.Screen name="Extra" component={Extra} />
      <Stack.Screen name="Poupanca" component={Poupanca} /> 
      <Stack.Screen name="Investido" component={Investido} />
      <Stack.Screen name="Receber" component={Receber} />
      <Stack.Screen name="Saude" component={Saude} />
        {/* IR ADICIONANDO AS TELAS AQUI */}
    </Stack.Navigator>
  );
}