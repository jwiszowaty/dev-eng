import { connectDB, User } from "../../../models/mongoDB.js";

export async function GET(request) {
    try {
        const url = new URL(request.url, 'http://localhost'); // default base
        const userId = url.searchParams.get("userId");

        await connectDB();
        const response = await User.findOne({ userId }).exec();

        return Response.json({ success: true, data: response }, { status: 200 })
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