import React , {useContext , useState} from 'react'
import { Link , useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/layouts/AuthLayout'
import Input from '../../components/inputs'
import { validateEmail } from '../../utils/helper'
import { API_PATHS } from '../../utils/apiPaths'
import axiosInstance from '../../utils/axiosInstance'
import { UserContext } from '../../context/userContext'
import toast from 'react-hot-toast'

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const {updateUser} = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();

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
    setError('');

    //login API
    try{
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {email, password});
      const {token , user} = response.data;
      if(token){
        localStorage.setItem("token", token);
        updateUser(user);
        toast.success('Login successful!');
        navigate("/dashboard");
      }
    } catch (error) {
      if(error.response && error.response.data.message) {
        setError(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        setError("An error occurred during login. Please try again.");
        toast.error("An error occurred during login");
      }
    }
  }

  return (
    <AuthLayout>
      <div className='flex flex-col justify-center items-center'>
        <p className='w-full  text-center text-gray-700 text-base font-medium mb-2 md:mb-4 p-5 md:p-0'>
          <span className='text-[18px] md:text-[32px] font-bold'>Welcome to the Expense Tracker!</span>
          <br></br>
          Please log in to manage your expenses and income effectively.
        </p>

        <form onSubmit={handleLogin} className='p-7 md:p-0'>
          <Input
            label="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value = {email}
            placeholder="Enter your email"
          />
          <Input
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value = {password}
            placeholder="Enter your password"
          />

            {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}

          
            <button type="submit" className='w-full md:w-75 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
              Log In
            </button>

          
            <p>Don`t have an account? 
              <Link to="/signup">
                <button className='text-green-500 font-bold hover:opacity-75 cursor-pointer'>Sign up</button>
              </Link>
            </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default LoginForm