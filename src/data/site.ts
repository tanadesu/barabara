export type Photo = { src: string; alt: string; width: number; height: number };
export type Link = { label: string; url: string };
export type Release = { id: string; title: string; date: string; kind: string; artwork?: Photo; links: Link[] };
export type Show = { id: string; date: string; title: string; venue: string; performers: string[]; doors?: string; ticketUrl?: string };
export type News = { id: string; date: string; title: string; body: string; url?: string };
type Site = {
  name: string; genre: string; description: string; url: string;
  colors: { black: string; paper: string; red: string };
  profile: { text: string; location: string; formed: string; members: { name: string; role: string; photo?: Photo }[]; photos: Photo[] };
  livePhotos: Photo[];
  artistPhotos: Photo[];
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
      { src: '/images/artist/group.webp', alt: '緑の橋の下に集まるバラバラロンのメンバー4人の集合写真', width: 1920, height: 1280 },
    ],
  },
  artistPhotos: [
    { src: '/images/artist/portrait-01.webp', alt: '高架下に立つ、グレーのジャケットを着たメンバーのポートレート', width: 1920, height: 1280 },
    { src: '/images/artist/portrait-02.webp', alt: '高架下に立つ、黒と金のジャケットを着たメンバーのポートレート', width: 1920, height: 1280 },
    { src: '/images/artist/portrait-03.webp', alt: '高架下に立つ、黒いジャケットを着たメンバーのポートレート', width: 1920, height: 1280 },
    { src: '/images/artist/portrait-04.webp', alt: '高架下に立つ、グレーのシャツを着たメンバーのポートレート', width: 1920, height: 1280 },
    { src: '/images/artist/playground.webp', alt: '青と黄色の遊具に集まるバラバラロンの4人', width: 1920, height: 1280 },
    { src: '/images/artist/street.webp', alt: '高架下で縦一列に並び、カメラをのぞき込む4人', width: 1280, height: 1920 },
    { src: '/images/artist/offstage.webp', alt: '公園の青い遊具に乗ってカメラに顔を近づけるメンバー', width: 1280, height: 1920 },
  ],
  livePhotos: [
    { src: '/images/live/live-1141.webp', alt: '赤い照明のステージで歌うボーカルと演奏するバンド', width: 1920, height: 1280 },
    { src: '/images/live/live-0612.webp', alt: 'マイクの前でベースを弾くメンバー', width: 1920, height: 1280 },
    { src: '/images/live/live-0723.webp', alt: '青い照明の中、片足を上げて歌うボーカル', width: 1280, height: 1920 },
    { src: '/images/live/live-1138.webp', alt: '紫の照明の中で白いギターを弾くメンバー', width: 1920, height: 1280 },
    { src: '/images/live/live-1771.webp', alt: '暖かな照明の中でポーズをとる3人', width: 1280, height: 1920 },
    { src: '/images/live/live-1680.webp', alt: '青白い逆光を背にマイクを握るボーカル', width: 1920, height: 1280 },
    { src: '/images/live/live-0812.webp', alt: 'オレンジ色の照明の下で体を傾けて歌うボーカル', width: 1920, height: 1280 },
    { src: '/images/live/live-1731.webp', alt: '紫色の光を反射するライブハウスのミラーボール', width: 1920, height: 1280 },
  ],
  music: [], shows: [], news: [], socials: [], email: '',
};
