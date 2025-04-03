'use client'

import { createContext, useContext, useEffect, useState } from "react";
import {fetchBalance} from "../api/payments/usuario/getBalance"
const AppContext = createContext();

const formatToBRL = (value) => {
  
  if (typeof value !== "number" || isNaN(value)) {
    return "R$ 0,00";
}

  return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
  });
};

export const AppProvider = ({ children }) => {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const loadBalance = async () => {
      const balance = formatToBRL(await fetchBalance());
      setBalance(balance);
    };
  
    // Atualiza quando a aba fica visível
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        loadBalance();
      }
    };
    handleVisibilityChange()
  
    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
  

  return (
    <AppContext.Provider value={{ balance, setBalance }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
