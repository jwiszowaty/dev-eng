import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { useAuth } from "../contexts/AuthContext";

export default function SignInWithGoogle() {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const { setAccessToken } = useAuth();
      setAccessToken(credential.accessToken);
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <button
      onClick={handleLogin}
      className="
    inline-flex items-center
    bg-white border border-gray-300 rounded-md
    shadow-sm
    px-4 py-2
    text-sm font-medium text-gray-700
    hover:bg-gray-50
    focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-600
    transition
    cursor-pointer
  "
    >
      Sign In with Google account
    </button>
  );
}
