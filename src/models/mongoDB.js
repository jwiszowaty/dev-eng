import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    userId: { type: String, required: true },
    folderId: {type: String, required: false}
}, { collection: "users" })
const documentSchema = new Schema({
    userId: { type: String, required: true },
    documentId: { type: String, required: true },
    name: { type: String, required: true },
    html: { type: String, required: true },
}, { collection: "documents" })

const User = mongoose.models.User ?? mongoose.model("User", userSchema);
const Document = mongoose.models.Document ?? mongoose.model("Document", documentSchema);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "dev-eng",
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}
export { User, Document, connectDB }