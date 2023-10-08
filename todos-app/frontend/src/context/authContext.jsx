import { useContext, createContext, useState } from "react";
import { login, signUp, signUpAvatar, updateAccount } from "../services";
import { useNavigate } from "react-router-dom";
import { CURRENT_USER_LOCAL_STORAGE } from "../utils/constants";

const AuthContext = createContext();

// Accedemos al localStorage para mirar si hay el currentUser
const currentUser = JSON.parse(
  localStorage.getItem(CURRENT_USER_LOCAL_STORAGE)
);

export function AuthProvider({ children }) {
  // Variable de estado para guardar los datos del usuario
  // Para después mostrar en el header un "Hola, Ana"
  // Inicializamos con los datos de usuario guardados en el localStorage (si los hay)
  const [user, setUser] = useState(currentUser?.user);
  // Variable de estado para guardar si el usuario está logueado o no
  // Para en el header mostrar o no los links adecuados
  // Inicializamos a true si existe currentUser en el localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(!!currentUser);

  const navigate = useNavigate();

  // Función para loguearse
  const signIn = async (email, password) => {
    try {
      // Llamamos al servicio del login
      const response = await login(email, password);
      // Guardamos que se ha autenticado
      setIsAuthenticated(true);
      // Guardamos los datos de usuario
      setUser(response.data.user);
    } catch (error) {
      // IMPORTANTE: tenemos que retornar de esta manera
      // Sino no llegará el error a la función donde llamamos a ésta
      return Promise.reject(error);
    }
  };

  // Función para registrarse
  const registerUser = async (data) => {
    try {
      // Llamamos al servicio del registro
      const response = await signUp(
        data.name,
        data.surname,
        data.gender,
        data.email,
        data.password
      );
      // Guardamos que se ha autenticado
      setIsAuthenticated(true);
      // Guardamos los datos de usuario
      setUser(response.data.user);
    } catch (error) {
      // IMPORTANTE: tenemos que retornar de esta manera
      // Sino no llegará el error a la función donde llamamos a ésta
      return Promise.reject(error);
    }
  };

  // Función para registrarse con avatar
  const registerUserAvatar = async (formData, config) => {
    try {
      // Llamamos al servicio del registro
      const response = await signUpAvatar(formData, config);
      // Guardamos que se ha autenticado
      setIsAuthenticated(true);
      // Guardamos los datos de usuario
      setUser(response.data.user);
    } catch (error) {
      // IMPORTANTE: tenemos que retornar de esta manera
      // Sino no llegará el error a la función donde llamamos a ésta
      return Promise.reject(error);
    }
  };

  // Función para desloguearse
  const logOut = () => {
    // Eliminamos el currentUser del localStorage
    localStorage.clear(CURRENT_USER_LOCAL_STORAGE);
    // Modifiamos el isAuthenticated a false
    setIsAuthenticated(false);
    // Eliminamos los datos de usuario guardados
    setUser(undefined);
    // Navegamos al login
    navigate("login");
  };

  const updateProfile = async (formData, config) => {
    try {
      const response = await updateAccount(formData, config);
      setUser(response.data.user);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  // Todo lo que pongamos en la prop value van a ser los datos accesibles
  return (
    <AuthContext.Provider
      value={{
        signIn,
        registerUser,
        logOut,
        user,
        isAuthenticated,
        registerUserAvatar,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
