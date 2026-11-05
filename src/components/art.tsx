export function Star({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 180 180" fill="none" aria-hidden="true"><path d="m89 8 13 59 58-33-36 52 45 25-61 2-5 58-24-51-57 25 37-48L8 73l66 3Z" stroke="currentColor" strokeWidth="5"/><path d="m85 16 22 54 49-28-38 47 43 18-59 12-4 44-24-46-44 23 34-44-48-20 63 6Z" stroke="currentColor" strokeWidth="2"/></svg>;
}
export function CutoutName({ footer = false, name }: { footer?: boolean; name: string }) {
  return <span className={`cutout-name ${footer ? 'footer-name' : ''}`} aria-label={name}>{[...name].map((letter, index) => <span aria-hidden="true" key={index}>{letter}</span>)}</span>;
}
export function SectionLabel({ number, text }: { number: string; text: string }) {
  return <div className="section-label"><span>{number} /</span> {text}</div>;
}
