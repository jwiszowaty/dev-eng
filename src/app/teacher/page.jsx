"use client"

import Assignments from "@/components/Assignments";
import NavBar from "@/components/common/NavBar";
import Flashcards from "@/components/Flashcards";
import StudentAccount from "@/components/StudentAccount";
import SubNavBar from "@/components/SubNavBar";
import { useAuth } from "@/contexts/AuthContext";
import { getStudents } from "@/services/userApi";
import { useEffect, useState } from "react";

export default function page() {
  const { currentUser } = useAuth();
  const [students, setStudents] = useState()
  const [selectedStudent, setSelectedStudent] = useState()
  const [view, setView] = useState()

  useEffect(() => {
    
    if (currentUser?.uid) {
      (async function() {
        const response = await getStudents(currentUser.uid)
        const ownStudents = response.data.map(student => ({ userId: student.userId, name: student.name }));
        setStudents(ownStudents)
      })()
    }
  }, [currentUser, selectedStudent]);
  return (
    <>
      <NavBar user={ "teacher" } />
      <SubNavBar students={students} selectedStudent={selectedStudent} setSelectedStudent={setSelectedStudent} setView={setView} view={view} />
      {selectedStudent && view === "account" && (
        <StudentAccount
          selectedStudent={selectedStudent}
          setSelectedStudent={setSelectedStudent}
        />
      )}
      {selectedStudent && view === "flashcards" && (
        <Flashcards selectedStudent={selectedStudent} />
      )}
      {selectedStudent && view === "assignments" && (
        <Assignments selectedStudent={selectedStudent} />
      )}
    </>
  )
}
