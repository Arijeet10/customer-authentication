import mongoose from "mongoose";

export default async function connectMongoDb(){
    try {
        if(mongoose.connections[0].readyState){
            return;
        }

        await mongoose.connect(process.env.MONGODB_URL || "");
        console.log("Connected to MongoDB");

    } catch (error) {
        console.log("Error in Database Connection",error);
    }
}

