'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

import { Fragment } from 'react';
import { Dialog, Listbox, Transition } from '@headlessui/react';
import { Transaction, transaction_data } from '@/dummy_data/transaction';

import axios from 'axios';
import { Alert } from '@mui/material';

const EditJarak: React.FC = () => {
    //jumlah menampilkan halaman
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(5);
    const option = [{ number: 5 }, { number: 10 }, { number: 20 }, { number: 50 }];
    //paginate data (data dibagi)
    const [filteredData, setFilteredData] = useState<Transaction[]>(transaction_data);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    //fetch item
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    //modal
    const [openUpdateModal, setopenUpdateModal] = useState<boolean>(false);
    const [updateModal, setUpdateModal] = useState<Transaction>();
    const cancelButtonEdit = useRef(null);

    //fetch transaction
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const fetchTransactions = () => {
        try {
            // setLoading(true);
            axios({
                method: 'get',
                url: `${apiUrl}/transactions`,
            }).then((response) => {
                setFilteredData(response.data.transactions);
                console.log(response.data.transactions);
            });
        } catch (error) {
            console.error('Error fetching resep:', error);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    //UPDATE DATA
    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>, userId: number) => {
        e.preventDefault();
        console.log('riel');

        try {
            // Update the transaction
            const transactionResponse = await axios.put(`${apiUrl}/transactions/${userId}`, updateModal);
            console.log(transactionResponse);

            // Update the status
            const statusResponse = await axios.put(`${apiUrl}/transactions/status/${userId}/Menunggu Pembayaran`);
            console.log(statusResponse);

            const updateTransferNominalResponse = await axios.put(`${apiUrl}/transactions/transfer_nominal/${userId}`);
            console.log(updateTransferNominalResponse);

            // Close the modal and fetch transactions
            setopenUpdateModal(false);
            fetchTransactions();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex bg-[#FFFCFC] min-h-screen font-poppins text-black p-8">
            <div className="w-full">
                <div className="card bg-primary border pb-8 rounded ">
                    <div className="card-body ">
                        <div className="flex items-center pb-4 flex-wrap">
                            <p className="text-[#AA2B2B] font-semibold">Data Transaksi</p>
                            {/* <form>
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="search bg-white border p-2 outline-none w-16 sm:w-full"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                            </form> */}
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
                                        <th className="p-8 border text-start font-semibold">Nomor Transaksi</th>
                                        <th className="p-8 border text-start font-semibold">Nama Pemesan</th>
                                        <th className="p-8 border text-start font-semibold">Metode Pengiriman</th>
                                        <th className="p-8 border text-start font-semibold">Jarak</th>
                                        <th className="p-8 border text-start font-semibold">Biaya Antar</th>
                                        <th className="p-8 border text-start font-semibold">Total Bayar</th>
                                        <th className="p-8 border text-start font-semibold">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((item, index) => (
                                        <tr key={item.id} className="border text-[#7D848C]">
                                            <td className="p-4 border">{item.id}</td>
                                            <td className="p-4 border">
                                                {item.invoice_number}
                                                {/* {productData.find((product) => product.id === item.product_id)?.name ||
                                                    'Product Not Found'} */}
                                            </td>
                                            <td className="p-4 border ">{item.nama_penerima}</td>
                                            <td className="p-4 border ">{item.alamat_penerima}</td>
                                            <td className="p-4 border">
                                                {item.distance === 0 ? (
                                                    <span className="font-bold text-[#AA2B2B]">Belum di update</span>
                                                ) : (
                                                    item.distance
                                                )}
                                            </td>
                                            <td className="p-4 border">{item.delivery_fee}</td>
                                            <td className="p-4 border">{item.total_price! + item.delivery_fee!}</td>
                                            <td className="p-4 border">
                                                <div className="flex gap-2">
                                                    <button
                                                        className="rounded-md relative h-12 w-40 overflow-hidden border border-[#AA2B2B] text-[#AA2B2B]  transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-[#AA2B2B] before:duration-300 before:ease-out hover:text-white hover:before:h-40 hover:before:w-40 hover:before:opacity-80"
                                                        onClick={() => {
                                                            setUpdateModal(item);
                                                            setopenUpdateModal(true);
                                                        }}
                                                    >
                                                        <span className="relative z-10">Update Jarak</span>
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
                        <Transition.Root show={openUpdateModal} as={Fragment}>
                            <Dialog
                                as="div"
                                className="relative z-10"
                                initialFocus={cancelButtonEdit}
                                onClose={setopenUpdateModal}
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
                                                            className="space-y-6"
                                                            action="#"
                                                            method="PUT"
                                                            onSubmit={(e) => handleUpdate(e, updateModal?.id!)}
                                                        >
                                                            <div className="grid grid-cols-1 gap-4">
                                                                <div className="h-min rounded-md border bg-white">
                                                                    <div className="border-b p-4">
                                                                        <p className=" text-[#AA2B2B] font-bold">
                                                                            Edit Jarak pada Transaksi nomor{' '}
                                                                            {updateModal?.invoice_number}
                                                                        </p>
                                                                    </div>
                                                                    <div className="p-4 overflow-auto">
                                                                        <div className="mb-4">
                                                                            <label
                                                                                className="mb-2 font-poppins text-sm font-medium text-[#111827]"
                                                                                htmlFor="nama"
                                                                            >
                                                                                Jarak
                                                                            </label>
                                                                            <input
                                                                                className=" w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                                                id="nama_bahan"
                                                                                placeholder="Nama Bahan"
                                                                                required
                                                                                value={updateModal?.distance || 0}
                                                                                type="number"
                                                                                onChange={(e) => {
                                                                                    const { value } = e.target;
                                                                                    const distance = parseFloat(value);

                                                                                    let deliveryFee = 0;

                                                                                    if (distance <= 5) {
                                                                                        deliveryFee = 10000;
                                                                                    } else if (
                                                                                        distance > 5 &&
                                                                                        distance <= 10
                                                                                    ) {
                                                                                        deliveryFee = 15000;
                                                                                    } else if (
                                                                                        distance > 10 &&
                                                                                        distance <= 15
                                                                                    ) {
                                                                                        deliveryFee = 20000;
                                                                                    } else {
                                                                                        deliveryFee = 25000;
                                                                                    }

                                                                                    let biayaAntar =
                                                                                        updateModal?.total_price! +
                                                                                        distance;
                                                                                    setUpdateModal({
                                                                                        ...updateModal!,
                                                                                        distance: distance,
                                                                                        delivery_fee: deliveryFee,
                                                                                    });
                                                                                }}
                                                                            ></input>
                                                                        </div>

                                                                        {/* <div className="mb-4">
                                                                            <label
                                                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                                                htmlFor="stok"
                                                                            >
                                                                                Biaya Jarak
                                                                            </label>
                                                                            <input
                                                                                className="block w-full rounded-lg border border-[#DADDE2] bg-white p-2.5 font-poppins text-sm text-black outline-none"
                                                                                id="stok_bahan"
                                                                                placeholder="Stok Bahan"
                                                                                required
                                                                                value={updateModal?.delivery_fee!}
                                                                                type="number"
                                                                                onChange={(e) => {
                                                                                    const { value } = e.target;

                                                                                    setUpdateModal({
                                                                                        ...updateModal!,
                                                                                        delivery_fee: parseFloat(value),
                                                                                    });

                                                                                }}
                                                                            ></input>
                                                                        </div> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                <button
                                                                    className=" rounded-md bg-[#AA2B2B] px-5  py-2.5 text-center font-semibold font-poppins text-sm  text-white outline-none  hover:bg-[#832a2a]"
                                                                    type="submit"
                                                                    onClick={() => setopenUpdateModal(false)}
                                                                >
                                                                    Save
                                                                </button>

                                                                <button
                                                                    className="mx-3 rounded-md bg-white px-5  py-2.5 text-center font-semibold font-poppins text-sm  text-[#AA2B2B] outline-none  hover:bg-gray-100 shadow-sm ring-2 ring-inset ring-[#AA2B2B]"
                                                                    type="button"
                                                                    onClick={() => setopenUpdateModal(false)}
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
export default EditJarak;
