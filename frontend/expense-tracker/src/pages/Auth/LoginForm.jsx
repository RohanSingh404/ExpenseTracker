import React , {useState} from 'react'
import { Link , useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/layouts/AuthLayout'
import Input from '../../components/inputs'
import SignUpForm from './SignUpForm'
import { validateEmail } from '../../utils/helper'
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
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

          <Link to="/login">
            <button type="submit" className='w-full md:w-75 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
              Log In
            </button>
          </Link>

          <Link to="/signup">
            <p>Don`t have an account? <button className='text-green-500 font-bold hover:opacity-75' onClick={() => navigate('/signup')}>Sign up</button></p>
          </Link>
        </form>
      </div>
    </AuthLayout>
  )
}

export default LoginForm