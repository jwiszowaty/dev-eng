import { useEffect } from "react";

export default function Worksheet({ setWorksheet, worksheet, pdfUrl }) {
  console.log(worksheet)
  async function markComplete() {
    const response = await fetch("/api/worksheet", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({_id: worksheet._id, completed: true}),
    });
    const updatedWorksheet = await response.json();
    setWorksheet(updatedWorksheet)
  }
  useEffect(() => {
    console.log(worksheet)
  }, [worksheet])
  return (
    <div className="flex flex-col place-items-center h-full box-border max-w-5xl pt-2 bg-blue-100">
      {worksheet.completed ? <div className="mb-2 rounded-full border-green-400 border-2 bg-green-400 px-4 w-min text-nowrap font-bold">completed</div>
        : <button
          className="mb-2 rounded-full border-green-400 border-2 bg-white hover:bg-green-400 px-4 w-min text-nowrap font-bold"
          onClick={markComplete}
        >mark as completed</button>}
      <iframe src={pdfUrl} width="100%" height="100%"></iframe>
    </div>
  );
}
