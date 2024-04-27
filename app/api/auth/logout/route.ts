import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try {
        
        //set response
        const response=NextResponse.json({message:"Successfully Logged Out",success:true},{status:201});
        
        // clear cookies from response
        response.cookies.set("token","",{httpOnly:true,expires:new Date(0)});
        
        return response;

    } catch (error) {
        return NextResponse.json({
            message:"LogOut Error:",error
        },{
            status:500
        })
    }
}