
import VerifyEmailCard from "@/components/VerifyEmailCard";

const VerifyEmail = () => {


    return ( 
        <>
                  <div className="w-screen h-screen flex flex-col sm:flex-row items-center">
        {/* Sign up illustration */}
        <div className="w-full sm:h-full flex justify-center">
          <img src="/sign-up.png" alt="signin illustration" className=" h-40 w-80 sm:w-full sm:h-full object-cover" />
        </div>

        {/* Sign up form */}
        <div className="w-full p-4">
            <VerifyEmailCard />
        </div>
      </div>
        </>
     );
}
 
export default VerifyEmail;