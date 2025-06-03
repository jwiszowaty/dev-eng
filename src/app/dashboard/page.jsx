"use client";
import { useState } from "react";
import NavBar from "../../components/NavBar";
import Notes from "../../components/Notes";
export default function Dashboard() {
  const [content, setContent] = useState(<Notes />);
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