'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { fetchBalance } from "../api/payments/usuario/getBalance"
import { checkSession } from "../services/auth";
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


  const [dadosUsuarios, definirDadosUsuarios] = useState({})
  const [usuarioAutenticado, definirUsuarioAutenticado] = useState(false)

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  useEffect(() => {

    const loadBalance = async () => {
      const balance = formatToBRL(await fetchBalance());
      setBalance(balance);
    };

    definirUsuarioAutenticado(!isEmpty(dadosUsuarios))

    const init = async () => {
      
      if (!isEmpty(dadosUsuarios)) {
       await loadBalance();
      }
    };

    init();

    document.addEventListener("visibilitychange", init);
    return () => {
      document.removeEventListener("visibilitychange", init);
    };
  }, [dadosUsuarios]);



  return (
    <AppContext.Provider value={{
      balance, setBalance,
      dadosUsuarios, definirDadosUsuarios,
      usuarioAutenticado, definirDadosUsuarios
    }}>
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
