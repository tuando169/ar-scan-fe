import axios from 'axios';
import { useState } from 'react';
import { apiEndpoints } from '../../apiEndpoints';

interface RegisterPopupProps {
  onClose: () => void;
}

export default function RegisterPopup({ onClose }: RegisterPopupProps) {
  async function register() {
    try {
      await axios.post(apiEndpoints.auth.register, {
        email,
        password,
      });
      localStorage.setItem('user', email);
      handleCancel();
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  }
  function handleCancel() {
    setEmail('');
    setPassword('');
    onClose();
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center text-black bg-opacity-50 z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-96 relative'>
        <button
          onClick={onClose}
          className='absolute top-2 right-2 text-gray-500 hover:text-black text-xl'
        >
          &times;
        </button>
        <h2 className='text-2xl font-bold mb-4 text-center'>Register</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className='mb-4'>
            <label htmlFor='email' className='block text-sm font-medium mb-2'>
              Email
            </label>
            <input
              type='email'
              id='email'
              className='w-full p-2 border border-gray-300 rounded'
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-6'>
            <label
              htmlFor='password'
              className='block text-sm font-medium mb-2'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              className='w-full p-2 border border-gray-300 rounded'
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type='submit'
            className='w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors'
            onClick={register}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
