'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import TransaksiTabs from '@/app/components/admin/TransaksiTabs';

export default function Transaksi({ params }: { params: { id: string } }) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [isLoading, setIsLoading] = useState<boolean>(true);

    return (
        <>
            <div className="px-4 md:px-24 py-36 pt-8">
                <TransaksiTabs id={params.id}></TransaksiTabs>
            </div>

            <div className="px-10 md:px-24 py-8 pb-16">
                <hr className="border border-[#fffff] border-collapse" />
                <p className="pt-8 text-[#393939] text-sm">© 2024 Atma Kitchen. Powered by Riel, Ayas, Arif</p>
            </div>
        </>
    );
}
