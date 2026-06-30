'use client';

interface AdComponentProps {
  token: string;
  width: string;
  height: string;
}

export default function AdComponent({ token, width, height }: AdComponentProps) {
  const adFile = width === "728" ? "728-90" : width === "300" && height === "600" ? "300-600" : "300-250";

  return (
    <div 
      className="mx-auto flex justify-center items-center overflow-hidden bg-gray-50 rounded-lg shadow-sm border border-gray-100" 
      style={{ maxWidth: `${width}px`, width: '100%', height: `${height}px` }}
    >
      <iframe
        src={`/publicidade/${adFile}.html`}
        width={width}
        height={height}
        title={`Ad-${token}`}
        style={{ border: 'none', overflow: 'hidden', width: '100%', height: '100%' }}
      />
    </div>
  );
}
