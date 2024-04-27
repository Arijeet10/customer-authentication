import { getDetailsFromToken } from "@/helpers/getCustomerDetailsFromToken";
import { NextResponse,NextRequest } from "next/server";

export async function GET(req:NextRequest){
    try {

        //get customer details
        const user=await getDetailsFromToken(req);

        //check if customer is logged in or not
        if(!user){
            return NextResponse.json({message:"Customer Not Logged in"},{status:400})
        }
        
        //return customer details if logged in
        return NextResponse.json({
            message:"Customer Data Fetched",
            user
        },{
            status:201
        })

    } catch (error) {
        return NextResponse.json({
            message:"Failed to GET Customer Details:",error
        },{
            status:500
        })
    }
}