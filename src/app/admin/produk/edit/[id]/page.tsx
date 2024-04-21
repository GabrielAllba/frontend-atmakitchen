'use client';

import Image from 'next/image';
import { Listbox } from '@headlessui/react';
import { useState } from 'react';

interface Produk {
    id: number;
    nama: string;
    ready_stock: number;
    harga: number;
    foto: string;
}

const data: Produk[] = [
    {
        id: 1,
        nama: 'Produk 1',
        ready_stock: 2,
        harga: 100000,
        foto: '/images/produk/kue.jpg',
    },
    {
        id: 2,
        nama: 'Produk 2',
        ready_stock: 2,
        harga: 150000,
        foto: '/images/produk/kue2.jpg',
    },
    {
        id: 3,
        nama: 'Produk 3',
        ready_stock: 2,
        harga: 200000,
        foto: '/images/produk/kue3.jpg',
    },
    {
        id: 4,
        nama: 'Produk 4',
        ready_stock: 2,
        harga: 100000,
        foto: '/images/produk/kue.jpg',
    },
    {
        id: 5,
        nama: 'Produk 5',
        ready_stock: 2,
        harga: 150000,
        foto: '/images/produk/kue2.jpg',
    },
    {
        id: 6,
        nama: 'Produk 6',
        ready_stock: 2,
        harga: 200000,
        foto: '/images/produk/kue3.jpg',
    },
    {
        id: 1,
        nama: 'Produk 1',
        ready_stock: 2,
        harga: 100000,
        foto: '/images/produk/kue.jpg',
    },
    {
        id: 2,
        nama: 'Produk 2',
        ready_stock: 2,
        harga: 150000,
        foto: '/images/produk/kue2.jpg',
    },
    {
        id: 3,
        nama: 'Produk 3',
        ready_stock: 2,
        harga: 200000,
        foto: '/images/produk/kue3.jpg',
    },
    {
        id: 4,
        nama: 'Produk 4',
        ready_stock: 2,
        harga: 100000,
        foto: '/images/produk/kue.jpg',
    },
    {
        id: 5,
        nama: 'Produk 5',
        ready_stock: 2,
        harga: 150000,
        foto: '/images/produk/kue2.jpg',
    },
    {
        id: 6,
        nama: 'Produk 6',
        ready_stock: 2,
        harga: 200000,
        foto: '/images/produk/kue3.jpg',
    },
    {
        id: 1,
        nama: 'Produk 1',
        ready_stock: 2,
        harga: 100000,
        foto: '/images/produk/kue.jpg',
    },
    {
        id: 2,
        nama: 'Produk 2',
        ready_stock: 2,
        harga: 150000,
        foto: '/images/produk/kue2.jpg',
    },
    {
        id: 3,
        nama: 'Produk 3',
        ready_stock: 2,
        harga: 200000,
        foto: '/images/produk/kue3.jpg',
    },
    {
        id: 4,
        nama: 'Produk 4',
        ready_stock: 2,
        harga: 100000,
        foto: '/images/produk/kue.jpg',
    },
    {
        id: 5,
        nama: 'Produk 5',
        ready_stock: 2,
        harga: 150000,
        foto: '/images/produk/kue2.jpg',
    },
    {
        id: 6,
        nama: 'Produk 6',
        ready_stock: 2,
        harga: 200000,
        foto: '/images/produk/kue3.jpg',
    },
    {
        id: 1,
        nama: 'Produk 1',
        ready_stock: 2,
        harga: 100000,
        foto: '/images/produk/kue.jpg',
    },
    {
        id: 2,
        nama: 'Produk 2',
        ready_stock: 2,
        harga: 150000,
        foto: '/images/produk/kue2.jpg',
    },
    {
        id: 3,
        nama: 'Produk 3',
        ready_stock: 2,
        harga: 200000,
        foto: '/images/produk/kue3.jpg',
    },
    {
        id: 4,
        nama: 'Produk 4',
        ready_stock: 2,
        harga: 100000,
        foto: '/images/produk/kue.jpg',
    },
    {
        id: 5,
        nama: 'Produk 5',
        ready_stock: 2,
        harga: 150000,
        foto: '/images/produk/kue2.jpg',
    },
    {
        id: 6,
        nama: 'Produk 6',
        ready_stock: 2,
        harga: 200000,
        foto: '/images/produk/kue3.jpg',
    },
];

const option = [{ status: 'Aktif' }, { status: 'Tidak Aktif' }];

