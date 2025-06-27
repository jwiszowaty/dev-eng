"use client";
import { useEffect, useState } from "react";
import useNetworkStatus from "./hooks/useNetworkStatus";
import NetworkOffline from "@/components/NetworkOffline";
import KnowledgeHub from "@/components/KnowledgeHub";
import SignOut from "@/components/SignOut";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import NavBar from "@/components/NavBar";
export default function Dashboard() {
  const {currentUser } = useAuth()
  const { isOnline } = useNetworkStatus();
  const [content, setContent] = useState(<KnowledgeHub />);
  return (
    <>
      <header className="flex gap-20 h-15 bg-blue-100">
        <h1 className="text-4xl font-bold text-[#4A4A4A] self-center">
          dev<span className="text-[#003B66]">Eng</span>
        </h1>
        <NavBar content={content} setContent={setContent}/>
      </header>
      <main>{isOnline ? content : <NetworkOffline/>}</main>
    </>
  );
}