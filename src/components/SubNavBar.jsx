import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useEffect } from "react";

export default function SubNavBar({
  students,
  selectedStudent,
  setSelectedStudent,
  setView,
  view,
}) {
  return (
    <div className="flex flex-col w-full p-4 gap-2">
      {!students && <LoadingSpinner />}
      {selectedStudent && (
        <>
          <div className="flex w-[calc(100%-40px)] md:w-full gap-4 overflow-scroll">
            {students &&
              students.map((student) => {
                return (
                  <p
                    key={student.userId}
                    onClick={() => setSelectedStudent(student)}
                    className={"px-4 rounded-full border-1 border-black hover:bg-yellow-100 cursor-default".concat(
                      selectedStudent?.userId === student.userId
                        ? " bg-yellow-300"
                        : ""
                    )}
                  >
                    {student.name ?? student.userId}
                  </p>
                );
              })}
          </div>
          <div className="flex w-full gap-4 place-content-between md:place-content-start">
            <button
              onClick={() => setView("written")}
              className={"underline".concat(
                view === "written" ? " font-bold" : ""
              )}
            >
              Written
            </button>
            <button
              onClick={() => setView("assignments")}
              className={"underline".concat(
                view === "assignments" ? " font-bold" : ""
              )}
            >
              Assignments
            </button>
            <button
              onClick={() => setView("flashcards")}
              className={"underline".concat(
                view === "flashcards" ? " font-bold" : ""
              )}
            >
              Flashcards
            </button>
            <button
              onClick={() => setView("account")}
              className={"underline".concat(
                view === "account" ? " font-bold" : ""
              )}
            >
              Account
            </button>
          </div>
        </>
      )}
    </div>
  );
}
