"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const logout = () => {
    signOut(auth);
    router.replace("/");
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
      value={{ currentUser, logout, loading, accessToken, setAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
