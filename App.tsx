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
import AppRoutes from "./src/routes/Approutes";

export default function App() {
  return (
    <RendaProvider>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </RendaProvider>
  );
}
