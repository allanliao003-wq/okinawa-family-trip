import './globals.css';
import Nav from '@/components/Nav';

export const metadata = {
  title: '沖繩家族旅行',
  description: '2027 年 2 月沖繩家族自由行：行程、景點、交通、住宿與費用',
};
export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#1b2f4b' };

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&family=Noto+Serif+TC:wght@600;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <header className="top">
          <div className="wrap">
            <div className="brand"><span className="mark" aria-hidden="true" />沖繩家族旅行<small>2027.02.08–13</small></div>
            <Nav />
          </div>
        </header>
        <main className="wrap">{children}</main>
        <footer className="wrap foot">內容約 30 秒內同步更新，重新整理即可看到最新版本</footer>
      </body>
    </html>
  );
}
