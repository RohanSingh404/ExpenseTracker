import React , {useContext , useState} from 'react'
import { Link , useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/layouts/AuthLayout'
import Input from '../../components/inputs'
import SignUpForm from './SignUpForm'
import { validateEmail } from '../../utils/helper'
import { API_PATHS } from '../../utils/apiPaths'
import axiosInstance from '../../utils/axiosInstance'
import { UserContext } from '../../context/userContext'
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const {updateUser} = useContext(UserContext);

  const handleLogin = async(e) => {
    e.preventDefault();

    if(!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if(!password) {
      setError('Please enter your password.');
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
        navigate("/dashboard");
      }
    } catch (error) {
      if(error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred during login. Please try again.");
      }
    }
  }
  const navigate = useNavigate();
  return (
    <AuthLayout>
      <div className='ml-15'>
        <p className='w-full md:w-60 text-center text-gray-700 text-base mb-4'>
          <span className='text-2xl font-medium'>Welcome to the<br></br> Expense Tracker!</span><br></br>
          Please log in to manage your expenses and income effectively.
        </p>

        <form onSubmit={handleLogin}>
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