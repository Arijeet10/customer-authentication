import { getDetailsFromToken } from "@/helpers/getCustomerDetailsFromToken";
import connectMongoDb from "@/libs/connectDb";
import CustomerModel from "@/libs/models/CustomerModel";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    //get customer details
    const userID = await getDetailsFromToken(req);

    //check if customer is logged in or not
    if (!userID) {
      return NextResponse.json(
        { message: "Customer Not Logged in" },
        { status: 400 }
      );
    }

    //connect to database
    await connectMongoDb();

    //fetch customer details from database
    const user = await CustomerModel.findOne({ _id: userID }).select(
      "-password"
    );

    //return customer details if logged in
    return NextResponse.json(
      {
        message: "Customer Data Fetched",
        user,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to GET Customer Details:",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
