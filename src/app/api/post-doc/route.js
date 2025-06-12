import { connectDB } from "../../../../db";
connectDB();
export async function POST(request) {
    const document = request.body()
}