import { findDoc } from "@/services/docService";
import { findUser } from "@/services/userService";

export async function getDocIds(setIds, setDocDisplayed, setLoading, userId) {
    try {
            console.log("getDocIds: ", userId);
            
            const user = await findUser(userId);
            const folderId = user.data.folderId;
            const response = await fetch(
                `http://localhost:3000/api/export-docsAll?rootFolderId=${folderId}`
            );
            const data = await response.json();
            const firstDoc = data[0];
            setIds(data);
            const html = await findDoc(userId, firstDoc.id);
            setDocDisplayed({ ...firstDoc, html });
            setLoading(false);
        } catch (error) {
            console.error("error ", error.message);
        }
}