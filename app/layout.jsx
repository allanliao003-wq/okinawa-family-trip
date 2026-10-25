import './globals.css';
import Nav from '@/components/Nav';

export const metadata = {
  title: '沖繩家族旅行',
  description: '2027 年 2 月沖繩家族自由行：行程、景點、交通、住宿與費用',
};
export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#0e7c86' };

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <body>
        <header className="top">
          <div className="wrap">
            <div className="brand">🏝 沖繩家族旅行</div>
            <Nav />
          </div>
        </header>
        <main className="wrap">{children}</main>
        <footer className="wrap foot">資料即時更新，重新整理即可看到最新內容</footer>
      </body>
    </html>
  );
}
