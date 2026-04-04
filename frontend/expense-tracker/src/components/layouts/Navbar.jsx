import React , {useState} from 'react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import Sidebar from './Sidebar'
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
        
        
        <h2 className='text-xl font-bold text-green-600 py-3 px-5'>Expense Tracker</h2>

        {sideMenuOpen && (
            <div className="fixed top-[61px] bg-white ">
                <Sidebar activeMenu={activeMenu} />
            </div>
        )}
    </div>
  )
}

export default Navbar