'use client';

import { useEffect, useRef } from 'react';

interface AdComponentProps {
  token: string;
  width: string;
  height: string;
}

export default function AdComponent({ token, width, height }: AdComponentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous elements
    containerRef.current.innerHTML = '';

    // Create container for the ad SDK to hook into
    const adContainer = document.createElement('div');
    adContainer.id = `ad-${token}`;
    containerRef.current.appendChild(adContainer);

    // Create script to load the external SDK
    const scriptSdk = document.createElement('script');
    scriptSdk.src = 'https://cdn.snsrsv.com/sdk.js';
    scriptSdk.async = true;

    // Set callback for when the SDK script loads
    scriptSdk.onload = () => {
      // Create script to initialize the ad
      const scriptInit = document.createElement('script');
      scriptInit.innerHTML = `
        try {
          new sdk("${token}")
            .setSize("${width}", "${height}")
            .disableStyle()
            .start();
        } catch (e) {
          console.error("Erro ao carregar o anúncio:", e);
        }
      `;
      containerRef.current?.appendChild(scriptInit);
    };

    containerRef.current.appendChild(scriptSdk);
  }, [token, width, height]);

  return (
    <div 
      ref={containerRef} 
      className="mx-auto flex justify-center items-center overflow-hidden bg-gray-100/50 rounded-lg" 
      style={{ maxWidth: `${width}px`, width: '100%', minHeight: `${height}px` }} 
    />
  );
}
