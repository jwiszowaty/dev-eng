import LoadingSpinner from "@/components/common/LoadingSpinner";
import {
  getAssignments,
  postAssignments,
  putAssignment,
} from "@/services/assignmentApi";
import { useEffect, useState } from "react";

export default function Assignments({ selectedStudent }) {
  const [trigger, setTrigger] = useState(false)
  const [assignments, setAssignments] = useState([]);
  const [edit, setEdit] = useState();
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e, edit) {
    e.preventDefault();
    setLoading(true);
    setEdit();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    if (edit) {
      await putAssignment(values);
    } else {
      await postAssignments(values);
    }
    setLoading(false);
    e.target.reset();
    setTrigger(!trigger)
  }
  useEffect(() => {
    (async function () {
      const ownAssignments = await getAssignments(selectedStudent.userId);
      setAssignments(ownAssignments);
    })();
  }, [trigger, selectedStudent]);
  return (
    <div>
      <p>Assignments</p>
      <form
        onSubmit={(e) => handleSubmit(e, edit ? true : false)}
        className="flex flex-col"
      >
        {edit && (
          <label>
            assignment Id:
            <input type="text" name="_id" value={edit._id} readOnly />
          </label>
        )}

        <label>
          user Id:
          <input
            type="text"
            name="userId"
            value={edit ? edit.userId : selectedStudent.userId}
            readOnly
          />
        </label>
        <label>
            category
            <select name="category" id="category">
              <option value={edit?.category ?? "general"}>{edit?.category ?? "general"}</option>
              <option
                value={edit?.status === "writing" ? "general" : "writing"}
              >
                {edit?.category === "writing" ? "general" : "writing"}
              </option>
            </select>
          </label>
        <label>
          title
          <input
            type="text"
            name="title"
            defaultValue={edit ? edit.title : ""}
          />
        </label>
        <label>
          description
          <input
            type="text"
            name="description"
            defaultValue={edit ? edit.description : ""}
          />
        </label>
        {edit && (
          <label>
            status
            <select name="status" id="status">
              <option value={edit.status}>{edit.status}</option>
              <option
                value={edit.status === "pending" ? "completed" : "pending"}
              >
                {edit.status === "pending" ? "completed" : "pending"}
              </option>
            </select>
          </label>
        )}
        {loading ? <LoadingSpinner /> : <button type="submit">submit</button>}
        {edit && <button onClick={() => setEdit()}>cancel</button>}
      </form>
      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>descirption</th>
            <th>category</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {assignments.length > 0 &&
            assignments.map((assignment) => {
              return (
                <tr key={assignment._id}>
                  <td className="">{assignment?.title}</td>
                  <td className="">{assignment?.description}</td>
                  <td className="">{assignment?.category}</td>
                  <td className="">
                    <button onClick={() => setEdit(assignment)}>
                      {assignment?.status}
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
