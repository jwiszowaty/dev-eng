"use client"
import { useAuth } from "@/contexts/AuthContext";
import SignOut from "../components/SignOut";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
export default function NavBar() {
  const pathname = usePathname();
  const navCSS = "flex justify-center place-items-center self-center font-normal hover:font-extrabold w-auto h-full"
  const { currentUser } = useAuth();
  const router = useRouter();
  return (
    <header className="flex col-start-1 col-end-3 row-start-1 h-[60px] w-full place-items-center justify-between shadow-gray-200 shadow-xl">
      <button onClick={() => router.replace("/")} className="flex w-[280px] pl-[30px] justify-center">
        <h1 className="text-4xl font-bold text-[#4A4A4A] self-center w-full">
          dev<span className="text-[#003B66]">Eng</span>
      </h1>
        </button>
    <nav className="flex h-full gap-6 text-2xl ">
      <a
        className={navCSS}
        href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2KQJfwa4yAFo5uNZ9VCbJMK2rNoCcdWHG3KxGC5FDw1O7HhbMfnJfVPDHlfwyBS80KVMrxUsLb"
        target="_blank"
      >
        Book A Lesson 
      </a>
        {currentUser?.uid && <button className={pathname == "/notes" ? "self-center font-extrabold w-auto h-full" : navCSS}>
          <Link href="/notes">
            Notes
          </Link>
        </button>}
        <button className={pathname == "/learn" ? "self-center font-extrabold w-auto h-full" : navCSS}>
          <Link href="/learn">
            Knowledge Hub
          </Link>
        </button>
      <SignOut />
      </nav>
      </header>
  );
}