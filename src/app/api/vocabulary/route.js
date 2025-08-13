import { connectDB, Vocabulary } from "@/models/mongoDB.js"
import { NextResponse } from "next/server";
import mongoose from "mongoose"
const { ObjectId } = mongoose.Types;

export async function POST(request) {
    const { userId, english, polish, englishExample, polishExample, difficulty } = await request.json()
    await connectDB();
    const newVocabulary = await Vocabulary({ userId, english, polish, englishExample, polishExample, difficulty })
    const savedVocabulary = await newVocabulary.save();
    return NextResponse.json(savedVocabulary, {status: 201})
}

export async function GET(request) {
    await connectDB();
    const vocabulary = await Vocabulary.find({userId: request.nextUrl.searchParams.get("userId")});
    return NextResponse.json(vocabulary, {status: 200})
}

export async function PUT(request) {
    const { _id, english, polish, englishExample, polishExample, difficulty } = await request.json()
    await connectDB();
    const updatedVocabulary = await Vocabulary.findOneAndUpdate({ _id}, { english, polish, englishExample, polishExample, difficulty });
    return NextResponse.json(updatedVocabulary, { status: 200 })
}

export async function DELETE(request) {
    const id = await request.nextUrl.searchParams.get("id");
    await connectDB();
    const deletedVocabulary = await Vocabulary.findOneAndDelete({ _id: new ObjectId(id) })
    return NextResponse.json(deletedVocabulary, { status: 200 })
}