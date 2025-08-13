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
    
  return (
      <div>
              <p>{currentUser?.displayName}, please message me on WhatsApp to gain access.</p>
    </div>
  )
}
