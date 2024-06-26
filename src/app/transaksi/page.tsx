'use client';
import { useRouter } from 'next/navigation';
import NavbarCustomer from '../components/customer/navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Cart from '../components/customer/CartPage';
import TransaksiTabs from '../components/customer/TransaksiTabs';

export default function Transaksi() {
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
                    setIsAuthenticated(true);
                    setIsLoading(false);
                    return;
                } else {
                    router.push('/');
                    setIsAuthenticated(false);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error('Error validating token:', error);
                router.push('/');
                setIsAuthenticated(false);
                setIsLoading(true);
            }
        };

        checkAuth();
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
                <div className="px-10 md:px-24 py-36 pb-0">
                    <div className="justify-between mb-2 rounded-lg bg-white pb-4 sm:flex sm:justify-start">
                        <h2 className="text-4xl font-bold text-gray-900">Transaksi</h2>
                    </div>
                </div>
                <div className="px-4 md:px-24 py-36 pt-8">
                    <TransaksiTabs></TransaksiTabs>
                </div>

                <div className="px-10 md:px-24 py-8 pb-16">
                    <hr className="border border-[#fffff] border-collapse" />
                    <p className="pt-8 text-[#393939] text-sm">© 2024 Atma Kitchen. Powered by Riel, Ayas, Arif</p>
                </div>
            </>
        );
    }
}
