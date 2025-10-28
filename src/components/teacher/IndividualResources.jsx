import LoadingSpinner from "@/components/common/LoadingSpinner";
import { getProgress, updateProgress } from "@/services/progressApi";
import { getResources } from "@/services/resourceApi";
import { useEffect, useState } from "react";

export default function IndividualResources({ selectedStudent }) {
  const [resources, setResources] = useState();
  const [selectedResource, setSelectedResource] = useState();
  const [selectedProgress, setSelectedProgress] = useState();
  const [progress, setProgress] = useState();
  const [progressData, setProgressData] = useState();
  const [showProgress, setShowProgress] = useState();
  const [loading, setLoading] = useState(false);
  async function toggleCompleteStatus(e) {
    let isCompleted = progressData[e.target.id].includes("completed");
    let progressCopy = [...progress]
    
    let resourceUpdated = progress.filter(element => element.section === e.target.id)[0]
    console.log("isCompleted?", isCompleted);
    console.log(resourceUpdated);
    if (isCompleted) {
      const index = resourceUpdated.progressData.indexOf("completed")
      resourceUpdated.progressData.splice(index,1)
    } else {
      resourceUpdated.progressData.push("completed")
    }
    console.log(resourceUpdated);
    
    progressCopy = [...progressCopy.filter(element => element._id !== resourceUpdated._id), resourceUpdated]
    console.log(progressCopy);
    setProgress(progressCopy)
    await updateProgress(resourceUpdated)
  }
  async function handleChoice(resource) {
    setLoading(true);
    setSelectedResource(resource);
    const response = await getResources();
    setSelectedProgress(
      JSON.parse(
        response.filter((element) => element.title === resource)[0].content
      )
    );
    setLoading(false);
  }
  useEffect(() => {
    (async function () {
      setSelectedProgress();
      const response = await getProgress(selectedStudent.userId);
      setProgress(response.data)
      const completedExercises = {};
      response.data.forEach(
        (element) =>
          (completedExercises[element.section] = element.progressData)
      );
      setProgressData(completedExercises ?? undefined);

      setResources([
        ...new Set(response.data.map((element) => element.resource)),
      ]);

      response.data[0]?.resource
        ? await handleChoice(response.data[0].resource)
        : "";
    })();
  }, [selectedStudent]);
  return (
    <div className=" flex flex-col ml-4">
      <div className="flex gap-3 p-3">
        {resources &&
          resources.map((element) => (
            <button
              onClick={() => handleChoice(element)}
              className={"border rounded px-3".concat(selectedResource == element ? " font-bold shadow-2xl" : "")}
            >
              {element}
            </button>
          ))}
      </div>
      {loading && <LoadingSpinner />}
      {selectedProgress &&
        Object.keys(selectedProgress).map((element) => {
          return selectedProgress[element].includes("https") ? (
            <div className={"flex gap-3 pl-[12px] hover:border-l-2 hover:border-amber-700 hover:bg-amber-100 hover:pl-[10px]".concat(progressData[element]?.includes("completed") ? " bg-green-300" : "")}>
              <div className="flex gap-3 cursor-pointer">
                <p className="w-[400px]">{element}</p>
                <a
                  className="text-blue-700 hover:underline"
                  href={selectedProgress[element]}
                  target="_blank"
                >
                  link
                </a>
              </div>
              <div>
                {(progressData[element] && !progressData[element].includes("completed")) && (progressData[element].toString())}
              </div>
              {progressData[element] && <label className="flex gap-2" onChange={(e) => toggleCompleteStatus(e)}><input id={element} defaultChecked={progressData[element]?.includes("completed")} type="checkbox" />completed</label>}
            </div>
          ) : (
            <div className={"flex gap-3 pl-[12px] hover:border-l-2 hover:border-amber-700 hover:bg-amber-100 hover:pl-[10px]".concat(progressData[element]?.includes("completed") ? " bg-green-300" : "")}>
              <p className="w-[20px]">{element}</p>
                <p>{selectedProgress[element]}</p>
                {(progressData[element]?.length > 0 && !progressData[element].includes("completed")) && (progressData[element].toString())}
                {progressData[element]?.length > 0 && <label className="flex gap-2" onChange={(e) => toggleCompleteStatus(e)}><input id={element} defaultChecked={progressData[element]?.includes("completed")} type="checkbox" />completed</label>}
            </div>
          );
        })}
    </div>
  );
}
