import { connectDB } from "@/server/models/mongoDB";
import { Resource } from "@/server/models/resource";

export async function createResource(resource) {
    connectDB();
    const newResource = new Resource(resource);
    return newResource.save();
}

export async function findResources() { 
    connectDB();
    return Resource.find().exec();
}

export async function updateResource({_id, ...data}) {
    connectDB();
    return Resource.findByIdAndUpdate(_id, data, { new: true }).exec();
}