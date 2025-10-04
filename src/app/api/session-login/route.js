import { NextResponse } from "next/server";
import admin from '@/server/lib/firebaseAdmin';
import { createUser, findUserById } from "@/server/controllers/userController";
import jwt from 'jsonwebtoken';

export async function POST(req) {
    const { idToken, user } = await req.json();
    try {
        let mongoUser;
        await admin.auth().verifyIdToken(idToken);
        mongoUser = await findUserById(user.uid);
        if (!mongoUser) {
            await createUser(user.uid, "student");
            mongoUser = await findUserById(user.uid);
        }
        const userType = mongoUser.get("type");

        const payload = { uid: user.uid, type: userType };
        const sessionCookie = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
        const nextPage = userType === "teacher" ? "/teacher" : "/student/assignments";
        const response = NextResponse.redirect(new URL(nextPage, req.url));

        response.cookies.set('session', sessionCookie, {
            maxAge: 60 * 60 * 24 * 5,
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            path: '/',
            sameSite: `${process.env.NODE_ENV == "production" ? "Strict" : "Lax"}`,
        });
        return response;
    } catch (error) {
        return NextResponse.json({ status: 'error', message: error.message }, { status: 401 });
    }
}