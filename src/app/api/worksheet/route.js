import { connectDB, Worksheet } from "@/server/models/mongoDB";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const userId = request.nextUrl.searchParams.get("userId");
        const _id = request.nextUrl.searchParams.get("_id");
        await connectDB();

        if (!_id) {
            const worksheets = await Worksheet.find({ userId }).exec();
            return NextResponse.json({ success: true, data: worksheets }, { status: 200 });
        } else {
            const response = await Worksheet.findOne({ userId, _id }).exec();

            return NextResponse.json({
                success: true,
                data: response
            });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch worksheet" }, { status: 500 });
    }
}
export async function POST(request) {
    const formData = await request.formData();
    const userId = formData.get("userId");
    const fileName = formData.get("fileName");
    const contentType = "application/pdf";
    let data = formData.get("file");

    const bytes = await data.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await connectDB();
    const newWorksheet = new Worksheet({
        userId,
        fileName,
        contentType,
        data: buffer
    });
    const savedWorksheet = await newWorksheet.save();
    return NextResponse.json(savedWorksheet, { status: 201 })
}
export async function PUT(request) {
    const {
        _id,
        completed
    } = await request.json();
    await connectDB();
    const updatedWorksheet = await Worksheet.findOneAndUpdate({ _id }, { completed }, { new: true });
    return NextResponse.json(updatedWorksheet, { status: 200 })
}