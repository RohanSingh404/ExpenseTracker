import React, { useRef , useState } from 'react'
import {LuUser , LuUpload , LuTrash2} from 'react-icons/lu'
const ProfilePictureSlector = ({ image, setImage }) => {
    const inputref = useRef();
    const [preview, setPreview] = useState(image);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const url = URL.createObjectURL(file);
            setPreview(url);
        }
    };

    const handleremoveImage = () => {
        setImage(null);
        setPreview(null);
        inputref.current.value = null;
    };

    const handleclick = () => {
        inputref.current.click();
    };


  return (
    <div className='flex justify-center items-center'>
        <input 
            type="file"
            accept='image/*'
            ref={inputref}
            onChange={handleImageChange}
            className="hidden"
        />
        {!image ? (
            <div className='flex items-center w-24 h-24 bg-green-600 rounded-full justify-center cursor-pointer relative' onClick={handleclick}>
                <LuUser className='text-4xl text-white'/>
                <button 
                    className='flex absolute -bottom-1 right-1 w-7 h-7 p-2 rounded-full bg-black items-center justify-center cursor-pointer'
                    onClick={handleclick}
                >
                    <LuUpload className='text-white'/> 
                </button>
            </div>
         ) : (
            <div className='relative'>
                <img 
                    src={preview} 
                    alt="Profile Photo" 
                    className='w-24 h-24 rounded-full object-cover'
                />
                <button 
                    type="button" 
                    className='flex absolute -bottom-1 right-1 w-7 h-7 p-2 rounded-full bg-black items-center justify-center cursor-pointer'
                    onClick={handleremoveImage}
                >
                    <LuTrash2 className='text-white'/> 
                </button>
            </div>
        )}

    </div>
  )
}

export default ProfilePictureSlector