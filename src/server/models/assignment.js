import mongoose from "mongoose";
const { Schema } = mongoose;
const assignmentSchema = new Schema({
    userId: { type: String, required: true },
    category: { type: String, enum: ['general', 'writing'], default: 'general' },
    title: String,
    description: String,
    resource: String,
    section: String,
    status: { type: String, enum: ['pending', 'submitted', 'completed'], default: 'pending' },
}, { collection: "assignments", strict: false });

const Assignment = mongoose.models?.Assignment ?? mongoose.model("Assignment", assignmentSchema);

export { Assignment };