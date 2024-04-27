"use client";

import { Customer } from "@/libs/models/CustomerModel";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ImUserPlus } from "react-icons/im";
import { IoCheckmark } from "react-icons/io5";
import { ApiResponse } from "@/types/ApiResponse";

const CustomerProfileCard = ({
  customer,
}: {
  customer: Customer | undefined;
}) => {
  const [loading, setLoading] = useState(false);

  //for navigation
  const router = useRouter();

  //to store new password
  const [newPassword, setNewPassword] = useState("");

  //to store confirm password
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleUpdatePassword = async () => {
    if (newPassword === confirmNewPassword) {
      const payload = { newPassword };

      try {
        setLoading(true);

        //api request to update password
        const res = await axios.post("/api/auth/updatepassword", payload);

        if (res.data.success) {
          //update password successful
          toast.success(res.data.message);
          setNewPassword("");
          setConfirmNewPassword("");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
      //update password unsuccessful
      //console.log(error);
      const axiosError=error as AxiosError<ApiResponse>;
      let errorMsg=axiosError.response?.data.message;

      toast.error("Password Update Error: "+errorMsg,{duration:3000})
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Password do not match");
    }
  };



  return (
    <>
      <Toaster />
      <div className="text-slate-700">
        <div className="text-3xl font-bold">Customer Profile</div>
        <div>
          {/* profile image and name section */}
          <div className="py-2 flex gap-4 flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center  gap-4">
              <div className="w-20 h-20 border rounded-full">
                <ImUserPlus className=" p-4 w-full h-full " />
              </div>

              <div className="">
                <div>
                  {customer?.firstname} {customer?.lastname}
                </div>
                <div>Lorem Ipsum</div>
              </div>
            </div>

            <div className="flex items-center justify-between sm:gap-2">
              <button className="p-2 rounded-lg bg-[#3A244A] text-[#ffffff]">
                Upload New Photo
              </button>

              <button className="p-2 rounded-lg border border-[#3A244A] text-[#3A244A]">
                Delete
              </button>
            </div>
          </div>

          {/* customer first name and lastname */}
          <div className="py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="w-full">
              <div>First Name</div>
              <div className="p-2 border rounded-md text-slate-500">
                {customer?.firstname}
              </div>
            </div>
            <div className="w-full">
              <div>First Name</div>
              <div className="p-2 border rounded-md text-slate-500">
                {customer?.lastname}
              </div>
            </div>
          </div>

          {/* customer email address and phone number */}
          <div className="py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="w-full">
              <div className="py-2 relative flex items-center gap-2">
                <div className="">Email Address</div>

                {/* Email Verification */}
                {customer?.isVerified ? (
                  <div className="border rounded-full border-blue-500 absolute left-[100px] top-[12px]">
                    <IoCheckmark className="w-4 h-4 text-blue-500" />
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm italic">
                    <div className="text-red-500">Not Verified</div>

                    {/* option to verify email */}
                    <button
                      onClick={() => router.push(`/verify/${customer?.email}`)}
                      className="hover:text-blue-500 font-medium border-b hover:border-blue-500"
                    >
                      Verify
                    </button>
                  </div>
                )}
              </div>
              <div className="p-2 border rounded-md  text-slate-500">
                {customer?.email}
              </div>
            </div>

            <div className=" w-full">
              <div className="py-2">Phone Number</div>
              <div className="p-2 border rounded-md text-slate-500">
                91xxxxxxxx
              </div>
            </div>
          </div>

          {/* Edit Account Password  */}
          <div className="py-4 flex flex-col gap-2">
            <div>
              <span className="text-lg font-medium border-b">
                Edit Account Password
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="w-full">
                <div>New Password</div>
                <input
                  type="password"
                  placeholder="New Password"
                  className="p-2 w-full border rounded-md text-slate-500 focus:outline-none"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div className="w-full">
                <div>Confirm Password</div>
                <input
                  type="password"
                  placeholder="Retype Password"
                  className="p-2 w-full border rounded-md text-slate-500 focus:outline-none"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              {loading ? (
                <button className="p-2 text-center rounded-lg bg-[#3A244A] text-[#ffffff]">
                  Loading
                </button>
              ) : (
                <>
                  <button
                    onClick={() => handleUpdatePassword()}
                    className="p-2 rounded-lg bg-[#3A244A] text-[#ffffff]"
                  >
                    Update Password
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerProfileCard;
