import LoadingSpinner from "@/components/common/LoadingSpinner";
import { getResources } from "@/services/resourceApi";
import { useEffect, useState } from "react";

export default function AssignmentSubmission({
  handleSubmit,
  edit,
  setEdit,
  setLoading,
  loading,
  selectedStudent,
  setTrigger,
  trigger,
}) {
  const [resources, setResources] = useState();
  const [sections, setSections] = useState();
  const [selectedResource, setSelectedResource] = useState();
  const [selectedSection, setSelectedSection] = useState();
  useEffect(() => {
    setSelectedResource();
    setSelectedSection();
    (async function () {
      let response = await getResources();
      
      if (edit._id) {
        setSelectedResource(edit.resource)
        setSelectedSection(edit.section)
        response = response.splice(response.findIndex(edit.resource), 1);
      }
      const sectionsObject = {}
      response.forEach(element => sectionsObject[element.title] = JSON.parse(element.content))
      
      setSections(sectionsObject)
      setResources(response);
    })();
  }, [edit, trigger]);
  const date = new Date();
  if (resources) {
    return (
      <>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col bg-yellow-400 rounded border-1 p-1 gap-2 w-full md:max-w-[600px]"
      >
        {edit._id && (
          <label>
            assignment Id:
            <input type="text" name="_id" value={edit._id} readOnly />
          </label>
        )}

        <label className="hidden">
          uID:
          <input
            className="w-full"
            type="text"
            name="userId"
            value={edit._id ? edit.userId : selectedStudent?.userId}
            readOnly
          />
        </label>
        <label className="flex flex-nowrap gap-1">
          category:
          <select
            name="category"
            id="category"
            className="bg-white rounded border-1"
          >
            <option value={edit?.category ?? "general"}>
              {edit?.category ?? "general"}
            </option>
            <option value={edit?.status === "writing" ? "general" : "writing"}>
              {edit?.category === "writing" ? "general" : "writing"}
            </option>
          </select>
        </label>
        {edit._id && (
          <label className="flex flex-nowrap gap-1">
            status
            <select name="status" id="status" className="bg-white rounded border">
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
          date:
          <input
            className="bg-white rounded border-1 w-full"
            type="text"
            name="title"
            defaultValue={edit._id ? edit.title : `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`}
          />
          </label>
          

        <label className="flex flex-nowrap gap-1">
          resource:
          <select
            name="resource"
            id="resource"
            value={selectedResource ? selectedResource : "choose"}
            className="bg-white rounded border-1"
            onChange={(e) => {
              if (selectedResource) setSelectedSection();
              setSelectedResource(e.target.value)
            }}
          >

          <option value={selectedResource ? selectedResource : ""}>{selectedResource ? selectedResource : "Select a resource"}</option>
            {resources.map((element) => {
              if (selectedResource == element.title) return;

              return (
                <option  key={element._id} value={element.title}>
                  {element.title}
                </option>
              );
            })}
          </select>
          </label>
          

        {selectedResource &&
         <label className="flex flex-nowrap gap-1">
          {(resources.filter(element => element.title === selectedResource))[0].category === "past papers" ? "title: " : "page: "}
          <select
            name="section"
            id="section"
            value={selectedSection}
            className=" bg-white rounded border-1"
            onChange={(e) => setSelectedSection(e.target.value)}
          >

          <option value={selectedSection ?? ""}>{selectedSection ?? "Select a section"}</option>
            {Object.keys(sections[selectedResource]).map((section) => {
              return (
                <option key={section} value={section}>
                  {section}
                </option>
              );
            })}
          </select>
        </label> 
        }
        {selectedSection &&   <label className="">{sections[selectedResource][selectedSection].includes("http") ? "url: " : "topic: "}<input className="w-full" defaultValue={sections[selectedResource][selectedSection]} readOnly/></label>}
       
          <label className="flex flex-col gap-1">
          description
          <textarea
            className="bg-white rounded border p-1 resize-none overflow-y-auto h-[32px]"
            type="text"
            name="description"
            defaultValue={edit ? edit.description : ""}
            onInput={(e) => {
              e.target.style.height =
                Math.min(e.target.scrollHeight, 300) + "px";
            }}
          />
        </label>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <button
            className="bg-white rounded border-1 w-[130px] place-self-center"
            type="submit"
          >
            submit
          </button>
        )}
      </form>
        {edit._id && <button onClick={() => setEdit({_id:""})}>cancel</button>}
        
    </>
    );
  } else {
    <LoadingSpinner />;
  }
}