export default function Page({ params }: { params: { id: number } }) {
    const [status, setStatus] = useState<string>(option[0].status);
    return (
        <div className="flex bg-[#FFFCFC] min-h-screen font-poppins text-black p-8">
            <div className="w-full">
                <div className="card bg-primary border pb-8 rounded ">
                    <div className="card-body">
                        <div className="bg-white">
                            <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-8 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
                                <div className="grid grid-cols-1 grid-rows-1 ">
                                    <Image
                                        src="/images/produk/kue.jpg"
                                        className="rounded-lg bg-gray-100"
                                        width={500}
                                        height={500}
                                        alt=""
                                    ></Image>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                                        Kue 1
                                    </h2>

                                    <p className="mt-4 text-gray-500">Harga</p>
                                    <p className="mt-4 text-[#AA2B2B] font-semibold text-xl md:text-4xl">Rp. 500.000</p>
                                    <dl className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                                        <div className="border-t border-gray-200 pt-4">
                                            <dt className="font-medium text-gray-900">Nama Produk</dt>
                                            <input
                                                className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 mt-4 font-poppins text-sm text-black outline-none"
                                                id="nama_produk"
                                                placeholder="Nama Produk"
                                                required
                                                type="text"
                                            ></input>
                                        </div>
                                        <div className="border-t border-gray-200 pt-4">
                                            <dt className="font-medium text-gray-900">Ready Stock</dt>
                                            <input
                                                className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 mt-4 font-poppins text-sm text-black outline-none"
                                                id="ready_stock"
                                                placeholder="Ready Stock"
                                                required
                                                type="number"
                                            ></input>
                                        </div>
                                        <div className="border-t border-gray-200 pt-4">
                                            <dt className="font-medium text-gray-900">Jenis Produk</dt>
                                            <input
                                                className="disabled:opacity-30 block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 mt-4 font-poppins text-sm text-black outline-none"
                                                id="jenis_produk"
                                                placeholder="Produk Toko"
                                                value="Produk Toko"
                                                disabled
                                                type="text"
                                            ></input>
                                        </div>
                                        <div className="border-t border-gray-200 pt-4">
                                            <dt className="font-medium text-gray-900">Quota Harian PO</dt>
                                            <input
                                                className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 mt-4 font-poppins text-sm text-black outline-none"
                                                id="quota"
                                                placeholder="Quota Harian PO"
                                                required
                                                type="number"
                                            ></input>
                                        </div>
                                        <div className="border-t border-gray-200 pt-4">
                                            <dt className="font-medium text-gray-900">Status Produk</dt>
                                            <Listbox value={status} onChange={(value: string) => setStatus(value)}>
                                                <div className="relative mt-1">
                                                    <Listbox.Button className="relative w-full bg-white border border-[#DADDE2] rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                        <span className="block truncate text-[#A5A5A5]">{status}</span>
                                                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                            <svg
                                                                className="h-5 w-5 text-gray-400"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                                aria-hidden="true"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M10 12a1 1 0 01-.7-.29l-3-3a1 1 0 111.4-1.42L10 10.59l2.3-2.3a1 1 0 111.4 1.42l-3 3a1 1 0 01-.7.29z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </span>
                                                    </Listbox.Button>
                                                    <Listbox.Options className=" absolute mt-1 w-max bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                        {option.map((opt) => (
                                                            <Listbox.Option
                                                                key={opt.status}
                                                                value={opt.status}
                                                                className={({ active, selected }) =>
                                                                    `${
                                                                        active
                                                                            ? 'text-white bg-indigo-600'
                                                                            : 'text-gray-900'
                                                                    }
                                        cursor-default select-none relative py-2 pl-3 pr-9`
                                                                }
                                                            >
                                                                {({ selected }) => (
                                                                    <span
                                                                        className={`${
                                                                            selected ? 'font-semibold' : 'font-normal'
                                                                        } block truncate`}
                                                                    >
                                                                        {opt.status}
                                                                    </span>
                                                                )}
                                                            </Listbox.Option>
                                                        ))}
                                                    </Listbox.Options>
                                                </div>
                                            </Listbox>
                                        </div>
                                        <div>
                                            <button
                                                type="submit"
                                                className="inline-block rounded px-4 py-2 text-base  bg-[#E7F9FD] mr-2 mb-2 text-[#1D6786]"
                                            >
                                                Simpan
                                            </button>
                                        </div>

                                        <div className=" border-gray-200 col-span-2"></div>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                    ;
                </div>
            </div>
        </div>
    );
}
