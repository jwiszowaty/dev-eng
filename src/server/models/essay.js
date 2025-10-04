import mongoose from 'mongoose';
const { Schema } = mongoose;
const essaySchema = new Schema({
    userId: { type: String, required: true },
    title: String,
    text: String,
    aiFeedback: String,
    feedback: String,
}, { collection: "essays" })

const Essay = mongoose.models?.Essay ?? mongoose.model("Essay", essaySchema);
export { Essay };