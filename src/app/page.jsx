"use client";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import useNetworkStatus from "../hooks/useNetworkStatus";
import NetworkOffline from "@/components/NetworkOffline";
import Report from "@/components/Report";
import SignInWithGoogle from "@/components/SignInWithGoogle";
import { useState } from "react";
export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const { isOnline } = useNetworkStatus();

  if (isOnline) {
    return (
      <div className="flex place-content-center w-[100vw] h-[100vh] bg-blue-950">
        <div className="bg-gray-200 rounded flex flex-col place-self-center place-content-center shadow-2xl shadow-black p-4 w-[80%]">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Welcome to Dev<span className="text-[#003B66]">Eng</span>!
          </h1>
          <div className="flex justify-center mt-6">
            {loading ? (
              <LoadingSpinner />
            ) : (
              <SignInWithGoogle setLoading={setLoading} />
            )}
          </div>
          <Report />
        </div>
      </div>
    );
  } else {
    return <NetworkOffline />;
  }
}
