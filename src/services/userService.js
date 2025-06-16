import { connectDB, User } from "../models/mongoDB.js";

export async function findUser(userId) {
    console.log("findUser: ",userId);
    
    await connectDB();
    let user = await User.findOne({ userId }).exec();
    if (!user) {
        return await createUser({userId});
    }
    return user;
}

export async function createUser(userId) {
    console.log("createUser: ", userId);
    
    await connectDB();
    const newUser = new User({ userId })
    return await newUser.save();
}
