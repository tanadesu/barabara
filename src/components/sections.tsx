import Image from 'next/image';
import { PhotoGallery } from './photo-gallery';
import type { ReactNode } from 'react';
import { site, type Show } from '@/data/site';
import { classifyShows, displayDate, safeUrl } from '@/lib/content';
import { SectionLabel, Star } from './art';

export function ExternalLink({ url, children }: { url?: string; children: ReactNode }) {
  const href = safeUrl(url);
  return href ? <a href={href} target="_blank" rel="noopener noreferrer">{children}<span aria-hidden="true"> ↗</span><span className="sr-only">（新しいタブで開く）</span></a> : null;
}
export function About() {
  return <section id="about" className="about section paper" data-reveal><div><SectionLabel number="01" text="ABOUT THE BAND"/><h2>WHO THE HELL<br/>ARE <span className="red-text">WE?</span></h2><div className="hand-underline"/></div><div className="profile"><span className="tiny-label">名前だけでも、覚えて帰れ。</span><h3>{site.name}</h3>{site.profile.text ? <p className="body-copy">{site.profile.text}</p> : <><p className="stamp">PROFILE COMING SOON</p><p className="small-copy">プロフィールは、もう少し待ってくれ。</p></>}{site.profile.location && <p>拠点 / {site.profile.location}</p>}{site.profile.formed && <p>結成 / {site.profile.formed}</p>}{site.profile.members.map(member => <article className="member" key={member.name}>{member.photo && <Image {...member.photo} alt={member.photo.alt} sizes="(max-width: 700px) 80vw, 300px"/>}<h4>{member.name}</h4><p>{member.role}</p></article>)}</div>{site.profile.photos.length > 0 && <div className="band-gallery">{site.profile.photos.map(photo => <figure className="band-photo-print" key={photo.src}><span className="tape" aria-hidden="true"/><Image className="band-photo" {...photo} alt={photo.alt} sizes="(max-width: 700px) 86vw, (max-width: 1200px) 88vw, 1040px"/><figcaption><span>{site.name}</span><span>THIS IS US. / PUNK ROCK BAND</span></figcaption></figure>)}</div>}<PhotoGallery photos={site.artistPhotos} variant="artist"/><Star className="about-star"/></section>;
}
export function Music() {
  return <section id="music" className="section music" data-reveal><div className="section-heading"><div><SectionLabel number="02" text="MUSIC"/><h2>MAKE SOME<br/><span className="outline-text">NOISE.</span></h2></div><span className="side-note">音を鳴らせ。<br/>それがすべて。</span></div>{site.music.length ? <div className="release-grid">{[...site.music].sort((a,b) => b.date.localeCompare(a.date)).map(release => <article className="release paper" key={release.id}>{release.artwork ? <Image {...release.artwork} alt={release.artwork.alt} sizes="(max-width: 700px) 90vw, 400px"/> : <div className="record-art" aria-hidden="true"><div className="record"/></div>}<p className="tiny-label">{release.kind} / {displayDate(release.date)}</p><h3>{release.title}</h3><div className="external-links">{release.links.map(link => <ExternalLink key={link.label} url={link.url}>{link.label}</ExternalLink>)}</div></article>)}</div> : <div className="music-empty"><div className="record-sleeve paper"><span className="tape"/><div className="record"><span>{site.name}<small>SIDE A / ???</small></span></div><span className="sleeve-note">PLAY IT LOUD.</span></div><div className="empty-copy"><span className="tiny-label">THE NEXT NOISE IS ON ITS WAY</span><h3>MUSIC<br/>COMING SOON<span className="red-text">.</span></h3><p>音源情報は、ここで。</p><span className="scribble-arrow" aria-hidden="true">↙</span></div></div>}</section>;
}
function ShowPoster({ show }: { show: Show }) {
  const weekday = new Intl.DateTimeFormat('ja-JP', { weekday: 'short', timeZone: 'Asia/Tokyo' }).format(new Date(`${show.date}T12:00:00+09:00`));
  return <article className={`show-poster paper ${show.flyer ? 'has-flyer' : ''}`}>
    {show.flyer && <a className="show-flyer" href={show.flyer.src} target="_blank" rel="noopener noreferrer" aria-label={`${show.title}のフライヤーを拡大（新しいタブで開く）`}>
      <Image {...show.flyer} alt={show.flyer.alt} sizes="(max-width: 700px) 82vw, 420px"/>
      <span>VIEW FLYER ↗</span>
    </a>}
    <div className="show-info">
      <span className="tiny-label">LIVE INFORMATION</span>
      <time dateTime={show.date}>{displayDate(show.date)}<small>（{weekday}）</small></time>
      <h3>{show.title}</h3>
      <dl className="show-details">
        <div><dt>VENUE</dt><dd>{show.venue}</dd></div>
        {(show.doors || show.start) && <div><dt>TIME</dt><dd>{show.doors && <span>OPEN {show.doors}</span>}{show.start && <span>START {show.start}</span>}</dd></div>}
        {show.performers.length > 0 && <div><dt>ACT</dt><dd>{show.performers.map(name => <span key={name}>{name}</span>)}</dd></div>}
        {!!show.prices?.length && <div><dt>TICKET</dt><dd>{show.prices.map(price => <span key={price.label}>{price.label} {price.amount}</span>)}</dd></div>}
      </dl>
      <ExternalLink url={show.ticketUrl}>TICKETS</ExternalLink>
    </div>
  </article>;
}
export function Live() {
  const { upcoming, past } = classifyShows(site.shows);
  return <section id="live" className="section live paper" data-reveal><div className="section-heading"><div><SectionLabel number="03" text="LIVE SCHEDULE"/><h2>SEE YOU<br/>IN THE <span className="red-text">PIT.</span></h2></div><span className="live-mark" aria-hidden="true">LIVE<br/>LOUD</span></div>{upcoming.length ? <div className="shows-grid">{upcoming.map(show => <ShowPoster key={show.id} show={show}/>)}</div> : <div className="live-empty"><span className="asterisk" aria-hidden="true">✳</span><div><h3>NO SHOWS ANNOUNCED YET</h3><p>次のライブは、ここで知らせる。</p></div><span className="ticket-end" aria-hidden="true">STAY<br/>TUNED ↗</span></div>}{past.length > 0 && <details className="past-shows"><summary>PAST SHOWS / 終了したライブ（{past.length}）</summary><div className="shows-grid">{past.map(show => <ShowPoster key={show.id} show={show}/>)}</div></details>}<PhotoGallery photos={site.livePhotos}/></section>;
}
export function News() {
  return <section id="news" className="section news" data-reveal><div><SectionLabel number="04" text="NEWS & UPDATES"/><h2>LATEST<br/><span className="red-text">NOISE.</span></h2></div><div className="news-list">{site.news.length ? [...site.news].sort((a,b) => b.date.localeCompare(a.date)).map(news => <article key={news.id}><time dateTime={news.date}>{displayDate(news.date)}</time><h3>{news.title}</h3><p className="body-copy">{news.body}</p><ExternalLink url={news.url}>READ MORE</ExternalLink></article>) : <div className="news-empty"><span className="tiny-label">NOTHING HERE. YET.</span><p>まだ静かだ。<br/>次のノイズを待て。</p><span className="news-plus" aria-hidden="true">+</span></div>}</div></section>;
}
export function Contact() {
  const socials = site.socials.filter(link => safeUrl(link.url));
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(site.email) ? site.email : '';
  if (!socials.length && !email) return null;
  return <section id="contact" className="section contact paper" data-reveal><SectionLabel number="05" text="CONTACT / SOCIAL"/><h2>GET IN TOUCH.</h2><div className="external-links">{socials.map(link => <ExternalLink key={link.label} url={link.url}>{link.label}</ExternalLink>)}{email && <a href={`mailto:${email}`}>BOOKING / {email} ↗</a>}</div></section>;
}
