import { sendVerificationMail } from "@/helpers/sendVerificationMail";
import connectMongoDb from "@/libs/connectDb";
import CustomerModel from "@/libs/models/CustomerModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  //connect to database
  await connectMongoDb();

  try {
    //get data from api request
    const { firstname, lastname, password, contact, email } = await req.json();

    //check if data is given or not
    if(!firstname || !lastname || !password || !email){
      return NextResponse.json({
        message:"No customer data provided",
        success:false
      },{
        status:404
      })
    }

    //check if customer is existing or not
    const customer = await CustomerModel.findOne({
      email,
      isVerified: true,
    });

    //return status error if account exists with the email id
    if (customer) {
      return NextResponse.json(
        { message: "Account Exists with this email id", success: false },
        { status: 400 }
      );
    }

    //calculate verification otp code
    let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Send verification email
    const emailResponse = await sendVerificationMail(
      email,
      firstname,
      verifyCode
    );
    if (!emailResponse.success) {
      return NextResponse.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }

    //hash password with bcryptjs
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //new Customer document initialized
    const newCustomer = new CustomerModel({
      firstname,
      lastname,
      password: hashedPassword,
      contact,
      email,
      verifyCode,
      isVerified: false,
    });

    //save the new customer document
    const savedCustomer = await newCustomer.save();

    return NextResponse.json(
      {
        message: "Account Created, OTP shared to email. Please verify!",
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Customer Registration Error:", error },
      { status: 500 }
    );
  }
}
