import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-hot-toast'; // Assuming you're using react-hot-toast for notifications

const CreateListing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [candidates, setCandidates] = useState([]); // Array for candidate emails
  const [candidateInput, setCandidateInput] = useState(''); // Input state for candidate email
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const handleCandidateKeyDown = (e) => {
    if (e.key === 'Enter' && candidateInput) {
      e.preventDefault(); // Prevent form submission
      setCandidates((prev) => [...prev, candidateInput.trim()]); // Add candidate
      setCandidateInput(''); // Clear input field
    }
  };

  const removeCandidate = (email) => {
    setCandidates((prev) => prev.filter((candidate) => candidate !== email)); // Remove candidate
  };

  const listingsubmithandle = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await axios.post('/api/listing/create-listing', {
        jobTitle,
        jobDescription,
        experienceLevel,
        candidates,
        endDate,
        userref: currentUser._id,
      });

      // Show success toast notification
      toast.success('Data sent successfully!');

      // Clear fields
      setJobTitle('');
      setJobDescription('');
      setExperienceLevel('');
      setCandidates([]); // Clear candidates
      setEndDate('');
    } catch (error) {
      console.error(error);
      toast.error('Error sending data. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className='flex justify-start gap-[15px]'>
      <Sidebar />
      {/* Right container */}
      <div className='px-20 py-20 w-[60vw] relative'>
        <div className='flex flex-col gap-8 mt-8'>
          {/* Job Title */}
          <div className='flex items-center gap-8'>
            <h1 className='w-[200px] text-right font-bold'>Job Title</h1>
            <input
              type="text"
              placeholder="Enter Job Title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className='flex-1 text-center text-[18px] px-2 py-1 border border-blue-200 rounded-lg focus:border-blue-300'
            />
          </div>

          {/* Job Description */}
          <div className='flex items-start gap-8'>
            <h1 className='w-[200px] text-right font-bold'>Job Description</h1>
            <input
              type="text"
              placeholder="Enter Job Description"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className='flex-1 text-center text-[18px] px-2 py-1 border border-blue-200 rounded-lg h-[200px] focus:border-blue-300'
            />
          </div>

          {/* Experience Level */}
          <div className='flex items-center gap-8'>
            <h1 className='w-[200px] text-right font-bold'>Experience</h1>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className='flex-1 text-center text-[18px] px-2 py-1 border border-blue-200 rounded-lg focus:border-blue-300'
            >
              <option value="">Select Experience Level</option>
              {[1, 2, 3, 4, 5].map((level) => (
                <option key={level} value={level}>
                  {level} Year{level > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Add Candidate */}
          <div className='flex items-center gap-8'>
            <h1 className='w-[200px] text-right font-bold'>Add Candidate</h1>
            <input
              type="text"
              placeholder="Enter Candidate Email"
              value={candidateInput}
              onChange={(e) => setCandidateInput(e.target.value)} // Update input state
              onKeyDown={handleCandidateKeyDown} // Handle Enter key
              className='flex-1 text-center text-[18px] px-2 py-1 border border-blue-200 rounded-lg focus:border-blue-300'
            />
          </div>

          {/* Display Candidate Cards */}
          <div className='flex flex-wrap gap-2 mt-2'>
            {candidates.map((email) => (
              <div key={email} className='flex items-center bg-blue-100 px-2 py-1 rounded-lg'>
                <span className='mr-2'>{email}</span>
                <button onClick={() => removeCandidate(email)} className='text-red-500'>
                  &times; {/* Cross button */}
                </button>
              </div>
            ))}
          </div>

          {/* End Date */}
          <div className='flex items-center gap-8'>
            <h1 className='w-[200px] text-right font-bold'>End Date</h1>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className='flex-1 text-center text-[18px] px-2 py-1 border border-blue-200 rounded-lg focus:border-blue-300'
            />
          </div>
        </div>
        <button
          className={`absolute bottom-[30px] right-[80px] bg-[#0b66ef] text-white h-[30px] w-[100px] rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={listingsubmithandle}
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Sending...' : 'Send'} 
        </button>
      </div>
    </div>
  );
};

export default CreateListing;
