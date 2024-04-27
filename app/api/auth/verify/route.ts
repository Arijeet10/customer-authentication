import connectMongoDb from "@/libs/connectDb"
import CustomerModel from "@/libs/models/CustomerModel";
import { NextRequest,NextResponse } from "next/server";

export async function POST(req:NextRequest){
    await connectMongoDb();
    try {

        //get data from api request
        const {email,verifyCode}=await req.json();
        // console.log(email,verifyCode)

        //get the account from database
        const customer=await CustomerModel.findOne({email}).select("-password")

        //check if account created or not
        if(!customer){
            return NextResponse.json({
                success:false,
                message:"Account Doesn't exist"
            },{
                status:400
            })
        }

        //check if account already verified or not
        if(customer.isVerified){
            return NextResponse.json({
                success:false,
                message:"Customer already registered"
            },{
                status:400
            })
        }

        //check if correct verification code is given
        if(customer.verifyCode!==verifyCode){
            return NextResponse.json({
                success:false,
                message:"Enter Correct Verification Code"
            },{
                status:400
            })
        }

        //verify the account
        customer.isVerified=true;
        const verifiedCustomer=await customer.save();


        return NextResponse.json({
            success:true,
            message:"Customer Verified",
            verifiedCustomer
        },{
            status:201
        })


    } catch (error) {
        return NextResponse.json({
            message:"Customer Verification Error",error
        },{
            status:500
        })
    }
}