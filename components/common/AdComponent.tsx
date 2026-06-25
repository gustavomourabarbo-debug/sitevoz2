'use client';

interface AdComponentProps {
  token: string;
  width: string;
  height: string;
}

export default function AdComponent({ token, width, height }: AdComponentProps) {
  const srcDocHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          html, body { 
            margin: 0; 
            padding: 0; 
            width: 100%; 
            height: 100%; 
            overflow: hidden; 
            display: flex;
            justify-content: center;
            align-items: center;
          }
        </style>
      </head>
      <body>
        <script src="https://cdn.snsrsv.com/sdk.js"></script>
        <script>
          try {
            new sdk("${token}")
              .setSize("${width}", "${height}")
              .start();
          } catch (e) {
            console.error("Ad load error:", e);
          }
        </script>
      </body>
    </html>
  `;

  return (
    <div 
      className="mx-auto flex justify-center items-center overflow-hidden bg-gray-50 rounded-lg shadow-sm border border-gray-100" 
      style={{ maxWidth: `${width}px`, width: '100%', height: `${height}px` }}
    >
      <iframe
        srcDoc={srcDocHtml}
        width={width}
        height={height}
        title={`Ad-${token}`}
        sandbox="allow-scripts allow-same-origin allow-popups"
        style={{ border: 'none', overflow: 'hidden', width: '100%', height: '100%' }}
      />
    </div>
  );
}
