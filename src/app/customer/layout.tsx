'use client';

import { ReactNode, useState } from 'react';
import Navbar from '../components/customer/navbar';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import axios from 'axios';

export default function Layout({ children }: { children: ReactNode }) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                setIsAuthenticated(false);
                router.push('/login/customer');
                return;
            }

            try {
                const response = await axios.get(`${apiUrl}/customer/token/validate/${token}`);
                if (response.status === 200) {
                    setIsAuthenticated(true);
                    router.push('/customer/home');
                } else {
                    setIsAuthenticated(false);
                    router.push('/login/customer');
                }
            } catch (error) {
                console.error('Error validating token:', error);
                setIsAuthenticated(false);
                router.push('/login/customer');
            }
        };

        checkAuth();
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
