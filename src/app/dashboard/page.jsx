"use client";
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import Notes from "../../components/Notes";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import useNetworkStatus from "../hooks/useNetworkStatus";
import NetworkOffline from "@/components/NetworkOffline";
import KnowledgeHub from "@/components/KnowledgeHub";
export default function Dashboard() {
  const { isOnline } = useNetworkStatus();
  const router = useRouter();
  const [content, setContent] = useState(<KnowledgeHub/>);
  const { currentUser } = useAuth();
  useEffect(() => {
    console.log("is Online? ", isOnline);
    
    if (!currentUser?.uid) {
      router.replace('/')
    }
  }, [currentUser])
  if (!currentUser?.uid) return null;
  return (
    <>
      <header className="flex gap-20 h-15 bg-blue-100">
        <h1 className="text-4xl font-bold text-[#4A4A4A] self-center">
          dev<span className="text-[#003B66]">Eng</span>
        </h1>
        <NavBar content={content} setContent={setContent} />
      </header>
      <main>{isOnline ? content : <NetworkOffline/>}</main>
    </>
  );
}