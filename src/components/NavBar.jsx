import SignOut from "../components/SignOut";
import Notes from "./Notes";
export default function NavBar({ content, setContent }) {
  return (
    <nav className="flex w-1/1 justify-between">
      <a
        href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2KQJfwa4yAFo5uNZ9VCbJMK2rNoCcdWHG3KxGC5FDw1O7HhbMfnJfVPDHlfwyBS80KVMrxUsLb"
        target="_blank"
      >
        book a lesson 
        <span className="text-gray-400 font-extralight italic">coming soon</span>
      </a>
      <p onClick={() => setContent(<Notes />)}>
        notes 
        <span className="text-gray-400 font-extralight italic">coming soon</span>
      </p>
      <SignOut />
    </nav>
  );
}