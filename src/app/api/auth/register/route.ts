import { NextRequest } from "next/server";
import dbConnect from "../../../../../lib/dbConnect";
import bcrypt from 'bcryptjs'
import UserModel from "../../../../../lib/models/UserModel";

// POST request which accepts request from NextRequest
export const POST = async (request: NextRequest) => {
    //getting info from request payload
    const { name, email, password } = await request.json()
    // connect to Database
    await dbConnect()
    // hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 5)
    const newUser = new UserModel({
        name,
        email,
        password: hashedPassword
    })
    try {
        await newUser.save()
        return Response.json(
            {message: "New User created"},
            {status: 201}
        )
    } catch (err: any) {
        return Response.json(
            {message: err.message},
            {status: 500}
        )
    }
}