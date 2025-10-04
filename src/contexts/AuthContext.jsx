"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const logout = () => {
    signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setCurrentUser(firebaseUser); // sets user to null if signed out
      setLoading(false);
    });

    return () => unsubscribe(); // clean up
  }, []);
  return (
    <AuthContext.Provider
      value={{
        setCurrentUser,
        currentUser,
        logout,
        loading,
        accessToken,
        setAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
