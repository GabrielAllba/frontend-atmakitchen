'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Listbox } from '@headlessui/react';
import { Hampers, HampersFetch } from '@/dummy_data/hampers';
import axios from 'axios';

const option = [{ number: 5 }, { number: 10 }, { number: 20 }, { number: 50 }];

const ListHampers: React.FC = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredData, setFilteredData] = useState<HampersFetch[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(5);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    useEffect(() => {
        const fetchSearchResults = async () => {
            setFilteredData([]);
            setLoading(true);

            try {
                const response = await axios.get(apiUrl + '/hampers/search', {
                    params: {
                        query: searchQuery,
                    },
                });
                setFilteredData(response.data.hampers);
            } catch (error) {
                console.error('Error fetching hampers:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSearchResults();
    }, [searchQuery]);

    const fetchHampers = () => {
        try {
            setLoading(true);
            axios({
                method: 'get',
                url: `${apiUrl}/hampers`,
            }).then((response) => {
                setFilteredData(response.data.hampers);
                fetchAllImages(response.data.hampers);
                console.log(imageUrls);
                setLoading(false);
            });
        } catch (error) {
            console.error('Error fetching hampers:', error);
        }
    };

    useEffect(() => {
        fetchHampers();
    }, []);
    const fetchImage = async (name: string) => {
        try {
            const response = await axios.get(apiUrl + name, {
                responseType: 'blob',
            });
            const blob = response.data;
            const objectURL = URL.createObjectURL(blob);
            return objectURL;
        } catch (error) {
            console.error('Error fetching image:', error);
            return '';
        }
    };

    const fetchAllImages = async (hampers: HampersFetch[]) => {
        const imageUrls: { [key: string]: string } = {};
        for (const hamper of hampers) {
            if (hamper.photo) {
                const imageUrl = await fetchImage(hamper.photo);
                imageUrls[hamper.photo] = imageUrl;
            }
        }
        setImageUrls(imageUrls);
    };
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await axios.delete(apiUrl + `/hampers/${id}`);
            fetchHampers();
        } catch (error) {
            console.error('Error deleting hampers:', error);
        }
    };

    return (
        <div className="flex bg-[#FFFCFC] min-h-screen font-poppins text-black p-8">
            <div className="w-full">
                <div className="card bg-primary border pb-8 rounded ">
                    <div className="card-body ">
                        <div className="flex items-center pb-4 flex-wrap">
                            <p className="text-[#AA2B2B] font-semibold">Data Hampers</p>
                            <form>
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="search bg-white border p-2 outline-none w-16 sm:w-full"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                            </form>
                        </div>
                        <div className="pb-4 flex justify-start items-center">
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
                        <div className="overflow-auto">
                            <table className="table-auto w-full overflow-auto">
                                <thead>
                                    <tr className="border">
                                        <th className="p-8 border text-start font-semibold">ID</th>
                                        <th className="p-8 border text-start font-semibold">Nama Hampers</th>
                                        <th className="p-8 border text-start font-semibold">Ready Stock</th>
                                        <th className="p-8 border text-start font-semibold">Harga</th>
                                        <th className="p-8 border text-start font-semibold">Foto</th>

                                        <th className="p-8 border text-start font-semibold">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((item) => (
                                        <tr key={item.id} className="border text-[#7D848C]">
                                            <td className="p-4 border">{item.id}</td>
                                            <td className="p-4 border">{item.hampers_name}</td>
                                            <td className="p-4 border">{item.stock}</td>
                                            <td className="p-4 border text-[#AA2B2B]">Rp. {item.price}</td>
                                            <td className="p-4 border">
                                                {item.photo && imageUrls[item.photo] ? (
                                                    <Image
                                                        src={imageUrls[item.photo]}
                                                        width={100}
                                                        height={50}
                                                        alt={item.hampers_name!}
                                                    />
                                                ) : (
                                                    <span>No Image</span>
                                                )}
                                            </td>

                                            <td className="p-4 border">
                                                <div className="flex gap-2">
                                                    <Link
                                                        className="flex items-center rounded-md bg-[#E7F9FD] px-4 py-1 font-poppins w-fit text-[#1D6786]"
                                                        href={`/admin/hampers/edit/${item.id}`}
                                                    >
                                                        Edit
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListHampers;
