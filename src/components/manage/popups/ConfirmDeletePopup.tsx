import type { Model } from '../../../types';

interface ConfirmDeletePopupProps {
  model: Model;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmDeletePopup({
  model,
  onClose,
  onConfirm,
}: ConfirmDeletePopupProps) {
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

          <h2 className='text-2xl font-bold mb-6 text-center'>Delete Model</h2>

          <div className='space-y-4'>
            <p className='text-center text-gray-600'>
              Are you sure you want to delete the model:
            </p>
            <p className='text-center text-lg font-medium'>{model.name}?</p>
            <p className='text-center text-sm text-red-600'>
              This action cannot be undone.
            </p>

            <div className='flex gap-4 pt-4'>
              <button
                onClick={onConfirm}
                className='flex-1 bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors'
              >
                Delete
              </button>
              <button
                onClick={onClose}
                className='flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
