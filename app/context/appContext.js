'use client'

import { createContext, useContext, useEffect, useState } from "react";
import {fetchBalance} from "../api/payments/usuario/getBalance"
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

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

  const verificarCookie = async () => {
    const { success, data} = await checkSession();

    if (success){
      definirDadosUsuarios(data);
      definirUsuarioAutenticado(data.usuarioAutenticado);
    }
  }


  useEffect(() => {
    const init = async () => {
      await verificarCookie();
      if (!isEmpty(dadosUsuarios)) {
        loadBalance();
      }
    };
  
    init();
    
    document.addEventListener("visibilitychange", init);
    return () => {
      document.removeEventListener("visibilitychange", init);
    };
  }, []);
  
  

  return (
    <AppContext.Provider value={{ 
      balance, setBalance ,
      dadosUsuarios, definirDadosUsuarios,
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
