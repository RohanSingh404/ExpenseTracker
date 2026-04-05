import React , {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/layouts/AuthLayout'
import Input from '../../components/inputs'
import { validateEmail } from '../../utils/helper'
import ProfilePictureSlector from '../../components/ProfilePictureSlector'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import { API_PATHS } from '../../utils/apiPaths'
import axiosInstance from '../../utils/axiosInstance'
import uploadImage from '../../utils/uploadImage'
import toast from 'react-hot-toast'

const SignUpForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setfullName] = useState("");
    const [Profilepicture, setProfilePicture] = useState("");

    const [error, setError] = useState("");
    const {updateUser} = useContext(UserContext);

    const handleSignUp = async(e) => {
      e.preventDefault();
      
      if(!fullName) {
        setError('Please enter your full name.');
        toast.error('Full name is required');
        return;
      }
      
      if(!validateEmail(email)) {
        setError('Please enter a valid email address.');
        toast.error('Invalid email address');
        return;
      }
  
      if(!password) {
        setError('Please enter your password.');
        toast.error('Password is required');
        return;
      }

      if(password.length < 6) {
        setError('Password must be at least 6 characters long.');
        toast.error('Password too short');
        return;
      }

      setError('');
      
      
      //signup API
      let profileImageURL = "";
      try{
        
        if(Profilepicture) {
          const imgUploadResponse = await uploadImage(Profilepicture);
          profileImageURL = imgUploadResponse.imageURL || ""; // Assuming the response contains the image URL in this format
        }
        
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {fullName , email, password , profileImageURL});
      const {token , user} = response.data;
      if(token){
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if(error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred during SignUp. Please try again.");
      }
    }
    }
    const navigate = useNavigate();

  return (
    <div>
      <AuthLayout>
      <div className='p-7 md:p-0 md:w-full'>
        <p className='w-full  text-center text-gray-700 text-sm md:text-base font-medium mb-4'>
          <span className='text-[18px] md:text-[32px] font-bold'>Welcome to the Expense Tracker!</span>
          <br></br>
          Please Sign Up to manage your expenses and income effectively.
        </p>

          <form onSubmit={handleSignUp} className='space-y-1'>
            
            <ProfilePictureSlector 
              image={Profilepicture} 
              setImage={setProfilePicture} 
            />

            <div className='flex flex-col items-center justify-center  gap-1 mb-5'>
              <Input
                label="Full Name"
                type="text"
                onChange={(e) => setfullName(e.target.value)}
                value={fullName}
                placeholder="Enter your full name"
              />
              <Input
                label="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Enter your email"
              />
            

            <Input
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter your password"
            />
            

            {error && (
              <p className='text-red-500 text-sm mb-2'>{error}</p>
            )}

            <button
              type="submit"
              className='w-full md:w-75 flex justify-center items-center bg-green-600 hover:bg-green-700 transition-all duration-200 text-white font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg focus:outline-none mt-2'
            >
              Sign Up
            </button>

            

            <p className='text-sm text-gray-600 text-center'>
              Already have an account?{" "}
              <Link to="/login">
                <button className='text-green-600 font-semibold hover:underline cursor-pointer'>
                  Log in
                </button>
              </Link>
            </p>

            </div>

          </form>
      </div>
    </AuthLayout>
    </div>
  )
}

export default SignUpForm