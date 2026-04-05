import React , { useContext } from 'react'
import { SIDE_MENU_DATA } from '../../utils/data'
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom'
import CharAvatar from '../Cards/CharAvatar'
import { useUserAuth } from '../../hooks/useUserAuth'

const Sidebar = ({activeMenu}) => {
    const {user , clearUser} = useContext(UserContext);
    const navigate = useNavigate();

    // Ensure user data is loaded
    useUserAuth();

    const handleClick = (route) => {
        if(route === "logout"){
            handleLogout();
            return;
        }
        navigate(route);
    };

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/login");
    }

  return (
    <div className='w-64 p-5 h-screen bg-white border-r border-gray-200/50 shadow-md sticky top-0 z-20'>
    <div className='flex flex-col items-center justify-center gap-3 mt-3 mb-7'>
        {user?.profileImageURL?(
            <img 
            src={user?.profileImageURL || ""} 
            alt="profile" 
            className='w-20 h-20 bg-slate-200 rounded-full object-cover' />
        ):
        <CharAvatar
        fullName={user?.fullName || ""}
        height="w-20"
        width="h-20"
        style = "text-xl"/>
        }

        <h5 className='text-sm font-medium leading-5 text-gray-400'>
            {user?.fullName || ""}
        </h5>
    </div>

    {SIDE_MENU_DATA.map((item , index) => (
        <button 
        key={`menu_${index}`}
        className={`w-full flex items-center gap-4 rounded-lg cursor-pointer ${activeMenu === item.label ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'} py-3 px-6 rounded-lg mb-3`}
        onClick={() => handleClick(item.path)}
        >
            <item.icon className='text-xl'/>
            {item.label}
        </button>
    ))}
    </div>
)}

export default Sidebar