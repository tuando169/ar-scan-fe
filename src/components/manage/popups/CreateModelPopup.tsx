import axios from 'axios';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { apiEndpoints } from '../../../apiEndpoints';

interface CreateModelPopupProps {
  onClose: () => void;
  onCreated: () => void;
}

export default function CreateModelPopup({
  onClose,
  onCreated,
}: CreateModelPopupProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
  }

  function handleCancel() {
    setName('');
    setDescription('');
    setFile(null);
    onClose();
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name || !description || !file) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('file', file);
      formData.append('user', localStorage.getItem('userId') || '');

      await axios.post(apiEndpoints.model.create, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onCreated();
      handleCancel();
    } catch (error) {
      console.error('Error creating model:', error);
      alert('An error occurred while creating the model. Please try again.');
    }
  }

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

          <h2 className='text-2xl font-bold mb-6 text-center'>Create Model</h2>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium mb-2'>Name</label>
              <input
                type='text'
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className='block text-sm font-medium mb-2'>
                Description
              </label>
              <textarea
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div>
              <label className='block text-sm font-medium mb-2'>
                Model File (.glb/.gltf)
              </label>
              <input
                type='file'
                accept='.glb,.gltf'
                onChange={handleFileChange}
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                required
              />
            </div>

            <div className='flex gap-4 pt-2'>
              <button
                type='submit'
                className='flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors'
              >
                Create
              </button>
              <button
                type='button'
                onClick={handleCancel}
                className='flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors'
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
