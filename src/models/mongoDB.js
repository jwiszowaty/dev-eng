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
}, { collection: "issues" })
const essaySchema = new Schema({
    userId: { type: String, required: true },
    text: { type: String, required: true },
    aiFeedback: { type: String, required: true },
    feedback: {type: String, required: true},
}, { collection: "essays" })
const vocabularySchema = new Schema({
    userId: { type: String, required: true },
    english: { type: String, required: true },
    polish: { type: String, required: true },
    englishExample: String,
    polishExample: String,
    difficulty: { type: Number, required: true },
}, { collection: "vocabulary"})

const User = mongoose.models.User ?? mongoose.model("User", userSchema);
const Document = mongoose.models.Document ?? mongoose.model("Document", documentSchema);
const Issue = mongoose.models.Issue ?? mongoose.model("Issue", issueSchema);
const Essay = mongoose.models.Essay ?? mongoose.model("Essay", essaySchema);
const Vocabulary = mongoose.models.Vocabulary ?? mongoose.model("Vocabulary", vocabularySchema);

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
export {
    User, Document, Issue, Essay, Vocabulary, connectDB
}