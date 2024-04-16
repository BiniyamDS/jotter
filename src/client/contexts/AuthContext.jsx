import { createContext, useContext, useState } from "react";
import { createUser, login } from "../auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  async function signIn(name, password) {
    // console.log('Signed in')
    const { username } = await login(name, password);
    setCurrentUser({ username: username });
  }

  function logout() {
    return setCurrentUser()
  }

  async function register(username, password) {
    return await createUser(username, password);
  }

  const value = {
    currentUser,
    signIn,
    register,
    logout
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
