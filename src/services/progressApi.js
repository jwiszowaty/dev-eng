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
    console.log(data);
    
try {
    const response = await fetch("/api/progress", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({userId: data.userId, resource: data.resource, section: data.section, progressData: [] }),
    });
    return response.json();
} catch (error) {
    console.error("Network error creating progress record:", error);
    throw error;
}
}
export async function updateProgress(data) {
    console.log(data);
    
try {
    const response = await fetch("/api/progress", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({_id: data._id, userId: data.userId, resource: data.resource, section: data.section, progressData:  data.progressData }),
    });
    return response.json();
} catch (error) {
    console.error("Network error updating progress record:", error);
    throw error;
}
}   