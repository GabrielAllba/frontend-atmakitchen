'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { PiTrashLight } from 'react-icons/pi';

interface Item {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    quantity: number;
    status: string;
    jenis: string;
    opsi_pengambilan: string;
    tanggal_pengiriman?: string;
    tanggal_pengambilan?: string;
}

const option = [
    { opsi: 'Menunggu Perhitungan Jarak' },
    { opsi: 'Menunggu Pembayaran' },
    { opsi: 'Sudah Bayar' },
    { opsi: 'Pembayaran Terverifikasi' },
    { opsi: 'Diterima' },
    { opsi: 'Diproses' },
    { opsi: 'Siap di-pickup' },
    { opsi: 'Sedang dikirim' },
    { opsi: 'Sudah di-pickup' },
    { opsi: 'Selesai' },
];
const items: Item[] = [
    {
        id: 1,
        name: 'Kue Stego',
        description: 'Kue Stego merupakan kue yang diproduksi di Bekasi menggunakan tepung maizena',
        price: 259000,
        quantity: 1,
        tanggal_pengiriman: '2022-10-10',
        opsi_pengambilan: 'Pickup Mandiri',
        jenis: 'pre-order',
        imageUrl: '/images/produk/kue.jpg',
        status: 'Menunggu Perhitungan Jarak',
    },
    {
        id: 2,
        name: 'Kue Stego',
        description: 'Kue Stego merupakan kue yang diproduksi di Bekasi menggunakan tepung maizena',
        price: 259000,
        quantity: 1,
        tanggal_pengiriman: '2022-10-10',
        opsi_pengambilan: 'Dikirim Kurir',
        jenis: 'pre-order',
        imageUrl: '/images/produk/kue2.jpg',
        status: 'Menunggu Pembayaran',
    },
    {
        id: 3,
        name: 'Kue Stego',
        description: 'Kue Stego merupakan kue yang diproduksi di Bekasi menggunakan tepung maizena',
        price: 259000,
        quantity: 1,
        tanggal_pengiriman: '2022-10-10',
        opsi_pengambilan: 'Pickup Mandiri',
        jenis: 'ready stock',
        imageUrl: '/images/produk/kue2.jpg',
        status: 'Sudah Bayar',
    },
    {
        id: 4,
        name: 'Kue Stego',
        description: 'Kue Stego merupakan kue yang diproduksi di Bekasi menggunakan tepung maizena',
        price: 259000,
        quantity: 1,
        tanggal_pengiriman: '2022-10-10',
        opsi_pengambilan: 'Pickup Mandiri',
        jenis: 'pre-order',
        imageUrl: '/images/produk/kue2.jpg',
        status: 'Pembayaran Terverifikasi',
    },
    {
        id: 5,
        name: 'Kue Stego',
        description: 'Kue Stego merupakan kue yang diproduksi di Bekasi menggunakan tepung maizena',
        price: 259000,
        quantity: 1,
        tanggal_pengiriman: '2022-10-10',
        opsi_pengambilan: 'Pickup Mandiri',
        jenis: 'ready stock',
        imageUrl: '/images/produk/kue2.jpg',
        status: 'Diterima',
    },
    {
        id: 6,
        name: 'Kue Stego',
        description: 'Kue Stego merupakan kue yang diproduksi di Bekasi menggunakan tepung maizena',
        price: 259000,
        quantity: 1,
        tanggal_pengiriman: '2022-10-10',
        opsi_pengambilan: 'Pickup Mandiri',
        jenis: 'pre-order',
        imageUrl: '/images/produk/kue2.jpg',
        status: 'Diproses',
    },
    {
        id: 7,
        name: 'Kue Stego',
        description: 'Kue Stego merupakan kue yang diproduksi di Bekasi menggunakan tepung maizena',
        price: 259000,
        quantity: 1,
        tanggal_pengiriman: '2022-10-10',
        opsi_pengambilan: 'Pickup Mandiri',
        jenis: 'pre-order',
        imageUrl: '/images/produk/kue2.jpg',
        status: 'Siap di-pickup',
    },
    {
        id: 8,
        name: 'Kue Stego',
        description: 'Kue Stego merupakan kue yang diproduksi di Bekasi menggunakan tepung maizena',
        price: 259000,
        quantity: 1,
        tanggal_pengiriman: '2022-10-10',
        opsi_pengambilan: 'Pickup Mandiri',
        jenis: 'ready stock',
        imageUrl: '/images/produk/kue2.jpg',
        status: 'Sedang dikirim',
    },
    {
        id: 9,
        name: 'Kue Stego',
        description: 'Kue Stego merupakan kue yang diproduksi di Bekasi menggunakan tepung maizena',
        price: 259000,
        quantity: 1,
        tanggal_pengiriman: '2022-10-10',
        opsi_pengambilan: 'Pickup Mandiri',
        jenis: 'pre-order',
        imageUrl: '/images/produk/kue2.jpg',
        status: 'Sudah di-pickup',
    },
    {
        id: 10,
        name: 'Kue Stego',
        description: 'Kue Stego merupakan kue yang diproduksi di Bekasi menggunakan tepung maizena',
        price: 259000,
        quantity: 1,
        tanggal_pengiriman: '2022-10-10',
        opsi_pengambilan: 'Pickup Mandiri',
        jenis: 'pre-order',
        imageUrl: '/images/produk/kue2.jpg',
        status: 'Selesai',
    },
];

export default function TransaksiContent({ status }: { status: string }) {
    const [fetchItems, setFetchItems] = useState<Item[]>([]);
    useEffect(() => {
        if (status == 'Semua') {
            setFetchItems(items);
        } else {
            const filteredItems = items.filter((item) => item.status === status);
            setFetchItems(filteredItems);
        }
    }, []);
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };
    return (
        <div className="text-black font-poppins">
            {fetchItems.map((item) => (
                <div key={item.id} className="item-container">
                    <div className="border shadow-sm flex items-center w-full justify-between p-6 rounded-md flex-wrap">
                        <div className="justify-between mb-2 rounded-lg sm:flex sm:justify-start ">
                            <Image className="rounded" src={item.imageUrl} height={40} width={100} alt={item.name} />
                            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                <div className="mt-5 sm:mt-0">
                                    <h2 className="text-lg text-gray-900">{item.name}</h2>
                                    <p className="mt-1 text-xs text-gray-700">{item.description}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <p className="text-xs text-black">Jenis : </p>

                                        {item.jenis == 'pre-order' && (
                                            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                                {item.jenis}
                                            </span>
                                        )}
                                        {item.jenis == 'ready stock' && (
                                            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                {item.jenis}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-black mt-2">
                                        Tanggal Pengiriman :{' '}
                                        <span>
                                            <b>{formatDate(item.tanggal_pengiriman!)}</b>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block text-black flex-wrap gap-4">
                            <div className="flex justify-center flex-col">
                                <p className="text-sm">
                                    Kuantitas :{' '}
                                    <span>
                                        <b>{item.quantity}</b>
                                    </span>{' '}
                                </p>
                                <p className="text-sm  font-bold">Rp. {item.price.toLocaleString('id-ID')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
