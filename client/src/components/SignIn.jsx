import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast'; // Import toast from react-hot-toast
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate email format using regex
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Check if password is empty
    if (!password) {
      toast.error('Please enter your password');
      return;
    }

    try {
      dispatch(signInStart());
      const response = await axios.post('/api/auth/signin', { email, password });
      console.log(response);

      // Assuming your response includes the user data
      if (response.data) {
        dispatch(signInSuccess(response.data)); // Save user data in Redux state
        toast.success('Logged in successfully!');

        // Optionally save the user token in local storage (if available)
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }

        navigate('/'); // Redirect to homepage on success
      } else {
        dispatch(signInFailure(response.data.message || 'Login failed'));
        toast.error('Incorrect email or password');
      }

    } catch (error) {
      toast.error('An error occurred during login. Please try again.');
      dispatch(signInFailure(error.message));
      console.error(error);
    }
  };

  return (
    <div className='flex align-center my-[10vw] w-full px-[1vw] justify-around'>
      {/* Left container */}
      <div className='w-[30%] flex justify-center items-center' style={{ textAlign: 'center' }}>
        <h2>Lorem Ipsum is simply dummy text of the printing and typesetting industry, Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a gallery</h2>
      </div>

      {/* Right container */}
      <div className='flex flex-col w-[40%] h-[25vw] justify-start px-[2.5vw] py-[2vw]' style={{ border: "2px solid violet", borderRadius: '10px' }}>
        <h1 className="font-bold text-[30px] text-center">Sign In</h1>
        <h4 className='text-[15px] my-[10px] text-center'>Lorem Ipsum is simply dummy text</h4>

        {/* Email Input */}
        <div className='flex justify-between items-center mt-5 px-[2vw] py-2' style={{ border: "1px solid #D3D3D3" }}>
          <input
            type="text"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='flex-1 text-center text-[18px] px-2 py-1 border border-transparent focus:outline-none'
          />
        </div>

        {/* Password Input */}
        <div className='flex justify-between items-center mt-4 px-[2vw] py-2' style={{ border: "1px solid #D3D3D3" }}>
          <input
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='flex-1 text-center text-[18px] px-2 py-1 border border-transparent focus:outline-none'
          />
        </div>

        <button
          className='bg-[#0b66ef] text-white px-4 py-2 mt-2 w-full text-center'
          onClick={handleLogin}
        >
          Login
        </button>

        {/* Link to Sign-Up page */}
        <div className='text-center mt-3'>
          <Link to="/sign-up" className="text-blue-500 hover:underline">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
