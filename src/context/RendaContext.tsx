import React, { createContext, useContext, useState, ReactNode } from "react";

type RendaContextType = {
  rendaMensal: number;
  setRendaMensal: (valor: number) => void;
  debitarRenda: (valor: number) => void;
  somarRenda: (valor: number) => void;
};

const RendaContext = createContext<RendaContextType | undefined>(undefined);

export const RendaProvider = ({ children }: { children: ReactNode }) => {
  const [rendaMensal, setRendaMensal] = useState<number>(2500); // valor inicial simulado

  const debitarRenda = (valor: number) => {
    setRendaMensal((prev) => prev - valor);
  };

  const somarRenda = (valor: number) => {
    setRendaMensal((prev) => prev + valor);
  };


  return (
    <RendaContext.Provider value={{ rendaMensal, setRendaMensal, debitarRenda, somarRenda }}>
      {children}
    </RendaContext.Provider>
  );
};

export const useRenda = () => {
  const context = useContext(RendaContext);
  if (!context) {
    throw new Error("useRenda deve ser usado dentro de um RendaProvider");
  }
  return context;
};
