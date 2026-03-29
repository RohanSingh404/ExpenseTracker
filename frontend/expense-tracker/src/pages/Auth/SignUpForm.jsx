import React , {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/layouts/AuthLayout'
import Input from '../../components/inputs'
import { validateEmail } from '../../utils/helper'
import ProfilePictureSlector from '../../components/ProfilePictureSlector'
const SignUpForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [FullName, setFullName] = useState("");
    const [Profilepicture, setProfilePicture] = useState("");

    const [error, setError] = useState("");
  
    const handleSignUp = async(e) => {
      e.preventDefault();
      if(!FullName) {
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
              onChange={(e) => setFullName(e.target.value)}
              value = {FullName}
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

          <Link to="/signup">
            <button type="submit" className='max-w-full md:w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer'>
              Sign Up
            </button>
          </Link>

          <Link to="/login">
            <p>Already have an account? <button className='text-green-500 font-bold hover:opacity-75' onClick={() => navigate('/login')}>Log in</button></p>
          </Link>
        </form>
      </div>
    </AuthLayout>
    </div>
  )
}

export default SignUpForm