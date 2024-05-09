'use client';
import { useRouter } from 'next/navigation';
import NavbarCustomer from './components/customer/navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Index() {
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
                }
            } catch (error) {
                console.error('Error validating token:', error);
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    return (
        <div>
            <NavbarCustomer isAuth={isAuthenticated}></NavbarCustomer>
        </div>
    );
}
