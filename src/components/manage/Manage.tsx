import { useEffect, useState } from 'react';
import LoginPopup from '../auth/LoginPopup';
import RegisterPopup from '../auth/RegisterPopup';
import CreateModelPopup from './popups/CreateModelPopup';
import axios from 'axios';
import { apiEndpoints } from '../../apiEndpoints';
import type { Model } from '../../types';
import ArSpaceContainer from '../ar/ArSpaceContainer';

export default function Manage() {
  async function fetchData() {
    try {
      const res = await axios.get(apiEndpoints.model.getListByUser, {
        params: {
          userId: localStorage.getItem('userId'),
        },
      });
      console.log(res.data.models);
      setModelList(res.data.models);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const [isLogged] = useState(localStorage.getItem('userId'));
  const [isShownAction, setIsShownAction] = useState(false);
  const [isShowLoginPopup, setIsShowLoginPopup] = useState(false);
  const [isShowRegisterPopup, setIsShowRegisterPopup] = useState(false);
  const [isShowCreatePopup, setIsShowCreatePopup] = useState(false);
  const [modelList, setModelList] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='relative min-h-screen p-4 h-full'>
      {isShowLoginPopup && (
        <LoginPopup onClose={() => setIsShowLoginPopup(false)} />
      )}
      {isShowRegisterPopup && (
        <RegisterPopup onClose={() => setIsShowRegisterPopup(false)} />
      )}
      {isShowCreatePopup && (
        <CreateModelPopup
          onClose={() => setIsShowCreatePopup(false)}
          onCreated={() => fetchData()}
        />
      )}
      {isLogged ? (
        <div className='h-full mt-16 md:mt-20'>
          <div
            className='absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 cursor-pointer transition-colors'
            onClick={() => setIsShownAction(!isShownAction)}
          >
            <span className='text-2xl'>⋮</span>
          </div>
          {isShownAction && (
            <div
              className='absolute top-16 right-6 bg-gray-800 text-white rounded-xl shadow-xl z-10 w-48 overflow-hidden'
              onClick={() => setIsShownAction(false)}
            >
              <div
                className='px-4 py-3 hover:bg-gray-700 cursor-pointer transition-colors'
                onClick={() => setIsShowCreatePopup(true)}
              >
                Create
              </div>
              <div className='px-4 py-3 hover:bg-gray-700 cursor-pointer transition-colors'>
                Details
              </div>
              <div className='px-4 py-3 hover:bg-gray-700 cursor-pointer transition-colors'>
                Change model
              </div>
              <div className='px-4 py-3 hover:bg-gray-700 cursor-pointer transition-colors text-red-400'>
                Delete
              </div>
            </div>
          )}
          <div className='h-[50vh] md:h-[60%] rounded-xl overflow-hidden bg-gray-800'>
            {selectedModel && <ArSpaceContainer file={selectedModel.file} />}
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6'>
            {modelList.map((model: Model) => (
              <div
                key={model.id}
                className='bg-gray-800 rounded-xl p-4 cursor-pointer hover:bg-gray-700 transition-colors'
                onClick={() => setSelectedModel(model)}
              >
                <h3 className='text-lg font-semibold mb-1 truncate'>
                  {model.name}
                </h3>
                <p className='text-sm text-gray-400 line-clamp-2'>
                  {model.description}
                </p>
                <p className='text-xs text-gray-500 mt-2'>ID: {model.id}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center min-h-[80vh] space-y-4 px-4'>
          <div className='w-full max-w-sm space-y-4'>
            <button
              className='w-full bg-blue-600 text-white py-4 rounded-xl text-lg font-medium shadow-lg hover:bg-blue-700 transition-colors'
              onClick={() => setIsShowLoginPopup(true)}
            >
              Login
            </button>
            <button
              className='w-full bg-gray-800 text-white py-4 rounded-xl text-lg font-medium shadow-lg hover:bg-gray-700 transition-colors'
              onClick={() => setIsShowRegisterPopup(true)}
            >
              Register
            </button>
          </div>
        </div>
      )}
    </div>
  );
}