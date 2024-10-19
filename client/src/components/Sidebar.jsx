import React from 'react';
import { HiMiniHome } from "react-icons/hi2";

const Sidebar = () => {
  return (
    <div className='flex h-[50vw] w-[5vw] border border-gray-300 py-10 justify-center'>
      <HiMiniHome className='h-[20px] w-[20px]'/>
    </div>
  )
}

export default Sidebar;