import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
const DashboardLayouts = ({ activeMenu, children }) => {
    const {user} = useContext(UserContext);
  return (
    <div>
        <Navbar activeMenu={activeMenu} />

        {
            user && (
                <div className='flex'>
                    <div className="max-[1080px]:hidden">
                        <Sidebar activeMenu={activeMenu} />
                    </div>
                    <div className="grow mx-5">
                        {children}
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default DashboardLayouts