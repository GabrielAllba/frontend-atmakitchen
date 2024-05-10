// 'use client';
// import { useRouter } from 'next/navigation';
// import NavbarCustomer from './components/customer/navbar';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// // import { Swiper, SwiperSlide } from 'swiper/react';
// // import { Pagination, Navigation } from 'swiper/modules';
// import Image from 'next/image';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

// export default function Index() {
//     const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//     const router = useRouter();
//     const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//     const [isLoading, setIsLoading] = useState<boolean>(true);

//     useEffect(() => {
//         const checkAuth = async () => {
//             const token = localStorage.getItem('accessToken');

//             try {
//                 const response = await axios.get(`${apiUrl}/customer/token/validate/${token}`);
//                 if (response.status === 200) {
//                     router.push('/customer');
//                     return;
//                 } else {
//                     setIsAuthenticated(false);
//                 }
//             } catch (error) {
//                 console.error('Error validating token:', error);
//                 setIsAuthenticated(false);
//             }
//         };

//         setIsLoading(true);
//         checkAuth();
//         setIsLoading(false);
//     }, []);

//     if (isLoading) {
//         return (
//             <div className="h-screen flex justify-center items-center font-poppins text-black text-center">
//                 <span className="loading loading-ring loading-lg"></span>
//             </div>
//         );
//     } else {
//         return (
//             <>
//                 <NavbarCustomer isAuth={isAuthenticated}></NavbarCustomer>
//                 <div className="p-24">
//                     <Swiper
//                         slidesPerView={1}
//                         spaceBetween={30}
//                         loop={true}
//                         pagination={{
//                             clickable: true,
//                         }}
//                         navigation={true}
//                         modules={[Pagination, Navigation]}
//                         className="mySwiper"
//                     >
//                         <SwiperSlide>
//                             <div className="relative">
//                                 <Image alt="images" src="/images/slider/1.jpg" width={1000} height={1000}></Image>
//                                 <div className="banner h-full w-full bg-black absolute top-0 right-0 opacity-40"></div>
//                             </div>
//                         </SwiperSlide>
//                         <SwiperSlide>
//                             <div className="relative">
//                                 <Image alt="images" src="/images/slider/2.jpg" width={1000} height={1000}></Image>
//                                 <div className="banner h-full w-full bg-black absolute top-0 right-0 opacity-40"></div>
//                             </div>
//                         </SwiperSlide>
//                         <SwiperSlide>
//                             <div className="relative">
//                                 <Image alt="images" src="/images/slider/3.jpg" width={1000} height={1000}></Image>
//                                 <div className="banner h-full w-full bg-black absolute top-0 right-0 opacity-40"></div>
//                             </div>
//                         </SwiperSlide>
//                     </Swiper>
//                 </div>
//             </>
//         );
//     }
// }
