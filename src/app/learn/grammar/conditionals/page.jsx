"use client";
import NavBar from "@/components/NavBar.jsx";
import Word from "../../../../components/Word.jsx";
import SideBar from "@/components/SideBar.jsx";

export default function page() {
  return (
    <div className="grid grid-cols-[280px_auto] grid-rows-[60px_auto] w-screen h-screen">
      <NavBar />
      <SideBar />
      <div class="pt-[40px] p-10 max-w-5xl">
        <div class="text-3xl font-bold text-black mb-6">
          🔁 <span class="hover:underline cursor-default">English</span>{" "}
          <span class="hover:underline cursor-default">Conditionals:</span>{" "}
          <span class="hover:underline cursor-default">Zero</span>{" "}
          <span class="hover:underline cursor-default">to</span>{" "}
          <span class="hover:underline cursor-default">Mixed</span>
        </div>
        <div class="mb-4">
          <span class="hover:underline cursor-default">Conditionals</span>{" "}
          <span class="hover:underline cursor-default">describe</span>{" "}
          <span class="hover:underline cursor-default">the</span>{" "}
          <span class="hover:underline cursor-default">result</span>{" "}
          <span class="hover:underline cursor-default">of</span>{" "}
          <span class="hover:underline cursor-default">a</span>{" "}
          <span class="hover:underline cursor-default">possible</span>{" "}
          <span class="hover:underline cursor-default">situation.</span>{" "}
          <span class="hover:underline cursor-default">They</span>{" "}
          <span class="hover:underline cursor-default">usually</span>{" "}
          <span class="hover:underline cursor-default">include</span>{" "}
          <span class="hover:underline cursor-default">an</span>{" "}
          <span class="hover:underline cursor-default">'if'</span>{" "}
          <span class="hover:underline cursor-default">clause</span>{" "}
          <span class="hover:underline cursor-default">(condition)</span>{" "}
          <span class="hover:underline cursor-default">and</span>{" "}
          <span class="hover:underline cursor-default">a</span>{" "}
          <span class="hover:underline cursor-default">main</span>{" "}
          <span class="hover:underline cursor-default">clause</span>{" "}
          <span class="hover:underline cursor-default">(result).</span>
        </div>
        <div class="text-2xl font-semibold text-green-900 mt-6 mb-4">
          0️⃣ <span class="hover:underline cursor-default">Zero</span>{" "}
          <span class="hover:underline cursor-default">Conditional</span>
        </div>
        <div class="mb-2">
          <span class="hover:underline cursor-default">Used</span>{" "}
          <span class="hover:underline cursor-default">for</span>{" "}
          <span class="hover:underline cursor-default">facts</span>{" "}
          <span class="hover:underline cursor-default">or</span>{" "}
          <span class="hover:underline cursor-default">habits:</span>{" "}
          <span class="hover:underline cursor-default">If</span> +{" "}
          <span class="hover:underline cursor-default">present</span>{" "}
          <span class="hover:underline cursor-default">simple,</span>{" "}
          <span class="hover:underline cursor-default">present</span>{" "}
          <span class="hover:underline cursor-default">simple.</span>
        </div>
        <div class="mb-4 italic">
          <span class="hover:underline cursor-default">If</span>{" "}
          <span class="hover:underline cursor-default">you</span>{" "}
          <span class="hover:underline cursor-default">heat</span>{" "}
          <span class="hover:underline cursor-default">water,</span>{" "}
          <span class="hover:underline cursor-default">it</span>{" "}
          <span class="hover:underline cursor-default">boils.</span>
        </div>
        <div class="text-2xl font-semibold text-green-900 mt-6 mb-4">
          1️⃣ <span class="hover:underline cursor-default">First</span>{" "}
          <span class="hover:underline cursor-default">Conditional</span>
        </div>
        <div class="mb-2">
          <span class="hover:underline cursor-default">Used</span>{" "}
          <span class="hover:underline cursor-default">for</span>{" "}
          <span class="hover:underline cursor-default">real</span>{" "}
          <span class="hover:underline cursor-default">future</span>{" "}
          <span class="hover:underline cursor-default">possibilities:</span>{" "}
          <span class="hover:underline cursor-default">If</span> +{" "}
          <span class="hover:underline cursor-default">present</span>{" "}
          <span class="hover:underline cursor-default">simple,</span>{" "}
          <span class="hover:underline cursor-default">will</span> +{" "}
          <span class="hover:underline cursor-default">base</span>{" "}
          <span class="hover:underline cursor-default">verb.</span>
        </div>
        <div class="mb-4 italic">
          <span class="hover:underline cursor-default">If</span>{" "}
          <span class="hover:underline cursor-default">it</span>{" "}
          <span class="hover:underline cursor-default">rains,</span>{" "}
          <span class="hover:underline cursor-default">we’ll</span>{" "}
          <span class="hover:underline cursor-default">stay</span>{" "}
          <span class="hover:underline cursor-default">inside.</span>
        </div>
        <div class="text-2xl font-semibold text-green-900 mt-6 mb-4">
          2️⃣ <span class="hover:underline cursor-default">Second</span>{" "}
          <span class="hover:underline cursor-default">Conditional</span>
        </div>
        <div class="mb-2">
          <span class="hover:underline cursor-default">Used</span>{" "}
          <span class="hover:underline cursor-default">for</span>{" "}
          <span class="hover:underline cursor-default">unreal</span>{" "}
          <span class="hover:underline cursor-default">or</span>{" "}
          <span class="hover:underline cursor-default">unlikely</span>{" "}
          <span class="hover:underline cursor-default">situations:</span>{" "}
          <span class="hover:underline cursor-default">If</span> +{" "}
          <span class="hover:underline cursor-default">past</span>{" "}
          <span class="hover:underline cursor-default">simple,</span>{" "}
          <span class="hover:underline cursor-default">would</span> +{" "}
          <span class="hover:underline cursor-default">base</span>{" "}
          <span class="hover:underline cursor-default">verb.</span>
        </div>
        <div class="mb-4 italic">
          <span class="hover:underline cursor-default">If</span>{" "}
          <span class="hover:underline cursor-default">I</span>{" "}
          <span class="hover:underline cursor-default">won</span>{" "}
          <span class="hover:underline cursor-default">the</span>{" "}
          <span class="hover:underline cursor-default">lottery,</span>{" "}
          <span class="hover:underline cursor-default">I</span>{" "}
          <span class="hover:underline cursor-default">would</span>{" "}
          <span class="hover:underline cursor-default">travel</span>{" "}
          <span class="hover:underline cursor-default">the</span>{" "}
          <span class="hover:underline cursor-default">world.</span>
        </div>
        <div class="text-2xl font-semibold text-green-900 mt-6 mb-4">
          3️⃣ <span class="hover:underline cursor-default">Third</span>{" "}
          <span class="hover:underline cursor-default">Conditional</span>
        </div>
        <div class="mb-2">
          <span class="hover:underline cursor-default">Used</span>{" "}
          <span class="hover:underline cursor-default">for</span>{" "}
          <span class="hover:underline cursor-default">past</span>{" "}
          <span class="hover:underline cursor-default">regrets</span>{" "}
          <span class="hover:underline cursor-default">or</span>{" "}
          <span class="hover:underline cursor-default">impossible</span>{" "}
          <span class="hover:underline cursor-default">situations:</span>{" "}
          <span class="hover:underline cursor-default">If</span> +{" "}
          <span class="hover:underline cursor-default">past</span>{" "}
          <span class="hover:underline cursor-default">perfect,</span>{" "}
          <span class="hover:underline cursor-default">would</span>{" "}
          <span class="hover:underline cursor-default">have</span> +{" "}
          <span class="hover:underline cursor-default">past</span>{" "}
          <span class="hover:underline cursor-default">participle.</span>
        </div>
        <div class="mb-4 italic">
          <span class="hover:underline cursor-default">If</span>{" "}
          <span class="hover:underline cursor-default">she</span>{" "}
          <span class="hover:underline cursor-default">had</span>{" "}
          <span class="hover:underline cursor-default">studied,</span>{" "}
          <span class="hover:underline cursor-default">she</span>{" "}
          <span class="hover:underline cursor-default">would</span>{" "}
          <span class="hover:underline cursor-default">have</span>{" "}
          <span class="hover:underline cursor-default">passed</span>{" "}
          <span class="hover:underline cursor-default">the</span>{" "}
          <span class="hover:underline cursor-default">exam.</span>
        </div>
        <div class="text-2xl font-semibold text-green-900 mt-6 mb-4">
          🔀 <span class="hover:underline cursor-default">Mixed</span>{" "}
          <span class="hover:underline cursor-default">Conditionals</span>
        </div>
        <div class="mb-2">
          <span class="hover:underline cursor-default">Combines</span>{" "}
          <span class="hover:underline cursor-default">second</span>{" "}
          <span class="hover:underline cursor-default">and</span>{" "}
          <span class="hover:underline cursor-default">third</span>{" "}
          <span class="hover:underline cursor-default">conditionals.</span>{" "}
          <span class="hover:underline cursor-default">They</span>{" "}
          <span class="hover:underline cursor-default">describe</span>{" "}
          <span class="hover:underline cursor-default">a</span>{" "}
          <span class="hover:underline cursor-default">past</span>{" "}
          <span class="hover:underline cursor-default">condition</span>{" "}
          <span class="hover:underline cursor-default">with</span>{" "}
          <span class="hover:underline cursor-default">a</span>{" "}
          <span class="hover:underline cursor-default">present</span>{" "}
          <span class="hover:underline cursor-default">result.</span>
        </div>
        <div class="mb-4 italic">
          <span class="hover:underline cursor-default">If</span>{" "}
          <span class="hover:underline cursor-default">I</span>{" "}
          <span class="hover:underline cursor-default">had</span>{" "}
          <span class="hover:underline cursor-default">taken</span>{" "}
          <span class="hover:underline cursor-default">the</span>{" "}
          <span class="hover:underline cursor-default">job,</span>{" "}
          <span class="hover:underline cursor-default">I</span>{" "}
          <span class="hover:underline cursor-default">would</span>{" "}
          <span class="hover:underline cursor-default">be</span>{" "}
          <span class="hover:underline cursor-default">living</span>{" "}
          <span class="hover:underline cursor-default">in</span>{" "}
          <span class="hover:underline cursor-default">New</span>{" "}
          <span class="hover:underline cursor-default">York</span>{" "}
          <span class="hover:underline cursor-default">now.</span>
        </div>
        <div class="text-xl font-semibold text-green-500 mb-2">
          💡 <span class="hover:underline cursor-default">Quick</span>{" "}
          <span class="hover:underline cursor-default">Summary:</span>
        </div>
        <ul class="list-disc list-inside mb-6">
          <li>
            0️⃣ <span class="hover:underline cursor-default">Zero</span> –{" "}
            <span class="hover:underline cursor-default">facts,</span>{" "}
            <span class="hover:underline cursor-default">always</span>{" "}
            <span class="hover:underline cursor-default">true</span>
          </li>
          <li>
            1️⃣ <span class="hover:underline cursor-default">First</span> –{" "}
            <span class="hover:underline cursor-default">real</span>{" "}
            <span class="hover:underline cursor-default">future</span>{" "}
            <span class="hover:underline cursor-default">possibility</span>
          </li>
          <li>
            2️⃣ <span class="hover:underline cursor-default">Second</span> –{" "}
            <span class="hover:underline cursor-default">unreal</span>{" "}
            <span class="hover:underline cursor-default">present</span>{" "}
            <span class="hover:underline cursor-default">or</span>{" "}
            <span class="hover:underline cursor-default">future</span>
          </li>
          <li>
            3️⃣ <span class="hover:underline cursor-default">Third</span> –{" "}
            <span class="hover:underline cursor-default">unreal</span>{" "}
            <span class="hover:underline cursor-default">past</span>
          </li>
          <li>
            🔀 <span class="hover:underline cursor-default">Mixed</span> –{" "}
            <span class="hover:underline cursor-default">past</span>{" "}
            <span class="hover:underline cursor-default">condition,</span>{" "}
            <span class="hover:underline cursor-default">present</span>{" "}
            <span class="hover:underline cursor-default">result</span>
          </li>
        </ul>
        <div class="text-2xl font-semibold text-green-900 mb-4">
          🎯 <span class="hover:underline cursor-default">Final</span>{" "}
          <span class="hover:underline cursor-default">Tip</span>
        </div>
        <div class="mb-10">
          <span class="hover:underline cursor-default">Mastering</span>{" "}
          <span class="hover:underline cursor-default">conditionals</span>{" "}
          <span class="hover:underline cursor-default">helps</span>{" "}
          <span class="hover:underline cursor-default">express</span>{" "}
          <span class="hover:underline cursor-default">cause,</span>{" "}
          <span class="hover:underline cursor-default">effect,</span>{" "}
          <span class="hover:underline cursor-default">dreams,</span>{" "}
          <span class="hover:underline cursor-default">regrets,</span>{" "}
          <span class="hover:underline cursor-default">and</span>{" "}
          <span class="hover:underline cursor-default">possibilities</span>{" "}
          <span class="hover:underline cursor-default">clearly.</span>{" "}
          <span class="hover:underline cursor-default">Practice</span>{" "}
          <span class="hover:underline cursor-default">them</span>{" "}
          <span class="hover:underline cursor-default">in</span>{" "}
          <span class="hover:underline cursor-default">real-life</span>{" "}
          <span class="hover:underline cursor-default">situations!</span>
        </div>
      </div>
    </div>
  );
}
