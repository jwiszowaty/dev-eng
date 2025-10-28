import mongoose from "mongoose";

const { Schema } = mongoose;

const progressSchema = new Schema({
    userId: { type: String, required: true },
    resource: { type: String, required: true },
    section: { type: String, required: true },
    progressData: { type: Array, default: [] },
}, { collection: "progresses" })

progressSchema.index({ userId: 1, section: 1 }, { unique: true });

const Progress = mongoose.models?.Progress ?? mongoose.model("Progress", progressSchema);

await Progress.init();

export { Progress };