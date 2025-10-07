"use client";
import NavBar from "@/components/common/NavBar";
import EssaySubmission from "@/components/EssaySubmission";
import { useAuth } from "@/contexts/AuthContext";
import { uploadEssay } from "@/lib/funcs";
import { getAssignments, putAssignment } from "@/services/assignmentApi";
import { useEffect, useState } from "react";
export default function Worksheets() {
  const [assignments, setAssignments] = useState([]);
  const [assignment, setAssignment] = useState();
  const { currentUser } = useAuth();
  const [showDescription, setShowDescription] = useState(false);
  const [title, setTitle] = useState("");
  const [essay, setEssay] = useState("");
  const [submit, setSubmit] = useState(false);
  async function submitEssay() {
    if (assignment) {
      await putAssignment({ ...assignment, status: "submitted" })
    }
      await uploadEssay(currentUser.uid, title, essay);
    setTitle("");
    setEssay("");
    setSubmit(false);
  }
  useEffect(() => {
    (async function () {
      const ownAssignments = await getAssignments(currentUser?.uid);
      setAssignments(ownAssignments);
    })();
  }, [currentUser]);

  return (
    <div>
      <NavBar />
      <div className="w-[95vw] md:max-w-[60vw] place-self-center">
        <p className="text-2xl my-2">Assignments</p>

        <table className="border-1 w-full">
          <thead>
            <tr className="border-1 border-b-2">
              <th className="font-normal">title</th>
              <th className="hidden font-normal md:table-cell">description</th>
              <th className="font-normal">category</th>
              <th className="font-normal">status</th>
            </tr>
          </thead>
          <tbody>
            {assignments.length > 0 &&
              assignments.map((task) => {
                let status;
                if (
                  task?.category === "writing" &&
                  task?.status === "pending"
                ) {
                  status = (
                    <button
                      className="hover:underline text-blue-700"
                      onClick={() => {
                        setSubmit(true)
                        setTitle(task?.title)
                        setAssignment(task)
                      }}
                    >
                      submit
                    </button>
                  );
                } else {
                  status = task?.status;
                }
                return (
                  <>
                    <tr
                      key={task._id}
                      className="hover:bg-amber-50 h-[40px]"
                      onClick={() => setShowDescription(showDescription === task._id ? false : task._id)}
                    >
                      <td className="text-center">{task?.title}</td>
                      <td className="text-center hidden md:table-cell">
                        {task?.description}
                      </td>
                      <td className="text-center">{task?.category}</td>
                      <td className="text-center">{status}</td>
                    </tr>
                    <tr className={showDescription === task._id ? "md:hidden table-row text-center " : "hidden"}>
                      <td colSpan={3}>{task?.description}</td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
        <EssaySubmission
          submit={submit}
          setSubmit={setSubmit}
          setTitle={setTitle}
          title={title}
          setEssay={setEssay}
          essay={essay}
          submitEssay={submitEssay}
          assignment={assignment}
        />
      </div>
    </div>
  );
}
