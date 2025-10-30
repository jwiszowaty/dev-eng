export async function getAssignments(userId) {
    const res = await fetch(`/api/assignments?userId=${userId}`);
    if (!res.ok) throw new Error("Failed to fetch assignments");
    return res.json();
}

export async function postAssignments(data) {
    console.log("assingment api service: ", data);
    
    const res = await fetch(`/api/assignments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to post assignments");
    return res.json();
}

export async function putAssignment(data) {
    const res = await fetch(`/api/assignments`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update assignment");
    return res.json();
}

export async function deleteAssignment(data) {
    const res = await fetch(`/api/assignments`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to delete assignment");
    return res.json();
}