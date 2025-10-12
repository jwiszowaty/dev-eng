export async function getVocabulary(userId) {
    const res = await fetch(`/api/vocabulary?userId=${userId}`)
    if (!res.ok) throw new Error("Failed to fetch vocabulary");
    return res.json();
}

export async function postVocabulary(data) { 
    const res = await fetch("/api/vocabulary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to post vocabulary");
    return res.json();
}