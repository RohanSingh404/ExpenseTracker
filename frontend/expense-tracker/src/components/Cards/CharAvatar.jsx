import React from 'react'
import { getInitials } from '../../utils/helper'

const CharAvatar = ({ fullName, height, width, style }) => {
  
  return (
    <div className={`${height || 'h-12'} ${width || 'w-12'} ${style || 'text-xl'} flex items-center justify-center rounded-full bg-slate-100`}>
        {getInitials(fullName || "")}
    </div>
  )
}

export default CharAvatar