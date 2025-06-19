import { connectDB, User } from "../../../models/mongoDB.js";

export async function GET(request) {
    try {
        const url = new URL(request.url);
        const userId = url.searchParams.get("userId");

        await connectDB();
        const user = await User.findOne({ userId }).exec();
        if (!user) {
            return Response.json({ success: false, error: "User not found" }, { status: 404 });
        }
        return Response.json({ success: true, data: user }, { status: 200 })
    } catch (error) {
        console.error("error: ", error);
        return Response.json({ success: false, error: error.message });
    }
}
export async function POST(request) {
    try {
        const { userId } = await request.json();
        await connectDB();
        const newUser = new User({ userId });
        const savedUser = await newUser.save();
        return Response.json({ success: true, data: savedUser }, { status: 201 })
    } catch (error) {
        console.error("Saving user failed: ", error);
        return Response.json({ success: false, error: error.message }, { status: 500 })
    }
}