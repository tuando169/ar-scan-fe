import { useEffect, useRef, useState } from 'react';
import ArSpaceContainer from '../ar/ArSpaceContainer';
import {
  Html5Qrcode,
  Html5QrcodeScanner,
  Html5QrcodeScanType,
} from 'html5-qrcode';
import { apiEndpoints } from '../../apiEndpoints';
import axios from 'axios';

export default function Scan() {
  const [model, setModel] = useState<File | null>(null);
  const [scannedUrl, setScannedUrl] = useState<string | null>(null);
  const scannerRef = useRef<HTMLDivElement>(null);

  const handleQrImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const imageFile = e.target.files?.[0];
    if (!imageFile) return;

    const scanner = new Html5Qrcode('qr-temp');

    try {
      const decodedText = await scanner.scanFile(imageFile, true);
      console.log('QR from image:', decodedText);
      setScannedUrl(decodedText);
      scanner.clear();
    } catch (err) {
      console.error('Không thể giải mã ảnh QR:', err);
      alert('Không thể giải mã ảnh QR.');
    }
  };

  useEffect(() => {
    if (model || scannedUrl) return;

    const scanner = new Html5QrcodeScanner(
      'qr-reader',
      {
        fps: 10,
        qrbox: 250,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
      },
      false
    );

    scanner.render(
      async (decodedText: string) => {
        console.log('QR code scanned:', decodedText);
        setScannedUrl(decodedText);
        await scanner.clear();
      },
      (error) => {
        console.warn('QR scan error:', error);
      }
    );

    return () => {
      scanner.clear().catch(console.error);
    };
  }, [model, scannedUrl]);

  useEffect(() => {
    if (scannedUrl) {
      // axios
      //   .get(apiEndpoints.model.getById + scannedUrl, {
      //     responseType: 'blob',
      //   })
      //   .then((response) => {
      //     const blob = new Blob([response.data], { type: 'model/gltf-binary' });
      //     const file = new File([blob], 'model.glb', { type: blob.type });
      //     setModel(file);
      //   })
      //   .catch((err) => {
      //     console.error('Error fetching model:', err);
      //   });
      setModel(new Blob());
    }
  }, [scannedUrl]);

  return (
    <>
      {!model && (
        <div className='flex flex-col items-center text-white '>
          <div id='qr-reader' style={{ width: '100%' }} ref={scannerRef} />
          <div id='qr-temp' className='hidden' />
          <div className='mt-4 fixed'>
            <label className='bg-green-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-700 transition-colors'>
              Giải mã ảnh QR
              <input
                type='file'
                accept='image/*'
                onChange={handleQrImageUpload}
                className='hidden'
              />
            </label>
          </div>
        </div>
      )}
      {model && <ArSpaceContainer model={model} />}
    </>
  );
}
