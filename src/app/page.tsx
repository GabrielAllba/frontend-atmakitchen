'use client';
import { useRouter } from 'next/navigation';
import NavbarCustomer from './components/customer/navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import ProdukHome from './components/customer/ProdukHome';
import TitipanHome from './components/customer/TitipanHome';
import HampersHome from './components/customer/HampersHome';

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
                    // router.push('/customer');
                    setIsAuthenticated(true);
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
                <div className="px-10 md:px-24 py-36 md:py-24">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        loop={true}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <div className="relative">
                                <Image alt="images" src="/images/slider/1.jpg" width={1000} height={1000}></Image>
                                <div className="banner h-full w-full bg-black absolute top-0 right-0 opacity-40 "></div>
                                <div className="absolute top-0 flex justify-center h-full w-full items-end">
                                    <div className="p-20">
                                        <p className="text-white text-xl md:text-4xl font-poppins">
                                            Buy cake, give love!
                                        </p>
                                        <p className="text-[#d8d8d8] pt-4 font-poppins text-sm">
                                            In everything we do we believe in creating emotional and memorable
                                            experiences. Share happiness with your loved ones.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="relative">
                                <Image alt="images" src="/images/slider/2.jpg" width={1000} height={1000}></Image>
                                <div className="banner h-full w-full bg-black absolute top-0 right-0 opacity-40"></div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="relative">
                                <Image alt="images" src="/images/slider/3.jpg" width={1000} height={1000}></Image>
                                <div className="banner h-full w-full bg-black absolute top-0 right-0 opacity-40"></div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div className="px-10 md:px-24 py-0 md:py-0">
                    <ProdukHome isAuth={isAuthenticated}></ProdukHome>
                </div>
                <div className="px-10 md:px-24 py-0 md:py-0">
                    <HampersHome isAuth={isAuthenticated}></HampersHome>
                </div>
                <div className="px-10 md:px-24 py-0 md:py-0">
                    <TitipanHome isAuthTitipan={isAuthenticated}></TitipanHome>
                </div>
                <div className="px-10 md:px-24 py-8 pb-16">
                    <hr className="border border-[#fffff] border-collapse" />
                    <p className="pt-8 text-[#393939] text-sm">© 2024 Atma Kitchen. Powered by Riel, Ayas, Arif</p>
                </div>
            </>
        );
    }
}
