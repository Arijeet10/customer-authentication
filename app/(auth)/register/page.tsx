
import SignupForm from "@/components/SignupForm";




const Signup = () => {
    return ( 
        <>
      <div className="w-screen h-screen flex flex-col sm:flex-row items-center justify-center sm:justify-between">
        {/* Sign up illustration */}
        <div className="w-full md:w-[50%] lg:w-[65%] sm:h-[50%] md:h-[80%] lg:h-full flex justify-center items-center">
          <img src="/sign-up.png" alt="signin illustration" className=" h-full w-full object-cover" />
        </div>

        {/* Sign up form */}
        <div className="w-full  md:w-[50%] lg:w-[35%] p-4">
          <SignupForm  />
        </div>
      </div>
        </>
     );
}
 
export default Signup;