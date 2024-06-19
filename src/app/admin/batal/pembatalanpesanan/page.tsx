'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Fragment } from 'react';
import { Dialog, Listbox, Transition } from '@headlessui/react';
import { Transaction, TransactionFetch, transaction_data } from '@/dummy_data/transaction';

import axios from 'axios';
import { Alert } from '@mui/material';
import { TransactionDetail } from '@/dummy_data/transaction_detaill';
import { ProductFetch } from '@/dummy_data/product';
import { HampersFetch } from '@/dummy_data/hampers';

const ShowBatal: React.FC = () => {
    // jumlah menampilkan halaman
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(5);
    const option = [{ number: 5 }, { number: 10 }, { number: 20 }, { number: 50 }];

    // paginate data (data dibagi)
    const [filteredData, setFilteredData] = useState<TransactionDetail[]>([]);
    const [transactionData, setTransactionData] = useState<TransactionFetch[]>([]);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const [fetchProduct, setFetchProduct] = useState<ProductFetch[]>([]);
    const [fetchHampers, setFetchHampers] = useState<HampersFetch[]>([]);
    
    const fetchTransactions = () => {
        try {
            axios({
                method: 'get',
                url: `${apiUrl}/transaction_details/batal`,
            }).then((response) => {
                setFilteredData(response.data.transaction_details);
                console.log(response.data.transaction_details);
            });
            
            axios({
                method: 'get',
                url: `${apiUrl}/product`,
            }).then((response) => {
                setFetchProduct(response.data.product);
                console.log(response);
            });
            axios({
                method: 'get',
                url: `${apiUrl}/hampers`,
            }).then((response) => {
                setFetchHampers(response.data.hampers);
                console.log(response);
            });

            axios({
                method: 'get',
                url: `${apiUrl}/transactions`,
            }).then((response) => {
                setTransactionData(response.data.transactions);
                console.log(response);
            });
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const getProductNameById = (productId: number | null | undefined) => {
        if (!fetchProduct || fetchProduct.length === 0) return 'Loading...';
        const product = fetchProduct.find((product) => product.id === productId);
        return product ? product.name : 'Product Name Not Found';
    };
    const getHampersNameById = (hampersId: number | null | undefined) => {
        if (!fetchHampers || fetchHampers.length === 0) return 'Loading...';
        const hampers = fetchHampers.find((hampers) => hampers.id === hampersId);
        return hampers ? hampers.hampers_name : 'Hampers Name Not Found';
    };

    const getTotalPriceByInvoice = (invoice: string | null | undefined) => {
        if (!transactionData || transactionData.length === 0) return 'Loading...';
        const transactions = transactionData.find((transactions) => transactions.invoice_number === invoice);
        return transactions ? transactions.transfer_nominal : 'Transfer nominal Not Found';
    };

    // fetch item
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData ? filteredData.slice(indexOfFirstItem, indexOfLastItem) : [];

    // modal
    const [openUpdateModal, setopenUpdateModal] = useState<boolean>(false);
    const [updateModal, setUpdateModal] = useState<Transaction>();
    const cancelButtonEdit = useRef(null);

    // fetch transaction
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    // ALERT
    const [alertMessage, setAlertMessage] = useState('');

//UPDATE DATA
const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('riel');

    try {
        // Update the status
        const statusResponse = await axios.put(`${apiUrl}/transactions/status/updatebatal`);
        console.log(statusResponse);

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
                            <p className="text-[#AA2B2B] font-semibold">Data Transaksi Yang Harus Dibatalkan</p>
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
                            <div className="flex justify-end mt-2">
                            <button
                                className="font-poppins select-none rounded-lg bg-red-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                                onClick={() => setopenUpdateModal(true)}
                            >
                                Batalkan Pesanan
                            </button>

                            </div>
                            <table className="mt-3 table-auto w-full overflow-auto">
                                <thead>
                                    <tr className="border">
                                        <th className="p-8 border text-start font-semibold">Nomor Transaksi</th>
                                        <th className="p-8 border text-start font-semibold">Status Pengerjaan</th>
                                        <th className="p-8 border text-start font-semibold">Product Name</th>
                                        <th className="p-8 border text-start font-semibold">Jumlah Pembelian</th>
                                        <th className="p-8 border text-start font-semibold">Harga per pcs</th>
                                        <th className="p-8 border text-start font-semibold">Total Biaya</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((item, index) => (
                                        <tr key={item.id} className="border text-[#7D848C]">
                                            <td className="p-4 border">{item.invoice_number}</td>
                                            <td className="p-4 border">{item.transaction_status}</td>
                                            <td className="p-4 border">
                                            {item.hampers_id ? getHampersNameById(item.hampers_id) : getProductNameById(item.product_id)}
                                            </td>
                                            <td className="p-4 border">
                                            {item.hampers_id ? item.hampers_quantity : item.product_quantity}
                                            </td>
                                            <td className="p-4 border">
                                            {item.hampers_id ? item.hampers_price : item.product_price}
                                            </td>
                                            <td className="p-4 border ">{getTotalPriceByInvoice(item.invoice_number)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            
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
                                                onSubmit={handleUpdate}
                                            >
                                                <div className="grid grid-cols-1 gap-4">
                                                    <div className="h-min rounded-md border bg-white">
                                                        <div className="border-b p-4">
                                                            <p className=" text-[#AA2B2B] font-bold">
                                                                Update Status {updateModal?.invoice_number}
                                                            </p>
                                                        </div>
                                                        <div className="p-4 overflow-auto">
                                                            <div className='font-poppins text-[#AA2B2B]'>
                                                                <p className='font-poppins'>
                                                                    Apakah Anda yakin ingin membatalkan semua pesanan?
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                    <button
                                                        className=" rounded-md bg-[#AA2B2B] px-5 py-2.5 text-center font-semibold font-poppins text-sm text-white outline-none hover:bg-[#832a2a]"
                                                        type="submit"
                                                    >
                                                        Update
                                                    </button>

                                                    <button
                                                        className="mx-3 rounded-md bg-white px-5 py-2.5 text-center font-semibold font-poppins text-sm text-[#AA2B2B] outline-none hover:bg-gray-100 shadow-sm ring-2 ring-inset ring-[#AA2B2B]"
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
export default ShowBatal;
