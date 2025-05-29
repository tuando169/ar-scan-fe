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
      alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }
    console.log('Submitting model:', name, description, file);

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
      alert('Đã xảy ra lỗi khi tạo mô hình. Vui lòng thử lại sau.');
    }
  }

  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 text-black'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-96 relative'>
        <button
          onClick={onClose}
          className='absolute top-2 right-2 text-gray-500 hover:text-black text-xl'
        >
          &times;
        </button>

        <h2 className='text-2xl font-bold mb-4 text-center'>Create Model</h2>

        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-1'>Name</label>
            <input
              type='text'
              className='w-full p-2 border border-gray-300 rounded'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-medium mb-1'>
              Description
            </label>
            <textarea
              className='w-full p-2 border border-gray-300 rounded'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className='mb-6'>
            <label className='block text-sm font-medium mb-1'>
              Model File (.glb/.gltf)
            </label>
            <input
              type='file'
              accept='.glb,.gltf'
              onChange={handleFileChange}
              className='w-full'
              required
            />
          </div>

          {/* Nút submit và cancel */}
          <div className='flex justify-between gap-4'>
            <button
              type='submit'
              className='flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors'
            >
              Submit
            </button>
            <button
              type='button'
              onClick={handleCancel}
              className='flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition-colors'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
