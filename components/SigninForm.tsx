"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PiEyeSlash } from "react-icons/pi";
import { PiEyeLight } from "react-icons/pi";
import toast, { Toaster } from "react-hot-toast";

const SigninForm = () => {


  const [loading, setLoading] = useState(false);

  //for navigation
  const router = useRouter();

  //to store form inputs
  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });

  //to set input type of password
  const [inputType, setInputType] = useState("password");

  //to show or hide password button
  const [showPassword, setShowPassword] = useState(false);

  //function to show or hide password
  const handleShowHidePassword = () => {
    if (inputType == "password") {
      setInputType("text");
      setShowPassword(true);
    } else {
      setInputType("password");
      setShowPassword(false);
    }
  };

  //sign in with customer credentials
  const handleSubmit = async () => {
    console.log(signinData);

    try {
      setLoading(true);

      //api request
      const res = await axios.post("/api/auth/login", signinData);

      //login successful
      if (res.data.success) {
        toast.success(res.data.message);
        setSigninData({
          email: "",
          password: "",
        });

        router.push(`/`);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      //login unsuccessful
      console.log(error);
      toast.error("Sign in Error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />

      <div className="px-8 py-6 border rounded-lg shadow-lg">
        {/* Form Header */}
        <div className="font-bold text-3xl">
          <div>
            Fill what we know <span className="text-[#D72638]">!</span>
          </div>
        </div>

        {/*-------- FORM INPUT ------- */}
        <div className="py-8 flex flex-col gap-4">
          {/* email input */}
          <div className="border-b">
            <input
              type="email"
              placeholder="Email"
              className="w-full focus:outline-none"
              value={signinData.email}
              onChange={(e) =>
                setSigninData({ ...signinData, email: e.target.value })
              }
            />
          </div>

          {/* password input */}
          <div className="border-b flex items-center justify-between">
            <input
              type={inputType}
              placeholder="Password"
              className="w-full focus:outline-none "
              value={signinData.password}
              onChange={(e) =>
                setSigninData({ ...signinData, password: e.target.value })
              }
            />

            {/* button to show or hide password */}
            <span onClick={() => handleShowHidePassword()} className="">
              {showPassword ? (
                <PiEyeSlash className="text-[#D72638]" />
              ) : (
                <PiEyeLight className="text-[#D72638]" />
              )}
            </span>
          </div>
        </div>

        {/* Sign in and Sign up buttons */}
        <div className="font-medium flex flex-col gap-2">
          {loading ? (
            <div className="p-2 text-center rounded-lg bg-[#3A244A] text-[#ffffff]">
              Logging in...
            </div>
          ) : (
            <>
              {/* Sign in button */}
              <button
                className="p-2 rounded-lg bg-[#3A244A] text-[#ffffff]"
                onClick={() => handleSubmit()}
              >
                Sign in
              </button>

              {/* Sign up button to go Sign in page */}
              <button
                onClick={() => router.push("/register")}
                className="p-2 text-center rounded-lg border border-[#3A244A] text-[#3A244A]"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SigninForm;
