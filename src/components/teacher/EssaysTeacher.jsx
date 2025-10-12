import LoadingSpinner from "@/components/common/LoadingSpinner";
import { getEssays, putEsssay } from "@/services/essayApi";
import { useEffect, useState } from "react";

export default function EssaysTeacher({ selectedStudent }) {
  const [editFeedback, setEditFeedback] = useState();
  const [edit, setEdit] = useState(false);
  const [showEssay, setShowEssay] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [loading, setLoading] = useState(true);
  const [essays, setEssays] = useState();
  function toggleView(essayId) {
    console.log(essayId, showEssay);
    setShowEssay((prev) =>
      prev.includes(essayId)
        ? prev.filter((e) => e !== essayId)
        : [...prev, essayId]
    );
  }
  useEffect(() => {
    (async function () {
      const written = await getEssays(selectedStudent.userId);
      console.log(written);

      setEssays(written);
      setLoading(false);
    })();
  }, [selectedStudent, trigger]);
  return (
    <div className="flex flex-col w-full p-3 place-items-center">
      {loading && <LoadingSpinner />}
      <div>
        {essays &&
          essays.map(({ _id, title, feedback, text }) => {
            return (
              <div
                key={_id}
                className="p-3 flex flex-col gap-3"
                onClick={() => toggleView(_id)}
              >
                <p className="font-bold">{title}</p>
                {loading && <LoadingSpinner/>}
                {feedback !== "Personal feedback will be available soon." &&
                  !edit && !loading && (
                    <div>
                      <button
                        className="w-min underline text-blue-600"
                        onClick={() => setEdit(true)}
                      >
                        edit
                      </button>
                      <p className="whitespace-pre-wrap">{feedback}</p>
                    </div>
                  )}
                {(feedback === "Personal feedback will be available soon." ||
                  edit) && (
                  <div className="p-3">
                    <p>feedback</p>
                    <textarea
                      className="border-1 p-2 w-full"
                      defaultValue={feedback}
                      onChange={(e) => setEditFeedback(e.target.value)}
                    />
                    <button
                      className="border-1 rounded px-2"
                      onClick={async () => {
                        setLoading(true);
                        feedback = editFeedback;
                        await putEsssay({ _id, title, feedback, text });
                        setEdit(false);
                        setTrigger(!trigger);
                      }}
                    >
                      submit
                    </button>
                  </div>
                )}
                <p className="whitespace-pre-wrap italic">{text.trim()}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
