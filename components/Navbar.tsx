"use client";

import { Customer } from "@/libs/models/CustomerModel";
import { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import toast,{Toaster} from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Loading from "./Loading";
import { ApiResponse } from "@/types/ApiResponse";

const Navbar = ({customer}:{customer:Customer|undefined}) => {

    const [loading,setLoading]=useState(false);

    //for navigation
    const router=useRouter();

    //to show or hide confirm logout popup
    const [modal,setModal]=useState(false);

    //logout user
    const handleLogOut=async()=>{
        //console.log("logging out")

        try {

          setLoading(true)
          
          //logout api request
          const res=await axios.get("/api/auth/logout")

          if(res.data.success){
            
            //logout successful
            toast.success(res.data.message)

            //go to login page
            router.push("/login")
            
          }

        } catch (error) {

          //logout error
          //console.log(error)
          const axiosError=error as AxiosError<ApiResponse>;
          let errorMsg=axiosError.response?.data.message;
    
          toast.error("Logout Error: "+errorMsg,{duration:3000})
          
        } finally{
          setLoading(false)
        }

    }

    //loading screen
    if(loading){
      return <Loading />
    }

    return ( 
        <>
        <Toaster />
        <div className="p-2 sm:px-6 sm:py-2 flex items-center justify-between shadow-lg">
          <div className="text-2xl">Welcome <span className="text-[#3A244A] font-semibold">{customer?.firstname}</span></div>
          <div className="flex items-center justify-center gap-4">
            <div className="hidden  sm:border sm:flex sm:items-center sm:rounded-md">
              <input 
                type="text"
                placeholder="Search"
                className="p-2 rounded-md  focus:outline-none"
              />
              <CiSearch
                className="w-5 h-5 text-[#3A244A]"
              />
            </div>

            {/* Logout button */}
          <div onClick={()=>setModal(true)} className="p-2 flex items-center justify-center gap-2 font-medium rounded-md bg-[#3A244A] text-[#ffffff] cursor-pointer">
            <div>Log Out</div>
            <div>
            <BiLogOut 
              className="w-7 h-7 text-[#D72638] "
            />
            </div>
          </div>
          </div>
        </div>

        {/* Background darken when pop up appears */}
        {modal && (
            <div onClick={()=>setModal(false)} className="fixed inset-0 bg-[rgba(0,0,0,0.7)] z-50" />
        )}

        {/* Confirm Password Pop up */}
        {modal && (
            <div className="p-2 fixed top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] shadow-lg border rounded-md bg-white z-50">
                <div className="py-4">Confirm Log Out?</div>
                <div className="flex items-center justify-between font-medium">
                    <button onClick={()=>handleLogOut()} className="p-2 rounded-md bg-[#3A244A] text-[#ffffff]">Yes</button>
                    <button onClick={()=>setModal(false)} className="p-2 rounded-md bg-[#3A244A] text-[#ffffff]">No</button>
                </div>
            </div>
        )}


        </>
     );
}
 
export default Navbar;