import LoadingSpinner from "@/components/common/LoadingSpinner";
import { deleteAssignment } from "@/services/assignmentApi";

export default function AssignmentSubmission({handleSubmit, edit, setEdit, setLoading, loading, selectedStudent, setTrigger, trigger}) {

  return (
    <form
        onSubmit={(e) => handleSubmit(e, edit ? true : false)}
        className="flex flex-col bg-amber-200 rounded border-1 p-1 gap-2 w-full md:max-w-[600px]"
      >
        {edit && (
          <label>
            assignment Id:
            <input type="text" name="_id" value={edit._id} readOnly />
          </label>
        )}

        <label className="flex flex-nowrap gap-1">
          UID:
          <input
          className="w-full"
            type="text"
            name="userId"
            value={edit ? edit.userId : selectedStudent?.userId}
            readOnly
          />
        </label>
        <label className="flex flex-nowrap gap-1">
            category: 
            <select name="category" id="category" className="bg-white rounded border-1">
              <option value={edit?.category ?? "general"}>{edit?.category ?? "general"}</option>
              <option
                value={edit?.status === "writing" ? "general" : "writing"}
              >
                {edit?.category === "writing" ? "general" : "writing"}
              </option>
            </select>
      </label>
      {edit && (
          <label className="flex flex-nowrap gap-1">
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
        <label className="flex flex-nowrap gap-1 w-full">
          title:
        <input
          className="bg-white rounded border-1 w-full"
            type="text"
            name="title"
            defaultValue={edit ? edit.title : ""}
          />
        </label>
        <label className="flex flex-col gap-1">
          description
          <textarea
          className="bg-white rounded border p-1 resize-none overflow-y-auto h-[32px]"
            type="text"
            name="description"
          defaultValue={edit ? edit.description : ""}
          onInput={(e) => {
            e.target.style.height = Math.min(e.target.scrollHeight, 300) + "px";
          }}
          />
        </label>
        
        {loading ? <LoadingSpinner /> : <button className="bg-white rounded border-1 w-[130px] place-self-center" type="submit">submit</button>}
      {edit && <button onClick={() => setEdit()}>cancel</button>}
      {edit && <button onClick={async () => {
                        setLoading(true)
                        await deleteAssignment(edit._id)
                        setLoading(false)
                        setTrigger(!trigger)
                      }}>delete</button>}
      </form>
  )
}
