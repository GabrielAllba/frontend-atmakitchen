import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Atma Kitchen',
    description: 'Atma Kitchen',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="bg-white" data-theme="mainTheme">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
