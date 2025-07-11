import mongoose from 'mongoose';
const { Schema } = mongoose;

const documentSchema = new Schema({
    userId: { type: String, required: true },
    documentId: { type: String, required: true },
    name: { type: String, required: true },
    html: { type: String, required: true },
}, { collection: "documents" })
const userSchema = new Schema({
    userId: { type: String, required: true },
    folderId: String,
    documents: { type: [documentSchema], required: true },
}, { collection: "users" })
const issueSchema = new Schema({
    userEmail: { type: String, required: true },
    issueMessage: { type: String, required: true },
    status: {type: String, required: true},
}, { collection: "issue" })

const User = mongoose.models.User ?? mongoose.model("User", userSchema);
const Document = mongoose.models.Document ?? mongoose.model("Document", documentSchema);
const Issue = mongoose.models.Issue ?? mongoose.model("Issue", issueSchema)

const connectDB = async (attempts = 0) => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "dev-eng",
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        setTimeout(() => {
            if (attempts < 3) {
                console.log("Connecting to MongoDB: attempt #", ++attempts);
                connectDB(++attempts);
            } else {
                console.error("Error connecting to MongoDB:", error);
                process.exit(1);
            }
        }, 9000)
    }
}
export { User, Document, Issue, connectDB }