import LoadingSpinner from "@/components/common/LoadingSpinner";
import { deleteAssignment } from "@/services/assignmentApi";
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
  const [selectedResource, setSelectedResource] = useState({index: undefined, value:undefined });
  const [selectedSection, setSelectedSection] = useState(undefined);
  useEffect(() => {
    (async function () {
      let response = await getResources();
      if (edit._id) {
        response = response.splice(response.findIndex(edit.resource), 1);
      }
      setResources(response);
    })();
  }, [edit]);
  if (resources) {
    return (
      <form
        onSubmit={(e) => handleSubmit(e, edit ? true : false)}
        className="flex flex-col bg-yellow-400 rounded border-1 p-1 gap-2 w-full md:max-w-[600px]"
      >
        {edit._id && (
          <label>
            assignment Id:
            <input type="text" name="_id" value={edit._id} readOnly />
          </label>
        )}

        <label className="flex flex-nowrap gap-1">
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
            defaultValue={edit ? edit.title : ""}
          />
        </label>
        <label className="flex flex-nowrap gap-1">
          resource:
          <select
            name="resource"
            id="resource"
            value={selectedResource.value}
            className="bg-white rounded border-1"
            onChange={(e) => {
              console.log(selectedResource);
              
              setSelectedResource({ index: e.target.value, value: resources[e.target.value].title })
            }}
          >

          <option value={selectedResource.value ?? ""}>{selectedResource.value ?? "Select a resource"}</option>
            {resources.map((element, i) => {
              if (selectedResource.value == element.title) return;

              return (
                <option  key={element._id} value={i} name={element.title}>
                  {element.title}
                </option>
              );
            })}
          </select>
        </label>
        {selectedResource.index &&
         <label className="flex flex-nowrap gap-1">
          section:
          <select
            name="section"
            id="section"
            value={selectedSection}
            className="bg-white rounded border-1"
            onChange={(e) => setSelectedSection(e.target.value)}
          >

          <option value={selectedSection ?? ""}>{selectedSection ?? "Select a section"}</option>
            {Object.keys(JSON.parse(resources[Number(selectedResource.index)].content)).map((section, index) => {
              return (
                <option key={section+index} value={section} name={section}>
                  {section}
                </option>
              );
            })}
          </select>
        </label> 
        }
        {selectedSection &&   <label>url:<input className="w-full" value={(JSON.parse(resources[Number(selectedResource.index)].content))[selectedSection].url} readOnly/></label>}
        {selectedSection &&
          (JSON.parse(resources[Number(selectedResource.index)].content))[selectedSection].exercises.map((exercise, index) => {
            let group = "";
             for(let i = 0; i<exercise; i++) {
              const ex = (index + 1).toString() + "." + (i + 1).toString();
               group += `<label key="${index}/label" className="flex"><input type="checkbox" name=${ex}/>${ ex }</label>`
            }
            return <div key={`${index}|div`} dangerouslySetInnerHTML={{ __html: group }} className="flex w-full gap-2"></div>
          }
        )
        }
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
        {edit && <button onClick={() => setEdit()}>cancel</button>}
        {edit && (
          <button
            onClick={async () => {
              setLoading(true);
              await deleteAssignment(edit._id);
              setLoading(false);
              setTrigger(!trigger);
            }}
          >
            delete
          </button>
        )}
      </form>
    );
  } else {
    <LoadingSpinner />;
  }
}
