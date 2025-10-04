import mongoose from 'mongoose';
const { Schema } = mongoose;
const userSchema = new Schema({
    userId: { type: String, required: true },
    type: { type: String, enum: ['student', 'teacher'], required: true },
    folderId: String,
    name: String,
}, { collection: "users" })


const User = mongoose.models?.User ?? mongoose.model("User", userSchema);

export { User };