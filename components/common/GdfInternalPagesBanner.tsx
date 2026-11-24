'use client';

import { usePathname } from 'next/navigation';
import GdfCampaignBanner from '@/components/common/GdfCampaignBanner';

// A página inicial já exibe o anúncio. Nas páginas internas ele é obrigatório.
export default function GdfInternalPagesBanner() {
  const pathname = usePathname();
  if (!pathname || pathname === '/') return null;
  return <GdfCampaignBanner placement="sitewide" />;
}
