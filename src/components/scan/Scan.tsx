import { useEffect, useRef, useState } from 'react';
import ArSpaceContainer from '../ar/ArSpaceContainer';
import {
  Html5Qrcode,
  Html5QrcodeScanner,
  Html5QrcodeScanType,
} from 'html5-qrcode';
import { apiEndpoints } from '../../apiEndpoints';
import axios from 'axios';
import type { Model } from '../../types';
import ModelDetailsPopup from '../manage/popups/ModelDetailsPopup';

export default function Scan() {
  const [model, setModel] = useState<Model | null>(null);
  const [scannedUrl, setScannedUrl] = useState<string | null>(null);
  const [isShownAction, setIsShownAction] = useState(false);
  const [isShowDetailsPopup, setIsShowDetailsPopup] = useState(false);

  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  const handleQrImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const imageFile = e.target.files?.[0];
    if (!imageFile) return;

    const scanner = new Html5Qrcode('qr-temp');

    try {
      const decodedText = await scanner.scanFile(imageFile, true);
      setScannedUrl(decodedText);
      scanner.clear();
    } catch (err) {
      console.error('Cannot decode QR image:', err);
      alert('Cannot decode QR image.');
    }
  };

  useEffect(() => {
    if (model || scannedUrl || scannerRef.current) return;

    scannerRef.current = new Html5QrcodeScanner(
      'qr-reader',
      {
        fps: 10,
        qrbox: 250,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
      },
      false
    );

    scannerRef.current.render(
      async (decodedText: string) => {
        setScannedUrl(decodedText);
        if (scannerRef.current) {
          await scannerRef.current.clear();
          scannerRef.current = null;
        }
      },
      (error) => {
        console.warn('QR scan error:', error);
      }
    );

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
        scannerRef.current = null;
      }
    };
  }, [model, scannedUrl]);

  useEffect(() => {
    if (scannedUrl) {
      axios
        .get(apiEndpoints.model.getById + scannedUrl)
        .then((res) => {
          setModel(res.data.model);
        })
        .catch((err) => {
          alert('Model not found or invalid QR code.');
          console.error('Error fetching model:', err);
        });
    }
  }, [scannedUrl]);

  return (
    <div className='flex flex-col items-center justify-start min-h-screen bg-black text-white p-4'>
      {isShowDetailsPopup && model && (
        <ModelDetailsPopup
          model={model}
          onClose={() => setIsShowDetailsPopup(false)}
        />
      )}
      {model && (
        <div className='h-full mt-16 md:mt-20'>
          <button
            className='absolute top-4 left-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors cursor-pointer text-xl'
            onClick={() => {
              setModel(null);
              setScannedUrl(null);
              setIsShownAction(false);
            }}
          >
            ←
          </button>
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
                onClick={() => {
                  if (model) {
                    setIsShowDetailsPopup(true);
                  } else {
                    alert('Please select a model first');
                  }
                }}
              >
                Details
              </div>
            </div>
          )}
        </div>
      )}
      {!model && (
        <div className='w-full max-w-md sm:max-w-lg mx-auto space-y-6'>
          <div
            id='qr-reader'
            className='w-full aspect-square sm:aspect-video rounded-xl overflow-hidden bg-gray-900'
          />
          <div id='qr-temp' className='hidden' />
          <label className='inline-flex items-center justify-center w-full px-6 py-3 bg-blue-600 text-white rounded-xl cursor-pointer hover:bg-blue-700 transition-colors'>
            <span className='font-medium'>Upload QR Image</span>
            <input
              type='file'
              accept='image/*'
              onChange={handleQrImageUpload}
              className='hidden'
            />
          </label>
        </div>
      )}

      {model && (
        <div className='w-full h-[calc(100vh-5rem)] mt-4'>
          <ArSpaceContainer file={model.file} />
        </div>
      )}
    </div>
  );
}
