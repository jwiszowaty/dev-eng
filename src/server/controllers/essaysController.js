import { Essay } from "@/server/models/essay";
import { connectDB } from "@/server/models/mongoDB";

export async function updateEssay({ _id, ...args }) {
    await connectDB();
    const updatedEssay = await Essay.findOneAndUpdate(
        { _id },
        args,
        { new: true }
    );
    return updatedEssay;
}
export async function findEssays(userId) {
    await connectDB();
    const essays = await Essay.find({ userId }).exec();
    return essays;
}