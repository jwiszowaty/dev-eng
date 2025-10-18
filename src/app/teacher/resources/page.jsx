"use client";
import NavBarTeacher from "@/components/teacher/NavBarTeacher";
import Resources from "@/components/teacher/Resources";
import ResourceSubmission from "@/components/teacher/ResourceSubmission";
import { postResource, putResource } from "@/services/resourceApi";
import { useEffect, useState } from "react";

function resources() {
  const [loading, setLoading] = useState(false)
  const [trigger, setTrigger] = useState(false)
  const [edit, setEdit] = useState({_id: "", title: "", category: "", content: ""})
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true)
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    console.log("edit: ",edit);
    console.log("values: ",values);
    
    
    if (edit._id) {
      await putResource(edit);
    } else {
      await postResource(values);
    }
    e.target.reset()
    setLoading(false)
    setEdit({_id: "", title: "", category: "", content: ""})
    setTrigger(!trigger)
  }
  useEffect(() => {}, [trigger]);
  return (
    <div>
      <NavBarTeacher />
      <p className="m-3">manage resources</p>
      <div>
        <ResourceSubmission loading={loading} setEdit={setEdit} edit={edit} handleSubmit={handleSubmit} />
        <Resources setEdit={setEdit} trigger={trigger} />
      </div>
    </div>
  );
}

export default resources;
