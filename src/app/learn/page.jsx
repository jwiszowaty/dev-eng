"use client";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";

export default function KnowledgeHub() {
  return (
    <div className="overflow-hidden grid grid-cols-[20vw_60vw_20vw] grid-rows-[60px_calc(100vh-60px)] w-screen h-screen">
      <NavBar />
      <SideBar/>
    </div>
  );
}
