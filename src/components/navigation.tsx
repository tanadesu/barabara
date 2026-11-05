'use client';
import { useState } from 'react';
const links = [['about','ABOUT'],['music','MUSIC'],['live','LIVE'],['news','NEWS']];
export function Navigation({ name, contact }: { name: string; contact: boolean }) {
  const [open, setOpen] = useState(false);
  const allLinks = contact ? [...links, ['contact', 'CONTACT']] : links;
  return <header className="site-header"><a href="#top" className="brand" onClick={() => setOpen(false)}>{name}<span>OFFICIAL WEBSITE</span></a><button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>{open ? 'CLOSE −' : 'MENU +'}</button><nav id="main-nav" aria-label="メインナビゲーション" className={open ? 'is-open' : ''}>{allLinks.map(([id,label]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}<span>↗</span></a>)}</nav><span className="header-note">TURN IT UP. <span className="red-dot"/></span></header>;
}
