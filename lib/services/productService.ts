import { cache } from 'react';
import dbConnect from '../dbConnect';
import ProductModel, { Product } from '../models/ProductModel';

export const revalidate = 3600;

// Fetching latest products for the homepage
const getLatest = cache(async () => {
    // Connect to Database
    await dbConnect();
    // find() method used for getting data from the document
    const products = await ProductModel.find({})
    .sort({ _id: -1 })  // Sorting in descending order
    .limit(4)           // Limiting the results to only 4 results
    .lean()             // Convert the response to JSON
    return products as Product[]
})

// Fetching products for the carousel
const getFeatured = cache(async () => {
    await dbConnect()
    const products = await ProductModel.find({ isFeatured: true })
    .limit(3)
    .lean()
    return products;
})

// Fetching product details for the product page
const getBySlug = cache(async (slug: string) => {
    await dbConnect();
    // findOne() returns the first matched value from the document.
    // The slug here is the matching where condition.
    const product = await ProductModel.findOne({ slug }).lean()
    return product as Product
})

const productService = {
    getLatest,
    getFeatured,
    getBySlug
}

export default productService;