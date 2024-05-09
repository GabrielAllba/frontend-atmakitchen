'use client';
import { useRouter } from 'next/navigation';
import NavbarCustomer from './components/customer/navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Index() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('accessToken');

            try {
                const response = await axios.get(`${apiUrl}/customer/token/validate/${token}`);
                if (response.status === 200) {
                    router.push('/customer');
                    return;
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('Error validating token:', error);
                setIsAuthenticated(false);
            }
        };

        setIsLoading(true);
        checkAuth();
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return (
            <div className="h-screen flex justify-center items-center font-poppins text-black text-center">
                <span className="loading loading-ring loading-lg"></span>
            </div>
        );
    } else {
        return (
            <>
                <NavbarCustomer isAuth={isAuthenticated}></NavbarCustomer>
            </>
        );
    }
}
