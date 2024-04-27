"use client";

import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const VerifyEmailCard = () => {

  const [loading,setLoading]=useState(false);

  //get email from parameter
  const { email } = useParams<{ email: string }>();
  const emailId = email?.replace("%40", "@");
  //console.log(emailId);

  //for navigation
  const router = useRouter();

  //store verification code input
  const [verifyCode, setVerifyCode] = useState("");

  //verify customer
  const handleSubmit = async () => {
    //console.log(emailId, verifyCode);
    const payload = { email: emailId, verifyCode };
    try {

      setLoading(true)

      //verify customer api request
      const res = await axios.post("/api/auth/verify", payload);

      if (res.data.success) {
        //verification successful
        toast.success(res.data.message);
        router.push("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      //verification unsuccessful
      //console.log(error);
      
      const axiosError=error as AxiosError<ApiResponse>;
      let errorMsg=axiosError.response?.data.message;

      toast.error("Verification Error: "+errorMsg,{duration:3000})
    } finally{
      setLoading(false)
    }
  };

  return (
    <>
      <Toaster />
      <form
        onSubmit={(e) => e.preventDefault()}
        className="px-8 py-6 border rounded-lg shadow-lg"
      >
        {/* Form Header */}
        <div className="flex items-end justify-between">
          <div className="font-bold text-3xl">
            Let us know <span className="text-[#D72638]">!</span>
          </div>

          {/* link to go to Sign in page */}
          <div className=" relative font-medium ">
            <button onClick={() => router.push("/login")} className="z-50 ">
              Sign <span className="text-[#D72638] ">In</span>
            </button>

            {/* underline the link text effect */}
            <div className=" absolute bottom-[4px] w-full py-[0.5px] bg-gradient-to-r from-black from-75% to-[#D72638] to-25%">
              <div className="border-b-1 border-transparent w-full" />
            </div>
          </div>
        </div>

        {/*-------- FORM INPUT ------- */}
        <div className="py-8 flex flex-col gap-4">
          {/* email verification code input */}
          <div className="border-b">
            <input
              type="text"
              placeholder="Enter Verification Code"
              required
              className="p-2 focus:outline-none"
              value={verifyCode}
              onChange={(e) => setVerifyCode(e.target.value)}
            />
          </div>
        </div>

        <div className="font-medium flex flex-col gap-2">
          {loading ? (
            <div className="p-2 rounded-lg bg-[#3A244A] text-[#ffffff]">Verifying Customer Email</div>
          ):(
            <>
            {/* Sign up button */}
            <input
            type="submit"
            value="Sign Up"
            className="p-2 rounded-lg bg-[#3A244A] text-[#ffffff]"
            onClick={() => handleSubmit()}
          />
            </>

          )}

        </div>
      </form>
    </>
  );
};

export default VerifyEmailCard;
