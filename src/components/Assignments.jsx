import AssignmentSubmission from "@/components/teacher/AssignmentSubmission";
import {
  deleteAssignment,
  getAssignments,
  postAssignments,
  putAssignment,
} from "@/services/assignmentApi";
import { useEffect, useState } from "react";

export default function Assignments({ selectedStudent }) {
  const [assignments, setAssignments] = useState([]);
  const [assignment, setAssignment] = useState();
  const [showDescription, setShowDescription] = useState(false);
  const [title, setTitle] = useState("");
  const [essay, setEssay] = useState("");
  const [submit, setSubmit] = useState(false);

  const [trigger, setTrigger] = useState(false);
  const [edit, setEdit] = useState({ _id: "" });
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    console.log(edit);
    
    if (edit._id) {
      await putAssignment(values);
    } else {
      await postAssignments(values);
    }
    setLoading(false);
    e.target.reset();
    setEdit({_id:""})
    setTrigger(!trigger);
  }
  useEffect(() => {
    (async function () {
      const ownAssignments = await getAssignments(selectedStudent.userId);
      setAssignments(ownAssignments);
    })();
  }, [trigger, selectedStudent]);
  return (
    <div className="flex flex-col w-full p-3 place-items-center">
      <AssignmentSubmission
        handleSubmit={handleSubmit}
        edit={edit}
        setEdit={setEdit}
        loading={loading}
        selectedStudent={selectedStudent}
        setLoading={setLoading}
        setTrigger={setTrigger}
        trigger={trigger}
      />
      <table className="border-1 md:m-10 w-full">
        <tbody>
          {assignments.length > 0 &&
            assignments.map((task) => {
            
              return (
                <>
                  <tr
                    key={task._id}
                    className="hover:bg-amber-50 h-[40px]"
                    onClick={() =>
                      setShowDescription(
                        showDescription === task._id ? false : task._id
                      )
                    }
                  >
                    <td className="text-center">{task?.title}</td>
                    <td>{task?.resource}</td>
                    <td>{task?.section}</td>
                    <td className="p-3 hidden md:table-cell whitespace-pre-wrap">
                      {task?.description}
                    </td>
                    <td className="text-center">{task?.category}</td>
                    <td className="text-center">{task?.status}</td>
                  </tr>
                  <tr
                    className={
                      showDescription === task._id
                        ? "md:hidden table-row whitespace-pre-wrap"
                        : "hidden"
                    }
                  >
                    <td colSpan={3} className="pl-5">
                      {task?.description}
                    </td>
                  </tr>
                  <tr
                    className={
                      showDescription === task._id
                        ? "table-row text-center h-[40px]"
                        : "hidden"
                    }
                  >
                    <td
                      className="text-blue-600 pl-5"
                      onClick={() => {
                        console.log(task);
                        setEdit(task)
                        
                      }}
                    >
                      edit
                    </td>
                    <td onClick={async () => {
              setLoading(true);
              await deleteAssignment(task._id);
              setLoading(false);
              setTrigger(!trigger);
            }}>
            
          
            delete
          </td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
