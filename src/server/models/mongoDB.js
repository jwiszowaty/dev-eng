import mongoose from 'mongoose';
const { Schema } = mongoose;
mongoose.set("debug", true);
const documentSchema = new Schema({
    userId: { type: String, required: true },
    documentId: { type: String, required: true },
    name: { type: String, required: true },
    html: { type: String, required: true },
}, { collection: "documents" })



const vocabularySchema = new Schema({
    userId: { type: String, required: true },
    english: { type: String, required: true },
    polish: { type: String, required: true },
    englishExample: String,
    polishExample: String,
    difficulty: { type: Number, required: true },
}, { collection: "vocabulary" })
const worksheetSchema = new Schema({
    userId: { type: String, required: true },
    fileName: { type: String, required: true },
    contentType: { type: String, required: true },
    downloadUrl: String,
    completed: Boolean,
}, { collection: "worksheets" });

const Document = mongoose.models?.Document ?? mongoose.model("Document", documentSchema);

const Vocabulary = mongoose.models?.Vocabulary ?? mongoose.model("Vocabulary", vocabularySchema);
const Worksheet = mongoose.models?.Worksheet ?? mongoose.model("Worksheet", worksheetSchema);

let isConnected = false; // keep outside the function

const connectDB = async (attempts = 0) => {
  try {
    console.log("1 Connecting to MongoDB...");
    
    if (isConnected) return;

    console.log("2 Connecting to MongoDB... ");
    console.log("MONGO_URI in app:", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "dev-eng",
  serverSelectionTimeoutMS: 5000, 
    });

    console.log("3 Connecting to MongoDB... ");
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    if (attempts < 3) {
      console.log("Connecting to MongoDB: attempt #", attempts + 1);
      await new Promise((resolve) => setTimeout(resolve, 5000)); // <== await delay
      return connectDB(attempts + 1); 
    } else {
      console.error("Error connecting to MongoDB:", error);
      process.exit(1);
    }
  }
};
export {
    Document, Vocabulary, Worksheet, connectDB
}