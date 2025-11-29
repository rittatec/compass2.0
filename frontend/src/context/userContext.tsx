import { createContext, ReactNode, useState } from "react";

interface UserType {
  id: number;
  nome: string;
  renda: number;
}

export interface ContextType {
  user: UserType;
  setUser: (user: Partial<UserType>) => void;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<ContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUserState] = useState<UserType>({
    id: 0,
    nome: "",
    renda: 0
  });

  const setUser = (newData: Partial<UserType>) => {
    setUserState((prev) => ({ ...prev, ...newData }));
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
