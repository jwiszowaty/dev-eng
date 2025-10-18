import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useEffect, useState } from "react";

export default function ResourceSubmission({
  loading,
  edit,
  handleSubmit,
  setEdit,
}) {
  const [trigger, setTrigger] = useState();

  useEffect(() => {}, [trigger]);
  return (
    <div className="flex bg-yellow-200 w-full p-3">
      <form
        className="flex flex-col px-3 gap-3 w-[280px] h-[180px] bg-yellow-400 place-items-end place-content-center"
        onSubmit={(e) => handleSubmit(e)}
      >
        {edit._id && (
          <label className="flex w-full gap-3">
            _id
            <input
              className="w-full bg-yellow-200 text-center"
              type="text"
              name="_id"
              readOnly
              defaultValue={edit._id}
            />
          </label>
        )}
        <label className="flex gap-3">
          title
          <input
            required
            name="title"
            type="text"
            className="px-2 bg-white border rounded"
            defaultValue={edit ? edit.title : ""}
          />
        </label>
        <label className="flex gap-3">
          category
          <input
            required
            name="category"
            type="text"
            className="px-2 bg-white border rounded"
            defaultValue={edit ? edit.category : ""}
          />
        </label>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <button
            type="submit"
            className="bg-white place-self-center border rounded w-min px-2"
          >
            {edit._id ? "update" : "add"}
          </button>
        )}
      </form>
      <textarea
        className="mx-3 px-3 w-full"
        value={edit.content}
        onChange={(e) => {
          e.preventDefault();
          setEdit((prev) => ({ ...prev, content: e.target.value }));
        }}
      ></textarea>
    </div>
  );
}
