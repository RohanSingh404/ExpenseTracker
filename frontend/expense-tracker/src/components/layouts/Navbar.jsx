import React , {useState} from 'react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom';
const Navbar = ({ activeMenu }) => {
    const [sideMenuOpen, setSideMenuOpen] = useState(false);  
  return (
    <div className='flex gap-4 bg-white border-gray-200/50  shadow-md px-5'>
        <button onClick={() => setSideMenuOpen(!sideMenuOpen)} className='text-gray-500 focus:outline-none md:hidden'>
            {sideMenuOpen ? (
                <HiOutlineX className='text-3xl' />
            ) : (
                <HiOutlineMenu className='text-3xl' />
            )}
        </button>
        
        
        <Link to="/dashboard">
            <h2 className='text-xl font-bold text-green-600 py-3 px-5 '>Expense Tracker</h2>
        </Link>

        {sideMenuOpen && (
    <>
        {/* Backdrop */}
        <div 
            className="fixed inset-0 bg-black/10 z-40 md:hidden"
            onClick={() => setSideMenuOpen(false)}
        />
        <div className="fixed top-0 left-0 w-64 h-[calc(100vh-55px)] bg-white shadow-xl z-50 border-r border-gray-200">
            <Sidebar activeMenu={activeMenu} />
        </div>
    </>
)}
    </div>
  )
}

export default Navbar