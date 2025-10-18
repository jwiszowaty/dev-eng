import { getResources } from "@/services/resourceApi";
import { useEffect } from "react";

export default function IndividualResources({selectedStudent}) {
    useEffect(() => {
        (async function () {
            const response = getProgress()
        })()
    },[selectedStudent])
  return <div className=" flex flex-col ml-4 bg-pink-700"><div>Resources</div></div>;
}
