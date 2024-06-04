'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

import { Fragment } from 'react';
import { Dialog, Listbox, Transition } from '@headlessui/react';
import { Transaction, transaction_data } from '@/dummy_data/transaction';

import axios from 'axios';
import { Alert } from '@mui/material';
import { TransactionDetail } from '@/dummy_data/transaction_detaill';
import Invoice from '@/app/components/customer/Invoice';
import { BahanResep, ResepBahan } from '@/dummy_data/resep_bahan';

const HomeMO: React.FC = () => {
    const cancelButtonRef = useRef(null);

    const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});
    //jumlah menampilkan halaman
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(5);
    const option = [{ number: 5 }, { number: 10 }, { number: 20 }, { number: 50 }];
    //paginate data (data dibagi)
    const [filteredData, setFilteredData] = useState<TransactionDetail[]>([]);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    //fetch item
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    //modal
    const [openUpdateModal, setopenUpdateModal] = useState<boolean>(false);
    const [updateModal, setUpdateModal] = useState<TransactionDetail>();
    const cancelButtonEdit = useRef(null);

    const [fetchTransaction, setFetchTransaction] = useState<Transaction[]>([]);
    const [fetchTransactionDetail, setFetchTransactionDetail] = useState<TransactionDetail[]>([]);

    const [productId, setProductId] = useState<number>(0);
    const [hampersId, setHampersId] = useState<number>(0);
    const [jumlahBarang, setJumlahBarang] = useState<number>(0);
    //fetch transaction
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');

        try {
            axios({
                method: 'get',
                url: `${apiUrl}/transactions`,
            }).then((response) => {
                setFetchTransaction(response.data.transactions);
            });
        } catch (error) {
            console.error('Error fetching carts:', error);
        }

        try {
            axios({
                method: 'get',
                url: `${apiUrl}/transaction_details/proses_today/` + getToday(),
            }).then((response) => {
                setFetchTransactionDetail(response.data.transaction_details);
                setFilteredData(response.data.transaction_details);
            });
        } catch (error) {
            console.error('Error fetching transaction details by user:', error);
        }
    }, []);

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
        } catch (err) {
            console.log(err);
        }
    };

    const getToday = (): string => {
        const today = new Date();
        today.setDate(today.getDate());
        return today.toISOString().split('T')[0];
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const handleNota = (invoiceNumber: string) => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        setEmailCustomer(user.email);

        const transaksi = fetchTransaction.filter((i) => i.invoice_number === invoiceNumber);
        const detail_transaksi = fetchTransactionDetail.filter((detail) => detail.invoice_number === invoiceNumber);
        setNotaTransaksi({ transaksi, detail_transaksi });
    };
    interface Nota {
        transaksi: Transaction[];
        detail_transaksi: TransactionDetail[];
    }

    const [notaTransaksi, setNotaTransaksi] = useState<Nota>();
    const [emailCustomer, setEmailCustomer] = useState<string>();

    const [open, setOpen] = useState(false);
    const [clickedIdTransaksi, setClickedIdTransaksi] = useState<string>('');

    const [cekBahanResep, setCekBahanResep] = useState<BahanResep[]>([]);
    const [transactionDetailId, setTransactionDetailId] = useState(0);

    useEffect(() => {
        const getResepBahan = async () => {
            const response = await axios.get(`${apiUrl}/bahan_resep/${productId}`);
            setCekBahanResep(response.data.bahan_resep);
            console.log('adfasdfasdf');
            console.log(cekBahanResep);
        };
        if (productId != 0) {
            getResepBahan();
        }
    }, [productId]);

    useEffect(() => {}, [hampersId]);

    return (
        <div className="flex bg-[#FFFCFC] min-h-screen font-poppins text-black p-8">
            <div className="w-full">
                <div className="card bg-primary border pb-8 rounded ">
                    <div className="card-body ">
                        <div className="flex justify-center pb-4 flex-wrap flex-col">
                            <p className="text-[#AA2B2B] font-semibold">Transaksi yang perlu diproses hari ini</p>
                            <p>{formatDate(getToday())}</p>
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
                                        <th className="p-8 border text-start font-semibold">
                                            Produk / Hampers / Titipan
                                        </th>
                                        <th className="p-8 border text-start font-semibold">Jenis Order</th>
                                        <th className="p-8 border text-start font-semibold">Tanggal Pengiriman</th>
                                        <th className="p-8 border text-start font-semibold">Harga Satuan</th>
                                        <th className="p-8 border text-start font-semibold">Kuantitas</th>
                                        <th className="p-8 border text-start font-semibold">Status</th>
                                        <th className="p-8 border text-start font-semibold">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((item, index) => (
                                        <tr key={item.id} className="border text-[#7D848C]">
                                            <td className="p-4 border">{item.id}</td>
                                            <td
                                                className="p-4 border"
                                                onClick={() => {
                                                    setOpen(true);
                                                    setClickedIdTransaksi(item.invoice_number!);
                                                    handleNota(item.invoice_number!);
                                                }}
                                            >
                                                {item.invoice_number}
                                                {/* {productData.find((product) => product.id === item.product_id)?.name ||
                                                    'Product Not Found'} */}
                                            </td>

                                            <td className="p-4 border">
                                                {item.product ? item.product?.name : item.hampers?.hampers_name}
                                            </td>

                                            <td className="p-4 border">
                                                {item.jenis_item == 'Hampers' && (
                                                    <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                                                        {item.jenis_item}
                                                    </span>
                                                )}

                                                {item.jenis_item == 'Produk Toko' && (
                                                    <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
                                                        {item.jenis_item}
                                                    </span>
                                                )}

                                                {item.jenis_item == 'Titipan' && (
                                                    <span className="inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10">
                                                        {item.jenis_item}
                                                    </span>
                                                )}
                                                {item.jenis == 'pre-order' && (
                                                    <p className="flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                                        {item.jenis}
                                                    </p>
                                                )}
                                                {item.jenis == 'ready stock' && (
                                                    <p className="flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                        {item.jenis}
                                                    </p>
                                                )}
                                            </td>
                                            <td className="p-4 border">{formatDate(item.tanggal_pengiriman!)}</td>
                                            <td className="p-4 border">
                                                {item.product_price && (
                                                    <p>Rp. {item.product_price!.toLocaleString('id-ID')}</p>
                                                )}
                                                {item.hampers_price && (
                                                    <p>Rp. {item.hampers_price!.toLocaleString('id-ID')}</p>
                                                )}
                                            </td>
                                            <td className="p-4 border">
                                                {item.product && item.product_quantity}
                                                {item.hampers && item.hampers_quantity}
                                            </td>
                                            <td className="p-4 border">
                                                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                    {item.transaction_status}
                                                </span>
                                            </td>

                                            <td className="p-4 border">
                                                <div className="flex gap-2">
                                                    {item.jenis_item == 'Titipan' && (
                                                        <button
                                                            className="rounded relative p-2 overflow-hidden border border-[#AA2B2B] text-[#AA2B2B]  "
                                                            onClick={() => {
                                                                console.log(item);
                                                            }}
                                                        >
                                                            <span>Proses</span>
                                                        </button>
                                                    )}
                                                    {item.jenis_item != 'Titipan' && (
                                                        <button
                                                            className="rounded relative p-2 overflow-hidden border border-[#AA2B2B] text-[#AA2B2B]  "
                                                            onClick={() => {
                                                                setUpdateModal(item);
                                                                setopenUpdateModal(true);
                                                                console.log('halo');
                                                                setJumlahBarang(
                                                                    item.product_quantity! | item.hampers_quantity!,
                                                                );
                                                                console.log(productId);
                                                                {
                                                                    item.product != null &&
                                                                        setProductId(item.product.id!);
                                                                    setTransactionDetailId(item.id!);
                                                                    console.log(transactionDetailId);
                                                                }
                                                                {
                                                                    item.product != null &&
                                                                        setHampersId(item.hampers?.id!);
                                                                    setTransactionDetailId(item.id!);
                                                                }

                                                                console.log(item);
                                                            }}
                                                        >
                                                            <span>Proses</span>
                                                        </button>
                                                    )}
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
                                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
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
                                                                            Cek Bahan Baku Pada{' '}
                                                                            {updateModal?.product
                                                                                ? updateModal.product?.name
                                                                                : updateModal?.hampers?.hampers_name}
                                                                            ({jumlahBarang})
                                                                        </p>
                                                                    </div>
                                                                    <div className="p-4 overflow-auto">
                                                                        <table className="min-w-full border-collapse block table">
                                                                            <thead className="table-header-group">
                                                                                <tr className="border  table-row">
                                                                                    <th className="bg-gray-200 p-2 text-gray-600 font-bold border border-gray-300  table-cell">
                                                                                        Nama Bahan
                                                                                    </th>
                                                                                    <th className="bg-gray-200 p-2 text-gray-600 font-bold border border-gray-300  table-cell">
                                                                                        Jumlah Dibutuhkan
                                                                                    </th>
                                                                                    <th className="bg-gray-200 p-2 text-gray-600 font-bold border border-gray-300  table-cell">
                                                                                        Stok
                                                                                    </th>
                                                                                    <th className="bg-gray-200 p-2 text-gray-600 font-bold border border-gray-300  table-cell">
                                                                                        Kekurangan
                                                                                    </th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody className="table-row-group">
                                                                                {cekBahanResep.map((bahan, index) => (
                                                                                    <tr
                                                                                        key={index}
                                                                                        className="border border-none table-row"
                                                                                    >
                                                                                        <td className="p-2 border border-gray-300 text-left table-cell text-gray-500">
                                                                                            {bahan.bahan?.nama}
                                                                                        </td>
                                                                                        <td className="p-2 border border-gray-300 text-left  table-cell text-gray-500">
                                                                                            <b>
                                                                                                {bahan.quantity! *
                                                                                                    jumlahBarang +
                                                                                                    ' '}
                                                                                            </b>
                                                                                            @
                                                                                            {bahan.quantity +
                                                                                                ' ' +
                                                                                                bahan.bahan?.satuan}
                                                                                        </td>
                                                                                        <td className="p-2 border border-gray-300 text-left  table-cell text-gray-500">
                                                                                            {bahan.bahan?.stok}
                                                                                        </td>
                                                                                        <td className="p-2 border border-gray-300 text-left  table-cell text-gray-500">
                                                                                            {bahan.quantity! *
                                                                                                jumlahBarang -
                                                                                                bahan.bahan?.stok! <
                                                                                            0
                                                                                                ? '-'
                                                                                                : bahan.quantity! *
                                                                                                      jumlahBarang -
                                                                                                  bahan.bahan?.stok! +
                                                                                                  ' ' +
                                                                                                  bahan.bahan?.satuan}
                                                                                        </td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                <button
                                                                    className=" rounded-md bg-[#AA2B2B] px-5  py-2.5 text-center font-semibold font-poppins text-sm  text-white outline-none  hover:bg-[#832a2a]"
                                                                    type="submit"
                                                                    onClick={() => setopenUpdateModal(false)}
                                                                >
                                                                    Proses
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

                        <Transition.Root show={open} as={Fragment}>
                            <Dialog className="relative z-50" initialFocus={cancelButtonRef} onClose={setOpen}>
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

                                <div className="fixed inset-0 z-10 w-screen overflow-y-auto font-poppins">
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
                                            <Dialog.Panel className="relative transform rounded-lg bg-white text-left  transition-all sm:my-8 w-full max-w-4xl ">
                                                <Invoice
                                                    nota={notaTransaksi!}
                                                    email={emailCustomer!}
                                                    id={clickedIdTransaksi}
                                                ></Invoice>
                                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                    <button
                                                        type="button"
                                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm  text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        Tutup
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
};
export default HomeMO;
