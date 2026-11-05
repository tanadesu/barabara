export type Photo = { src: string; alt: string; width: number; height: number };
export type Link = { label: string; url: string };
export type Release = { id: string; title: string; date: string; kind: string; artwork?: Photo; links: Link[] };
export type Show = { id: string; date: string; title: string; venue: string; performers: string[]; doors?: string; ticketUrl?: string };
export type News = { id: string; date: string; title: string; body: string; url?: string };
type Site = {
  name: string; genre: string; description: string; url: string;
  colors: { black: string; paper: string; red: string };
  profile: { text: string; location: string; formed: string; members: { name: string; role: string; photo?: Photo }[]; photos: Photo[] };
  music: Release[]; shows: Show[]; news: News[]; socials: Link[]; email: string;
};

// 未登録の項目は空文字・空配列のままで構いません。
export const site: Site = {
  name: 'バラバラロン', genre: 'PUNK ROCK BAND',
  description: 'パンクロックバンド「バラバラロン」公式サイト。音源、ライブ、お知らせはこちら。',
  url: 'https://barabara-five.vercel.app',
  colors: { black: '#101010', paper: '#EEE9DC', red: '#E32626' },
  profile: {
    text: '', location: '', formed: '', members: [],
    photos: [
      { src: '/images/barabarron-band.jpg', alt: '緑の橋の下に集まるバラバラロンのメンバー4人の集合写真', width: 1567, height: 1044 },
    ],
  },
  music: [], shows: [], news: [], socials: [], email: '',
};
