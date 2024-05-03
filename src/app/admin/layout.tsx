'use client';

import { ReactNode, useState } from 'react';
import Navbar from '../components/admin/navbar';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const isAuthenticated = checkAuth();
        if (!isAuthenticated) {
            setIsAuthenticated(false);
            router.push('/login/admin');
            return;
        }
        setIsAuthenticated(true);
    }, []);

    if (isAuthenticated) {
        return (
            <main>
                <Navbar></Navbar>
                <div className="py-16">{children}</div>
            </main>
        );
    } else {
        return (
            <main>
                <div className="h-screen flex justify-center items-center font-poppins text-black text-center">
                    <span className="loading loading-ring loading-lg"></span>
                </div>
            </main>
        );
    }
}

const checkAuth = () => {
    const token = localStorage.getItem('accessToken');
    return !!token;
};
