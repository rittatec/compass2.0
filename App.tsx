// import { NavigationContainer } from '@react-navigation/native';
// import AppRoutes from './src/routes/Approutes';

// export default function App() {
//   return (
//     <NavigationContainer>
//       <AppRoutes />
//     </NavigationContainer>
//   );
// }

import { NavigationContainer } from '@react-navigation/native';
import { RendaProvider } from "./src/context/RendaContext";
import AppRoutes from "./src/routes/Approutes"
import { createContext, useState } from 'react';

interface ContextType {
  nome: string,
  renda: number
}

export const Contexto = createContext<ContextType>({} as ContextType);

export const [user, setUser] = useState<ContextType>({ nome: "Não Informado", renda: 0});

export default function App() {
  return (
    <Contexto.Provider value={user}>
      <RendaProvider>
        <NavigationContainer>
          <AppRoutes />
        </NavigationContainer>
      </RendaProvider>
    </Contexto.Provider>
  );
}
