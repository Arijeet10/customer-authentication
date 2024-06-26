import connectMongoDb from "@/libs/connectDb";
import CustomerModel from "@/libs/models/CustomerModel";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { NextRequest,NextResponse } from "next/server";

export async function POST(req:NextRequest){

    //connect to database
    await connectMongoDb();

    try {
        
        //get the customer data from api request
        const {email,password}=await req.json();

        //check if data is given or not
        if(!password || !email){
        return NextResponse.json({
          message:"No login credentials provided",
          success:false
        },{
          status:404
        })
      }

        //get account from database linked with the email 
        const customer=await CustomerModel.findOne({email});

        //return error if account doesn't exists
        if(!customer){
            return NextResponse.json({
                success:false,
                message:"Wrong Email, Account doesn't exist!"
            },{
                status:404
            })
        }


        //check if password is correct
        const verifyPassword=await bcryptjs.compare(password,customer.password)

        //return error if password does not match
        if(!verifyPassword){
            return NextResponse.json({
                success:false,
                message:"Incorrect Password",password
            },{
                status:400
            })
        }

        //token data
        const tokenData={
            id:customer._id
        }

        //create a token using jwt
        const token=jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1d"});

        //set response
        const response=NextResponse.json({
            message:"Customer Logged In",
            token:token,
            success:true
        })


        //save token in cookies
        response.cookies.set("token",token,{
            httpOnly:true,
            secure:true,
            sameSite:'none',
        });

        return response;


    } catch (error) {
        return NextResponse.json({
            message:"Customer Login Error:",error
        },{
            status:500
        })
    }
}