import { NavigationContainer } from '@react-navigation/native';
import { RendaProvider } from "./src/context/RendaContext";
import AppRoutes from "./src/routes/Approutes"
import { UserProvider } from './src/context/userContext';

import * as Notifications from "expo-notifications";
import { useEffect, useState } from 'react';

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");

  useEffect(() => {
    async function register() {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status != "granted") {
        alert("Permissão negada");
        return;
      }

      const token = (await Notifications.getExpoPushTokenAsync()).data;
      setExpoPushToken(token);

      console.log("TOKEN: ", token);
    }

    register();
  }, []);

  return (
    <UserProvider>
      <RendaProvider>
        <NavigationContainer>
          <AppRoutes expoPushToken={expoPushToken} />
        </NavigationContainer>
      </RendaProvider>
    </UserProvider>
  );
}
