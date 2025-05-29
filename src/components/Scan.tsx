import { useEffect, useRef, useState } from "react";
import ArSpaceContainer from "./ar/ArSpaceContainer";
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import { apiEndpoints } from "../apiEndpoints";
import axios from "axios";

export default function Scan() {
  const [model, setModel] = useState<File | null>(null);
  const [scannedUrl, setScannedUrl] = useState<string | null>(null);
  const scannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (model || scannedUrl) return;

    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: 250,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
      },
      false
    );

    scanner.render(
      async (decodedText: string) => {
        console.log("QR code scanned:", decodedText);
        alert("QR code scanned: " + decodedText);
        setScannedUrl(decodedText);
        await scanner.clear();
      },
      (error) => {
        console.warn("QR scan error:", error);
      }
    );

    return () => {
      scanner.clear().catch(console.error);
    };
  }, [model, scannedUrl]);

  useEffect(() => {
    if (scannedUrl) {
      axios
        .get(apiEndpoints.model.getById + scannedUrl, {
          responseType: "blob",
        })
        .then((response) => {
          const blob = new Blob([response.data], { type: "model/gltf-binary" });
          const file = new File([blob], "model.glb", { type: blob.type });
          setModel(file);
        })
        .catch((err) => {
          console.error("Error fetching model:", err);
        });
    }
  }, [scannedUrl]);

  return (
    <>
      {!model && (
        <div id="qr-reader" style={{ width: "100%" }} ref={scannerRef} />
      )}
      {model && <ArSpaceContainer model={model} />}
    </>
  );
}
