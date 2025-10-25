import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Home, LogIn, LogOut, UserPlus2Icon, UserIcon } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // This is placeholder logic.
  // In a real app, you'd get this from your auth context or state.
  const isAuthenticated = false;

  return (
    <nav className='bg-orange-300 shadow-lg mb-4'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo / Home Link */}
          <div className='flex items-center gap-2'>
            <Link
              to='/'
              className='flex items-center text-lg text-gray-700 px-1 py-1 font-medium hover:border-b-3 hover:border-orange-600'
              activeProps={{
                className: 'border-b-3 border-orange-600',
              }}
            >
              <Home className='mr-2 h-4 w-4 text-orange-600' />
              MyApp
            </Link>
            <Link
              to='/admin/users'
              className='flex items-center text-lg text-gray-700 px-1 py-1 font-medium hover:border-b-3 hover:border-orange-600'
              activeProps={{
                className: 'border-b-3 border-orange-600',
              }}
            >
              {/* <Home className='mr-2 h-4 w-4 text-orange-600' /> */}
              Users
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className='hidden md:block'>
            <div className='flex items-center space-x-4'>
              {isAuthenticated ? (
                <>
                  <Link
                    to='/auth/profile'
                    className='flex items-center text-lg text-gray-700 px-1 py-1 font-medium hover:border-b-3 hover:border-orange-600'
                    activeProps={{
                      className: 'border-b-3 border-orange-600',
                    }}
                  >
                    <UserIcon className='mr-2 h-4 w-4 text-orange-600' />{' '}
                    Profile
                  </Link>
                  <button
                    onClick={() => console.log('Logging out...')}
                    className='flex items-center text-lg text-gray-700 px-1 py-1 font-medium hover:border-b-3 hover:border-orange-600'
                  >
                    <LogOut className='mr-2 h-4 w-4 text-orange-600' /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to='/auth/login'
                    className='flex items-center text-lg text-gray-700 px-1 py-1 font-medium hover:border-b-3 hover:border-orange-600'
                    activeProps={{
                      className: 'border-b-3 border-orange-600',
                    }}
                  >
                    <LogIn className='mr-2 h-4 w-4 text-orange-600' /> Login
                  </Link>
                  <Link
                    to='/auth/register'
                    className=' flex items-center text-lg text-gray-700 px-1 py-1 font-medium hover:border-b-3 hover:border-orange-600'
                    activeProps={{
                      className: 'border-b-3 border-orange-600',
                    }}
                  >
                    <UserPlus2Icon className='mr-2 h-4 w-4 text-orange-600' />{' '}
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden flex items-center'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type='button'
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
              aria-controls='mobile-menu'
              aria-expanded='false'
            >
              <span className='sr-only'>Open main menu</span>
              {!isOpen ? (
                // Hamburger Icon
                <svg
                  className='block h-6 w-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16m-7 6h7'
                  />
                </svg>
              ) : (
                // Close Icon
                <svg
                  className='block h-6 w-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className='md:hidden' id='mobile-menu'>
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
            {isAuthenticated ? (
              <>
                <Link
                  to='/auth/profile'
                  className='bg-orange-400 px-3 py-2 rounded-md text-lg  text-amber-50 font-medium hover:bg-orange-600'
                  activeProps={{
                    className: 'bg-orange-500',
                  }}
                >
                  Profile
                </Link>
                <button
                  onClick={() => console.log('Logging out...')}
                  className='bg-orange-400 px-3 py-2 rounded-md text-lg  text-amber-50 font-medium hover:bg-orange-600'
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to='/auth/login'
                  className='bg-orange-400 px-3 py-2 rounded-md text-lg  text-amber-50 font-medium hover:bg-orange-600'
                  activeProps={{
                    className: 'bg-orange-500',
                  }}
                >
                  Login
                </Link>
                <Link
                  to='/auth/register'
                  className='bg-orange-400 px-3 py-2 rounded-md text-lg  text-amber-50 font-medium hover:bg-orange-600'
                  activeProps={{
                    className: 'bg-orange-500',
                  }}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
