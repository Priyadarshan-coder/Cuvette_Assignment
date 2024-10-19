import React, { useState } from 'react';
import axios from 'axios';
import { FaRegEnvelope, FaUsers } from 'react-icons/fa';
import { BsTelephone } from 'react-icons/bs';
import { Checkmark } from 'react-checkmark';
import { IoPersonOutline } from "react-icons/io5";
import { toast, Toaster } from 'react-hot-toast'; 
import { RiLockPasswordFill } from "react-icons/ri";

const SignUp = () => {
  const [emailOtp, setEmailOtp] = useState('');
  const [mobileOtp, setMobileOtp] = useState('');
  const [mobileOtpVerified, setMobileOtpVerified] = useState(false);
  const [emailOtpVerified, setEmailOtpVerified] = useState(false);
  const [name, setName] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [companyname, setCompanyname] = useState('');
  const [companysize, setCompanysize] = useState('');
  const [companyemail, setCompanyemail] = useState('');
  const [password , setpassword] = useState('');
  const [proceeded, setProceeded] = useState(false); // Set to false initially

  // Function to handle email OTP verification
  const verifyEmailOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/verify-email-otp', {email:companyemail, otp: emailOtp });
      console.log(response);
      
      if (response.data.success) {
        setEmailOtpVerified(true);
        setEmailOtp(''); // Clear OTP input
        toast.success('Email OTP verification successful!'); // Success toast
      } else {
        toast.error('Email OTP verification failed.'); // Error toast
      }
    } catch (error) {
      toast.error('Error verifying email OTP. Please try again.'); // Error toast
    }
  };

  // Function to handle mobile OTP verification
  /*const verifyMobileOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/verify-mobile-otp', { otp: mobileOtp });
      console.log(response);
      
      if (response.data.success) {
        setMobileOtpVerified(true);
        setMobileOtp(''); // Clear OTP input
        toast.success('Mobile OTP verification successful!'); // Success toast
      } else {
        toast.error('Mobile OTP verification failed.'); // Error toast
      }
    } catch (error) {
      toast.error('Error verifying mobile OTP. Please try again.'); // Error toast
    }
  };*/

  // Function to proceed to the next step
  const handleProceed = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/signup", { name, companyname, companyemail, companysize, phoneno, password });
      console.log(res);
  
      // Check if the response data contains the success message
      if (res.status === 201 && res.data === 'User created successfully! OTP sent to your email.') {
        setProceeded(true); // Set proceeded to true on successful response
        toast.success('Sign-up successful! OTP sent to your email.'); // Success toast
      } else {
        toast.error('Sign-up failed. Please check your details.'); // Error toast
      }
    } catch (error) {
      toast.error('Error during sign-up. Please try again.'); // Error toast
    }
  };
  
  return (
    <>
      <Toaster /> {/* Toaster component to display notifications */}
      <div className='flex align-center my-[10vw] h-screen w-full px-[1vw] justify-around'>
        {/* Left container */}
        <div className='w-[30%] flex justify-center items-center text-center'>
          <h2>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </h2>
        </div>

        {/* Right container */}
        {!proceeded ? (
          <div className='flex flex-col w-[40%] h-[45vw] justify-start px-[2.5vw] py-[2vw]'
            style={{ border: "2px solid violet", borderRadius: '10px' }}>
            <h1 className="font-bold text-[30px] text-center">Sign Up</h1>
            <h4 className='text-[15px] my-[10px] text-center'>Lorem Ipsum is simply dummy text</h4>

            <div className='flex justify-between items-center mt-5 px-[2vw] py-2 border border-gray-300'>
              <IoPersonOutline />
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='flex-1 text-center text-[18px] px-2 py-1 border-none focus:outline-none'
              />
            </div>

            <div className='flex justify-between items-center mt-4 px-[2vw] py-2 border border-gray-300'>
              <BsTelephone />
              <input
                type="text"
                placeholder="Phone"
                value={phoneno}
                onChange={(e) => setPhoneno(e.target.value)}
                className='flex-1 text-center text-[18px] px-2 py-1 border-none focus:outline-none'
              />
            </div>

            <div className='flex justify-between items-center mt-4 px-[2vw] py-2 border border-gray-300'>
              <IoPersonOutline />
              <input
                type="text"
                placeholder="Company Name"
                value={companyname}
                onChange={(e) => setCompanyname(e.target.value)}
                className='flex-1 text-center text-[18px] px-2 py-1 border-none focus:outline-none'
              />
            </div>

            <div className='flex justify-between items-center mt-4 px-[2vw] py-2 border border-gray-300'>
              <FaRegEnvelope />
              <input
                type="text"
                placeholder="Company Email"
                value={companyemail}
                onChange={(e) => setCompanyemail(e.target.value)}
                className='flex-1 text-center text-[18px] px-2 py-1 border-none focus:outline-none'
              />
            </div>

            <div className='flex justify-between items-center mt-4 px-[2vw] py-2 border border-gray-300'>
              <FaUsers />
              <input
                type="text"
                placeholder="Employee Size"
                value={companysize}
                onChange={(e) => setCompanysize(e.target.value)}
                className='flex-1 text-center text-[18px] px-2 py-1 border-none focus:outline-none'
              />
            </div>

            
            <div className='flex justify-between items-center mt-4 px-[2vw] py-2 border border-gray-300'>
              <RiLockPasswordFill />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                className='flex-1 text-center text-[18px] px-2 py-1 border-none focus:outline-none'
              />
            </div>

            <div className='flex items-center justify-center flex-col mt-4'>
              <h3>By clicking on proceed you will accept our</h3>
              <div className='flex items-center justify-center space-x-1'>
                <a className='text-blue-600 hover:underline' href="#">Terms</a>
                <h3>&</h3>
                <a className='text-blue-600 hover:underline' href="#">Conditions</a>
              </div>
            </div>
            <button onClick={handleProceed} className='flex items-center justify-center w-[100%] h-[80px] bg-[#0b66ef] text-white rounded-lg mt-4'>Proceed</button>
          </div>
        ) : (
          <div className='flex flex-col w-[40%] h-[25vw] justify-start px-[2.5vw] py-[2vw]'
            style={{ border: "2px solid violet", borderRadius: '10px' }}>
            <h1 className="font-bold text-[30px] text-center">Sign Up</h1>
            <h4 className='text-[15px] my-[10px] text-center'>Lorem Ipsum is simply dummy text</h4>

            {/* Email OTP */}
            <div className='flex justify-between items-center mt-5 px-[2vw] py-2 border border-gray-300'>
              <FaRegEnvelope />
              <input
                type="text"
                placeholder="Enter Email OTP"
                value={emailOtp}
                onChange={(e) => setEmailOtp(e.target.value)}
                className='flex-1 text-center text-[18px] px-2 py-1 border-none focus:outline-none'
              />
              {emailOtpVerified && <Checkmark size='16px' />}
            </div>
            {!emailOtpVerified && (
              <button
                className='bg-[#0b66ef] text-white px-4 py-2 mt-2 w-full text-center'
                onClick={verifyEmailOtp}
              >
                Verify
              </button>
            )}

            {/* Mobile OTP */}
            <div className='flex justify-between items-center mt-4 px-[2vw] py-2 border border-gray-300'>
              <BsTelephone />
              <input
                type="text"
                placeholder="Enter Mobile OTP"
                value={mobileOtp}
                onChange={(e) => setMobileOtp(e.target.value)}
                className='flex-1 text-center text-[18px] px-2 py-1 border-none focus:outline-none'
              />
              <Checkmark size='16px' />
            </div>
            
          </div>
        )}
      </div>
    </>
  );
};

export default SignUp;
