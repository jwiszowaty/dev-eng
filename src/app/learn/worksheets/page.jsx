"use client";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import Worksheet from "@/components/Worksheet";
import { useAuth } from "@/contexts/AuthContext";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../../../../firebase";
export default function Worksheets() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [worksheet, setWorksheet] = useState(null);
  const [worksheets, setWorksheets] = useState(null);
  const { currentUser } = useAuth();

  const subCategoriesCSS = "px-4 py-2 hover:underline text-blue-800 text-sm font-medium transition";

  async function fetchWorksheet(_id) {
    const request = await fetch(
      `/api/worksheet?userId=${currentUser?.uid}&_id=${_id}`
    );
    const response = await request.json();
    const url = await getDownloadURL(
      ref(storage, "Rafał 18_09_2025 worksheet.pdf")
    );
    setPdfUrl(url);
    setWorksheet(response.data);
  }

  useEffect(() => {
    (async function () {
      const request = await fetch(`/api/worksheet?userId=${currentUser?.uid}`);
      const response = await request.json();
      setWorksheets(response.data);
    })();
  }, [currentUser, worksheet]);
  if (worksheet) {

    return (
      <div className="overflow-hidden grid grid-cols-[20vw_60vw_20vw] grid-rows-[60px_calc(100vh-60px)] w-screen h-screen">
        <NavBar />
        <SideBar />
      <Worksheet
        setWorksheet={setWorksheet}
        worksheet={worksheet}
        pdfUrl={pdfUrl}
        />
        <div>
          <p className="flex place-content-start place-items-center px-4 h-[40px] text-2xl font-bold">myWorksheets</p>
          <div>
            {worksheets &&
              worksheets.map((worksheet) => {
                 return (
                  <div className="flex px-4 place-items-center">
                     <div>{worksheet.completed ? "✅" : "🔴"}</div>
                     {worksheet.completed}
                  <p onClick={() => fetchWorksheet(worksheet._id)} className={subCategoriesCSS}>
                    {worksheet.fileName}
                    </p>
                    </div>
                );
              })}
          </div>
        </div>
        </div>
    );
  } else {
    return (
      <div className="overflow-hidden grid grid-cols-[20vw_60vw_20vw] grid-rows-[60px_calc(100vh-60px)] w-screen h-screen">
        <NavBar />
        <SideBar />
        <div className="col-start-2 col-end-3 row-start-2 w-[60vw] h-full box-border max-w-5xl pt-[40px] p-10 border-x-2 border-blue-950"></div>
        <div>
          <p className="flex place-content-start place-items-center px-4 h-[40px] text-2xl font-bold">myWorksheets</p>
          <div>
            {worksheets &&
              worksheets.map((worksheet) => {
                return (
                  <div className="flex px-4 place-items-center">
                    <div>{ worksheet.completed ? "✅" : "🔴"}</div>
                     {(worksheet.completed).toString()}
                  <p onClick={() => fetchWorksheet(worksheet._id)} className={subCategoriesCSS}>
                    {worksheet.fileName}
                    </p>
                    </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}
