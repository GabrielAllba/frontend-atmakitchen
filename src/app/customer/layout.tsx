'use client';
import { ReactNode, useState } from 'react';
import NavbarCustomer from '../components/customer/navbar';
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

            try {
                const response = await axios.get(`${apiUrl}/customer/token/validate/${token}`);
                if (response.status === 200) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    router.push('/login');
                }
            } catch (error) {
                console.error('Error validating token:', error);
                setIsAuthenticated(false);
                router.push('/login');
            }
        };

        checkAuth();
    }, []);

    if (isAuthenticated) {
        return (
            <>
                <NavbarCustomer isAuth={isAuthenticated}></NavbarCustomer>
                <main className="py-16">{children}</main>
            </>
        );
    }
}
