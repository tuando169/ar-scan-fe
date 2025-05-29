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
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50'>
      <div className='w-full max-w-md bg-white rounded-xl shadow-xl text-black relative'>
        <div className='p-6'>
          <button
            onClick={onClose}
            className='absolute top-4 right-4 text-gray-500 hover:text-black text-xl'
          >
            &times;
          </button>
          
          <h2 className='text-2xl font-bold mb-6 text-center'>Register</h2>
          
          <form onSubmit={(e) => e.preventDefault()} className='space-y-4'>
            <div>
              <label htmlFor='email' className='block text-sm font-medium mb-2'>
                Email
              </label>
              <input
                type='email'
                id='email'
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor='password' className='block text-sm font-medium mb-2'>
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
              onClick={register}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}