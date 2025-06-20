import SignOut from "../components/SignOut";
import Notes from "./Notes";
export default function NavBar({ content, setContent }) {
  return (
    <nav className="flex w-1/1 gap-6 justify-end text-2xl">
      <a
        className="self-center font-normal hover:font-extrabold w-50"
        href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2KQJfwa4yAFo5uNZ9VCbJMK2rNoCcdWHG3KxGC5FDw1O7HhbMfnJfVPDHlfwyBS80KVMrxUsLb"
        target="_blank"
      >
        book a lesson 
      </a>
      <button className="self-center font-normal hover:font-extrabold w-20" onClick={() => setContent(<Notes />)}>  notes </button>
      <SignOut />
    </nav>
  );
}