"use client"

import { useAuth } from "@/contexts/AuthContext"
import Link from "next/link";

export default function TopBar() {

const subCategoriesCSS = "flex h-full text-center place-items-center px-4 hover:underline text-white font-medium transition hover:bg-white hover:text-blue-950";
    const { currentUser } = useAuth();
  return (
      <div className="flex h-[30px] w-full place-items-center place-content-center shadow-gray-200 shadow-xl bg-blue-950">
          {currentUser ? (
          <>
          <div className="flex justify-between place-items-center w-[30vw] h-full place-content-between pl-3">
            <Link className={subCategoriesCSS} href="/learn/vocabulary">
              My vocabulary
            </Link>
          <Link href="/learn/writing/my-essays" className={subCategoriesCSS}>
            My essays
          </Link>
          <Link href="/learn/worksheets" className={subCategoriesCSS}>
            My worksheets
          </Link>
        </div>
          </>
        ) : null}
      </div>
  )
}
