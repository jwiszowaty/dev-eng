export async function putEsssay(data) {
    const res = await fetch('/api/essays', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update essay");
    return res.json();
}
export async function getEssays(studentId) {
    const res = await fetch(`/api/essays?id=${studentId}`);
    if (!res.ok) throw new Error("Failed to fetch essays");
    const data = await res.json();
    return data.data;
}