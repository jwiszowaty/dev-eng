export default function FunFacts() {
  return (
    <div className="flex rounded-2xl border-2 gap-3 border-zinc-950 w-auto p-3">
      <img className="w-50" src="/sky.jpg" alt="sky" />
      <div className="flex flex-col">
        <p className="text-2xl font-extrabold pb-5">Did you know?</p>
        <p className=" text-nowrap">
          <span className="font-bold">Sky</span> comes from Old Norse{" "}
          <span className="italic font-bold">ský</span> meaning “cloud.”
        </p>
        <p className="text-neutral-300 text-nowrap">
          <span className="font-bold">Sky</span> pochodzi od staronordyjskiego
          słowa <span className="italic font-bold">ský</span> oznaczającego
          chumrę.
        </p>
      </div>
    </div>
  );
}
