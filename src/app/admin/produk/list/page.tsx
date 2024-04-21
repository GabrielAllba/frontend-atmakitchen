'use client';

import Link from 'next/link';
import * as React from 'react';
import Image from 'next/image';

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
        nama: 'Product 1',
        ready_stock: 2,
        harga: 100000,
        foto: '/images/produk/kue.jpg',
    },
    {
        id: 2,
        nama: 'Product 2',
        ready_stock: 2,
        harga: 150000,
        foto: '/images/produk/kue2.jpg',
    },
    {
        id: 3,
        nama: 'Product 3',
        ready_stock: 2,
        harga: 200000,
        foto: '/images/produk/kue3.jpg',
    },
];

export default function List() {
    return (
        <div className="flex bg-[#FFFCFC] min-h-screen font-poppins text-black p-8">
            <div className="w-full">
                <div className="card bg-primary border pb-8 rounded ">
                    <div className="card-body ">
                        <div className="flex items-center pb-4">
                            <p className="text-[#AA2B2B] font-semibold">Data Produk</p>
                            <form>
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="searh bg-white border p-2 outline-none"
                                />
                            </form>
                        </div>
                        <div className="overflow-auto">
                            <table className="table-auto w-full overflow-auto">
                                <thead>
                                    <tr className="border">
                                        <th className="p-8 border text-start font-semibold">ID</th>
                                        <th className="p-8 border text-start font-semibold">Nama</th>
                                        <th className="p-8 border text-start font-semibold">Ready Stock</th>
                                        <th className="p-8 border text-start font-semibold">Harga</th>
                                        <th className="p-8 border text-start font-semibold">Foto</th>
                                        <th className="p-8 border text-start font-semibold">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => (
                                        <tr key={item.id} className="border text-[#7D848C]">
                                            <td className="p-4 border">{item.id}</td>
                                            <td className="p-4 border">{item.nama}</td>
                                            <td className="p-4 border">{item.ready_stock ? 'Yes' : 'No'}</td>
                                            <td className="p-4 border text-[#AA2B2B]">Rp. {item.harga}</td>
                                            <td className="p-4 border">
                                                <Image src={item.foto} width={100} height={500} alt={item.nama} />
                                            </td>
                                            <td className="p-4 border">
                                                <div className="flex gap-2">
                                                    <Link
                                                        className="flex items-center rounded-md bg-[#E7F9FD] px-4 py-1 font-poppins w-fit text-[#1D6786]"
                                                        href=""
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        className="flex items-center rounded-md bg-[#FDE7E7] px-4 py-1 font-poppins   w-fit text-[#AA2B2B]"
                                                        href=""
                                                    >
                                                        Hapus
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
