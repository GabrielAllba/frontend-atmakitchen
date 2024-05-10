'use client';
import React, { useState, useEffect, useRef, Fragment } from 'react';
import Link from 'next/link';
import { Listbox } from '@headlessui/react';
import { Role } from '@/dummy_data/role';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import { ProductFetch } from '@/dummy_data/product';
import Image from 'next/image';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { GiConsoleController } from 'react-icons/gi';

const option = [{ number: 5 }, { number: 10 }, { number: 20 }, { number: 50 }];

const ListResep: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredData, setFilteredData] = useState<Role[]>([]);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(5);

    const [open, setOpen] = useState(false);
    const cancelButtonRef = useRef(null);
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    //modal detail
    const [openDetailModal, setOpenDetailModal] = useState<boolean>(false);
    const cancelButtonDetail = useRef(null);
    const [editDetail, setDetailResep] = useState<Role>();

    // useEffect(() => {
    //     if (editDetail) {
    //         const matchingResep = data.find((p) => p.id === editDetail.id);

    //         setDetailResep(matchingResep);
    //     }
    // }, [editDetail]);

    //modal Edit
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const cancelButtonEdit = useRef(null);
    const [editRole, setEditRole] = useState<Role>();
    const [RoleModal, setRoleModal] = useState<Role>();
    const [deleteRole, setDeleteRole] = useState<Role>();
    // const [satuanModal, setSatuanModal] = useState<Penitip>();

    // useEffect(() => {
    //     if (editResep) {
    //         const matchingResep = data.find((p) => p.id === editResep.id);

    //         setEditResep(matchingResep);
    //     }
    // }, [editResep]);

    // useEffect(() => {
    //     const fetchSearchResults = async () => {
    //         setFilteredData([]);
    //         setLoading(true);

    //         try {
    //             const response = await axios.get(apiUrl + '/resep/search', {
    //                 params: {
    //                     query: searchQuery,
    //                 },
    //             });
    //             setFilteredData(response.data.resep);
    //         } catch (error) {
    //             console.error('Error fetching products:', error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchSearchResults();
    // }, [searchQuery]);

    // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     e.preventDefault();
    //     setSearchQuery(e.target.value);
    //     if (searchQuery == '') {
    //     }
    // };

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [loading, setLoading] = useState<boolean>(true);

    const fetchRole = () => {
        try {
            setLoading(true);
            axios({
                method: 'get',
                url: `${apiUrl}/roles`,
            }).then((response) => {
                // Filter out roles with name "Owner"
                const filteredRoles = response.data.role.filter((role: { name: string; }) => role.name !== 'Owner');
                setFilteredData(filteredRoles);
                setLoading(false);
            });
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };
    

    useEffect(() => {
        fetchRole();
    }, []);

    //edit resep
    const [submitEditRole, setSubmitEditRole] = useState<Role>();
    const [alert, setAlert] = useState<boolean>(false);

    const handleUpdate = (e: React.FormEvent<HTMLFormElement>, itemId: number) => {
        e.preventDefault();
        console.log(submitEditRole);

        axios({
            method: 'put',
            url: apiUrl + '/roles/' + itemId,
            data: submitEditRole
        })
            .then((response) => {
                console.log(response);
                setAlert(true);
                fetchRole();
            })
            .catch((err) => {
                console.log(err);
            });
    };
    //delete item
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

    const handleDelete = async (id: number) => {
        try {
            const response = await axios.delete(apiUrl + `/roles/${id}`);
            fetchRole();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    //search

    return (
        <div className="flex bg-[#FFFCFC] min-h-screen font-poppins text-black p-8">
            <div className="w-full">
                <div className="card bg-primary border pb-8 rounded ">
                    <div className="card-body ">
                        <div className="flex items-center pb-4 flex-wrap">
                            <p className="text-[#AA2B2B] font-semibold">Data Produk</p>
                            <form>
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="search bg-white border p-2 outline-none w-16 sm:w-full"
                                    value={searchQuery}
                                    // onChange={handleSearchChange}
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
                                        <th className="p-8 border text-start font-semibold">No.</th>
                                        <th className="p-8 border text-start font-semibold">Jabatan</th>
                                        <th className="p-8 border text-start font-semibold">Gaji</th>
                                        <th className="p-8 border text-start font-semibold">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((item) => (
                                        <tr key={item.id} className="border text-[#7D848C]">
                                            <td className="p-4 border">{item.id}</td>
                                            <td className="p-4 border">{item.name}</td>
                                            <td className="p-4 border text-[#AA2B2B]">{item.gaji_harian}</td>
                                            <td className="p-4 border">
                                                <div className="flex justify-center gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setEditRole(item);
                                                            setSubmitEditRole(item);
                                                            setOpenEditModal(true);
                                                        }}
                                                        className="flex items-center rounded-md bg-[#E7F9FD] px-4 py-1 font-poppins w-fit text-[#1D6786]"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="mt-3 inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm   shadow-sm  bg-[#FDE7E7] hover:bg-[#AA2B2B] text-[#AA2B2B] hover:text-[#FDE7E7] sm:mt-0 sm:w-auto"
                                                        onClick={() => {
                                                            setDeleteRole(item);
                                                            setOpenDeleteModal(true);
                                                        }}
                                                        ref={cancelButtonRef}
                                                    >
                                                        Delete
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
                                                        <form
                                                            className="font-poppins"
                                                            onSubmit={(e) => handleUpdate(e, editRole?.id!)}
                                                        >
                                                            <div className="grid grid-cols-1 gap-4">
                                                                <div className="h-min rounded-md border bg-white">
                                                                    <div className="border-b p-4">
                                                                        <p className=" text-[#AA2B2B] ">
                                                                            Edit Jabatan{editRole?.name}
                                                                            
                                                                        </p>
                                                                    </div>
                                                                    <div className="p-4 overflow-auto">
                                                                        <div className="mb-4">
                                                                            <label
                                                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                                                htmlFor="nama"
                                                                            >
                                                                                Nama Jabatan
                                                                            </label>
                                                                            <input
                                                                                className="h- block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                                                id="foto_titipan"
                                                                                placeholder="foto_titipan"
                                                                                required
                                                                                type="text"
                                                                                value={submitEditRole?.name}
                                                                            ></input>
                                                                        </div>
                                                                        <div className="mb-4">
                                                                            <label
                                                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                                                htmlFor="foto_produk"
                                                                            >
                                                                                Gaji
                                                                            </label>
                                                                            <input
                                                                                className="h- block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                                                id="foto_titipan"
                                                                                placeholder=""
                                                                                required
                                                                                type="text"
                                                                                value={submitEditRole?.gaji_harian! || 0}
                                                                                onChange={(e) => {
                                                                                    setSubmitEditRole({ ...submitEditRole!, gaji_harian: parseFloat(e.target.value!)});
                                                                                }}
                                                                            ></input>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                <button
                                                                    className=" rounded-md bg-[#AA2B2B] px-5  py-2.5 text-center font-semibold font-poppins text-sm  text-white outline-none  hover:bg-[#832a2a]"
                                                                    type="submit"
                                                                    onClick={() => setOpenEditModal(false)}
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
                                                <>
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
                                                            onClick={() => {
                                                                setOpenDeleteModal(false);
                                                                handleDelete(deleteRole?.id!);
                                                            }}
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
                                                </>
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

export default ListResep;
