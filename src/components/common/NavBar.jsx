"use client";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function NavBar() {
  const linkCSS =
    "text-nowrap px-4 hover:underline text-white font-medium transition hover:bg-white hover:text-blue-950";
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
    <div className="flex place-content-center h-[30px] bg-blue-950">
      <nav className="flex place-items-center">
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
        className="absolute right-0 place-self-center text-white px-2.5 w-30 cursor-pointer underline"
        onClick={handleSign}
      >
        sign out ⏻
      </button>
    </div>
  );
}
