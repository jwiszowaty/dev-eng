"use client";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function NavBar() {
  const linkCSS =
    "text-nowrap px-4 hover:underline text-white font-medium transition hover:bg-white hover:text-blue-950 w-min";
  const { logout, currentUser } = useAuth();
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const router = useRouter();
  async function handleSign() {
    if (currentUser) {
      await logout();
      router.push("/");
    } else {
      router.push("/");
    }
  }
  return (
    <div
      className={"flex flex-col md:flex-row md:h-[30px] place-items-center".concat(
        showDropdownMenu ? " bg-blue-950" : " bg-white md:bg-blue-950"
      )}
    >
      <div
        className={"md:hidden mt-2 absolute place-items-center place-self-end ".concat(
          showDropdownMenu ? "w-min" : "place-content-end"
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 50"
          width="40"
          height="40"
          fill={showDropdownMenu ? "#fff" : "#000"}
          className="flex place-self-end p-2 pt-0 md:hidden"
          onClick={() => setShowDropdownMenu(!showDropdownMenu)}
        >
          <path d="M0 7.5v5h50v-5zM0 22.5v5h50v-5zM0 37.5v5h50v-5z" />
        </svg>
      </div>
      <div
        className={
          showDropdownMenu
            ? "flex flex-col place-items-center visible p-4 gap-3"
            : "hidden md:visible md:flex w-full h-full md:place-items-center"
        }
      >
        <button className={linkCSS.concat(" md:hidden")} onClick={handleSign}>
          sign out ⏻
        </button>
        <nav className="flex flex-col md:flex-row place-items-center md:place-content-center w-full">
          <Link className={linkCSS} href="/student/vocabulary">
            vocabulary
          </Link>
          <Link href="/student/assignments/written" className={linkCSS}>
            written work
          </Link>
          <Link href="/student/assignments" className={linkCSS}>
            assignments
          </Link>
        </nav>
        <button
          className="md:flex place-content-center hidden md:visible md:absolute md:right-0 text-white px-2.5 w-30 cursor-pointer underline"
          onClick={handleSign}
        >
          sign out ⏻
        </button>
      </div>
    </div>
  );
}
