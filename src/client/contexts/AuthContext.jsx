import { createContext, useContext, useState } from "react";
import { createUser, login } from "../auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

	async function signIn(username, password) {
		// console.log('Signed in')
		return  await login(username, password)
	}

	async function register(username, password) {
		return await createUser(username, password)
	}

  const value = {
    currentUser,
		signIn,
		register
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
