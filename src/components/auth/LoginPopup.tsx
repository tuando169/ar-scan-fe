import axios from 'axios';
import { useState } from 'react';
import { apiEndpoints } from '../../apiEndpoints';

interface LoginPopupProps {
  onClose: () => void;
}

export default function LoginPopup({ onClose }: LoginPopupProps) {
  async function login() {
    try {
      const res = await axios.post(apiEndpoints.auth.login, {
        username: name,
        password,
      });
      localStorage.setItem('userId', res.data.id);
      window.location.href = '/manage';
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
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4  z-[100000]'>
      <div className='w-full max-w-md bg-white rounded-xl shadow-xl text-black relative'>
        <div className='p-6'>
          <button
            onClick={onClose}
            className='absolute top-4 right-4 text-gray-500 hover:text-black text-xl'
          >
            &times;
          </button>

          <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>

          <form onSubmit={(e) => e.preventDefault()} className='space-y-4'>
            <div>
              <label
                className='block text-sm font-medium mb-2'
                htmlFor='username'
              >
                Username
              </label>
              <input
                type='username'
                id='username'
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label
                className='block text-sm font-medium mb-2'
                htmlFor='password'
              >
                Password
              </label>
              <input
                type='password'
                id='password'
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type='submit'
              className='w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors'
              onClick={login}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
