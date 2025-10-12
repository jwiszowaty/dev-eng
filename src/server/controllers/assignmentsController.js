import { Assignment } from "@/server/models/assignment";
import { connectDB } from "@/server/models/mongoDB";

export async function fetchAssignments(userId) { 
    await connectDB();
    return Assignment.find({ userId }).exec();
}
export async function createAssignment(data) {
    await connectDB();
    const newAssignment = new Assignment(data);
    return newAssignment.save();
}
export async function updateAssignment({_id, ...data}) {
    await connectDB();
    const updatedAssignment = await Assignment.findOneAndUpdate(
        { _id },
        data,
        { new: true }
    );
    return updatedAssignment;
}
export async function removeAssignment(_id) {
    await connectDB();
    return Assignment.findOneAndDelete({ _id });
}
