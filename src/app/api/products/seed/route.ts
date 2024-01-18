import { NextRequest, NextResponse } from "next/server";
import data from "../../../../../lib/data";
import dbConnect from "../../../../../lib/dbConnect";
import UserModel from "../../../../../lib/models/UserModel";
import ProductModel from "../../../../../lib/models/ProductModel";

export const GET = async (request: NextRequest) => {
    const { users, products } = data
    // connect to MongoDB
    await dbConnect();
    // Delete existing 
    await UserModel.deleteMany()
    // Insert users from the data.ts file
    await UserModel.insertMany(users)

    // Delete Existing products
    await ProductModel.deleteMany();
    // Insert products from data.ts
    await ProductModel.insertMany(products)

    // Affter successful requests this response will be provided
    return NextResponse.json({
        message: "seeded successfully",
        users, 
        products
    })
}