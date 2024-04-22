'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

import { Fragment } from 'react';
import { Dialog, Listbox, Transition } from '@headlessui/react';

import { Titipan, titipan_data } from '@/dummy_data/titipan';
import { Produk, produk_data } from '@/dummy_data/produk';
import { Hampers, hampers_data } from '@/dummy_data/hampers';

import { satuan_produk_data, SatuanProduk } from '@/dummy_data/satuan_produk';
import { ProdukHampers } from '@/dummy_data/produk_hampers';
import Image from 'next/image';

export default function EditHampers({ params }: { params: { id: number } }) {
    // current hampers
    const [currentHampers, setCurrentHampers] = useState<Hampers | undefined>();

    useEffect(() => {
        const currentHampers = hampers_data.find((item) => item.id == params.id);

        setCurrentHampers(currentHampers);
    }, [params.id]);

    // modal edit produk
    const [openModalTambahProduk, setOpenModalTambahProduk] = useState<boolean>(false);
    const cancelButtonRefTambahProduk = useRef(null);

    // produk selected
    const [produk, setProduk] = useState<Produk>(produk_data[0]);

    // satuan
    const [satuanSelected, setSatuanSelected] = useState<SatuanProduk>(satuan_produk_data[0]);

    // jumlah produk
    const [jumlahProduk, setJumlahProduk] = useState<number>(0);
    const handleChangeJumlahProduk = (e: React.ChangeEvent<HTMLInputElement>) => {
        setJumlahProduk(Number(e.target.value));
    };

    // handle submit tambah produk
    function handleTambahProduk(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const newProduk: ProdukHampers = {
            id: (currentHampers?.produk_hampers?.length || 0) + 1,
            produk: produk,
            jumlah: jumlahProduk,
        };

        const newHampers: Hampers = {
            ...currentHampers,
            produk_hampers: [...(currentHampers?.produk_hampers || []), newProduk],
        };

        setCurrentHampers(newHampers);
        setJumlahProduk(0);
    }

    return (
        <div className="flex bg-[#FFFCFC] min-h-screen font-poppins text-black p-8">
            <div className="w-full">
                <div className="card bg-primary border pb-8 rounded">
                    {currentHampers ? (
                        <div className="card-body">
                            <form className="font-poppins">
                                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                    <div className="h-min rounded-md border bg-white">
                                        <div className="border-b p-4">
                                            <p className=" text-[#AA2B2B]">Detail Hampers</p>
                                        </div>
                                        <div className="p-4">
                                            <div className="mb-4">
                                                <label
                                                    className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                    htmlFor="nama_hampers"
                                                >
                                                    Nama Hampers
                                                </label>
                                                <input
                                                    className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                    id="nama_hampers"
                                                    placeholder="Nama Hampers"
                                                    value={currentHampers?.nama}
                                                    required
                                                    type="text"
                                                ></input>
                                            </div>

                                            <div className="mb-4">
                                                <label
                                                    className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                    htmlFor="foto_produk"
                                                >
                                                    Harga
                                                </label>
                                                <input
                                                    className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                    id="foto_titipan"
                                                    placeholder="Harga"
                                                    value={currentHampers?.harga}
                                                    required
                                                    type="number"
                                                ></input>
                                            </div>
                                            <div className="mb-4">
                                                <label
                                                    className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                    htmlFor="nama_produk"
                                                >
                                                    Deskripsi
                                                </label>
                                                <input
                                                    className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                    id="deskripsi"
                                                    placeholder="Deskripsi"
                                                    required
                                                    value={currentHampers?.deskripsi}
                                                    type="text"
                                                ></input>
                                            </div>
                                            <div className="mb-4">
                                                <label
                                                    className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                    htmlFor="ready_stock"
                                                >
                                                    Ready Stock
                                                </label>
                                                <input
                                                    className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                    id="ready_stock"
                                                    placeholder="Ready Stock"
                                                    required
                                                    value={currentHampers?.ready_stock}
                                                    type="number"
                                                ></input>
                                            </div>
                                            <div className="mb-4">
                                                <label
                                                    className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                    htmlFor="quota_harian_po"
                                                >
                                                    Quota Harian PO
                                                </label>
                                                <input
                                                    className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                    id="quota_harian_po"
                                                    placeholder="Quota Harian PO"
                                                    required
                                                    value={currentHampers?.quota_harian_po}
                                                    type="number"
                                                ></input>
                                            </div>
                                            <div className="mb-4">
                                                <label
                                                    className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                    htmlFor="nama_produk"
                                                >
                                                    Foto Hampers
                                                </label>
                                                <input
                                                    className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                    id="foto_hampers"
                                                    placeholder="foto_hampers"
                                                    required
                                                    type="file"
                                                ></input>
                                                {currentHampers.foto_hampers && (
                                                    <div className="my-4">
                                                        <Image
                                                            src={currentHampers?.foto_hampers}
                                                            className="rounded bg-gray-100"
                                                            width={200}
                                                            height={200}
                                                            alt=""
                                                        ></Image>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rounded-md border bg-white">
                                        <div className="border-b p-4">
                                            <p className=" text-[#AA2B2B] ">Data Produk</p>
                                        </div>
                                        <div className="p-4">
                                            <div className="overflow-auto">
                                                <table className="table-auto w-full overflow-auto">
                                                    <thead>
                                                        <tr className="border">
                                                            <th className="p-8 border text-start font-semibold">ID</th>
                                                            <th className="p-8 border text-start font-semibold">
                                                                Nama
                                                            </th>
                                                            <th className="p-8 border text-start font-semibold">
                                                                Jumlah
                                                            </th>
                                                            <th className="p-8 border text-start font-semibold">
                                                                Aksi
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {currentHampers?.produk_hampers?.map((item) => {
                                                            return (
                                                                <tr key={item.id} className="border text-[#7D848C]">
                                                                    <td className="p-4 border">{item.id}</td>
                                                                    <td className="p-4 border">{item.produk?.nama}</td>
                                                                    <td className="p-4 border">{item.jumlah}</td>

                                                                    <td className="p-4 border">
                                                                        <div className="flex gap-2">
                                                                            <Link
                                                                                className="flex items-center rounded-md bg-[#FDE7E7] px-4 py-1 font-poppins w-fit text-[#AA2B2B]"
                                                                                href=""
                                                                            >
                                                                                Hapus
                                                                            </Link>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>

                                                <div className="mt-4 mb-8 flex w-full items-center">
                                                    <button
                                                        className="w-full rounded-lg bg-[#AA2B2B] px-5  py-2.5 text-center font-poppins text-sm font-medium text-white outline-none  hover:bg-[#832a2a]"
                                                        onClick={() => {
                                                            setOpenModalTambahProduk(true);
                                                        }}
                                                    >
                                                        Tambah Produk
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className="mt-4" />
                                <div className="mt-4 flex w-full items-center">
                                    <button
                                        className="w-full rounded-lg bg-[#AA2B2B] px-5  py-2.5 text-center font-poppins text-sm font-medium text-white outline-none  hover:bg-[#832a2a]"
                                        type="submit"
                                    >
                                        Edit Hampers
                                    </button>
                                </div>
                            </form>
                            <Transition.Root show={openModalTambahProduk} as={Fragment}>
                                <Dialog
                                    as="div"
                                    className="relative z-10"
                                    initialFocus={cancelButtonRefTambahProduk}
                                    onClose={setOpenModalTambahProduk}
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
                                                <Dialog.Panel className="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                                        <div className="sm:flex sm:items-start">
                                                            <form
                                                                className="font-poppins w-full"
                                                                onSubmit={handleTambahProduk}
                                                            >
                                                                <div className="h-min rounded-md border bg-white">
                                                                    <div className="border-b p-4">
                                                                        <p className=" text-[#AA2B2B] ">Produk</p>
                                                                    </div>

                                                                    <div className="p-4">
                                                                        <div className="mb-4">
                                                                            <label
                                                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                                                htmlFor="kata_kunci"
                                                                            >
                                                                                Produk
                                                                            </label>

                                                                            <Listbox
                                                                                value={produk}
                                                                                onChange={(value: Produk) =>
                                                                                    setProduk(value)
                                                                                }
                                                                            >
                                                                                <div className="relative mt-1">
                                                                                    <Listbox.Button className="relative w-full bg-white border border-[#DADDE2] rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                                                        <span className="block truncate text-[#A5A5A5]">
                                                                                            {produk?.nama}
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
                                                                                        {produk_data.map((opt) => (
                                                                                            <Listbox.Option
                                                                                                key={opt.id}
                                                                                                value={opt}
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
                                                                                                        {opt.nama}
                                                                                                    </span>
                                                                                                )}
                                                                                            </Listbox.Option>
                                                                                        ))}
                                                                                    </Listbox.Options>
                                                                                </div>
                                                                            </Listbox>
                                                                        </div>
                                                                        <div className="mb-4 grid grid-cols-2 gap-2">
                                                                            <div>
                                                                                <label
                                                                                    className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                                                    htmlFor="foto_produk"
                                                                                >
                                                                                    Jumlah
                                                                                </label>
                                                                                <input
                                                                                    className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                                                    id="foto_titipan"
                                                                                    placeholder="Jumlah"
                                                                                    required
                                                                                    onChange={handleChangeJumlahProduk}
                                                                                    type="number"
                                                                                ></input>
                                                                            </div>
                                                                            <div>
                                                                                <label
                                                                                    className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                                                    htmlFor="foto_produk"
                                                                                >
                                                                                    Satuan
                                                                                </label>

                                                                                <Listbox
                                                                                    value={satuanSelected}
                                                                                    onChange={(value: SatuanProduk) =>
                                                                                        setSatuanSelected(value)
                                                                                    }
                                                                                >
                                                                                    <div className="relative mt-1">
                                                                                        <Listbox.Button className="relative w-full bg-white border border-[#DADDE2] rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                                                            <span className="block truncate text-[#A5A5A5]">
                                                                                                {satuanSelected.nama}
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
                                                                                            {satuan_produk_data.map(
                                                                                                (opt) => (
                                                                                                    <Listbox.Option
                                                                                                        key={opt.id}
                                                                                                        value={opt}
                                                                                                        className={({
                                                                                                            active,
                                                                                                            selected,
                                                                                                        }) =>
                                                                                                            `${
                                                                                                                active
                                                                                                                    ? 'text-white bg-indigo-600'
                                                                                                                    : 'text-gray-900'
                                                                                                            } cursor-default select-none relative py-2 pl-3 pr-9`
                                                                                                        }
                                                                                                    >
                                                                                                        {({
                                                                                                            selected,
                                                                                                        }) => (
                                                                                                            <span
                                                                                                                className={`${
                                                                                                                    selected
                                                                                                                        ? 'font-semibold'
                                                                                                                        : 'font-normal'
                                                                                                                } block truncate`}
                                                                                                            >
                                                                                                                {
                                                                                                                    opt.nama
                                                                                                                }
                                                                                                            </span>
                                                                                                        )}
                                                                                                    </Listbox.Option>
                                                                                                ),
                                                                                            )}
                                                                                        </Listbox.Options>
                                                                                    </div>
                                                                                </Listbox>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <hr className="mt-4" />
                                                                <div className="mt-4 flex w-full items-center">
                                                                    <button
                                                                        className="w-full rounded-lg bg-[#AA2B2B] px-5  py-2.5 text-center font-poppins text-sm font-medium text-white outline-none  hover:bg-[#912b2b]"
                                                                        type="submit"
                                                                    >
                                                                        Tambah Produk
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                        <button
                                                            type="button"
                                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                            onClick={() => setOpenModalTambahProduk(false)}
                                                            ref={cancelButtonRefTambahProduk}
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
                    ) : (
                        <p>Hampers Tidak Ditemukan</p>
                    )}
                </div>
            </div>
        </div>
    );
}
