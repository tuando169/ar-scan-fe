import { QRCodeCanvas } from 'qrcode.react';
import type { Model } from '../../../types';

interface ModelDetailsPopupProps {
  model: Model;
  onClose: () => void;
}

export default function ModelDetailsPopup({
  model,
  onClose,
}: ModelDetailsPopupProps) {
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

          <h2 className='text-2xl font-bold mb-6 text-center'>Model Details</h2>

          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                ID
              </label>
              <p className='text-lg'>{model.id}</p>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Name
              </label>
              <p className='text-lg'>{model.name}</p>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Description
              </label>
              <p className='text-lg'>{model.description}</p>
            </div>

            <div className='pt-4'>
              <label className='block text-sm font-medium text-gray-700 mb-3'>
                QR Code
              </label>
              <div className='flex justify-center bg-white p-4 rounded-lg'>
                <QRCodeCanvas value={model.id.toString()} size={200} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
