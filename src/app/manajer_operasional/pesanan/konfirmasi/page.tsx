'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image'

import { Fragment } from 'react';
import { Dialog, Listbox, Transition } from '@headlessui/react';
import { Transaction, TransactionFetch, transaction_data } from '@/dummy_data/transaction';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

import axios from 'axios';
import { Alert } from '@mui/material';

// Nomor Transaksi
// Nama Pemesan
// Jarak (Biaya Antar)
// Total Bayar
// Total Transfer
// Bukti Pembayaran
// Aksi (Terima / Tolak)

const KonfirmasiMO: React.FC = () => {
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
    const [openAcceptModal, setOpenAcceptModal] = useState<boolean>(false);
    const [acceptModal, setAcceptModal] = useState<Transaction>();
    const [rejectModal, setRejectModal] = useState<Transaction>();
    const [openRejectModal, setOpenRejectModal] = useState<boolean>(false);
    const cancelButtonRef = useRef(null);

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
                fetchAllImages(response.data.transactions);
                setTransactionData(response.data.transactions)
                console.log(response.data.transactions);
            });
        } catch (error) {
            console.error('Error fetching resep:', error);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    //ACCEPT DATA
    const handleAccept = async (userId: number) => {
        try {
            // Update the status
            const statusResponse = await axios.put(`${apiUrl}/transactions/status/${userId}/Diterima`);
            console.log(statusResponse);

            // Close the modal and fetch transactions
            setOpenAcceptModal(false);
            fetchTransactions();
        } catch (err) {
            console.log(err);
        }
    };

    //REJECT DATA
    // const handleReject = async (userId: number) => {
    //     try {
    //         // Update the status and return stock
    //         const rejectResponse = await axios.put(`${apiUrl}/transactions/reject/${userId}`);
    //         console.log(rejectResponse);
    
    //         // Close the modal and fetch transactions
    //         setOpenAcceptModal(false);
    //         fetchTransactions();
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };
    const handleReject = async (userId: number) => {
        try {
            // Update the status
            const statusResponse = await axios.put(`${apiUrl}/transactions/status/${userId}/Ditolak`);
            console.log(statusResponse);

            // Close the modal and fetch transactions
            setOpenAcceptModal(false);
            fetchTransactions();
        } catch (err) {
            console.log(err);
        }
    };

    //ALERT
    const [alertMessage, setAlertMessage] = useState('');

    const [transactionData, setTransactionData] = useState<TransactionFetch[]>([]);
    const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});

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

    const fetchAllImages = async (transactions: TransactionFetch[]) => {
        const imageUrls: { [key: string]: string } = {};
        for (const transaction of transactions) {
            if (transaction.payment_proof) {
                const imageUrl = await fetchImage(transaction.payment_proof);
                imageUrls[transaction.payment_proof] = imageUrl;
            }
        }
        setImageUrls(imageUrls);
        console.log(imageUrls);
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
                                        <th className="p-8 border text-start font-semibold">Nomor Transaksi</th>
                                        <th className="p-8 border text-start font-semibold">Nama Pemesan</th>
                                        <th className="p-8 border text-start font-semibold">Tanggal Pemesanan</th>
                                        <th className="p-8 border text-start font-semibold">Jarak - Biaya Antar</th>
                                        <th className="p-8 border text-start font-semibold">Total Bayar</th>
                                        <th className="p-8 border text-start font-semibold">Bukti Pembayaran</th>
                                        <th className="p-8 border text-start font-semibold">Poin</th>
                                        <th className="p-8 border text-start font-semibold">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((item, index) => (
                                        <tr key={item.id} className="border text-[#7D848C]">
                                            <td className="p-4 border">{item.invoice_number}</td>
                                            <td className="p-4 border ">{item.nama_penerima}</td>
                                            <td className="p-4 border ">{item.tanggal_pemesanan}</td>
                                            <td className="p-4 border ">{item.distance} km - Rp.{item.delivery_fee}</td>
                                            <td className="p-4 border">{item.total_price! + item.delivery_fee!}</td>
                                            <td className="p-4 border">
                                            {transactionData && transactionData.length > 0 && (
                                                <Image
                                                    src={
                                                        imageUrls[
                                                            transactionData.find(
                                                                (transaction) => transaction.id === item.id,
                                                            )?.payment_proof!
                                                        ] || ''
                                                    }
                                                    width={100}
                                                    height={50}
                                                    alt = "Bukti Bayar"
                                                />
                                            )}
                                            </td>
                                            <td className="p-4 border">{item.point_income}</td>
                                            
                                            <td className="p-4 border">
                                                {item.transaction_status === "Sudah Bayar" ? (
                                                <div className="flex gap-2">
                                                    <button
                                                    className="rounded-md relative h-12 w-40 overflow-hidden border border-green-600 text-green-600 transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-green-600 before:duration-300 before:ease-out hover:text-white hover:before:h-40 hover:before:w-40 hover:before:opacity-80"
                                                    onClick={() => {
                                                        setAcceptModal(item);
                                                        setOpenAcceptModal(true);
                                                    }}
                                                    >
                                                    <span className="relative z-10">Terima</span>
                                                    </button>
                                                    <button
                                                    className="rounded-md relative h-12 w-40 overflow-hidden border border-[#AA2B2B] text-[#AA2B2B] transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-[#AA2B2B] before:duration-300 before:ease-out hover:text-white hover:before:h-40 hover:before:w-40 hover:before:opacity-80"
                                                    onClick={() => {
                                                        setRejectModal(item);
                                                        setOpenRejectModal(true);
                                                    }}
                                                    >
                                                    <span className="relative z-10">Tolak</span>
                                                    </button>
                                                </div>
                                                ) : (
                                                <span>{item.transaction_status}</span>
                                                )}
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
                        <Transition.Root show={openAcceptModal} as={Fragment}>
                            <Dialog
                                as="div"
                                className="relative z-10"
                                initialFocus={cancelButtonRef}
                                onClose={setOpenAcceptModal}    
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
                                                                    Konfirmasi Terima Pesanan
                                                                </Dialog.Title>
                                                                <div className="mt-2">
                                                                    <p className="text-sm text-gray-500">
                                                                        Apakah anda yakin ingin menerima pesanan ini dan memberikan {acceptModal?.point_income!} poin?
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
                                                                setOpenAcceptModal(false);
                                                                handleAccept(acceptModal?.id!);
                                                            }}
                                                        >
                                                            Terima
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-[#AA2B2B] shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                            onClick={() => setOpenAcceptModal(false)}
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

                        <Transition.Root show={openRejectModal} as={Fragment}>
                            <Dialog
                                as="div"
                                className="relative z-10"
                                initialFocus={cancelButtonRef}
                                onClose={setOpenRejectModal}    
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
                                                                    Konfirmasi Tolak Pesanan
                                                                </Dialog.Title>
                                                                <div className="mt-2">
                                                                    <p className="text-sm text-gray-500">
                                                                        Apakah anda yakin ingin menolak pesanan ini dan mengembalikan Rp{rejectModal?.transfer_nominal!} ke saldo customer?
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
                                                                setOpenRejectModal(false);
                                                                handleReject(rejectModal?.id!);
                                                            }}
                                                        >
                                                            Tolak
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-[#AA2B2B] shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                            onClick={() => setOpenRejectModal(false)}
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
export default KonfirmasiMO;