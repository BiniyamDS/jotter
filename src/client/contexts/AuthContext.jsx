import { createContext, useContext, useState, useEffect, useRef } from "react";
import { auth } from "../firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  async function signIn(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  async function register(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  const value = {
    currentUser,
    signIn,
    register,
    logout,
    resetPassword,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
