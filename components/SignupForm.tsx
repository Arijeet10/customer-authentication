"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { PiEyeSlash } from "react-icons/pi";
import { PiEyeLight } from "react-icons/pi";
import axios, { AxiosError } from "axios";
import toast, { Toaster } from "react-hot-toast";
import { ApiResponse } from "@/types/ApiResponse";

const SignupForm = () => {
  const [loading, setLoading] = useState(false);

  //for navigation
  const router = useRouter();

  //to show password not matching message
  const [passwordCheck, setPasswordCheck] = useState("");

  //to show or hide modal for Contact Mode dropdown options
  const [modal, setModal] = useState(false);

  //to store form inputs
  const [signupData, setSignupData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    contact: "",
    password: "",
  });

  //to confirm password
  const [confirmPassword, setConfirmPassword] = useState("");

  //to set input type of confirm password
  const [confirmPasswordInputType, setConfirmPasswordInputType] =
    useState("password");

  //to show or hide confirm password button
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //to set input type of password
  const [passwordInputType, setPasswordInputType] = useState("password");

  //to show or hide password button
  const [showPassword, setShowPassword] = useState(false);

  //function to show or hide password
  const handleShowHidePassword = () => {
    if (passwordInputType == "password") {
      setPasswordInputType("text");
      setShowPassword(true);
    } else {
      setPasswordInputType("password");
      setShowPassword(false);
    }
  };

  //function to show or hide confirm password
  const handleShowHideConfirmPassword = () => {
    if (confirmPasswordInputType == "password") {
      setConfirmPasswordInputType("text");
      setShowConfirmPassword(true);
    } else {
      setConfirmPasswordInputType("password");
      setShowConfirmPassword(false);
    }
  };

  //function to show message for password and confirm password checks
  useEffect(() => {
    if (confirmPassword !== "") {
      // console.log("Password: ",signupData.password);
      // console.log("Confirm Password: ",confirmPassword);
      if (signupData.password !== confirmPassword) {
        setPasswordCheck("Password Not Matching");
      }
    }
  }, [confirmPassword]);

  //sign in with customer credentials
  const handleSubmit = async () => {
    //console.log(signupData);

    if(signupData.email==""||signupData.firstname==""||signupData.lastname==""||signupData.password==""){
      toast.error("Please fill all the required fields")
    }else if(signupData.password!==confirmPassword){
      toast.error("Passwords do not match")
    }else{

      try {
        setLoading(true);
  
        //api request
        const res = await axios.post("/api/auth/register", signupData);
  
        //signup successful
        if (res.data.success) {
          toast.success(res.data.message);
          router.push(`/verify/${signupData.email}`);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        //signup unsuccessful
        //console.log(error);
        const axiosError=error as AxiosError<ApiResponse>;
        let errorMsg=axiosError.response?.data.message;
  
        toast.error("Sign up Error: "+errorMsg,{duration:3000})
        
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Toaster />

      <div className="px-8 py-6 border rounded-lg shadow-lg">
        {/* Form Header */}
        <div className="flex items-end justify-between">
          <div className="font-bold text-3xl text-[#3A244A]">
            Let us know <span className="text-[#D72638]">!</span>
          </div>

          {/* link to go to Sign in page */}
          <div className=" relative font-medium ">
            <button onClick={() => router.push("/login")} className="z-50 flex items-center text-[#3A244A]">
              Sign <span className="text-[#D72638] ">In</span>
            </button>

            {/* underline the link text effect */}
            <div className=" absolute bottom-[4px] w-full py-[0.5px] bg-gradient-to-r from-[#3A244A] from-75% to-[#D72638] to-25%">
              <div className="border-b-1 border-transparent w-full" />
            </div>
          </div>
        </div>

        {/*-------- FORM INPUT ------- */}
        <div className="py-8 flex flex-col gap-4">
          {/* first name input */}
          <div className="border-b">
            <input
              type="text"
              placeholder="First Name"
              required
              className="p-2 w-full focus:outline-none"
              value={signupData.firstname}
              onChange={(e) =>
                setSignupData({ ...signupData, firstname: e.target.value })
              }
            />
          </div>

          {/* last name input */}
          <div className="border-b">
            <input
              type="text"
              placeholder="Last Name"
              required
              className="p-2 w-full focus:outline-none"
              value={signupData.lastname}
              onChange={(e) =>
                setSignupData({ ...signupData, lastname: e.target.value })
              }
            />
          </div>

          {/* password input */}
          <div className="border-b flex items-center justify-between">
            <input
              type={passwordInputType}
              placeholder="Password"
              required
              className="p-2 w-full focus:outline-none "
              value={signupData.password}
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
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

          {/* confirm password input */}
          <div className="relative border-b flex items-center justify-between">
            <input
              type={confirmPasswordInputType}
              placeholder="Retype Password"
              required
              className="p-2 w-full focus:outline-none "
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {/* button to show or hide password */}
            <span onClick={() => handleShowHideConfirmPassword()} className="">
              {showConfirmPassword ? (
                <PiEyeSlash className="text-[#D72638]" />
              ) : (
                <PiEyeLight className="text-[#D72638]" />
              )}
            </span>

            {/* password not matching warning message  */}
            {confirmPassword !== "" &&
            confirmPassword !== signupData.password ? (
              <div className="absolute -top-3 px-2 text-red-500">
                {passwordCheck} !
              </div>
            ) : (
              confirmPassword !== "" && (
                <div className="absolute -top-3 px-2 text-green-500">
                  Password Matched !
                </div>
              )
            )}
          </div>

          {/* Contact Mode input */}
          <div className="relative border-b text-slate-400 cursor-pointer ">
            <div
              onClick={() => setModal(!modal)}
              className=" flex items-center justify-between"
            >
              <div className="p-2">
                {signupData.contact === ""
                  ? "Contact Mode"
                  : signupData.contact}
              </div>
              <div>
                <IoIosArrowDown className="text-[#3A244A]" />
              </div>
            </div>

            {/* modal for Contact Mode dropdown options */}
            {modal && (
              <div
                onClick={() => setModal(false)}
                className=" absolute top-10 w-full bg-white border cursor-pointer"
              >
                <div
                  onClick={() => setSignupData({ ...signupData, contact: "" })}
                  className="p-2 text-center border-b"
                >
                  ---Select Any One---
                </div>
                <div
                  onClick={() =>
                    setSignupData({ ...signupData, contact: "WhatsApp" })
                  }
                  className="p-2"
                >
                  WhatsApp
                </div>
                <div
                  onClick={() =>
                    setSignupData({ ...signupData, contact: "Gmail" })
                  }
                  className="p-2 border-y"
                >
                  Gmail
                </div>
                <div
                  onClick={() =>
                    setSignupData({ ...signupData, contact: "Skype" })
                  }
                  className="p-2"
                >
                  Skype
                </div>
              </div>
            )}
          </div>

          {/* email input */}
          <div className="border-b">
            <input
              type="email"
              placeholder="Email"
              required
              className="p-2 w-full focus:outline-none"
              value={signupData.email}
              onChange={(e) =>
                setSignupData({ ...signupData, email: e.target.value })
              }
            />
          </div>
        </div>

        <div className="font-medium flex flex-col gap-2">
          {loading ? (
            <div className="p-2 text-center rounded-lg bg-[#3A244A] text-[#ffffff]">
              Creating account...
            </div>
          ) : (
            <>
              {/* Sign up button */}
              <button
                className="p-2 rounded-lg bg-[#3A244A] text-[#ffffff]"
                onClick={() => handleSubmit()}
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

export default SignupForm;
