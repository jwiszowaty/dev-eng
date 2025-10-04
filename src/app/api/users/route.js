import { createUser, findStudents, findUserById, updateUser } from "@/server/controllers/userController.js";

export async function GET(request) {
    try {
        const url = new URL(request.url);
        const role = url.searchParams.get("role");
        const userId = url.searchParams.get("userId");
        if (role) { 
            const students = await findStudents(userId);
            
            return Response.json({ success: true, data: students }, { status: 200 });
        } else {
            const user = await findUserById(userId)
            if (!user) {
                return Response.json({ success: false, error: "User not found" }, { status: 404 });
            }
            return Response.json({ success: true, data: user }, { status: 200 })
        }
    } catch (error) {
        console.error("error: ", error);
        return Response.json({ success: false, error: error.message });
    }
}
export async function POST(request) {
    try {
        const { userId } = await request.json();
        const savedUser = await createUser(userId, "student");
        return Response.json({ success: true, data: savedUser }, { status: 201 })
    } catch (error) {
        console.error("Saving user failed: ", error);
        return Response.json({ success: false, error: error.message }, { status: 500 })
    }
}
export async function PUT(request) {
    try {
        const data = await request.json();
        const updatedUser = await updateUser(data)
        if (!updatedUser) {
            return Response.json({ success: false, error: "User not found" }, { status: 404 });
        }
        return Response.json({ success: true, data: updatedUser }, { status: 200 });
    } catch (error) {
        console.error("Error updating user:", error);
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}