import LoadingSpinner from "@/components/common/LoadingSpinner";
import { updateUser } from "@/services/userApi";
import { useEffect, useState } from "react";

export default function StudentAccount({
  view,
  selectedStudent,
  setSelectedStudent,
}) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log(selectedStudent);
    
  }, [])
  return (
    <div className="w-full flex flex-col place-items-center">
      <p>Account details</p>
      {selectedStudent && (
        <div className="flex flex-col py-4 gap-3">
          <div className="flex flex-wrap place-content-center">
            <p className="flex place-content-center flex-nowrap font-bold">user ID:</p>
            <p className="pr-3 px-3">{selectedStudent.userId}</p>
          </div>
          <div className="flex flex-wrap place-content-center">
            <p className="flex place-content-center flex-nowrap font-bold pr-3">name:</p>
            <input
              className="bg-gray-200 pr-3 px-3"
              value={selectedStudent.name}
              onChange={(e) => setSelectedStudent({...selectedStudent, name: e.target.value})}
            />
          </div>
          <div className="flex flex-wrap place-content-center">
            <p className="flex place-content-center flex-nowrap font-bold pr-3">resources:</p>
            <input
              className="bg-gray-200 pr-3 px-3"
              value={selectedStudent.resources ? selectedStudent.resources.toString() : ""}
              onChange={(e) => {
                setSelectedStudent({ ...selectedStudent, resources: e.target.value.split(",") })
              }}
            />
          </div>
        </div>
      )}
      <div className="border w-[200px]" onClick={async () => {
        setLoading(true)
        await updateUser(selectedStudent)
        setLoading(false)
      }}>
        {loading ? <LoadingSpinner/> : "save"}
      </div>
    </div>
  );
}
