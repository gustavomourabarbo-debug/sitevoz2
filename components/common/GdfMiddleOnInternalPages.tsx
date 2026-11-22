'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';
import GdfCampaignBanner from '@/components/common/GdfCampaignBanner';

/** Place an extra campaign insertion halfway through every internal page. */
export default function GdfMiddleOnInternalPages() {
  const pathname = usePathname();
  const [mount, setMount] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!pathname || pathname === '/') {
      setMount(null);
      return;
    }

    const main = document.querySelector('main');
    if (!main) return;

    // Editorial pages with a reserved slot get the banner at the intended
    // point in the story, rather than wherever the automatic midpoint falls.
    const explicitSlot = main.querySelector<HTMLElement>('[data-gdf-internal-middle-slot]');
    if (explicitSlot) {
      setMount(explicitSlot);
      return () => setMount(null);
    }

    const slot = document.createElement('div');
    slot.setAttribute('data-gdf-internal-middle', 'true');
    let parent: Element = main;

    // Some article layouts have a single wrapper; descend until we find
    // distinct content blocks, to keep the banner between blocks.
    for (let depth = 0; depth < 4; depth++) {
      const blocks = Array.from(parent.children).filter((el) => 
        el instanceof HTMLElement && !el.matches('script, style'));
      if (blocks.length >= 3) break;
      if (blocks.length === 1) parent = blocks[0];
      else break;
    }

    const blocks = Array.from(parent.children).filter((el) => el instanceof HTMLElement);
    if (blocks.length >= 2) {
      parent.insertBefore(slot, blocks[Math.floor(blocks.length / 2)]);
    } else {
      parent.appendChild(slot);
    }

    setMount(slot);
    return () => {
      setMount(null);
      slot.remove();
    };
  }, [pathname]);

  return mount ? createPortal(<GdfCampaignBanner placement="middle" />, mount) : null;
}
