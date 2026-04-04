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
        return;
      }
      
      if(!validateEmail(email)) {
        setError('Please enter a valid email address.');
        return;
      }
  
      if(!password) {
        setError('Please enter your password.');
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
      <div className='ml-15'>
        <p className='w-full md:w-60 text-center text-gray-700 text-base mb-4'>
          <span className='text-2xl font-medium'>Welcome to the<br></br> Expense Tracker!</span><br></br>
          Please Sign Up to manage your expenses and income effectively.
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePictureSlector image={Profilepicture} setImage={setProfilePicture} />
          <div className='md:flex gap-2'>
            <Input
              label="Full Name"
              type="text"
              onChange={(e) => setfullName(e.target.value)}
              value = {fullName}
              placeholder="Enter your full name"
            />
            <Input
              label="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value = {email}
              placeholder="Enter your email"
            />
          </div>
          <Input
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value = {password}
            placeholder="Enter your password"
          />

          {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}

          
            <button type="submit" className='max-w-full md:w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer'>
              Sign Up
            </button>
          

          
            <p>Already have an account? <Link to="/login"><button className='text-green-500 font-bold hover:opacity-75 cursor-pointer'>Log in</button></Link></p>
        </form>
      </div>
    </AuthLayout>
    </div>
  )
}

export default SignUpForm