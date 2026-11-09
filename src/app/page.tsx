import Image from 'next/image';
import { site } from '@/data/site';
import { safeUrl, classifyShows } from '@/lib/content';
import { Navigation } from '@/components/navigation';
import { CutoutName, Star } from '@/components/art';
import { About, Music, Live, News, Contact } from '@/components/sections';
import { Reveal } from '@/components/reveal';

// 日付が変わった直後も、日本時間でライブを分類する。
export const dynamic = 'force-dynamic';
export default function Home() {
  const hasContact = site.socials.some(link => safeUrl(link.url)) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(site.email);
  const latestNews = [...site.news].sort((a,b) => b.date.localeCompare(a.date))[0];
  const nextShow = classifyShows(site.shows).upcoming[0];
  return <><a className="skip-link" href="#main">本文へスキップ</a><div id="top"/><Navigation name={site.name} contact={hasContact}/><main id="main"><section className="hero" aria-labelledby="hero-title">{site.livePhotos[0] && <div className="hero-photo" aria-hidden="true"><Image src={site.livePhotos[0].src} alt="" fill sizes="100vw" preload/></div>}<div className="wall-type" aria-hidden="true">NO<br/>RULES.</div><div className="hero-topline"><span>INDEPENDENT SPIRIT. UNFILTERED SOUND.</span><span>音量注意 / PLAY LOUD</span></div><div className="hero-art"><div className="red-slash" aria-hidden="true"/><span className="hero-label paper">{site.genre}</span><Star className="hero-star"/><h1 id="hero-title"><CutoutName name={site.name}/></h1><div className="hero-bottomline"><span className="hero-japanese">バラバラで、<br/><strong>ひとつの音。</strong></span><span className="genre-stamp">RAW.<br/>LOUD.<br/>REAL.</span><div className="mini-poster paper" aria-hidden="true"><span className="tape"/><span>NO RULES.<br/>JUST NOISE.</span><div className="poster-barcode"/><small>THIS IS PUNK ROCK.</small></div></div></div><div className="hero-footer"><a href="#about" className="scroll-link"><span>↓</span> SCROLL DOWN</a><span className="hero-index">歪んだ音を、この場所から。<span>VOL. 01 — OFFICIAL WEBSITE</span></span></div></section><div className="manifesto" aria-hidden="true"><span>NO RULES.</span><span>✳</span><span>JUST NOISE.</span><span>✳</span><span>PUNK ROCK.</span><span>✳</span><span>バラバラロン</span><span>✳</span></div>{(latestNews || nextShow) && <aside className="latest-strip" aria-label="最新情報">{latestNews && <a href="#news">LATEST NEWS / {latestNews.title} ↗</a>}{nextShow && <a href="#live">NEXT LIVE / {nextShow.date} {nextShow.title} ↗</a>}</aside>}<About/><Music/><Live/><News/><Contact/></main><footer className="site-footer"><div className="footer-top"><span>PUNK ROCK. NOTHING ELSE.</span><a href="#top">BACK TO TOP <span>↑</span></a></div><CutoutName name={site.name} footer/><div className="footer-bottom"><span>© {new Date().getFullYear()} {site.name}</span><span>ALL NOISE RESERVED.</span></div></footer><Reveal/></>;
}
