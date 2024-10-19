import React, { useState } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";
import { MdArrowDropUp } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
} from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [dropdownselected, setdropdownselected] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Missing dispatch initialization

  const dropdownhandler = () => {
    setdropdownselected(!dropdownselected); // Simplified toggle logic
  };

  const handlelogout = async (e) => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      console.log(res);

      
      if (res.status!==200) {
        dispatch(deleteUserFailure("failure"));
        return;
      }
      dispatch(deleteUserSuccess("OK"));
      // Redirect to home page after successful logout
      navigate('/'); // Redirect to root route

    } catch (error) {
      dispatch(deleteUserFailure(error.message)); // Updated to use error.message
    }
  };

  return (
    <div className="flex px-[2vw] py-[2vw] justify-between items-center border border-gray-300">
      <img src="https://cuvette.tech/app/static/media/logo.74bda650.svg" alt="none" />

      <div className="flex justify-around w-[30%]">
        <h3><a href="#">Contact</a></h3>

        <div
          onClick={dropdownhandler}
          className="h-[30px] relative w-[45%] hover:bg-gray-200 transition-all duration-300 cursor-pointer group"
          style={{ border: '1px solid #D3D3D3', borderRadius: '10px' }}
        >
          <img className="absolute inline-block top-[0px] h-[30px] w-[30px]" style={{ borderRadius: "50%" }} src={currentUser ? currentUser.avatar : ""} alt="" />
          <h3 className="absolute top-[5%] left-[30%] inline-block">{currentUser ? currentUser.companyname : "Your Name"}</h3>

          {dropdownselected ? (
            <IoMdArrowDropdown className="absolute top-[30%] right-[5%] inline-block cursor-pointer " />
          ) : (
            <MdArrowDropUp className="absolute h-[20px] w-[25px] top-[21%] right-[3%] inline-block cursor-pointer" />
          )}

          {dropdownselected && (
            <div
              className="absolute bottom-[-50px] w-full h-[50px] z-1 bg-white"
              style={{ border: "2px solid #D3D3D3", borderRadius: "10px" }}
            >
              <FiLogOut className="inline-block absolute top-[20px] left-[30px] group-hover:text-violet-500" />
              <button
                onClick={handlelogout}
                className="inline-block absolute top-[15px] left-[70px] group-hover:text-violet-500"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
