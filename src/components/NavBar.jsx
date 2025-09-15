"use client";
import { useAuth } from "@/contexts/AuthContext";
import SignOut from "../components/SignOut";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import TopBar from "./TopBar";
export default function NavBar() {
  const pathname = usePathname();
  const navCSS =
    "flex px-4 justify-center place-items-center self-center font-normal hover:bg-blue-950 hover:text-white w-auto h-full transition";
  const { currentUser } = useAuth();
  return (
    <div className="flex flex-col col-start-1 col-end-4 row-start-1 h-full w-full place-items-center place-content-center justify-between bg-transparent">
        <nav className="flex justify-between w-[60vw] h-[36px] text-2xl">
          <Link
            href="/"
            className={navCSS}
          >
            <h1 className="text-3xl font-bold text-[#4A4A4A] hover:text-white self-center w-full">
              dev<span className="text-[#003B66] hover:text-white">Eng</span>
            </h1>
          </Link>
          <Link
            className={navCSS}
            href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2KQJfwa4yAFo5uNZ9VCbJMK2rNoCcdWHG3KxGC5FDw1O7HhbMfnJfVPDHlfwyBS80KVMrxUsLb"
            target="_blank"
          >
            Book A Lesson
          </Link>
          {currentUser?.uid && (
          <Link
            href="/notes"
              className={
                pathname == "/notes"
                  ? "self-center font-extrabold w-auto h-full"
                  : navCSS
              }
            >
              Notes
            </Link>
          )}
          <Link
            className={
              pathname == "/learn"
                ? "self-center font-extrabold w-auto h-full"
                : navCSS
            }
          href="/learn"
          >
            Learn
          </Link>
          <SignOut />
        </nav>
      {currentUser && <TopBar />}
    </div>
  );
}
