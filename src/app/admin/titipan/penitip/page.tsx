'use client';

import React, { useState, useEffect, useRef, Fragment } from 'react';
import Link from 'next/link';
import { Dialog, Listbox, Transition } from '@headlessui/react';

import { Penitip, penitip_data as data } from '@/dummy_data/penitip';

const option = [{ number: 5 }, { number: 10 }];
const bank = [{ name: 'BCA' }, { name: 'Mandiri' }];

export default function TambahTitipan() {
    const emptyPenitip: Penitip = {};

    // modal
    const [openModal, setOpenModal] = useState<boolean>(false);

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredData, setFilteredData] = useState<Penitip[]>(data);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(5);

    // bank
    const [bankSelected, setBankSelected] = useState<string>(bank[0].name);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    function handleOpenModal(): void {
        setOpenModal(!openModal);
    }

    useEffect(() => {
        const filtered = data.filter(
            (item) =>
                item?.nama?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item?.email?.toString().toLowerCase().includes(searchQuery.toLowerCase()),
        );
        setFilteredData(filtered);
    }, [searchQuery]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const [editPenitip, setEditPenitip] = useState<Penitip>();

    const cancelButtonRef = useRef(null);

    // bank
    const [bankSelected2, setBankSelected2] = useState<string>(() => {
        if (editPenitip && editPenitip.bank) {
            const matchingBank = bank.find((bankItem) => bankItem.name === editPenitip.bank);
            if (matchingBank) {
                return matchingBank.name;
            }
        }
        return '';
    });

    useEffect(() => {
        setBankSelected(editPenitip?.bank || '');
    }, [editPenitip?.bank]);

    return (
        <div className="flex bg-[#FFFCFC] min-h-screen font-poppins text-black p-8">
            <div className="w-full">
                <div className="card bg-primary border pb-8 rounded ">
                    <div className="card-body">
                        <form className="font-poppins">
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                <div className="h-min rounded-md border bg-white">
                                    <div className="border-b p-4">
                                        <p className=" text-[#AA2B2B] ">Data Penitip</p>
                                    </div>
                                    <div className="p-4">
                                        <div className="mb-4">
                                            <label
                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                htmlFor="nama_produk"
                                            >
                                                Penitip
                                            </label>
                                            <input
                                                className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                id="nama_produk"
                                                placeholder="Nama Penitip"
                                                required
                                                type="text"
                                            ></input>
                                        </div>
                                        <div className="mb-4">
                                            <label
                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                htmlFor="nama_produk"
                                            >
                                                Alamat
                                            </label>
                                            <input
                                                className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                id="harga_produk"
                                                placeholder="Alamat"
                                                required
                                                type="text"
                                            ></input>
                                        </div>
                                        <div className="mb-4">
                                            <label
                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                htmlFor="kata_kunci"
                                            >
                                                No Telp
                                            </label>
                                            <input
                                                className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                id="harga_produk"
                                                placeholder="No Telp"
                                                required
                                                type="text"
                                            ></input>
                                        </div>
                                        <div className="mb-4">
                                            <label
                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                htmlFor="kata_kunci"
                                            >
                                                Email
                                            </label>
                                            <input
                                                className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                id="harga_produk"
                                                placeholder="No Telp"
                                                required
                                                type="text"
                                            ></input>
                                        </div>
                                        <div className="mb-4">
                                            <label
                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                htmlFor="kata_kunci"
                                            >
                                                Bank
                                            </label>
                                            <Listbox
                                                value={bankSelected}
                                                onChange={(value: string) => setBankSelected(value)}
                                            >
                                                <div className="relative mt-1">
                                                    <Listbox.Button className="relative w-full bg-white border border-[#DADDE2] rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                        <span className="block truncate text-[#A5A5A5]">
                                                            {bankSelected}
                                                        </span>
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
                                                    <Listbox.Options className=" absolute mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                        {bank.map((opt) => (
                                                            <Listbox.Option
                                                                key={opt.name}
                                                                value={opt.name}
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
                                                                        {opt.name}
                                                                    </span>
                                                                )}
                                                            </Listbox.Option>
                                                        ))}
                                                    </Listbox.Options>
                                                </div>
                                            </Listbox>
                                        </div>
                                        <div className="mb-4">
                                            <label
                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                htmlFor="kata_kunci"
                                            >
                                                Nomer Bank
                                            </label>
                                            <input
                                                className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                id="harga_produk"
                                                placeholder="Nomer Bank"
                                                required
                                                type="text"
                                            ></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-md border bg-white">
                                    <div className="border-b p-4">
                                        <p className=" text-[#AA2B2B]">List Penitip</p>
                                    </div>
                                    <div className="p-4">
                                        <div className="card bg-primary border pb-8 rounded ">
                                            <div className="card-body">
                                                <div className="flex items-center pb-4 flex-wrap">
                                                    <input
                                                        type="text"
                                                        placeholder="Search"
                                                        className=" search bg-white border p-2 outline-none w-16 sm:w-full"
                                                        value={searchQuery}
                                                        onChange={handleSearchChange}
                                                    />
                                                </div>
                                                <div className="pb-4 flex justify-start items-center flex-wrap">
                                                    <span className="mr-2">Show</span>
                                                    <Listbox
                                                        value={itemsPerPage}
                                                        onChange={(value: number) => setItemsPerPage(value)}
                                                    >
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
                                                                                    selected
                                                                                        ? 'font-semibold'
                                                                                        : 'font-normal'
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
                                                                <th className="p-8 border text-start font-semibold">
                                                                    Penitip
                                                                </th>
                                                                <th className="p-8 border text-start font-semibold">
                                                                    Nomor Telepon
                                                                </th>
                                                                <th className="p-8 border text-start font-semibold">
                                                                    Aksi
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {currentItems.map((item) => (
                                                                <tr key={item.id} className="border text-[#7D848C]">
                                                                    <td className="p-4 border">{item.nama}</td>
                                                                    <td className="p-4 border">{item.no_telp}</td>

                                                                    <td className="p-4 border">
                                                                        <div className="flex gap-2">
                                                                            <button
                                                                                onClick={() => {
                                                                                    setEditPenitip(item);
                                                                                    setOpenModal(true);
                                                                                }}
                                                                                className="flex items-center rounded-md bg-[#E7F9FD] px-4 py-1 font-poppins w-fit text-[#1D6786]"
                                                                            >
                                                                                Edit
                                                                            </button>
                                                                            <Link
                                                                                className="flex items-center rounded-md bg-[#FDE7E7] px-4 py-1 font-poppins w-fit text-[#AA2B2B]"
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
                                                    <div className="flex justify-end mt-4">
                                                        <button
                                                            onClick={() => paginate(currentPage - 1)}
                                                            disabled={currentPage === 1}
                                                            className="p-4 border"
                                                        >
                                                            Previous
                                                        </button>
                                                        {[...Array(Math.ceil(filteredData.length / itemsPerPage))].map(
                                                            (_, index) => (
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
                                                            ),
                                                        )}
                                                        <button
                                                            onClick={() => paginate(currentPage + 1)}
                                                            disabled={
                                                                currentPage ===
                                                                Math.ceil(filteredData.length / itemsPerPage)
                                                            }
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
                            </div>
                            <hr className="mt-4" />
                            <div className="mt-4 flex w-full items-center">
                                <button
                                    className="w-full rounded-lg bg-[#AA2B2B] px-5  py-2.5 text-center font-poppins text-sm font-medium text-white outline-none  hover:bg-[#982c2c]"
                                    type="submit"
                                >
                                    Tambah Penitip
                                </button>
                            </div>
                        </form>
                        <Transition.Root show={openModal} as={Fragment}>
                            <Dialog
                                as="div"
                                className="relative z-10"
                                initialFocus={cancelButtonRef}
                                onClose={setOpenModal}
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
                                                    <div className="sm:flex sm:items-start">
                                                        <form className="font-poppins w-full">
                                                            <div className="h-min rounded-md border bg-white">
                                                                <div className="border-b p-4">
                                                                    <p className=" text-[#AA2B2B] ">Data Penitip</p>
                                                                </div>
                                                                <div className="p-4">
                                                                    <div className="mb-4">
                                                                        <label
                                                                            className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                                            htmlFor="nama_produk"
                                                                        >
                                                                            Penitip
                                                                        </label>
                                                                        <input
                                                                            className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                                            id="nama_produk"
                                                                            placeholder="Nama Penitip"
                                                                            required
                                                                            value={editPenitip?.nama}
                                                                            type="text"
                                                                        ></input>
                                                                    </div>
                                                                    <div className="mb-4">
                                                                        <label
                                                                            className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                                            htmlFor="nama_produk"
                                                                        >
                                                                            Alamat
                                                                        </label>
                                                                        <input
                                                                            className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                                            id="harga_produk"
                                                                            placeholder="Alamat"
                                                                            value={editPenitip?.alamat}
                                                                            required
                                                                            type="text"
                                                                        ></input>
                                                                    </div>
                                                                    <div className="mb-4">
                                                                        <label
                                                                            className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                                            htmlFor="kata_kunci"
                                                                        >
                                                                            No Telp
                                                                        </label>
                                                                        <input
                                                                            className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                                            id="harga_produk"
                                                                            placeholder="No Telp"
                                                                            required
                                                                            type="text"
                                                                            value={editPenitip?.no_telp}
                                                                        ></input>
                                                                    </div>
                                                                    <div className="mb-4">
                                                                        <label
                                                                            className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                                            htmlFor="kata_kunci"
                                                                        >
                                                                            Email
                                                                        </label>
                                                                        <input
                                                                            className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                                            id="harga_produk"
                                                                            placeholder="No Telp"
                                                                            required
                                                                            type="text"
                                                                            value={editPenitip?.email}
                                                                        ></input>
                                                                    </div>
                                                                    <div className="mb-4">
                                                                        <label
                                                                            className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                                            htmlFor="kata_kunci"
                                                                        >
                                                                            Bank
                                                                        </label>
                                                                        <Listbox
                                                                            value={bankSelected}
                                                                            onChange={(value: string) =>
                                                                                setBankSelected(value)
                                                                            }
                                                                        >
                                                                            <div className="relative mt-1">
                                                                                <Listbox.Button className="relative w-full bg-white border border-[#DADDE2] rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                                                    <span className="block truncate text-[#A5A5A5]">
                                                                                        {bankSelected}
                                                                                    </span>
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
                                                                                <Listbox.Options className=" absolute mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                                                    {bank.map((opt) => (
                                                                                        <Listbox.Option
                                                                                            key={opt.name}
                                                                                            value={opt.name}
                                                                                            className={({
                                                                                                active,
                                                                                                selected,
                                                                                            }) =>
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
                                                                                                        selected
                                                                                                            ? 'font-semibold'
                                                                                                            : 'font-normal'
                                                                                                    } block truncate`}
                                                                                                >
                                                                                                    {opt.name}
                                                                                                </span>
                                                                                            )}
                                                                                        </Listbox.Option>
                                                                                    ))}
                                                                                </Listbox.Options>
                                                                            </div>
                                                                        </Listbox>
                                                                    </div>
                                                                    <div className="mb-4">
                                                                        <label
                                                                            className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                                            htmlFor="kata_kunci"
                                                                        >
                                                                            Nomer Bank
                                                                        </label>
                                                                        <input
                                                                            className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                                            id="harga_produk"
                                                                            placeholder="Nomer Bank"
                                                                            required
                                                                            type="text"
                                                                            value={editPenitip?.alamat}
                                                                        ></input>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <hr className="mt-4" />
                                                            <div className="mt-4 flex w-full items-center">
                                                                <button
                                                                    className="w-full rounded-lg bg-[#AA2B2B] px-5  py-2.5 text-center font-poppins text-sm font-medium text-white outline-none  hover:bg-[#912b2b]"
                                                                    type="submit"
                                                                >
                                                                    Edit Penitip
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                    <button
                                                        type="button"
                                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                        onClick={() => setOpenModal(false)}
                                                        ref={cancelButtonRef}
                                                    >
                                                        Cancel
                                                    </button>
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
}
