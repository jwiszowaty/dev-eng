import SignOut from "../components/SignOut";
import Booking from "./Booking";
import Notes from "./Notes";
export default function NavBar({ content, setContent }) {
  return (
    <nav className="flex w-1/1 justify-between">
      <p onClick={() => setContent(<Booking />)}>
        book a lesson{" "}
        <span className="text-gray-400 font-extralight italic">coming soon</span>
      </p>
      <p onClick={() => setContent(<Notes />)}>
        notes{" "}
        <span className="text-gray-400 font-extralight italic">coming soon</span>
      </p>
      <SignOut />
    </nav>
  );
}