"use client";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";

export default function KnowledgeHub() {
  return (
    <div className="grid grid-cols-[40vw_60vw_40vw] grid-rows-[60px_auto] w-screen h-screen">
      <NavBar />
      <SideBar/>
    </div>
  );
}
