import { createContext, ReactNode, useState } from "react";

interface ContextType {
    user: { id: number, nome: string, renda: number },
    setUser: (user: { id: number, nome: string, renda: number }) => void
}

interface UserProviderProps {
    children: ReactNode
}

export const UserContext = createContext<ContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [ user, setUser ] =  useState({ id: 0, nome: "", renda: 0 });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            { children }
        </UserContext.Provider>
    )
}