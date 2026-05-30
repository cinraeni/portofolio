import "./globals.css";
import RefreshRedirect from '@/components/RefreshRedirect'

export const metadata = {
  title: "Cindy Anggraeni - Portfolio",
  description: "Portfolio website Cindy Anggraeni - Mahasiswa D4 Teknologi Rekayasa Perangkat Lunak di Politeknik Negeri Batam. Front-End Developer, UI/UX Designer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <RefreshRedirect />
        {children}
        </body>
    </html>
  );
}