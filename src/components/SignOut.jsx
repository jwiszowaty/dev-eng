import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

export default function SignOut() {
  const { logout, currentUser } = useAuth();
  const [text, setText] = useState("Loading")
  const router = useRouter();
  useEffect(() => {
  },[currentUser])
  return (
    <button
      className="bg-blue-900 px-2.5 text-white"
      onClick={() => {
        if (currentUser) {
          logout();
        } else {
          router.push("/login")
        }
      }}
    >
      {currentUser?.uid ? "sign out" : "sign in"}
    </button>
  );
}
