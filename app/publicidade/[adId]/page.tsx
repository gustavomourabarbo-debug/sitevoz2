import AdIframe from '@/components/common/AdIframe';

export default function AdPage({ params }: { params: { adId: string } }) {
  return <AdIframe adId={params.adId} />;
}

export async function generateStaticParams() {
  return [
    { adId: '728-90' },
    { adId: '300-250' },
    { adId: '300-600' }
  ];
}
