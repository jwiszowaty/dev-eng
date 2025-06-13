import { connectDB, User } from "../../../../db";

export async function GET(request) {
try {
    const { userId } = request.nextUrl.searchParams.get("userId")
    console.log(userId);
    
    await connectDB();
    const response = await User.findOne({ userId }).exec();
    console.log("response:",response);
    return Response.json({ success: true, data: response}, { status: 200 })
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
        const savedUser = newUser.save();
        return Response.json({ success: true, data: savedUser }, { status: 201 })
    } catch (error) {
         console.error("Saving user failed: ", error);
        return Response.json({ success: false, error: error.message }, { status: 500 })
    }
}