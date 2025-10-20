import { NextResponse } from "next/server";
import admin from '@/server/lib/firebaseAdmin';
import { createUser, findUserById } from "@/server/controllers/userController";
import jwt from 'jsonwebtoken';

export async function POST(req) {
    const { idToken, user } = await req.json();
    try {
        let mongoUser;
        console.log("verifyIdToken");
        
        await admin.auth().verifyIdToken(idToken);
        console.log("Token verified");
        
        mongoUser = await findUserById(user.uid);
        console.log("mongoUser:", mongoUser, mongoUser === null);
        
        if (mongoUser === null) {
            await createUser(user);
            mongoUser = await findUserById(user.uid);
            
        }
        const userType = mongoUser.get("type");

        const payload = { uid: user.uid, type: userType };
        const sessionCookie = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
        const nextPage = (userType === "teacher" ? "/teacher" : "/student/assignments");
        const response = NextResponse.json({ success: true, url: nextPage }, { status: 200 });

        response.cookies.set('session', sessionCookie, {
            maxAge: 60 * 60 * 24 * 5,
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            path: '/',
            sameSite: `${process.env.NODE_ENV == "production" ? "Strict" : "Lax"}`,
        });
        return response;
    } catch (error) {
        console.log("Session login error route:", error);
        return NextResponse.json({ status: 'error', message: error.message }, { status: 401 });
    }
}