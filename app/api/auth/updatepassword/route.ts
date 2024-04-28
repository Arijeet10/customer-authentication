import { getDetailsFromToken } from "@/helpers/getCustomerDetailsFromToken";
import CustomerModel from "@/libs/models/CustomerModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectMongoDb from "@/libs/connectDb";

export async function POST(req: NextRequest) {
  try {
    //get user data from token
    const userID = await getDetailsFromToken(req);
    console.log(userID)

    //check if user is logged in
    if (!userID) {
      return NextResponse.json(
        { message: "Log in first to update password", success: false },
        { status: 404 }
      );
    }

    //get new password
    const { newPassword } = await req.json();

    // check if new password is given
    if (!newPassword || newPassword == "") {
      return NextResponse.json(
        {
          message: "No new password given to update",
          success: false,
        },
        {
          status: 404,
        }
      );
    }


    //connect to database
    await connectMongoDb();

    //get account details from database
    const customer = await CustomerModel.findOne({ _id: userID });

    //check if account exits
    if (!customer) {
      return NextResponse.json(
        { message: "No account exists", success: false },
        { status: 404 }
      );
    }

    //check if the new password is same or not
    const samePassword = await bcrypt.compare(newPassword, customer.password);
    if (samePassword) {
      return NextResponse.json(
        { message: "Password is same, cannot update", success: false },
        { status: 404 }
      );
    }

    //hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    //assign new password
    customer.password = hashedNewPassword;

    //save the data in database
    const updatedPassword = await customer.save();

    return NextResponse.json(
      { message: "Password Updated", success: true },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Update Password Error:",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
