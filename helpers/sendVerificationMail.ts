// import { resend } from "@/libs/resend";

import nodemailer from "nodemailer"
import { render } from "@react-email/render"; 

import VerificationEmail from "@/emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";


const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
    }
});


export async function sendVerificationMail(
    email:string,
    firstname:string,
    verifyCode:string
):Promise<ApiResponse>{

    const emailHtml=render(VerificationEmail({firstname,otp:verifyCode}))
    console.log(emailHtml)

    try {

        await transporter.sendMail({
            from:process.env.EMAIL,
            to:email,
            subject:"Email OTP Verification",
            html:emailHtml, 
        })

        return {message:"Verification Mail send successfully",success:true}
    } catch (error) {
        console.error("Error in sending verification mail",error)
        return {message:"Failed to send verification mail",success:false}
    }
}



