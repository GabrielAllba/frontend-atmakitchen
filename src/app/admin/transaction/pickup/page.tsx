'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Fragment } from 'react';
import { Dialog, Listbox, Transition } from '@headlessui/react';
import { Transaction, TransactionFetch, transaction_data } from '@/dummy_data/transaction';

import axios from 'axios';
import { Alert } from '@mui/material';

const EditPickup: React.FC = () => {
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
                url: `${apiUrl}/transactions/tampil/Siap di-pickup`,
            }).then((response) => {
                setFilteredData(response.data.transactions);
                fetchAllImages(response.data.transactions);
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
    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>, userId: number, status: string) => {
        e.preventDefault();
        console.log('riel');

        try {
            // Update the status
            const statusResponse = await axios.put(`${apiUrl}/transactions/status/${userId}/${status}`);
            console.log(statusResponse);

            // Close the modal and fetch transactions
            setopenUpdateModal(false);
            fetchTransactions();
        } catch (err) {
            console.log(err);
        }
    };

    //ALERT
    const [alertMessage, setAlertMessage] = useState('');


    // FETCH IMAGE
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
    };
    

    return (
        <div className="flex bg-[#FFFCFC] min-h-screen font-poppins text-black p-8">
            <div className="w-full">
                <div className="card bg-primary border pb-8 rounded ">
                    <div className="card-body ">
                        <div className="flex items-center pb-4 flex-wrap">
                            <p className="text-[#AA2B2B] font-semibold">Data Transaksi dengan status Diproses</p>
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
                                        <th className="p-8 border text-start font-semibold">Status</th>
                                        <th className="p-8 border text-start font-semibold">Nama Penerima</th>
                                        <th className="p-8 border text-start font-semibold">Nomor Telepon</th>
                                        <th className="p-8 border text-start font-semibold">Alamat Penerima</th>
                                        <th className="p-8 border text-start font-semibold">Total Biaya</th>
                                        <th className="p-8 border text-start font-semibold">Bukti Pembayaran</th>
                                        <th className="p-8 border text-start font-semibold">Nominal transfer</th>
                                        <th className="p-8 border text-start font-semibold">Tips</th>
                                        <th className="p-8 border text-start font-semibold">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((item, index) => (
                                        <tr key={item.id} className="border text-[#7D848C]">
                                            <td className="p-4 border">{item.id}</td>
                                            <td className="p-4 border">{item.invoice_number}</td>
                                            <td className="p-4 border">{item.transaction_status}</td>
                                            <td className="p-4 border">{item.nama_penerima}</td>
                                            <td className="p-4 border">{item.no_telp_penerima}</td>
                                            <td className="p-4 border">{item.alamat_penerima}</td>
                                            <td className="p-4 border ">{item.transfer_nominal}</td>
                                            <td className="p-4 border ">
                                                <Image
                                                    className="rounded"
                                                    src={imageUrls[item.payment_proof]}
                                                    height={100}
                                                    width={200}
                                                    alt={'image-' + index}
                                                    />
                                            </td>
                                            <td className="p-4 border ">
                                            {item.user_transfer === 0 ? (
                                                    <div
                                                    className="relative grid select-none items-center font-bold whitespace-nowrap rounded-lg bg-[#AA2B2B] py-1.5 px-3 font-sans text-xs font-poppins  text-white">
                                                    <span className="text-center">Pembayaran Belum di Verifikasi</span>
                                                  </div>
                                                ) : (
                                                    item.user_transfer
                                                )}
                                                </td>
                                            <td className="p-4 border ">{item.tips}</td>
                                            <td className="p-4 border">
                                                <div className="flex gap-2">
                                                    <button
                                                        className="rounded-md relative h-12 w-40 overflow-hidden border border-[#AA2B2B] text-[#AA2B2B]  transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-[#AA2B2B] before:duration-300 before:ease-out hover:text-white hover:before:h-40 hover:before:w-40 hover:before:opacity-80"
                                                        onClick={() => {
                                                            setUpdateModal(item);
                                                            setopenUpdateModal(true);
                                                        }}
                                                    >
                                                        <span className="relative z-10">Update Pick Up Status</span>
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
                                                            onSubmit={(e) => handleUpdate(e, updateModal?.id!,"Sudah di-pickup")}
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
                                                                            <p className='font-poppins'>Apakah Anda yakin ingin mengupdate status menjadi <p className='font-bold font-poppins'>Sudah di-pickup</p> ? </p>
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
export default EditPickup;
