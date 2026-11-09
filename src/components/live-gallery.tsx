'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import type { Photo } from '@/data/site';

export function LiveGallery({ photos }: { photos: Photo[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState(0);
  if (!photos.length) return null;
  const photo = photos[selected];
  function move(step: number) {
    setSelected(current => (current + step + photos.length) % photos.length);
  }
  return <div className="live-gallery">
    <div className="photo-heading"><div><span className="tiny-label">LIVE PHOTOGRAPHS</span><h3>LOUDER THAN WORDS.</h3></div><span className="tiny-label">写真をタップして拡大 ↗</span></div>
    <div className="photo-wall">{photos.map((item, index) => <button className="photo-print" key={item.src} type="button" aria-label={`写真${index + 1}を拡大：${item.alt}`} onClick={() => { setSelected(index); dialog.current?.showModal(); }}>
      <Image {...item} alt={item.alt} sizes="(max-width: 560px) 43vw, (max-width: 900px) 42vw, 28vw"/>
      <span className="photo-caption"><span>FRAME / {String(index + 1).padStart(2, '0')}</span><span aria-hidden="true">↗</span></span>
    </button>)}</div>
    <dialog ref={dialog} className="photo-dialog" aria-label="ライブ写真の拡大表示" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }} onKeyDown={event => { if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); } if (event.key === 'ArrowRight') { event.preventDefault(); move(1); } }}>
      <div className="photo-viewer"><div className="viewer-toolbar"><span aria-live="polite">LIVE / {selected + 1} — {photos.length}</span><button type="button" autoFocus onClick={() => dialog.current?.close()} aria-label="拡大表示を閉じる">CLOSE ×</button></div>
        <Image {...photo} alt={photo.alt} sizes="(max-width: 700px) 94vw, 90vw"/>
        <div className="viewer-controls"><button type="button" onClick={() => move(-1)} aria-label="前の写真">← PREV</button><p>{photo.alt}</p><button type="button" onClick={() => move(1)} aria-label="次の写真">NEXT →</button></div>
      </div>
    </dialog>
  </div>;
}
