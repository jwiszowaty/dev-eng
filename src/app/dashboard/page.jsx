"use client";
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import Notes from "../../components/Notes";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
export default function Dashboard() {
  const router = useRouter();
  const [content, setContent] = useState(<Notes />);
  const { user } = useAuth();
  useEffect(() => {
    if (!user?.uid) {
      router.replace('/')
    }
  }, [user])
  if (!user?.uid) return null;
  return (
    <>
      <header className="flex gap-20">
        <h1 className="text-xl font-bold text-[#4A4A4A]">
          dev<span className="text-[#003B66]">Eng</span>
        </h1>
        <NavBar content={content} setContent={setContent} />
      </header>
      <main>{content}</main>
    </>
  );
}