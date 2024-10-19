import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';


export default function App() {
  return (<>
   <Toaster/>
       <BrowserRouter>
      <Navbar />
      <Routes>
      <Route path='/' element={<SignIn/>} />
        <Route path='/sign-up' element={<SignUp />} />
        
        <Route element={<PrivateRoute />}>
        <Route path='/home' element={<Home />} />
        
        <Route path='/create-listing' element={<CreateListing />} />

        
          
          
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}