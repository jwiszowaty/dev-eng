import SignOut from "../components/SignOut";
import KnowledgeHub from "./KnowledgeHub";
import Notes from "./Notes";
export default function NavBar({ content, setContent }) {
  const navCSS = "self-center font-normal hover:font-extrabold w-auto"
  
  return (
    <nav className="flex w-1/1 gap-6 justify-end text-2xl">
      <a
        className={navCSS}
        href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2KQJfwa4yAFo5uNZ9VCbJMK2rNoCcdWHG3KxGC5FDw1O7HhbMfnJfVPDHlfwyBS80KVMrxUsLb"
        target="_blank"
      >
        Book A Lesson 
      </a>
      <button className={content.type.name == "Notes" ? "self-center font-extrabold w-auto" : navCSS}
        onClick={() => setContent(<Notes />)}>  Notes </button>
      <button className={content.type.name == "KnowledgeHub" ? "self-center font-extrabold w-auto" : navCSS}
      onClick={() => setContent(<KnowledgeHub/>)}>Knowledge Hub</button>
      <SignOut />
    </nav>
  );
}