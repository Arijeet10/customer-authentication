"use client";

import CustomerProfileCard from "@/components/CustomerProfileCard";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import { Customer } from "@/libs/models/CustomerModel";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";


const Homepage = () => {
  const [customer, setCustomer] = useState<Customer>();

  const [loading,setLoading]=useState(false);

  useEffect(() => {
    console.log(customer);
  }, [customer]);

  
//function to get customer details
  const fetchCustomerDetails=async()=>{
    try {
      setLoading(true)
      //get customer details api request
      const res = await axios.get("/api/auth/customer");

      console.log(res)

      if (res.status) {
        //customer details fetching successful
        toast.success(res.data.message);
        setCustomer(res.data.user);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      //customer details fetching unsuccessful
      console.log(error);
      toast.error("Error fetching Customer Details");
    }finally{
      setLoading(false)
    }
  }

  //fetch customer details when page renders
  useEffect(() => {
    fetchCustomerDetails();
  }, []);

  return (
    <>
      <Toaster />
      <div>
        {loading ? (
          <Loading />
        ):(
          <>
          <div>
          <Navbar customer={customer} />
        </div>

        {/* Edit Customer Profile */}
        <div className="p-8">
          <CustomerProfileCard customer={customer} />
        </div> 
          </>
        )}



      </div>
    </>
  );
};

export default Homepage;

