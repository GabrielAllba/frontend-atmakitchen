'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Listbox } from '@headlessui/react';
import { Bahan, bahan_data as data } from '@/dummy_data/bahan';

const option = [{ number: 5 }, { number: 10 }, { number: 20 }, { number: 50 }];

const List: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredData, setFilteredData] = useState<Bahan[]>(data);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(5);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    useEffect(() => {
        const filtered = data.filter(
            (item) =>
                item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.harga.toString().toLowerCase().includes(searchQuery.toLowerCase()),
        );
        setFilteredData(filtered);
    }, [searchQuery]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="flex justify-center bg-[#FFFCFC] min-h-screen font-poppins text-black p-8">
            <div className="w-full max-w-xl">
                <div className="card bg-primary border pb-8 rounded">
                    <div className="card-body">
                        <div className="flex pb-4 flex-wrap">
                            <p className="text-[#AA2B2B] font-semibold">Tambah Bahan Baku</p>
                            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                <form className="space-y-6" action="#" method="POST">
                                    <div>
                                        <label
                                            className="block text-sm font-medium leading-6 text-gray-900 mb-2 font-poppins"
                                        >
                                            Nama Bahan Baku
                                        </label>
                                        <label className="input input-bordered flex items-center gap-2 bg-white">
                                            <input
                                                type="text"
                                                className="text-sm font-poppins font-normal text-[#555555] w-full"
                                                placeholder="Masukkan Nama Bahan"
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <label
                                            className="block text-sm font-medium leading-6 text-gray-900 mb-2 font-poppins"
                                        >
                                            Satuan Bahan Baku
                                        </label>
                                        <label className="input input-bordered flex items-center gap-2 bg-white">
                                            <input
                                                type="text"
                                                className="text-sm font-poppins font-normal text-[#555555] w-full"
                                                placeholder="Masukkan Satuan Bahan"
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <label
                                            className="block text-sm font-medium leading-6 text-gray-900 mb-2 font-poppins"
                                        >
                                            Merk Bahan Baku
                                        </label>
                                        <label className="input input-bordered flex items-center gap-2 bg-white">
                                            <input
                                                type="text"
                                                className="text-sm font-poppins font-normal text-[#555555] w-full"
                                                placeholder="Masukkan Merk Bahan"
                                            />
                                        </label>
                                    </div>
                                    <div className="flex justify-between space-x-4">
                                        <div>
                                            <label
                                                className="block text-sm font-medium leading-6 text-gray-900 mb-2 font-poppins"
                                            >
                                                Harga Bahan Baku
                                            </label>
                                            <label className="input input-bordered flex items-center gap-2 bg-white">
                                                <input
                                                    type="number"
                                                    className="text-sm font-poppins font-normal text-[#555555] w-full"
                                                    placeholder="Masukkan Harga Bahan"
                                                    min='0'
                                                />
                                            </label>
                                        </div>
                                        <div>
                                            <label
                                                className="block text-sm font-medium leading-6 text-gray-900 mb-2 font-poppins"
                                            >
                                                Stok Bahan Baku
                                            </label>
                                            <label className="input input-bordered flex items-center gap-2 bg-white">
                                                <input
                                                    type="number"
                                                    className="text-sm font-poppins font-normal text-[#555555] w-full"
                                                    placeholder="Opsional"
                                                    min='0'
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-accent px-3 py-1.5 text-sm font-normal leading-6 text-white shadow-sm hover:bg-[#b54545] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  font-poppins"
                                        >
                                            Tambah Bahan Baku
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default List;
