import React from "react";  
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Inicio from "../screens/Inicio/Inicio";
import Login from "../screens/Login";  
import Cadastro from "../screens/Cadastro"; 

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <Stack.Navigator initialRouteName="Inicio">
      <Stack.Screen name="Inicio" component={Inicio} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
        {/* IR ADICIONANDO AS TELAS AQUI */}
    </Stack.Navigator>
  );
}