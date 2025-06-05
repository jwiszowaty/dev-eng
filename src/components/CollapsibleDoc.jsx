import { useState } from "react";

export function CollapsibleDoc({ content, title }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border rounded shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left bg-gray-100 px-4 py-2 font-semibold hover:bg-gray-200"
      >
        {isOpen ? `Hide: ${title}` : `Show: ${title}`}
      </button>
      {isOpen && (
        <div
          className="prose max-w-none p-4"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </div>
  );
}