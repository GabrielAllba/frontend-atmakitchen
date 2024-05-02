'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Fragment } from 'react';
import { Dialog, Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
// import { Penitip, penitip_data } from '@/dummy_data/penitip';
// import { SatuanTitipan, satuan_titipan_data } from '@/dummy_data/satuan_titipan';
import { Resep, resep_data } from '@/dummy_data/resep';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function TambahKaryawan() {
    // const [penitipSelected, setPenitipSelected] = useState<Penitip>(penitip_data[0]);
    // const [satuanSelected, setSatuanSelected] = useState<SatuanTitipan>(satuan_titipan_data[0]);

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredData, setFilteredData] = useState<Resep[]>(resep_data);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(5);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    useEffect(() => {
        const filtered = resep_data.filter((item) => item.nama.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredData(filtered);
    }, [searchQuery]);

    // modal
    // const [openModal, setOpenModal] = useState<boolean>(false);
    // const cancelButtonRef = useRef(null);
    // const [editTitipan, setEditTitipan] = useState<Titipan>();
    // const [penitipModal, setPenitipModal] = useState<Penitip>();
    // const [satuanModal, setSatuanModal] = useState<Penitip>();

    // useEffect(() => {
    //     if (editTitipan) {
    //         const matchingPenitip = penitip_data.find((p) => p.id === editTitipan.id_penitip);
    //         const matchingSatuan = satuan_titipan_data.find((p) => p.nama === editTitipan.satuan);

    //         setPenitipModal(matchingPenitip);
    //         setSatuanModal(matchingSatuan);
    //     }
    // }, [editTitipan]);

    const [openDetailModal, setOpenDetailModal] = useState<boolean>(false);
    const cancelButtonDetail = useRef(null);
    const [editDetail, setDetailResep] = useState<Resep>();
    const cancelButtonRef = useRef(null);

    useEffect(() => {
        if (editDetail) {
            const matchingResep = resep_data.find((p) => p.nomor === editDetail.nomor);

            setDetailResep(matchingResep);
        }
    }, [editDetail]);

    //modal Edit
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const cancelButtonEdit = useRef(null);
    const [editResep, setEditResep] = useState<Resep>();
    const [resepModal, setResepModal] = useState<Resep>();
    // const [satuanModal, setSatuanModal] = useState<Penitip>();

    useEffect(() => {
        if (editResep) {
            const matchingResep = resep_data.find((p) => p.nomor === editResep.nomor);

            setEditResep(matchingResep);
        }
    }, [editResep]);

    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

    return (
        <div className="flex bg-[#FFFCFC] min-h-screen font-poppins text-black p-8">
            <div className="w-full">
                <div className="card bg-primary border pb-8 rounded">
                    <div className="card-body">
                        <form className="font-poppins">
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                <div className="h-min rounded-md border bg-white">
                                    <div className="border-b p-4">
                                        <p className=" text-[#AA2B2B]">Data Karyawan</p>
                                    </div>
                                    <div className="p-4">
                                        <div className=" mb-4">
                                            <label
                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                htmlFor="jabatan_karyawan"
                                            >
                                                Jabatan Karyawan
                                            </label>
                                            <input
                                                className="h-12 block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                id="nama_karyawan"
                                                placeholder="Masukan Jabatan Karyawan"
                                                required
                                                type="text"
                                            ></input>
                                        </div>
                                        <div className=" mb-4">
                                            <label
                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                htmlFor="jabatan_karyawan"
                                            >
                                                Nama Karyawan
                                            </label>
                                            <input
                                                className="h-12 block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                id="nama_karyawan"
                                                placeholder="Masukan Nama Karyawan"
                                                required
                                                type="text"
                                            ></input>
                                        </div>
                                        <div className=" mb-4">
                                            <label
                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                htmlFor="foto_produk"
                                            >
                                                Foto Karyawan
                                            </label>
                                            <input
                                                className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                id="foto_titipan"
                                                placeholder="foto_titipan"
                                                required
                                                type="file"
                                            ></input>
                                        </div>
                                        <div className=" mb-4">
                                            <label
                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                htmlFor="foto_produk"
                                            >
                                                Email
                                            </label>
                                            <input
                                                className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                id="foto_titipan"
                                                placeholder="Masukan Email"
                                                required
                                                type="number"
                                            ></input>
                                        </div>
                                        <div className=" mb-4">
                                            <label
                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                htmlFor="foto_produk"
                                            >
                                                Username
                                            </label>
                                            <input
                                                className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                id="foto_titipan"
                                                placeholder="Masukan Username"
                                                required
                                                type="number"
                                            ></input>
                                        </div>
                                        <div className="mb-4 ">
                                            <label
                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                htmlFor="foto_produk"
                                            >
                                                Password
                                            </label>
                                            <input
                                                className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                id="foto_titipan"
                                                placeholder="Masukan Password"
                                                required
                                                type="number"
                                            ></input>
                                        </div>
                                        <div className="mb-4 ">
                                            <label
                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                htmlFor="foto_produk"
                                            >
                                                Tanggal Lahir
                                            </label>
                                            <input
                                                // datepicker
                                                className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                id="foto_titipan"
                                                placeholder="Masukan Tanggal Lahir"
                                                required
                                                type="number"
                                            ></input>
                                        </div>
                                        <div className="mb-4 ">
                                            <label
                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                htmlFor="foto_produk"
                                            >
                                                No. Telepon
                                            </label>
                                            <input
                                                className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                id="foto_titipan"
                                                placeholder="Masukan Nomor Telepon"
                                                required
                                                type="number"
                                            ></input>
                                        </div>
                                        <div className="mt-4 flex w-full items-center">
                                            <button
                                                className="w-full rounded-lg bg-[#AA2B2B] px-5  py-2.5 text-center font-poppins text-sm font-medium text-white outline-none  hover:bg-[#832a2a]"
                                                type="submit"
                                            >
                                                Tambah Produk
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-md border bg-white">
                                    <div className="border-b p-4">
                                        <p className=" text-[#AA2B2B] ">List Titipan</p>
                                    </div>
                                    <div className="p-4">
                                        <div className="overflow-auto">
                                            <table className="table-auto w-full overflow-auto">
                                                <thead>
                                                    <tr className="border">
                                                        <th className="p-8 border text-start font-semibold">No.</th>
                                                        <th className="p-8 border text-start font-semibold">
                                                            Nama Produk
                                                        </th>
                                                        <th className="p-8 border text-start font-semibold">
                                                            Detail Resep & Cara Pembuatan
                                                        </th>
                                                        <th className="p-8 border text-start font-semibold">
                                                            Foto Produk
                                                        </th>
                                                        <th className="p-8 border text-start font-semibold">Aksi</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentItems.map((item) => (
                                                        <tr key={item.nomor} className="border text-[#7D848C]">
                                                            <td className="p-4 border">{item.nomor}</td>
                                                            <td className="p-4 border">{item.nama}</td>
                                                            <td className="p-4 border text-[#AA2B2B]">
                                                                <button
                                                                    id="openResep"
                                                                    onClick={() => {
                                                                        setDetailResep(item);
                                                                        setOpenDetailModal(true);
                                                                    }}
                                                                    className="bg-[#FDE7E7] hover:bg-[#AA2B2B] text-[#AA2B2B] hover:text-[#FDE7E7] font-poppins py-2 px-4 rounded-full"
                                                                >
                                                                    Klik Untuk Lihat Resep
                                                                </button>
                                                            </td>
                                                            <td className="p-4 border">
                                                                <Image
                                                                    src={item.foto}
                                                                    width={100}
                                                                    height={50}
                                                                    alt={item.nama}
                                                                />
                                                            </td>
                                                            <td className="p-4 border">
                                                                <div className="flex gap-2">
                                                                    <button
                                                                        onClick={() => {
                                                                            setEditResep(item);
                                                                            setOpenEditModal(true);
                                                                        }}
                                                                        className="flex items-center rounded-md bg-[#E7F9FD] px-4 py-1 font-poppins w-fit text-[#1D6786]"
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                    <button
                                                                        onClick={() => {
                                                                            setOpenDeleteModal(true);
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
                                            <div className="flex justify-end my-8">
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
                                                        currentPage === Math.ceil(filteredData.length / itemsPerPage)
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
                            <hr className="mt-4" />
                        </form>
                        <Transition.Root show={openDetailModal} as={Fragment}>
                            <Dialog
                                as="div"
                                className="relative z-10"
                                initialFocus={cancelButtonRef}
                                onClose={setOpenDetailModal}
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
                                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                            <Dialog.Title
                                                                as="h3"
                                                                className="text-base font-semibold leading-6 text-gray-900"
                                                            >
                                                                Resep {editDetail?.nama}
                                                            </Dialog.Title>
                                                            <div className="mt-2 flex justify-center">
                                                                {/* <Image
                                                                    className="rounded-xl"
                                                                    src={editDetail?.foto}
                                                                    width={200}
                                                                    height={50}
                                                                    alt={editDetail?.nama}
                                                                /> */}
                                                            </div>
                                                            <div>
                                                                <h3 className="text-poppins">Bahan - Bahan :</h3>
                                                                <p className="text-sm text-poppins text-gray-500 mt-4">
                                                                    {editDetail?.bahan};
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                    <button
                                                        type="button"
                                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                                        onClick={() => setOpenDetailModal(false)}
                                                    >
                                                        Back
                                                    </button>
                                                </div>
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition.Root>

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
                                                        <form className="font-poppins">
                                                            <div className="grid grid-cols-1 gap-4">
                                                                <div className="h-min rounded-md border bg-white">
                                                                    <div className="border-b p-4">
                                                                        <p className=" text-[#AA2B2B] ">
                                                                            {' '}
                                                                            Edit {editResep?.nama}
                                                                        </p>
                                                                    </div>
                                                                    <div className="p-4 overflow-auto">
                                                                        <div className="mb-4">
                                                                            <label
                                                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                                                htmlFor="nama"
                                                                            >
                                                                                Nama Produk
                                                                            </label>
                                                                            <input
                                                                                className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                                                id="nama_produk"
                                                                                placeholder="Nama Produk"
                                                                                required
                                                                                value={editResep?.nama}
                                                                                type="text"
                                                                            ></input>
                                                                        </div>
                                                                        <div className="mb-4 ">
                                                                            <label
                                                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                                                htmlFor="nama_produk"
                                                                            >
                                                                                Foto Produk
                                                                            </label>
                                                                            <div className="flex justify-center m-4">
                                                                                {editResep?.foto && (
                                                                                    <div className="my-4 ">
                                                                                        <Image
                                                                                            alt="Foto Titipan"
                                                                                            src={editResep.foto}
                                                                                            height={200}
                                                                                            width={200}
                                                                                        ></Image>
                                                                                    </div>
                                                                                )}
                                                                            </div>

                                                                            <input
                                                                                className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                                                id="foto_titipan"
                                                                                placeholder="foto_titipan"
                                                                                required
                                                                                type="file"
                                                                            ></input>
                                                                        </div>
                                                                        <div className="mb-4">
                                                                            <label
                                                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                                                htmlFor="foto_produk"
                                                                            >
                                                                                Bahan - Bahan:
                                                                            </label>
                                                                            <div className="overflow-y-auto h-full">
                                                                                <input
                                                                                    className="text-ellipsis block w-full rounded-lg border border-[#DADDE2] bg-white p-2.5 font-poppins text-sm text-black outline-none "
                                                                                    id="foto_titipan"
                                                                                    placeholder="foto_titipan"
                                                                                    required
                                                                                    type="description"
                                                                                    value={editResep?.bahan}
                                                                                ></input>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-4">
                                                                            <label
                                                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                                                htmlFor="foto_produk"
                                                                            >
                                                                                Langkah Pembuatan:
                                                                            </label>
                                                                            <input
                                                                                className="h- block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                                                id="foto_titipan"
                                                                                placeholder="foto_titipan"
                                                                                required
                                                                                type="description"
                                                                                value={editResep?.bahan}
                                                                            ></input>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
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
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition.Root>

                        <Transition.Root show={openDeleteModal} as={Fragment}>
                            <Dialog
                                as="div"
                                className="relative z-10"
                                initialFocus={cancelButtonRef}
                                onClose={setOpenDeleteModal}
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
                                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                            <ExclamationTriangleIcon
                                                                className="h-6 w-6 text-[#AA2B2B]"
                                                                aria-hidden="true"
                                                            />
                                                        </div>
                                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                            <Dialog.Title
                                                                as="h3"
                                                                className="text-base font-semibold leading-6 text-gray-900"
                                                            >
                                                                Hapus Resep
                                                            </Dialog.Title>
                                                            <div className="mt-2">
                                                                <p className="text-sm text-gray-500">
                                                                    Apakah anda yakin ingin menghapus resep ini ?
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                    <button
                                                        type="button"
                                                        className="inline-flex w-full justify-center rounded-md bg-[#AA2B2B] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                                        onClick={() => setOpenDeleteModal(false)}
                                                    >
                                                        Hapus
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-[#AA2B2B] shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                        onClick={() => setOpenDeleteModal(false)}
                                                        ref={cancelButtonRef}
                                                    >
                                                        Batal
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
