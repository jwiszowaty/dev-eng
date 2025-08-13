"use client";
import { useAuth } from "../../contexts/AuthContext";
import SignInWithGoogle from "../../components/SignInWithGoogle";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { currentUser, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!loading && currentUser?.uid) {
      router.push("/");
    }
  }, [loading, currentUser]);
  if (loading) return <p>wait</p>;
  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-gray-900 px-4">
      <div className="bg-gray-300 dark:bg-gray-800 shadow-2xl rounded-2xl p-8 max-w-md w-full text-[#4A4A4A] dark:text-gray-200">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Welcome to Dev<span className="text-[#003B66]">Eng</span>!
        </h1>

        {!currentUser && (
          <div className="flex justify-center mt-6">
            <SignInWithGoogle />
          </div>
        )}
        {currentUser && <button type="button" className="..." disabled>
  <svg className="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24">
    {/* <!-- ... --> */}
  </svg>
  Processing…
</button>}
      </div>
    </div>
  );
}