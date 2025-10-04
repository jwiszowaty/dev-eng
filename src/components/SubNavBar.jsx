import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useEffect } from "react";

export default function SubNavBar({
  students,
  selectedStudent,
  setSelectedStudent,
  setView,
  view,
}) {
  useEffect(() => {}, [selectedStudent]);
  return (
    <div className="flex flex-col w-min m-4 gap-2">
      {!students && <LoadingSpinner />}
      <div className="flex w-[100vw] gap-4">
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
      <div className="flex w-[100vw] gap-4">
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
    </div>
  );
}
