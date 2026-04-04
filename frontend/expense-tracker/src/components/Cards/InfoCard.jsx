import React from 'react'

const InfoCard = ({ icon, label, value, color }) => {
  return (
      <div className="flex items-center w-full gap-6 bg-white p-6 shadow-gray-100 shadow-md rounded-xl border-2 border-gray-200/50">
        <div className={`flex justify-center items-center w-14 h-14 rounded-full ${color} text-xl`}>
          {icon}
        </div>
        <div>
          <h2 className='font-medium text-sm text-gray-500 mb-1'>{label}</h2>
          <h2 className='font-medium text-2xl'>${value}</h2>
        </div>
      </div>
  )
}

export default InfoCard