"use client";
import { useState } from "react";
import useNetworkStatus from "./hooks/useNetworkStatus";
import NetworkOffline from "@/components/NetworkOffline";
import KnowledgeHub from "@/components/KnowledgeHub";
import SignOut from "@/components/SignOut";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
export default function Dashboard() {
  const {currentUser } = useAuth()
  const { isOnline } = useNetworkStatus();
  const [content, setContent] = useState(<KnowledgeHub />);
  const navCSS = "self-center font-normal hover:font-extrabold w-auto"
  const router = useRouter();
  if (currentUser?.uid) router.replace("/dashboard");
  return (
    <>
      <header className="flex gap-20 h-15 bg-blue-100">
        <h1 className="text-4xl font-bold text-[#4A4A4A] self-center">
          dev<span className="text-[#003B66]">Eng</span>
        </h1>
        <nav className="flex w-1/1 gap-6 justify-end text-2xl">
              <a
                className={navCSS}
                href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2KQJfwa4yAFo5uNZ9VCbJMK2rNoCcdWHG3KxGC5FDw1O7HhbMfnJfVPDHlfwyBS80KVMrxUsLb"
                target="_blank"
              >
                Book A Lesson 
              </a>
              <button className={content.type.name == "KnowledgeHub" ? "self-center font-extrabold w-auto" : navCSS}
              onClick={() => setContent(<KnowledgeHub/>)}>Knowledge Hub</button>
              <SignOut />
            </nav>
      </header>
      <main>{isOnline ? content : <NetworkOffline/>}</main>
    </>
  );
}