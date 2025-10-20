export async function getProgress(userId) {
   try {
       const response = await fetch("/api/progress?userId=" + userId);
        return response.json();
   } catch (error) {
       console.error("Network error fetching progress:", error);
         throw error;
   }
}
export async function postProgress(data) {
try {
    const response = await fetch("/api/progress", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json();
} catch (error) {
    console.error("Network error creating progress record:", error);
    throw error;
}
}