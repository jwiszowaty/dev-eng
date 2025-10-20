import { createProgress, deleteProgress, findProgress, updateProgress } from "@/server/controllers/progressController";

export async function GET(request) {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");
    try {
        const progressRecords = await findProgress(userId);
        return Response.json({ success: true, data: progressRecords }, { status: 200 });
    } catch (error) {
        console.error("Error fetching progress records:", error);
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }   
}
export async function POST(request) {
    try {
        const data = await request.json();
        const newProgress = await createProgress(data);
        return Response.json({ success: true, data: newProgress }, { status: 201 });
    } catch (error) {
        console.error("Error creating progress record:", error);
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}
export async function PUT(request) {
    const data = await request.json();
    const updatedProgress = await updateProgress(data);
    if (updatedProgress) {
        return Response.json({ success: true, data: updatedProgress }, { status: 200 });
    } else {
        return Response.json({ success: false, error: "Progress record not found" }, { status: 404 });
    }
}
export async function DELETE(request) {
    try {
        const url = new URL(request.url);
        const _id = url.searchParams.get("_id");
        await deleteProgress(_id);
        return Response.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Error deleting progress record:", error);
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}  