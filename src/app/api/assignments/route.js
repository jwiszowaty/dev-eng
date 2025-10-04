import { createAssignment, fetchAssignments, updateAssignment } from "@/server/controllers/assignmentsController";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        const assignments = await fetchAssignments(userId);
        return Response.json(assignments, { status: 200 });
    } catch (error) {
        console.error("error: ", error);
        return Response.json({ success: false, error: error.message });
    }
}
export async function POST(request) {
    try {
        const data = await request.json();
        console.log("POST route data: ", data);
        const savedAssignment = await createAssignment(data);
        return Response.json({ success: true, data: savedAssignment }, { status: 201 })
    } catch (error) {
        console.error("Saving assignment failed: ", error);
        return Response.json({ success: false, error: error.message }, { status: 500 })
    }
}
export async function PUT(request) {
    try {
        const data = await request.json();
        const updatedAssignment = await updateAssignment(data);
        return Response.json({ success: true, data: updatedAssignment }, { status: 201 });
    } catch (error) {
        console.error("Error updating assignment:", error);
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}