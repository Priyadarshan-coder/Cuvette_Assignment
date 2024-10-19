import React from 'react'
import Sidebar from '../components/Sidebar'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Home = () => {
    const {currentUser} = useSelector((state)=>state.user)
    console.log(currentUser.avatar);
    
    const navigate = useNavigate();
    const handleinterview = (e) =>{
        e.preventDefault();
        navigate('/create-listing');
    }
  return (
    <div className='flex items-start'> 
      <Sidebar/>
      <div className='flex items-center justify-center py-20 px-10'>
      <button onClick={handleinterview} className='w-[180px] py-[2px] h-[30px] bg-[#0b66ef] text-white h-[30px] w-[100px] rounded-lg'>Create Interview</button>
      </div>
    </div>
  )
}

export default Home;
