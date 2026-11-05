import type { Metadata, Viewport } from 'next';
import type { CSSProperties } from 'react';
import { site } from '@/data/site';
import { safeUrl } from '@/lib/content';
import './globals.css';
import '@fontsource/anton/latin-400.css';
import '@fontsource/noto-sans-jp/900.css';
const deploymentHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const baseUrl = safeUrl(site.url) || (deploymentHost ? `https://${deploymentHost}` : 'http://localhost:3000');
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: `${site.name} | OFFICIAL WEBSITE`, description: site.description,
  ...(safeUrl(site.url) ? { alternates: { canonical: site.url } } : {}),
  openGraph: { title: `${site.name} | OFFICIAL WEBSITE`, description: site.description, locale: 'ja_JP', type: 'website', siteName: site.name, images: [{ url: '/og.png', width: 1200, height: 630, alt: `${site.name} / ${site.genre}` }] },
  twitter: { card: 'summary_large_image', title: site.name, description: site.description, images: ['/og.png'] },
};
export const viewport: Viewport = { themeColor: site.colors.black };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja" style={{ '--ink': site.colors.black, '--paper': site.colors.paper, '--red': site.colors.red } as CSSProperties}><body>{children}</body></html>;
}
