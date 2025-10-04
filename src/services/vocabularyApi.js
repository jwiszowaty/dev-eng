export async function getVocabulary(userId) {
    const res = await fetch(`/api/vocabulary?userId=${userId}`)
    if (!res.ok) throw new Error("Failed to fetch vocabulary");
    return res.json();
}