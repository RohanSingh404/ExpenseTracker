import React from 'react'

const DeleteAlert = ({content , onDelete}) => {
  return (
    <div className=''>
        <p className='text-sm'>{content}</p>

        <div className='flex justify-end items-center'>
            <button
            type='button'
            className='add-btn '
            onClick={onDelete}>
                Delete
            </button>
        </div>
    </div>
  )
}

export default DeleteAlert