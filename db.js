const { Schema, default: mongoose } = require("mongoose");

const documentSchema = new Schema({
    user: { type: String, required: true },
    documentId: { type: String, required: true},
    name: { type: String, required: true },
    html: { type: String, required: true },
}, { collection: "documents" })
const Document = mongoose.model("Document", documentSchema)
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
module.exports = {Document, documentSchema, connectDB}