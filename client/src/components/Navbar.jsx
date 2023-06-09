import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/actions/authActions';

const Navbar = () => {

  const authState = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  }

  const handleLogoutClick = () => {
    dispatch(logout());
  }

  return (
    <>
      <header className='flex justify-between sticky top-0 p-4 bg-gradient-to-r from-primary-dark to-primary shadow-sm items-center z-50'>
        <h2 className='cursor-pointer uppercase font-medium '>
          <Link to="/" className='text-amber-300 hover:text-amber-100'> Plant.io </Link>
        </h2>
        <ul className='hidden md:flex gap-4 uppercase font-medium'>
          {authState.isLoggedIn ? (
            <>
              <li className="bg-amber-300 hover:bg-amber-100 font-medium rounded-md">
                <Link to='/plants/add' className='block w-full h-full px-4 py-2 text-white hover:text-primary'> <i className="fa-solid fa-plus"></i> Add plant </Link>
              </li>
              <li className='py-2 px-3 cursor-pointer hover:bg-amber-300 text-amber-100 transition rounded-sm' onClick={handleLogoutClick}>Logout</li>
            </>
          ) : (
            <li className='py-2 px-3 cursor-pointer hover:bg-amber-300 text-amber-100 transition rounded-sm'><Link to="/login" className='text-amber-100'>Login</Link></li>
          )}
        </ul>
        <span className='md:hidden cursor-pointer' onClick={toggleNavbar}><i className="fa-solid fa-bars"></i></span>


        {/* Navbar displayed as sidebar on smaller screens */}
        <div className={`absolute md:hidden right-0 top-0 bottom-0 transition ${(isNavbarOpen === true) ? 'translate-x-0' : 'translate-x-full'} bg-primary shadow-md w-screen sm:w-9/12 h-screen`}>
          <div className='flex'>
            <span className='m-4 ml-auto cursor-pointer' onClick={toggleNavbar}><i className="fa-solid fa-xmark"></i></span>
          </div>
          <ul className='flex flex-col gap-4 uppercase font-medium text-center'>
            {authState.isLoggedIn ? (
              <>
                <li className="bg-amber-300 hover:bg-amber-100 font-medium transition py-2 px-3">
                  <Link to='/plants/add' className='block w-full h-full text-white hover:text-primary'> <i className="fa-solid fa-plus"></i> Add plant </Link>
                </li>
                <li className='py-2 px-3 cursor-pointer hover:bg-amber-300 text-amber-100 transition rounded-sm' onClick={handleLogoutClick}>Logout</li>
              </>
            ) : (
              <li className='py-2 px-3 cursor-pointer hover:bg-amber-300 text-amber-100 transition rounded-sm'><Link to="/login" className='text-amber-100'>Login</Link></li>
            )}
          </ul>
        </div>
      </header>
    </>
  )
}

export default Navbar