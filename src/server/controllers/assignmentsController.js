import { Assignment } from "@/server/models/assignment";
import { connectDB } from "@/server/models/mongoDB";
import { Progress } from "@/server/models/progress";

export async function fetchAssignments(userId) {
    console.log("BUILD: evaluating src/server/controllers/assignmentsController.js for userId:");
    await connectDB();
    return Assignment.find({ userId }).exec();
}
export async function createAssignment(data) {
    await connectDB();

    const res = await Progress.updateOne({ userId: data.userId, section: data.section }, { $setOnInsert: { userId: data.userId, resource: data.resource, section: data.section } }, { upsert: true });
    console.log('upsert result:', {
        matched: res.matchedCount,
        modified: res.modifiedCount,
        upsertedId: res.upsertedId
    });
    const newAssignment = new Assignment(data);
    return newAssignment.save();
}
export async function updateAssignment({ _id, ...data }) {
    await connectDB();
    const updatedAssignment = await Assignment.findOneAndUpdate(
        { _id },
        data,
        { new: true }
    );
    if (data.status === "completed") {
        await Progress.updateOne({ userId: data.userId, section: data.section }, { $push: { progressData: data.description } });

    }
    return updatedAssignment;
}
export async function removeAssignment(_id) {
    await connectDB();
    return Assignment.findOneAndDelete({ _id });
}
