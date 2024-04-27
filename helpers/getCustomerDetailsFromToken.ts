import connectMongoDb from '@/libs/connectDb';
import CustomerModel, { Customer } from '@/libs/models/CustomerModel';
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';


export const getDetailsFromToken = async (request: NextRequest) => {

    //connect to database
    await connectMongoDb();

    try {

        //get token data from cookies
        const token = request.cookies.get("token")?.value || "";

        if (token) {

            //verify token data using jwt
            const customerData: any = await jwt.verify(token, process.env.TOKEN_SECRET||"");

            //fetch customer details from database
            const user= await CustomerModel.findOne({ _id: customerData.id }).select("-password");

            // console.log(user);

            return user;

        }

        return token;

    } catch (error: any) {
        return error;
    }
};
