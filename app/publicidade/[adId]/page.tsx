const adsConfig: Record<string, { token: string; width: string; height: string }> = {
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

export async function generateStaticParams() {
  return [
    { adId: '728-90' },
    { adId: '300-250' },
    { adId: '300-600' }
  ];
}

export default function AdPage({ params }: { params: { adId: string } }) {
  const config = adsConfig[params.adId];

  if (!config) return <div>Ad Config Not Found</div>;

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
                  new sdk("${config.token}")
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
