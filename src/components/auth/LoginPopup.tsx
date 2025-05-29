import axios from 'axios';
import { useState } from 'react';
import { apiEndpoints } from '../../apiEndpoints';

interface LoginPopupProps {
  onClose: () => void;
}

export default function LoginPopup({ onClose }: LoginPopupProps) {
  async function login() {
    try {
      await axios.post(apiEndpoints.auth.login, {
        name,
        password,
      });
      localStorage.setItem('user', name);
      handleCancel();
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  }

  function handleCancel() {
    setName('');
    setPassword('');
    onClose();
  }

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center  text-black z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-96 relative'>
        <button
          onClick={onClose}
          className='absolute top-2 right-2 text-gray-500 hover:text-black text-xl'
        >
          &times;
        </button>

        <h2 className='text-2xl font-bold mb-4 text-center'>Login</h2>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className='mb-4'>
            <label
              className='block text-sm font-medium mb-2'
              htmlFor='username'
            >
              Username
            </label>
            <input
              type='username'
              id='username'
              className='w-full p-2 border border-gray-300 rounded'
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className='mb-6'>
            <label
              className='block text-sm font-medium mb-2'
              htmlFor='password'
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
            className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors'
            onClick={login}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
