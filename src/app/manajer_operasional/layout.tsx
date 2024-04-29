'use client';

import Image from 'next/image';
import { ReactNode } from 'react';
import Navbar from '../components/manajer_operasional/navbar';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <main>
            <Navbar></Navbar>
            <div className="py-16">{children}</div>
        </main>
    );
}
