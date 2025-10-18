import mongoose from "mongoose";

const { Schema } = mongoose;

const resourceSchema = new Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    content: { type: String, default: "{}" },
}, { collection: "resources" });

const Resource = mongoose.models?.Resource ?? mongoose.model("Resource", resourceSchema);

export { Resource };