import React from 'react'
import Sidebar from '../components/Sidebar'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Home = () => {
    const { currentUser } = useSelector((state) => state.user)
    const navigate = useNavigate()

    const handleInterview = (e) => {
        e.preventDefault()
        navigate('/create-listing')
    }

    // Only render the component if currentUser is not null
    if (!currentUser) {
        return null
    }

    return (
        <div className='flex items-start'> 
            <Sidebar />
            <div className='flex items-center justify-center py-20 px-10'>
                <button 
                    onClick={handleInterview} 
                    className='w-[180px] py-[2px] h-[30px] bg-[#0b66ef] text-white rounded-lg'>
                    Create Interview
                </button>
            </div>
        </div>
    )
}

export default Home
