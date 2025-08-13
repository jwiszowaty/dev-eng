"use client";
import { useState } from "react";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";

export default function KnowledgeHub() {
  return (
    <div className="grid grid-cols-[280px_auto] grid-rows-[60px_auto] w-screen h-screen">
      <NavBar />
      <SideBar />
    </div>
  );
}
