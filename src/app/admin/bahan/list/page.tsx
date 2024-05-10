'use client';
import React, { useState, useEffect, useRef, Fragment } from 'react';
import Link from 'next/link';
import { Listbox } from '@headlessui/react';
import { Bahan, bahan_data as data } from '@/dummy_data/bahan';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';

const option = [{ number: 5 }, { number: 10 }, { number: 20 }, { number: 50 }];

const List: React.FC = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [loading, setLoading] = useState<boolean>(true);

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredData, setFilteredData] = useState<Bahan[]>(data);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(5);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    //modal Edit
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const cancelButtonEdit = useRef(null);
    const [editBahan, setEditBahan] = useState<Bahan>();
    const [BahanModal, setBahanModal] = useState<Bahan>();

    

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

    const fetchBahan = () => {
        try {
            setLoading(true);
            axios({
                method: 'get',
                url: `${apiUrl}/bahan`,
                params: {
                    query: 'Bahan Baku',
                },
            }).then((response) => {
                setFilteredData(response.data.bahan);
                setLoading(false);
            });
        } catch (error) {
            console.error('Error fetching bahans:', error);
        }
    };

    useEffect(() => {
        fetchBahan();
    }, []);

    useEffect(() => {
        const filtered = data.filter(
            (item) =>
                item.nama.toLowerCase().includes(searchQuery.toLowerCase()),
        );
        setFilteredData(filtered);
    }, [searchQuery]);

    //update Bahan
    const [submitEditBahan, setSubmitEditBahan] = useState<Bahan>();

    const handleUpdate = (e: React.FormEvent<HTMLFormElement>, itemId: number) => {
        e.preventDefault();
        console.log(submitEditBahan);

        axios({
            method: 'put',
            url: apiUrl + '/bahan/' + itemId,
            data: submitEditBahan,
        })
            .then((response) => {
                console.log(response);
                fetchBahan();
                
            })
            .catch((err) => {
                console.log(err);
            })
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await axios.delete(apiUrl + `/bahan/${id}`);
            fetchBahan();
        } catch (error) {
            console.error('Error deleting bahan:', error);
        }
    };

    return (
        <div className="flex bg-[#FFFCFC] min-h-screen font-poppins text-black p-8">
            <div className="w-full">
                <div className="card bg-primary border pb-8 rounded ">
                    <div className="card-body ">
                        <div className="flex items-center pb-4 flex-wrap">
                            <p className="text-[#AA2B2B] font-semibold">Data Bahan Baku</p>
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
                                        <th className="p-8 border text-start font-semibold">Nama Bahan Baku</th>
                                        <th className="p-8 border text-start font-semibold">Stock</th>
                                        <th className="p-8 border text-start font-semibold">Harga Satuan</th>
                                        <th className="p-8 border text-start font-semibold">Merk Bahan</th>
                                        <th className="p-8 border text-start font-semibold">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((item) => (
                                        <tr key={item.id} className="border text-[#7D848C]">
                                            <td className="p-4 border">{item.id}</td>
                                            <td className="p-4 border">{item.nama}</td>
                                            <td className="p-4 border">{item.stok} {item.satuan}</td>
                                            <td className="p-4 border text-[#AA2B2B]">Rp. {item.harga}</td>
                                            <td className="p-4 border">{item.merk}
                                            </td>
                                            <td className="p-4 border">
                                                <div className="flex gap-2">
                                                <button 
                                                    id="openBahan"
                                                    onClick={() => {
                                                        setEditBahan(item);
                                                        setSubmitEditBahan(item);
                                                        setOpenEditModal(true);
                                                    }}
                                                    className="flex items-center rounded-md bg-[#E7F9FD] px-4 py-1 font-poppins w-fit text-[#1D6786]">
                                                        Edit
                                                    </button>
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
                        <Transition.Root show={openEditModal} as={Fragment}>
                            <Dialog
                                as="div"
                                className="relative z-10"
                                initialFocus={cancelButtonEdit}
                                onClose={setOpenEditModal}
                            >
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

                                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
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
                                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                                    <div className="sm:items-start">
                                                        <form className="space-y-6" action="#" method="PUT" onSubmit={(e) => handleUpdate(e, editBahan?.id!)}>
                                                            <div className="grid grid-cols-1 gap-4">
                                                                <div className="h-min rounded-md border bg-white">
                                                                    <div className="border-b p-4">
                                                                        <p className=" text-[#AA2B2B] ">
                                                                            Edit {editBahan?.nama}
                                                                        </p>
                                                                    </div>
                                                                    <div className="p-4 overflow-auto">
                                                                        <div className="mb-4">
                                                                            <label
                                                                                className="mb-2 font-poppins text-sm font-medium text-[#111827]"
                                                                                htmlFor="nama"
                                                                            >
                                                                                Nama Bahan
                                                                            </label>
                                                                            <input
                                                                                className=" w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                                                id="nama_bahan"
                                                                                placeholder="Nama Bahan"
                                                                                required
                                                                                value={submitEditBahan?.nama}
                                                                                type="text"
                                                                                onChange={(e) => {
                                                                                    const { value } = e.target;
                                                                                    
                                                                                    setSubmitEditBahan({
                                                                                        ...submitEditBahan!,
                                                                                        nama: value,
                                                                                    });
                                                                                }}
                                                                                
                                                                            ></input>
                                                                        </div>
                                                                        <div className="mb-4">
                                                                            <label
                                                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                                                htmlFor="merk"
                                                                            >
                                                                                Merk Bahan
                                                                            </label>
                                                                            <input
                                                                                className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                                                id="merk_bahan"
                                                                                placeholder=""
                                                                                required
                                                                                value={editBahan?.merk}
                                                                                type="text"
                                                                            ></input>
                                                                        </div>
                                                                        <div className="mb-4">
                                                                            <label
                                                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                                                htmlFor="stok"
                                                                            >
                                                                                Stok Bahan
                                                                            </label>
                                                                            <input
                                                                                className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                                                id="stok_bahan"
                                                                                placeholder="Stok Bahan"
                                                                                required
                                                                                value={editBahan?.stok}
                                                                                type="text"
                                                                            ></input>
                                                                        </div>
                                                                        <div className="mb-4">
                                                                            <label
                                                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                                                htmlFor="harga"
                                                                            >
                                                                                Harga Bahan
                                                                            </label>
                                                                            <input
                                                                                className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                                                id="harga_bahan"
                                                                                placeholder="Harga Bahan"
                                                                                required
                                                                                value={editBahan?.harga}
                                                                                type="text"
                                                                            ></input>
                                                                        </div>
                                                                        <div className="mb-4">
                                                                            <label
                                                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                                                htmlFor="satuan"
                                                                            >
                                                                                Satuan Bahan
                                                                            </label>
                                                                            <input
                                                                                className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                                                id="satuan_bahan"
                                                                                placeholder="Satuan Bahan"
                                                                                required
                                                                                value={editBahan?.satuan}
                                                                                type="text"
                                                                            ></input>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                    <button
                                                        className=" rounded-md bg-[#AA2B2B] px-5  py-2.5 text-center font-semibold font-poppins text-sm  text-white outline-none  hover:bg-[#832a2a]"
                                                        type="submit"
                                                    >
                                                        Save
                                                    </button>

                                                    <button
                                                        className="mx-3 rounded-md bg-white px-5  py-2.5 text-center font-semibold font-poppins text-sm  text-[#AA2B2B] outline-none  hover:bg-gray-100 shadow-sm ring-2 ring-inset ring-[#AA2B2B]"
                                                        type="button"
                                                        onClick={() => setOpenEditModal(false)}
                                                        ref={cancelButtonEdit}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                                        </form>
                                                    </div>
                                                </div>
                                               
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition.Root>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default List;
