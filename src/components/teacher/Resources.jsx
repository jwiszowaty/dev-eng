import LoadingSpinner from "@/components/common/LoadingSpinner";
import { getResources } from "@/services/resourceApi";
import { useEffect, useState } from "react";

export default function Resources({ setEdit, trigger }) {
  const [resources, setResources] = useState();
  const [loading, setLoading] = useState(true)
    const [view, setView] = useState();
  useEffect(() => {
    setTimeout(() => {
      (async function () {
        setResources(await getResources());
      })();
    }, 1000)
    setLoading(false)
  }, [trigger]);
  return (
    <div className="m-3">
      {loading && <LoadingSpinner/>}
      {resources &&
        resources.map(({ _id, title, category, content }) => {
          
          const contentParsed = JSON.parse(content.replace(/\n|\\/g,""));
          return (
            <div
              key={_id}
              className="flex flex-col gap-3 hover:shadow-2xs hover:bg-gray-200"
            >
              <div className="flex gap-3 hover:shadow-2xs hover:bg-gray-200">
                <p className="w-[200px] text-center">{title}</p>
                <p className="w-[100px] text-center">{category}</p>
                <button
                  onClick={() => setEdit({ _id, title, category, content })}
                  className="text-blue-600 not-hover:underline"
                >
                  edit
                      </button>
                      <button onClick={() => setView(view === _id ? "" : _id)} className="text-blue-600 not-hover:underline">{ view === _id ? "collapse" : "expand"}</button>
              </div>
              {view === _id && (
                <ul>
                  {
                    Object.keys(contentParsed).map(key => {
                      return <li className="flex ml-12 mb-3 gap-3"><p>{key}</p><a href={contentParsed[key].url} target="_blank" className="text-blue-600 not-hover:underline">link</a></li>
                  })
                  }
                </ul>
              )}
            </div>
          );
        })}
    </div>
  );
}
