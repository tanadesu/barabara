import type { Metadata } from 'next';
import { Navigation } from '@/components/navigation';
import { History } from '@/components/sections';
import { SiteFooter } from '@/components/site-footer';
import { Reveal } from '@/components/reveal';
import { site } from '@/data/site';
import { safeUrl } from '@/lib/content';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: `ライブ履歴 | ${site.name}`,
  description: `${site.name}の過去のライブ公演記録。`,
};

export default function HistoryPage() {
  const hasContact = site.socials.some(link => safeUrl(link.url)) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(site.email);

  return <>
    <a className="skip-link" href="#main">本文へスキップ</a>
    <div id="top"/>
    <Navigation name={site.name} contact={hasContact}/>
    <main id="main"><History/></main>
    <SiteFooter/>
    <Reveal/>
  </>;
}
