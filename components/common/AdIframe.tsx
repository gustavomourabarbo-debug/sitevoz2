'use client';

import { useEffect, useState } from 'react';

const defaultAds: Record<string, { token: string; width: string; height: string }> = {
  '728-90': {
    token: 'cad1456400464e69a8a7ada3d2ccab43',
    width: '728',
    height: '90'
  },
  '300-250': {
    token: '02cda84a0e4149c2855e170b9c26dedd',
    width: '300',
    height: '250'
  },
  '300-600': {
    token: '528c9f9e89c0496a8d9da2ba4bfb1124',
    width: '300',
    height: '600'
  }
};

export default function AdIframe({ adId }: { adId: string }) {
  const [token, setToken] = useState<string | null>(null);
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    const activeConfig = defaultAds[adId];
    if (activeConfig) {
      const savedToken = localStorage.getItem(`ad_token_${adId}`);
      setToken(savedToken || activeConfig.token);
      setConfig(activeConfig);
    }
  }, [adId]);

  if (!config || !token) return null;

  return (
    <div style={{
      margin: 0,
      padding: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent'
    }}>
      <script src="https://cdn.snsrsv.com/sdk.js" defer></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            try {
              var interval = setInterval(function() {
                if (typeof sdk !== 'undefined') {
                  clearInterval(interval);
                  new sdk("${token}")
                    .setSize("${config.width}", "${config.height}")
                    .start();
                }
              }, 100);
            } catch (e) {
              console.error("Ad load error:", e);
            }
          `
        }}
      />
    </div>
  );
}
