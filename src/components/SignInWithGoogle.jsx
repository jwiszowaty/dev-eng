import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function SignInWithGoogle({ setLoading }) {
  const { setAccessToken, setCurrentUser } = useAuth();
  const router = useRouter();
  const handleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const idToken = await user.getIdToken();
      const res = await fetch("/api/session-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken, user }),
      });

      if (res.ok) {
        console.log("Session cookie set!");
      } else {
        console.log(res);
        
        alert("cookie not set: ", res.statusText);
      }
      const sessionLogin = await res.json();
      const response = await fetch(`/api/users?userId=${user.uid}`);
      const mongoUser = await response.json();
      const credential = GoogleAuthProvider.credentialFromResult(result);
      setAccessToken(credential.accessToken);
      setCurrentUser((prev) => ({ ...prev, ...mongoUser }));
      router.replace(sessionLogin.url);
    } catch (error) {
      console.log(error);
      alert("error: ",error.message);
      setLoading(false);
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
    focus:outline-none focus:ring-2 focus:ring-offset-1
    transition
    cursor-pointer
  "
    >
      Sign In with Google account
    </button>
  );
}
