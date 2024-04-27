import connectMongoDb from "@/libs/connectDb";
import CustomerModel from "@/libs/models/CustomerModel";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getDetailsFromToken = async (request: NextRequest) => {


  try {
    //get token data from cookies
    const token = request.cookies.get("token")?.value || "";

    //verify token data using jwt
    const customerData: any = jwt.verify(
      token,
      process.env.TOKEN_SECRET || ""
    );

    return customerData.id;

  } catch (error: any) {
    return error;
  }
};
