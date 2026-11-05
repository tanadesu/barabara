import type { Show } from '@/data/site';
export function safeUrl(value?: string) {
  if (!value) return undefined;
  try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : undefined; } catch { return undefined; }
}
export function japanDate(now = new Date()) {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
}
export function classifyShows(shows: Show[], today = japanDate()) {
  return { upcoming: shows.filter(s => s.date >= today).sort((a,b) => a.date.localeCompare(b.date)), past: shows.filter(s => s.date < today).sort((a,b) => b.date.localeCompare(a.date)) };
}
export function displayDate(value: string) { return value.replaceAll('-', '.'); }
