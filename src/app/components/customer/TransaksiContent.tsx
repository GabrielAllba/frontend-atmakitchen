'use client';

import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { Fragment, useEffect, useRef, useState } from 'react';
import { PiTrashLight } from 'react-icons/pi';
import Invoice from './Invoice';
import { Hampers } from '@/dummy_data/hampers';
import { Transaction } from '@/dummy_data/transaction';
import axios from 'axios';
import { TransactionDetail } from '@/dummy_data/transaction_detaill';

const option = [
    { opsi: 'Menunggu Jarak' },
    { opsi: 'Menunggu Pembayaran' },
    { opsi: 'Sudah Bayar' },
    { opsi: 'Pembayaran Terverifikasi' },
    { opsi: 'Diterima' },
    { opsi: 'Diproses' },
    { opsi: 'Siap di-pickup' },
    { opsi: 'Sedang dikirim' },
    { opsi: 'Sudah di-pickup' },
    { opsi: 'Selesai' },
];

interface Nota {
    transaksi: Transaction[];
    detail_transaksi: TransactionDetail[];
}

export default function TransaksiContent({ status }: { status: string }) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [testImage, setTestImage] = useState<string[]>([]);
    const [emailCustomer, setEmailCustomer] = useState<string>();

    const [fetchTransaction, setFetchTransaction] = useState<Transaction[]>([]);
    const [fetchTransactionDetail, setFetchTransactionDetail] = useState<TransactionDetail[]>([]);

    const [open, setOpen] = useState(false);
    const [clickedIdTransaksi, setClickedIdTransaksi] = useState<string>('');
    const [notaTransaksi, setNotaTransaksi] = useState<Nota>();
    const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});

    const cancelButtonRef = useRef(null);

    const handleUpdate = async (userId: number, status: string) => {
        try {
            // Update the status
            const statusResponse = await axios.put(`${apiUrl}/transactions/status/detail/${userId}/${status}`);
            console.log('start');
            console.log(statusResponse);
            console.log('end');
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');

        if (status == 'Semua') {
            try {
                axios({
                    method: 'get',
                    url: `${apiUrl}/transactions/user/` + user.id,
                }).then((response) => {
                    setFetchTransaction(response.data.transactions);
                });
            } catch (error) {
                console.error('Error fetching carts:', error);
            }

            try {
                axios({
                    method: 'get',
                    url: `${apiUrl}/transaction_details/user/` + user.id,
                }).then((response) => {
                    setFetchTransactionDetail(response.data.transaction_details);
                });
            } catch (error) {
                console.error('Error fetching transaction details by user:', error);
            }
        } else {
            try {
                axios({
                    method: 'get',
                    url: `${apiUrl}/transactions/user/` + user.id,
                }).then((response) => {
                    const items = response.data.transactions;
                    const filteredItems = items.filter((item: any) => item.transaction_status === status);
                    setFetchTransaction(filteredItems);
                });
            } catch (error) {
                console.error('Error fetching carts:', error);
            }

            try {
                axios({
                    method: 'get',
                    url: `${apiUrl}/transaction_details/user/` + user.id,
                }).then((response) => {
                    const items = response.data.transaction_details;
                    const filteredItems = items.filter((item: any) => item.transaction_status === status);
                    setFetchTransactionDetail(filteredItems);
                });
            } catch (error) {
                console.error('Error fetching transaction details by user:', error);
            }
        }

        try {
            axios({
                method: 'get',
                url: `${apiUrl}/transaction_details/invoice/photos/user/` + user.id,
            }).then((response) => {
                if (response.data.photos) {
                    fetchAllImages(response.data.photos);
                    const photos = response.data.photos;
                    setTestImage(photos);
                }
            });
        } catch (error) {
            console.error('Error fetching photos:', error);
        }
    }, []);

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, invoice_number: string) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            console.log(files);
            const formData = new FormData();

            formData.append('photo', file);

            try {
                // Upload the file
                const response = await axios({
                    method: 'put',
                    url: `${apiUrl}/transactions/bukti_pembayaran/${invoice_number}`,
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(response);

                // Update the status after the file upload is successful
                const statusResponse = await axios.put(
                    `${apiUrl}/transactions/status/invoice/${invoice_number}/Sudah Bayar`,
                );
                console.log(statusResponse);
            } catch (err) {
                console.log(err);
            }
        }
    };

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

    const fetchAllImages = async (item: []) => {
        const imageUrls: { [key: string]: string } = {};

        for (let i = 0; i < item.length; i++) {
            const imageUrl = await fetchImage(item[i]);
            imageUrls[i] = imageUrl;
        }

        setImageUrls(imageUrls);
    };

    const handleNota = (invoiceNumber: string) => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        setEmailCustomer(user.email);

        const transaksi = fetchTransaction.filter((i) => i.invoice_number === invoiceNumber);
        const detail_transaksi = fetchTransactionDetail.filter((detail) => detail.invoice_number === invoiceNumber);
        setNotaTransaksi({ transaksi, detail_transaksi });
    };

    return (
        <div className="text-black font-poppins">
            {fetchTransactionDetail &&
                fetchTransactionDetail.map((item, index) => (
                    <div key={item.id} className="item-container">
                        <div className="border shadow-sm flex items-center w-full justify-center p-6 rounded-md flex-wrap">
                            <div className="justify-between mb-2 rounded-lg sm:flex sm:justify-start ">
                                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                    <div className="mt-5 sm:mt-0">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-8 ">
                                            <div className="flex max-w-20 max-h-20">
                                                <Image
                                                    className="rounded"
                                                    src={imageUrls[index]}
                                                    height={100}
                                                    width={200}
                                                    alt={'image-' + index}
                                                />
                                            </div>
                                            <div className="gap-1">
                                                <span
                                                    className="text-xs cursor-pointer"
                                                    onClick={() => {
                                                        setOpen(true);
                                                        setClickedIdTransaksi(item.invoice_number!);
                                                        handleNota(item.invoice_number!);
                                                    }}
                                                >
                                                    No. Transaksi : <b>{item.invoice_number}</b>
                                                </span>

                                                <div className="flex items-center px-2 py-1 border border-gray-300 rounded-md mb-1 w-max">
                                                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                                                    <span className="text-xs">{item.transaction_status}</span>
                                                </div>

                                                {item.product && (
                                                    <h2 className=" font-bold text-black text-left text-clip text-xs">
                                                        {item.product?.name}
                                                    </h2>
                                                )}
                                                {item.hampers && (
                                                    <h2 className="text-base font-bold text-black text-xs">
                                                        {item.hampers?.hampers_name}
                                                    </h2>
                                                )}

                                                {/* <p className="mt-1 text-xs text-gray-700">{item.description}</p> */}
                                            </div>

                                            <div className="flex items-start gap-2 flex-col">
                                                <p className="text-xs text-black">Jenis Order</p>
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
                                            </div>
                                            <div>
                                                <p className="text-xs text-black">Tanggal Pengiriman </p>
                                                <p className="text-xs text-black">
                                                    <b>{formatDate(item.tanggal_pengiriman!)}</b>
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-black ">Harga Satuan </p>
                                                <p className="text-xs text-black ">
                                                    {item.product_price && (
                                                        <b>Rp. {item.product_price!.toLocaleString('id-ID')}</b>
                                                    )}
                                                    {item.hampers_price && (
                                                        <b>Rp. {item.hampers_price!.toLocaleString('id-ID')}</b>
                                                    )}
                                                </p>
                                            </div>
                                            <div className="flex flex-col">
                                                <p className="text-xs">
                                                    Kuantitas :{' '}
                                                    <span>{item.product && <b>{item.product_quantity}</b>}</span>{' '}
                                                    <span>{item.hampers && <b>{item.hampers_quantity}</b>}</span>{' '}
                                                </p>
                                                {item.product && (
                                                    <p className="text-xs  font-bold">
                                                        {item.product?.price.toLocaleString('id-ID')}
                                                    </p>
                                                )}
                                                {item.hampers && (
                                                    <p className="text-xs  font-bold">
                                                        {item.hampers?.price!.toLocaleString('id-ID')}
                                                    </p>
                                                )}
                                            </div>
                                            {item.transaction_status === 'Menunggu Pembayaran' && (
                                                <div>
                                                    <p className="text-xs text-black">Bukti Pembayaran</p>
                                                    <input
                                                        className="mt-2 block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                        id="foto_produk"
                                                        type="file"
                                                        required
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                            handleFileChange(e, item.invoice_number!);
                                                        }}
                                                    ></input>
                                                </div>
                                            )}
                                            {item.transaction_status == 'Menunggu Pembayaran' && (
                                                <div>
                                                    <p className="text-xs text-black">Bukti Pembayaran</p>
                                                    <input
                                                        className="mt-2 block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                        id="foto_produk"
                                                        type="file"
                                                        required
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                            handleFileChange(e, item.invoice_number!);
                                                        }}
                                                    ></input>
                                                </div>
                                            )}
                                            {item.transaction_status === 'Sedang dikirim' && (
                                                <div className="flex">
                                                    <button
                                                        className="mt-2 block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                        onClick={() => handleUpdate(item?.id!, 'Selesai')}
                                                    >
                                                        Update
                                                    </button>
                                                </div>
                                            )}
                                            {item.transaction_status === 'Sudah di-pickup' && (
                                                <div className="flex">
                                                    <button
                                                        className="mt-2 block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                        onClick={() => handleUpdate(item?.id!, 'Selesai')}
                                                    >
                                                        Update
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            {/* start modal nota*/}

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

            {/* end modal */}
        </div>
    );
}
