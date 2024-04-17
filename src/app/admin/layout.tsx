'use client';

import Image from 'next/image';
import { ReactNode } from 'react';
import Navbar from '../components/admin/navbar';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <main>
            <Navbar></Navbar>
            <div>{children}</div>
        </main>
    );
}
