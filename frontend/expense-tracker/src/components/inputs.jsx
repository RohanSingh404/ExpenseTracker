import React from 'react'
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa6'
import { useState } from 'react';
const Input = ({ label, type, placeholder , value, onChange}) => {
    const [showPassword, setShowPassword] = useState(false);
  return (
    <div className='mt-4'>
      <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor={label}>
        {label}
      </label>
      <input
        className='shadow appearance-none border rounded w-full md:w-75 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        id={label}
        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e)}
      />

        {type === 'password' && (
          showPassword ? 
          <FaRegEye
            size={22}
            onClick={() => setShowPassword(!showPassword)}
          /> :
          <FaRegEyeSlash
            size={22}
            onClick={() => setShowPassword(!showPassword)}
          />
        )}

    </div>
  )
}

export default Input