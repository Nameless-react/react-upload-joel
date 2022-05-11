import mongoose from "mongoose";


export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION);
        console.log("Connected to DB");
    } catch (error) {
        console.log(error);
    }
}