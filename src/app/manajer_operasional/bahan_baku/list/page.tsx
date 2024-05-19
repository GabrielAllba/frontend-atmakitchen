'use client';
import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Listbox } from '@headlessui/react';
import { ProductFetch } from '@/dummy_data/product';
import axios from 'axios';
import { Alert } from '@mui/material';
import { PembelianBahanBaku } from '@/dummy_data/pembelian_bahan_baku';

const option = [{ number: 5 }, { number: 10 }, { number: 20 }, { number: 50 }];

const List: React.FC = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [alertError, setAlertError] = useState<boolean>(false);

    const [filteredData, setFilteredData] = useState<PembelianBahanBaku[]>([]);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(5);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const [searchQuery, setSearchQuery] = useState<string>('');

    const formatDate = (date: any) => {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    };

    const today = formatDate(new Date());

    const [fromDate, setFromDate] = useState(today);
    const [toDate, setToDate] = useState(today);

    const handleFromDateChange = (event: any) => {
        setFromDate(event.target.value);
        if (new Date(event.target.value) > new Date(toDate)) {
            setToDate(event.target.value);
        }
    };

    const handleToDateChange = (event: any) => {
        setToDate(event.target.value);
    };

    const fetchSearchResults = async () => {
        setLoading(true);

        try {
            const response = await axios.get(apiUrl + '/pembelian_bahan_baku/search', {
                params: {
                    from_date: fromDate,
                    to_date: toDate,
                    query: searchQuery,
                },
            });

            if (response.status !== 400) {
                setFilteredData(response.data.pembelian_bahan_baku);
            } else {
                console.error('Received status 400 from server');
            }
        } catch (error) {
            console.error('Error fetching pembelian bahan baku:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSearchResults();
        if (fromDate) console.log(fromDate);
        console.log(toDate);
    }, [fromDate, toDate, searchQuery]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchQuery(e.target.value);
        if (searchQuery == '') {
        }
    };
    const handleDelete = async (id: number) => {
        try {
            const response = await axios.delete(apiUrl + `/pembelian_bahan_baku/${id}`);
            fetchSearchResults();
        } catch (error) {
            console.error('Error deleting pembelian bahan baku:', error);
            setAlertError(true);
        }
    };

    return (
        <div className="flex bg-[#FFFCFC] min-h-screen font-poppins text-black p-8">
            {alertError && (
                <div className="flex justify-center w-screen fixed top-20 left-0 z-50">
                    <Alert
                        severity="error"
                        className="font-poppins mb-4"
                        onClose={() => {
                            setAlertError(false);
                        }}
                    >
                        <p>Gagal menghapus pembelian bahan baku!</p>
                    </Alert>
                </div>
            )}
            <div className="w-full">
                <div className="card bg-primary border pb-8 rounded ">
                    <div className="card-body ">
                        <div className="flex items-center pb-4 w-full justify-between">
                            <p className="text-[#AA2B2B] font-semibold">Data Pembelian Bahan Baku</p>
                        </div>

                        <form className="w-full">
                            <input
                                type="text"
                                placeholder="Search By Name, Description, Price "
                                className="search bg-white border p-2 outline-none w-full sm:w-full mb-4"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </form>
                        <div className="pb-4 flex justify-between flex-wrap">
                            <div className=" flex justify-start items-center">
                                <span className="mr-2">Show</span>
                                <Listbox value={itemsPerPage} onChange={(value: number) => setItemsPerPage(value)}>
                                    <div className="relative mt-1">
                                        <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <span className="block truncate">{itemsPerPage}</span>
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
                                        <Listbox.Options className=" absolute mt-1 w-20 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                            {option.map((opt) => (
                                                <Listbox.Option
                                                    key={opt.number}
                                                    value={opt.number}
                                                    className={({ active, selected }) =>
                                                        `${active ? 'text-white bg-indigo-600' : 'text-gray-900'}
                                        cursor-default select-none relative py-2 pl-3 pr-9`
                                                    }
                                                >
                                                    {({ selected }) => (
                                                        <span
                                                            className={`${
                                                                selected ? 'font-semibold' : 'font-normal'
                                                            } block truncate`}
                                                        >
                                                            {opt.number}
                                                        </span>
                                                    )}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </div>
                                </Listbox>
                                <p className="pl-2">Entries</p>
                            </div>
                            <div>
                                <div className="flex gap-2 flex-wrap">
                                    <div className="flex items-center">
                                        <p>From</p>
                                        <label className="input input-bordered flex items-center gap-2 bg-white">
                                            <input
                                                type="date"
                                                className="text-sm font-poppins font-normal text-[#555555]"
                                                placeholder="Select From Date"
                                                name="from_date"
                                                value={fromDate}
                                                onChange={handleFromDateChange}
                                            />
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <p>To</p>
                                        <label className="input input-bordered flex items-center gap-2 bg-white">
                                            <input
                                                type="date"
                                                className="text-sm font-poppins font-normal text-[#555555]"
                                                placeholder="Select To Date"
                                                name="to_date"
                                                value={toDate}
                                                min={fromDate}
                                                onChange={handleToDateChange}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-auto">
                            <table className="table-auto w-full overflow-auto">
                                <thead>
                                    <tr className="border">
                                        <th className="p-8 border text-start font-semibold">ID</th>
                                        <th className="p-8 border text-start font-semibold">Bahan Baku</th>
                                        <th className="p-8 border text-start font-semibold">Jumlah</th>
                                        <th className="p-8 border text-start font-semibold">Keterangan</th>
                                        <th className="p-8 border text-start font-semibold">Tanggal Pembelian</th>
                                        <th className="p-8 border text-start font-semibold">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((item) => (
                                        <tr key={item.id} className="border text-[#7D848C]">
                                            <td className="p-4 border">{item.id}</td>
                                            <td className="p-4 border">{item.bahan?.nama!}</td>
                                            <td className="p-4 border">{item.jumlah}</td>
                                            <td className="p-4 border text-[#AA2B2B]">{item.keterangan}</td>
                                            <td className="p-4 border text-[#AA2B2B]">{item.tanggal_pembelian}</td>
                                            <td className="p-4 border">
                                                <div className="flex gap-2">
                                                    <Link href={`/manajer_operasional/bahan_baku/edit/${item.id}`}>
                                                        <p className="flex items-center rounded-md bg-[#E7F9FD] px-4 py-1 font-poppins w-fit text-[#1D6786]">
                                                            Edit
                                                        </p>
                                                    </Link>
                                                    <button
                                                        onClick={() => {
                                                            handleDelete(item.id!);
                                                        }}
                                                        className="flex items-center rounded-md bg-[#FDE7E7] px-4 py-1 font-poppins w-fit text-[#AA2B2B]"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {!loading && currentItems.length === 0 && (
                                <div className="flex justify-center items-center font-poppins text-black text-center mt-10">
                                    <p className="font-poppins text-gray-400">Data tidak ditemukan</p>
                                </div>
                            )}

                            {!loading && (
                                <div className="flex justify-end mt-4">
                                    <button
                                        onClick={() => paginate(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="p-4 border"
                                    >
                                        Previous
                                    </button>
                                    {[...Array(Math.ceil(filteredData.length / itemsPerPage))].map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => paginate(index + 1)}
                                            className={`p-4 ${
                                                currentPage === index + 1
                                                    ? 'bg-[#AA2B2B] text-white'
                                                    : 'bg-white text-black border'
                                            } `}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => paginate(currentPage + 1)}
                                        disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
                                        className="p-4 border"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </div>
                        {loading && (
                            <div className="flex justify-center items-center font-poppins text-black text-center mt-4">
                                <span className="loading loading-ring loading-lg"></span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default List;
