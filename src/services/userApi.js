export async function getStudents(uid) {
  const res = await fetch(`/api/users?role=student&userId=${uid}`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}
export async function updateUser(data) {
  const res = await fetch(`/api/users`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update user");
  return res.json();
}