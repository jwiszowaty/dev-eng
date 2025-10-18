import mongoose from 'mongoose';
const { Schema } = mongoose;
const userSchema = new Schema({
    userId: { type: String, required: true },
    type: { type: String, enum: ['student', 'teacher'], required: true },
    teacher: String,
    email: String,
    name: String,
    resources: {type: Array, default: [], required: true},
}, { collection: "users", strict: false });


const User = mongoose.models?.User ?? mongoose.model("User", userSchema);

export { User };