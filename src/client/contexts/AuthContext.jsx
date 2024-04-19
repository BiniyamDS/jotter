import { createContext, useContext, useState, useEffect } from "react";
// import { createUser, login } from "../auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  async function signIn(email, password) {
    // console.log('Signed in')
    return auth.signInWithEmailAndPassword(email, password);
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  async function register(email, password) {
    // return await createUser(email, password);
    // return auth.createUserWithEmailAndPassword(email, password);
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
