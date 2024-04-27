import { resend } from "@/libs/resend";

import VerificationEmail from "@/emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationMail(
    email:string,
    firstname:string,
    verifyCode:string
):Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from:"onboarding@resend.dev",
            to:email,
            subject:"Email OTP Verification",
            react:VerificationEmail({firstname,otp:verifyCode}),
        })

        return {message:"Verification Mail send successfully",success:true}
    } catch (error) {
        console.error("Error in sending verification mail",error)
        return {message:"Failed to send verification mail",success:false}
    }
}



