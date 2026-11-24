'use client';
import { useState } from 'react';
import Link from 'next/link';
const links = [['about','バンド紹介'],['music','楽曲'],['live','ライブ'],['history','ライブ履歴'],['news','お知らせ']];
export function Navigation({ name, contact }: { name: string; contact: boolean }) {
  const [open, setOpen] = useState(false);
  const allLinks = contact ? [...links, ['contact', 'CONTACT']] : links;
  return <header className="site-header"><Link href="/#top" className="brand" onClick={() => setOpen(false)}>{name}<span>OFFICIAL WEBSITE</span></Link><button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>{open ? '閉じる −' : 'メニュー +' }</button><nav id="main-nav" aria-label="メインナビゲーション" className={open ? 'is-open' : ''}>{allLinks.map(([id,label]) => <Link key={id} href={id === 'history' ? '/history' : `/#${id}`} onClick={() => setOpen(false)}>{label}<span>↗</span></Link>)}</nav><span className="header-note">TURN IT UP. <span className="red-dot"/></span></header>;
}
