import { Progress } from "@/server/models/progress";

export async function findProgress(userId) {
    try {
        const progressRecords = await Progress.find({ userId });
        return progressRecords;
    } catch (error) {
        console.error("Error fetching progress records:", error);
        throw error;
    }
}
export async function createProgress(data) {
    try {
        const newProgress = new Progress(data);
        await newProgress.save();
        return newProgress;
    } catch (error) {
        console.error("Error creating progress record:", error);
        throw error;
    }
}

export async function updateProgress({_id, ...data}) {
    try {
        const updatedProgress = await Progress.findByIdAndUpdate(_id, data, { new: true });
        return updatedProgress;
    } catch (error) {
        console.error("Error updating progress record:", error);
        throw error;
    }
}

export async function deleteProgress(_id) {
    try {
        await Progress.findByIdAndDelete(_id);
        return true;
    } catch (error) {
        console.error("Error deleting progress record:", error);
        throw error;
    }
}   