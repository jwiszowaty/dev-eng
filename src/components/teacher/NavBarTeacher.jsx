"use client";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function NavBarTeacher() {
  const linkCSS =
    "text-nowrap px-4 hover:underline text-white font-medium transition hover:bg-white hover:text-blue-950 w-min";
  const { logout, currentUser } = useAuth();
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
      className="flex flex-col h-[30px] place-content-center bg-amber-950"
    >
      <div
        className="flex flex-col place-items-center visible gap-3"
      >
        <nav className="flex flex-row place-items-center place-content-center w-full">
          <Link className={linkCSS} href="/teacher/resources">
            resources
          </Link>
        </nav>
        <button
          className="place-content-center absolute right-0 text-white px-2.5 w-30 cursor-pointer underline"
          onClick={handleSign}
        >
          sign out ⏻
        </button>
      </div>
    </div>
  );
}
