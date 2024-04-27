

import SigninForm from "@/components/SigninForm";


const Signin = () => {


  

  return (
    <>
      <div className="w-screen h-screen flex flex-col sm:flex-row items-center">
        {/* Sign in illustration */}
        <div className="w-full sm:h-full flex justify-center">
          <img src="/sign-in.png" alt="signin illustration" className=" h-60 w-full sm:h-full object-cover" />
        </div>

        {/* Sign in form */}
        <div className="w-full p-4">
          <SigninForm />
        </div>
      </div>
    </>
  );
};

export default Signin;
