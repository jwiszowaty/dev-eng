import { connectDB } from "@/server/models/mongoDB.js";
import { User } from "@/server/models/user.js";

export async function findUserById(userId) {
  await connectDB();
  return User.findOne({ userId }).exec();
}

export async function findStudents(userId) {
  await connectDB();
  return User.find({teacher: userId }).exec();
}

export async function createUser(user) {
  await connectDB();
  const newUser = new User({ userId: user.uid, type: "student", name: user.name, email: user.email, teacher: null });
  return newUser.save();
}

export async function updateUser({userId, ...args}) {
  await connectDB();
   const updatedUser = await User.findOneAndUpdate(
     { userId },
    args,
    { new: true }
  );

  return updatedUser;
}