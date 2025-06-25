"use client"
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react"

export default function createUser() {
    const { currentUser } = useAuth();
    const [newUser, setNewUser] = useState();
    useEffect(() => {
  if (currentUser?.displayName) {
    console.log(currentUser?.displayName);
  }
}, [currentUser]);
    async function handleSubmit() {
    }
  return (
      <div>
          <form action={handleSubmit}>
              {/* <p>{user.name}</p> */}
              <p>Please provide FOLDER ID for "MONTHS" from your google drive
              </p>
                  <p>https://drive.google.com/drive/u/1/folders/<input className="w-120" placeholder="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"/></p>
          </form>
    </div>
  )
}
