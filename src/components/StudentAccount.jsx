import LoadingSpinner from "@/components/common/LoadingSpinner";
import { updateStudent } from "@/services/userApi";
import { useEffect, useState } from "react";

export default function StudentAccount({
  view,
  selectedStudent,
  setSelectedStudent,
}) {
  const [loading, setLoading] = useState(false);
  useEffect(()=>{}, [])
  return (
    <div className="flex flex-col place-items-center">
      <p>Account details</p>
      {selectedStudent && (
        <div className="my-4">
          <div className="flex gap-3 flex-nowrap">
            <p className="flex place-content-end w-[90px] flex-nowrap">user ID:</p>
            <p className="mr-3 px-3 w-full">{selectedStudent.userId}</p>
          </div>
          <div className="flex gap-3">
            <p className="flex place-content-end w-[90px] flex-nowrap">name:</p>
            <input
              className="bg-gray-200 mr-3 px-3 w-full"
              value={selectedStudent.name}
              onChange={(e) => setSelectedStudent({...selectedStudent, name: e.target.value})}
            />
          </div>
        </div>
      )}
      <div className="border w-[200px]" onClick={async () => {
        setLoading(true)
        await updateStudent(selectedStudent)
        setLoading(false)
      }}>
        {loading ? <LoadingSpinner/> : "save"}
      </div>
    </div>
  );
}
