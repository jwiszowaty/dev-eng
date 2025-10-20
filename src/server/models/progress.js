import mongoose from "mongoose";

const { Schema } = mongoose;

const progressSchema = new Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    progressData: { type: String, required: true },
}, { collection: "progress" })

const Progress = mongoose.models?.Progress ?? mongoose.model("Progress", progressSchema);

export { Progress };