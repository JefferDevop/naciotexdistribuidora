// hooks/useBarcodeScanner.js
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Html5Qrcode } from "html5-qrcode";

export function useBarcodeScanner({ onDetected }) {
  const scannerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const start = () => setIsOpen(true);

  const stop = useCallback(async () => {
    setIsOpen(false);

    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        await scannerRef.current.clear();
      } catch (_) {
        // Silencioso por seguridad
      }
      scannerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const scanner = new Html5Qrcode("barcode-reader");
    scannerRef.current = scanner;

    const startCamera = async () => {
      try {
        const cameras = await Html5Qrcode.getCameras();
        if (!cameras?.length) return;

        await scanner.start(
          cameras[0].id,
          { fps: 10, qrbox: { width: 250, height: 250 } },
          async decodedText => {
            await stop();
            onDetected(decodedText);
          },
          () => {}
        );
      } catch (err) {
        await stop();
      }
    };

    startCamera();

    // 🔥 ESTO es lo que garantiza que al cerrar modal se apague cámara
    return () => {
      stop();
    };
  }, [isOpen, stop, onDetected]);

  return { isOpen, start, stop };
}
