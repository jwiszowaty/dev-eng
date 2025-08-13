"use client";
import useNetworkStatus from "./hooks/useNetworkStatus";
import NetworkOffline from "@/components/NetworkOffline";
import { useRouter} from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import NavBar from "@/components/NavBar";
import Report from "@/components/Report";
export default function Dashboard() {
  const router = useRouter();
  const {currentUser } = useAuth()
  const { isOnline } = useNetworkStatus();
  if (isOnline && !currentUser?.uid) {
    router.push("/learn")
  }
  return (
    <>
        <NavBar/>
      <main>
        {!isOnline && <NetworkOffline />}
        {isOnline && currentUser?.uid && (
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Welcome to your Dashboard</h1>
            <p className="text-lg mb-6">Here you can manage your notes, essays, and more.</p>
          </div>
        )}
        <Report/>
      </main>
    </>
  );
}