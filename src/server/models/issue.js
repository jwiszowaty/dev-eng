import mongoose from 'mongoose';
const { Schema } = mongoose;

const issueSchema = new Schema({
    userEmail: { type: String, required: true },
    issueMessage: { type: String, required: true },
    status: { type: String, required: true },
}, { collection: "issues" })

const Issue = mongoose.models?.Issue ?? mongoose.model("Issue", issueSchema);

export { Issue };