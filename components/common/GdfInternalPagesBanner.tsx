'use client';

import { usePathname } from 'next/navigation';
import GdfCampaignBanner from '@/components/common/GdfCampaignBanner';

/**
 * Mantém a campanha do GDF em todas as páginas internas.
 * Na capa o banner já é renderizado por Capa21Nov2026, evitando duplicação.
 */
export default function GdfInternalPagesBanner() {
  const pathname = usePathname();
  if (!pathname || pathname === '/') return null;
  return <GdfCampaignBanner placement="sitewide" />;
}
