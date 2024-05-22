'use client';

import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { Fragment, useEffect, useRef, useState } from 'react';
import { PiTrashLight } from 'react-icons/pi';
import Invoice from './Invoice';

interface Item {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    total_price: number;
    imageUrl: string;
    status: string;
    jenis: string;
    opsi_pengambilan: string;
    tanggal_pengiriman?: string;
    tanggal_pengambilan?: string;
    no_transaksi: string;
}

const option = [
    { opsi: 'Menunggu Jarak' },
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
        no_transaksi: '21.01.01',
        total_price: 259000,
        tanggal_pengiriman: '2022-10-10',
        opsi_pengambilan: 'Pickup Mandiri',
        jenis: 'pre-order',
        imageUrl: '/images/produk/kue.jpg',
        status: 'Menunggu Jarak',
    },
    {
        id: 2,
        name: 'Kue Stego',
        description: 'Kue Stego merupakan kue yang diproduksi di Bekasi menggunakan tepung maizena',
        price: 259000,
        quantity: 1,
        no_transaksi: '21.01.01',
        total_price: 259000,
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
        no_transaksi: '21.01.01',
        total_price: 259000,
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
        no_transaksi: '21.01.01',
        total_price: 259000,
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
        no_transaksi: '21.01.01',
        total_price: 259000,
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
        no_transaksi: '21.01.01',
        total_price: 259000,
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
        no_transaksi: '21.01.01',
        total_price: 259000,
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
        no_transaksi: '21.01.01',
        total_price: 259000,
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
        no_transaksi: '21.01.01',
        total_price: 259000,
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
        no_transaksi: '21.01.01',
        total_price: 259000,
        tanggal_pengiriman: '2022-10-10',
        opsi_pengambilan: 'Pickup Mandiri',
        jenis: 'pre-order',
        imageUrl: '/images/produk/kue2.jpg',
        status: 'Selesai',
    },
];

export default function TransaksiContent({ status }: { status: string }) {
    const [fetchItems, setFetchItems] = useState<Item[]>([]);
    const [open, setOpen] = useState(false);
    const [clickedIdTransaksi, setClickedIdTransaksi] = useState<string>('');

    const cancelButtonRef = useRef(null);
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
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                        <div>
                                            <span
                                                className="text-xs cursor-pointer"
                                                onClick={() => {
                                                    setOpen(true);
                                                    setClickedIdTransaksi(item.no_transaksi);
                                                }}
                                            >
                                                No. Transaksi : <b>{item.no_transaksi}</b>
                                            </span>

                                            <div className="inline-flex items-center px-2 py-1 border border-gray-300 rounded-md mb-1">
                                                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                                                <span className="text-xs">{item.status}</span>
                                            </div>
                                            <h2 className="text-base font-bold text-black">{item.name}</h2>
                                            <p className="mt-1 text-xs text-gray-700">{item.description}</p>
                                        </div>

                                        <div className="flex items-start gap-2 flex-col">
                                            <p className="text-xs text-black">Jenis Order</p>
                                            {item.jenis == 'pre-order' && (
                                                <p className="flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                                    {item.jenis}
                                                </p>
                                            )}
                                            {item.jenis == 'ready stock' && (
                                                <p className="flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                    {item.jenis}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-xs text-black">Tanggal Pengiriman </p>
                                            <p className="text-xs text-black">
                                                <b>{formatDate(item.tanggal_pengiriman!)}</b>
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-black ">Harga Satuan </p>
                                            <p className="text-xs text-black ">
                                                <b>Rp. {item.price.toLocaleString('id-ID')}</b>
                                            </p>
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-xs">
                                                Kuantitas :{' '}
                                                <span>
                                                    <b>{item.quantity}</b>
                                                </span>{' '}
                                            </p>
                                            <p className="text-xs  font-bold">
                                                Rp. {item.price.toLocaleString('id-ID')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* start modal */}

            <Transition.Root show={open} as={Fragment}>
                <Dialog className="relative z-50" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto font-poppins">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform rounded-lg bg-white text-left  transition-all sm:my-8 w-full max-w-4xl ">
                                    <Invoice id={clickedIdTransaksi}></Invoice>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm  text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                            onClick={() => setOpen(false)}
                                        >
                                            Tutup
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* end modal */}
        </div>
    );
}
