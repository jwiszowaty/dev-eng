import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";

export default function SignOut() {
  const { logout } = useAuth();
  return (
    <button className="bg-blue-900 px-2.5 text-white" onClick={logout}>
      sign out
    </button>
  );
}
