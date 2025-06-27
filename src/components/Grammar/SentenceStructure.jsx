import Word from "../Word";

export default function SentenceStructure() {
    const wrapText = (text) =>
    text
      .split(/(\s+)/)
      .map((part, i) =>
        /\s+|^\W$|\d/u.test(part) ? part : <Word key={i}>{part}</Word>
      );
  return (
   <div className="flex flex-col mt-10 w-2/3 items-start">
      {/* Article 1: Subject + Verb + Object */}
      <div className="text-3xl font-bold text-black mb-6">
        {wrapText("🔤 Sentence Basics: Subject + Verb + Object")}
      </div>
      <div className="mb-4">
        {wrapText("The simplest and most common English sentence structure is: Subject + Verb + Object (SVO). This structure forms the foundation of clear communication.")}
      </div>
      <ul className="list-disc list-inside mb-4">
        <li>{wrapText("Subject – who or what the sentence is about")}</li>
        <li>{wrapText("Verb – the action or state")}</li>
        <li>{wrapText("Object – who or what receives the action")}</li>
      </ul>
      {[ 
        ["She reads books.", "'She' is the subject, 'reads' is the verb, 'books' is the object."],
        ["They play football.", "'They' = subject, 'play' = verb, 'football' = object."],
        ["I like chocolate.", "Simple SVO structure."]
      ].map(([sentence, explanation], index) => (
        <div key={index} className="bg-green-50 border-l-4 border-green-500 p-4 mb-3 w-3/4">
          <div><strong>{wrapText(`"${sentence}"`)}</strong><br />➡ {wrapText(explanation)}</div>
        </div>
      ))}

      {/* Article 2: Types of Sentences */}
      <div className="text-3xl font-bold text-black mt-10 mb-6">
        {wrapText("📘 Types of Sentences")}
      </div>
      <div className="mb-4">
        {wrapText("English sentences can be categorized based on their function. Each type has a specific purpose.")}
      </div>
      <ul className="list-disc list-inside mb-4">
        <li>{wrapText("Declarative – states a fact or opinion (.)")}</li>
        <li>{wrapText("Interrogative – asks a question (?)")}</li>
        <li>{wrapText("Imperative – gives a command or request (.) or (!) ")}</li>
        <li>{wrapText("Exclamatory – expresses strong emotion (!)")}</li>
      </ul>
      {[ 
        ["The sky is blue.", "Declarative sentence – stating a fact."],
        ["Are you coming?", "Interrogative – asking a question."],
        ["Please sit down.", "Imperative – giving a polite command."],
        ["What a beautiful view!", "Exclamatory – expressing excitement or amazement."]
      ].map(([sentence, explanation], index) => (
        <div key={index} className="bg-green-50 border-l-4 border-green-500 p-4 mb-3 w-3/4">
          <div><strong>{wrapText(`"${sentence}"`)}</strong><br />➡ {wrapText(explanation)}</div>
        </div>
      ))}

      {/* Article 3: Simple, Compound, and Complex Sentences */}
      <div className="text-3xl font-bold text-black mt-10 mb-6">
        {wrapText("🔗 Simple, Compound & Complex Sentences")}
      </div>
      <div className="mb-4">
        {wrapText("These structures help us combine ideas in different ways to create more detailed communication.")}
      </div>
      <ul className="list-disc list-inside mb-4">
        <li>{wrapText("Simple sentence – one independent clause")}</li>
        <li>{wrapText("Compound sentence – two independent clauses joined by a coordinating conjunction")}</li>
        <li>{wrapText("Complex sentence – one independent clause and at least one dependent clause")}</li>
      </ul>
      {[ 
        ["She walks to school.", "Simple sentence – one idea."],
        ["I wanted to go, but it was too late.", "Compound – two main clauses joined by 'but'."],
        ["Because it was raining, we stayed inside.", "Complex – the first part is a dependent clause."]
      ].map(([sentence, explanation], index) => (
        <div key={index} className="bg-green-50 border-l-4 border-green-500 p-4 mb-3 w-3/4">
          <div><strong>{wrapText(`"${sentence}"`)}</strong><br />➡ {wrapText(explanation)}</div>
        </div>
      ))}

      <div className="text-2xl font-semibold text-green-900 mt-10 mb-6">
        {wrapText("🎯 Final Tip")}
      </div>
      <div className="mb-10">
        {wrapText("Start with simple sentences. As your confidence grows, explore compound and complex ones to express richer ideas.")}
      </div>
    </div>
  );
}
