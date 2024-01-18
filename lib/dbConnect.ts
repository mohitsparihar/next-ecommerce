import mongoose from 'mongoose';

async function dbConnect() {
    try {
        // Replace the password for mongodb uri from .env in the DB_URI
        // ! is used to ensure NextJS that the value from the .env file is not null
        const DB = process.env.DB_URI!.replace(
            "<password>",
            process.env.DB_PASSWORD!
          );
        await mongoose.connect(DB)
        console.log("DB connection successful!")
    } catch (error) {
        throw new Error('Connection failed')
    } 
}

export default dbConnect;