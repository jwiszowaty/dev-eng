import { getProgress } from "@/services/progressApi";
import { getResources } from "@/services/resourceApi";
import { useEffect, useState } from "react";

export default function IndividualResources({ selectedStudent }) {
    const [IndRes, setIndRes] = useState();
    useEffect(() => {
        (async function () {
            const response = await getProgress(selectedStudent.userId)
            console.log(response);
            
        })()
    },[selectedStudent])
  return <div className=" flex flex-col ml-4 bg-pink-700"><div>Resources</div></div>;
}
