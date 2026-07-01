'use client';

import { useEffect, useState } from 'react';

interface AdComponentProps {
  token: string;
  width: string;
  height: string;
}

export default function AdComponent({ token, width, height }: AdComponentProps) {
  const adFile = width === "728" ? "728-90" : width === "300" && height === "600" ? "300-600" : "300-250";
  const [activeToken, setActiveToken] = useState(token);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedToken = localStorage.getItem(`ad_token_${adFile}`);
      if (savedToken) {
        setActiveToken(savedToken);
      }
    }
  }, [adFile, token]);

  return (
    <div 
      className="mx-auto flex justify-center items-center overflow-hidden bg-gray-50 rounded-lg shadow-sm border border-gray-100" 
      style={{ maxWidth: `${width}px`, width: '100%', height: `${height}px` }}
    >
      <iframe
        src={`/publicidade/${adFile}.html?token=${activeToken}`}
        width={width}
        height={height}
        title={`Ad-${activeToken}`}
        style={{ border: 'none', overflow: 'hidden', width: '100%', height: '100%' }}
      />
    </div>
  );
}
