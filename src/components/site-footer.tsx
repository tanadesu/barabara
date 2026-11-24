import { CutoutName } from '@/components/art';
import { site } from '@/data/site';
import Link from 'next/link';

export function SiteFooter() {
  return <footer className="site-footer"><div className="footer-top"><span>ROCK&apos;N&apos;ROLL. NOTHING ELSE.</span><Link href="/#top">BACK TO TOP <span>↑</span></Link></div><CutoutName name={site.name} footer/><div className="footer-bottom"><span>© {new Date().getFullYear()} {site.name}</span><span>ALL NOISE RESERVED.</span></div></footer>;
}
