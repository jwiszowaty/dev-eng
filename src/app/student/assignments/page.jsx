"use client";
import NavBar from "@/components/common/NavBar";
import { useAuth } from "@/contexts/AuthContext";
import { getAssignments } from "@/services/assignmentApi";
import { useEffect, useState } from "react";
export default function Worksheets() {
  const [assignments, setAssignments] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    (async function () {
      const ownAssignments = await getAssignments(currentUser?.uid);
      setAssignments(ownAssignments);
    })();
  }, [currentUser]);

  return (
    <div>
      <NavBar />
      <div className="w-[60vw] place-self-center">
        <p className="text-2xl my-2">
          Assignments
        </p>
        <table className="border-1 w-full">
        <thead>
          <tr className="border-1 border-b-2">
            <th className="font-normal">title</th>
            <th className="font-normal">descirption</th>
            <th className="font-normal">category</th>
            <th className="font-normal">status</th>
          </tr>
        </thead>
        <tbody>
          {assignments.length > 0 &&
            assignments.map((assignment) => {
              return (
                <tr key={assignment._id} className="hover:bg-amber-50 h-[40px]">
                  <td className="text-center">{assignment?.title}</td>
                  <td className="text-center">{assignment?.description}</td>
                  <td className="text-center">{assignment?.category}</td>
                  <td className="text-center">{assignment?.status}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      </div>
    </div>
  );
}
