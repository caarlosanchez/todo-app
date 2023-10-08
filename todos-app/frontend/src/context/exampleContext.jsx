import { useContext, createContext, useState } from "react";

// Creamos el contexto
const ExampleContext = createContext();

// Función que nos devuelve un contenedor para envolver las vistas que queremos que sean accesibles a los datos
export function AuthProvider({ children }) {
  const [value, setValue] = useState();

  const handleSomething = () => {};

  return (
    <ExampleContext.Provider value={{ value, handleSomething }}>
      {children}
    </ExampleContext.Provider>
  );
}

// Función para acceder a los datos desde las vistas
export function useAuth() {
  return useContext(ExampleContext);
}
