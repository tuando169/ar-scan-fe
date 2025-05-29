import axios from 'axios';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { apiEndpoints } from '../../../apiEndpoints';
import type { Model } from '../../../types';

interface UpdateModelPopupProps {
  model: Model;
  onClose: () => void;
  onUpdated: () => void;
}

export default function UpdateModelPopup({
  model,
  onClose,
  onUpdated,
}: UpdateModelPopupProps) {
  const [name, setName] = useState(model.name);
  const [description, setDescription] = useState(model.description);
  const [file, setFile] = useState<File | null>(null);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
  }

  function handleCancel() {
    setName(model.name);
    setDescription(model.description);
    setFile(null);
    onClose();
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name || !description) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      if (file) {
        formData.append('file', file);
      }

      await axios.patch(apiEndpoints.model.update + model.id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onUpdated();
      handleCancel();
    } catch (error) {
      console.error('Error updating model:', error);
      alert('An error occurred while updating the model. Please try again.');
    }
  }

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

          <h2 className='text-2xl font-bold mb-6 text-center'>Update Model</h2>

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
                Model File (.glb/.gltf) - Optional
              </label>
              <input
                type='file'
                accept='.glb,.gltf'
                onChange={handleFileChange}
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
              <p className='text-sm text-gray-500 mt-1'>
                Only upload a new file if you want to change the current model
              </p>
            </div>

            <div className='flex gap-4 pt-2'>
              <button
                type='submit'
                className='flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors'
              >
                Update
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
