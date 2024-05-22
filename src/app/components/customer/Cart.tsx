'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { PiTrashLight } from 'react-icons/pi';
import ShippingAddress from './ShippingAddress';

interface Item {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    total_price: number;
    imageUrl: string;
    status: string;
    jenis: string;
    opsi_pengambilan: string;
    tanggal_pengiriman?: string;
    tanggal_pengambilan?: string;
}

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
const items: Item[] = [
    {
        id: 1,
        name: 'Kue Stego',
        description: 'Kue Stego merupakan kue yang diproduksi di Bekasi menggunakan tepung maizena',
        price: 259000,
        quantity: 1,
        total_price: 259000,
        tanggal_pengiriman: '2022-10-10',
        opsi_pengambilan: 'Pickup Mandiri',
        jenis: 'pre-order',
        imageUrl: '/images/produk/kue.jpg',
        status: 'Menunggu Jarak',
    },
    {
        id: 2,
        name: 'Kue Stego',
        description: 'Kue Stego merupakan kue yang diproduksi di Bekasi menggunakan tepung maizena',
        price: 259000,
        quantity: 1,
        total_price: 259000,
        tanggal_pengiriman: '2022-10-10',
        opsi_pengambilan: 'Dikirim Kurir',
        jenis: 'pre-order',
        imageUrl: '/images/produk/kue2.jpg',
        status: 'Menunggu Pembayaran',
    },
    {
        id: 3,
        name: 'Kue Stego',
        description: 'Kue Stego merupakan kue yang diproduksi di Bekasi menggunakan tepung maizena',
        price: 259000,
        quantity: 1,
        total_price: 259000,
        tanggal_pengiriman: '2022-10-10',
        opsi_pengambilan: 'Pickup Mandiri',
        jenis: 'ready stock',
        imageUrl: '/images/produk/kue2.jpg',
        status: 'Sudah Bayar',
    },
    {
        id: 4,
        name: 'Kue Stego',
        description: 'Kue Stego merupakan kue yang diproduksi di Bekasi menggunakan tepung maizena',
        price: 259000,
        quantity: 1,
        total_price: 259000,
        tanggal_pengiriman: '2022-10-10',
        opsi_pengambilan: 'Pickup Mandiri',
        jenis: 'pre-order',
        imageUrl: '/images/produk/kue2.jpg',
        status: 'Pembayaran Terverifikasi',
    },
    {
        id: 5,
        name: 'Kue Stego',
        description: 'Kue Stego merupakan kue yang diproduksi di Bekasi menggunakan tepung maizena',
        price: 259000,
        quantity: 1,
        total_price: 259000,
        tanggal_pengiriman: '2022-10-10',
        opsi_pengambilan: 'Pickup Mandiri',
        jenis: 'ready stock',
        imageUrl: '/images/produk/kue2.jpg',
        status: 'Diterima',
    },
    {
        id: 6,
        name: 'Kue Stego',
        description: 'Kue Stego merupakan kue yang diproduksi di Bekasi menggunakan tepung maizena',
        price: 259000,
        quantity: 1,
        total_price: 259000,
        tanggal_pengiriman: '2022-10-10',
        opsi_pengambilan: 'Pickup Mandiri',
        jenis: 'pre-order',
        imageUrl: '/images/produk/kue2.jpg',
        status: 'Diproses',
    },
    {
        id: 7,
        name: 'Kue Stego',
        description: 'Kue Stego merupakan kue yang diproduksi di Bekasi menggunakan tepung maizena',
        price: 259000,
        quantity: 1,
        total_price: 259000,
        tanggal_pengiriman: '2022-10-10',
        opsi_pengambilan: 'Pickup Mandiri',
        jenis: 'pre-order',
        imageUrl: '/images/produk/kue2.jpg',
        status: 'Siap di-pickup',
    },
    {
        id: 8,
        name: 'Kue Stego',
        description: 'Kue Stego merupakan kue yang diproduksi di Bekasi menggunakan tepung maizena',
        price: 259000,
        quantity: 1,
        total_price: 259000,
        tanggal_pengiriman: '2022-10-10',
        opsi_pengambilan: 'Pickup Mandiri',
        jenis: 'ready stock',
        imageUrl: '/images/produk/kue2.jpg',
        status: 'Sedang dikirim',
    },
    {
        id: 9,
        name: 'Kue Stego',
        description: 'Kue Stego merupakan kue yang diproduksi di Bekasi menggunakan tepung maizena',
        price: 259000,
        quantity: 1,
        total_price: 259000,
        tanggal_pengiriman: '2022-10-10',
        opsi_pengambilan: 'Pickup Mandiri',
        jenis: 'pre-order',
        imageUrl: '/images/produk/kue2.jpg',
        status: 'Sudah di-pickup',
    },
    {
        id: 10,
        name: 'Kue Stego',
        description: 'Kue Stego merupakan kue yang diproduksi di Bekasi menggunakan tepung maizena',
        price: 259000,
        quantity: 1,
        total_price: 259000,
        tanggal_pengiriman: '2022-10-10',
        opsi_pengambilan: 'Pickup Mandiri',
        jenis: 'pre-order',
        imageUrl: '/images/produk/kue2.jpg',
        status: 'Selesai',
    },
];

export default function Cart({ isAuth }: { isAuth: boolean }) {
    const [fetchItems, setFetchItems] = useState<Item[]>([]);
    const [selectedItems, setSelectedItems] = useState<Item[]>([]);
    const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false);

    const [totalPriceTransaction, setTotalPriceTransaction] = useState<number>(0);

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const handleCheckboxChange = (item: Item) => {
        setSelectedItems((prevSelectedItems) => {
            const isSelected = prevSelectedItems.some((selectedItem) => selectedItem.id === item.id);
            const newSelectedItems = isSelected
                ? prevSelectedItems.filter((selectedItem) => selectedItem.id !== item.id)
                : [...prevSelectedItems, item];

            const newTotalPrice = newSelectedItems.reduce((sum, selectedItem) => sum + selectedItem.total_price, 0);
            setTotalPriceTransaction(newTotalPrice);

            return newSelectedItems;
        });

        const allItemIds = fetchItems.map((fetchItem) => fetchItem.id);
        const areAllItemsSelected = allItemIds.every((itemId) =>
            selectedItems.some((selectedItem) => selectedItem.id === itemId),
        );
        setSelectAllChecked(areAllItemsSelected);
    };

    const handleSelectAll = () => {
        if (selectedItems.length === fetchItems.length) {
            setSelectedItems([]);
            setSelectAllChecked(false);
            setTotalPriceTransaction(0); // Reset total price when deselecting all
        } else {
            setSelectedItems(fetchItems);
            setSelectAllChecked(true);
            const newTotalPrice = fetchItems.reduce((sum, item) => sum + item.total_price, 0);
            setTotalPriceTransaction(newTotalPrice);
        }
    };

    useEffect(() => {
        if (selectedItems.length != fetchItems.length) {
            setSelectAllChecked(false);
        } else {
            setSelectAllChecked(true);
        }
    }, [selectedItems]);

    useEffect(() => {
        setFetchItems(items);
        setSelectedItems([]);
    }, []);

    const handleQuantityChange = (id: number, newQuantity: number) => {
        setSelectedItems((prevSelectedItems) => {
            const newSelectedItems = prevSelectedItems.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity, total_price: newQuantity * item.price } : item,
            );

            const updatedItem = newSelectedItems.find((item) => item.id === id);
            if (updatedItem) {
                console.log(updatedItem);
            }

            const newTotalPrice = newSelectedItems.reduce((sum, selectedItem) => sum + selectedItem.total_price, 0);
            setTotalPriceTransaction(newTotalPrice);

            return newSelectedItems;
        });
        setFetchItems((prevFetchItems) =>
            prevFetchItems.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity, total_price: newQuantity * item.price } : item,
            ),
        );
    };
    return (
        <>
            <div className="mx-auto max-w-6xl justify-center px-6 md:flex md:space-x-6 xl:px-0 font-poppins">
                <div className="rounded-lg w-full">
                    <div className="justify-between mb-2 rounded-lg bg-white pb-4 sm:flex sm:justify-start">
                        <h2 className="text-4xl font-bold text-gray-900">Keranjang Belanja</h2>
                    </div>
                    <div className="py-2 mb-8 flex gap-2 ">
                        <ShippingAddress></ShippingAddress>
                    </div>
                    {fetchItems.length !== 0 && (
                        <div className="py-2 mb-4 flex gap-2">
                            <label className="custom-checkbox">
                                <input type="checkbox" checked={selectAllChecked} onChange={() => handleSelectAll()} />
                                <span className="checkmark"></span>
                            </label>
                            <p className="text-black font-poppins">Select All</p>
                        </div>
                    )}

                    {/* start item */}

                    {fetchItems.map((item) => (
                        <div key={item.id} className="item-container">
                            <label className="custom-checkbox">
                                <input
                                    type="checkbox"
                                    checked={selectedItems.some((i) => i.id === item.id)}
                                    onChange={() => handleCheckboxChange(item)}
                                />
                                <span className="checkmark"></span>
                            </label>
                            <div className="border shadow-sm flex items-center w-full justify-between p-6 rounded-md flex-wrap">
                                <div className="justify-between mb-2 rounded-lg sm:flex sm:justify-start ">
                                    <Image
                                        className="rounded"
                                        src={item.imageUrl}
                                        height={40}
                                        width={100}
                                        alt={item.name}
                                    />
                                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                        <div className="mt-5 sm:mt-0">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                                <div>
                                                    <h2 className="text-base font-bold text-black">{item.name}</h2>
                                                    <p className="mt-1 text-xs text-gray-700">{item.description}</p>
                                                </div>

                                                <div className="flex items-start gap-2 flex-col">
                                                    <p className="text-xs text-black">Jenis Order</p>

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
                                                    <p className="text-xs text-black">Tanggal Pengiriman :</p>
                                                    <p className="text-xs text-black">
                                                        <b>{formatDate(item.tanggal_pengiriman!)}</b>
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-black ">Harga Satuan :</p>
                                                    <p className="text-xs text-black ">
                                                        <b>Rp. {item.price.toLocaleString('id-ID')}</b>
                                                    </p>
                                                </div>
                                                <div className="flex justify-between sm:space-y-6 sm:mt-0 sm:block text-black flex-wrap gap-4">
                                                    <div className="flex items-center border-gray-100">
                                                        <span
                                                            className="cursor-pointer rounded-l py-1 px-3 duration-100 text-black border"
                                                            onClick={() =>
                                                                handleQuantityChange(
                                                                    item.id,
                                                                    Math.max(1, item.quantity - 1),
                                                                )
                                                            }
                                                        >
                                                            -
                                                        </span>
                                                        <input
                                                            className="h-8 w-8 border bg-white text-center text-xs outline-none appearance-none"
                                                            type="number"
                                                            value={item.quantity}
                                                            onChange={(e) => {
                                                                handleQuantityChange(item.id, parseInt(e.target.value));
                                                            }}
                                                            readOnly
                                                            min="1"
                                                        />
                                                        <span
                                                            className="cursor-pointer rounded-r py-1 px-3 duration-100 text-black border"
                                                            onClick={() =>
                                                                handleQuantityChange(item.id, item.quantity + 1)
                                                            }
                                                        >
                                                            +
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-sm">
                                                            Rp. {item.total_price.toLocaleString('id-ID')}
                                                        </p>
                                                        <div className="cursor-pointer text-red-600">
                                                            <PiTrashLight className="text-lg" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* end item */}

                    {/* checkout */}
                    <div className="mt-6 rounded-lg border bg-white p-6 shadow-sm md:mt-0 w-full sticky bottom-0">
                        {/* <div className="mb-2 flex justify-between">
                            <p className="text-black">Subtotal</p>
                            <p className="text-black">Rp. 520.000</p>
                        </div> */}
                        {/* <div className="flex justify-between">
                            <p className="text-black">Shipping</p>
                            <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                                Menunggu Konfirmasi Admin
                            </span>
                        </div>
                        <hr className="my-4" /> */}
                        <div className="flex justify-between items-center flex-wrap">
                            <p className="text-base font-bold text-black">Total</p>
                            <div className="">
                                <p className="mb-1 text-lg font-bold text-black">
                                    Rp. {totalPriceTransaction.toLocaleString('id-ID')}
                                </p>
                            </div>
                        </div>

                        {selectedItems.length !== 0 && (
                            <button
                                className="mt-6 w-full rounded-md bg-[#ffca1b] py-1.5  text-black hover:bg-[#ffca1bf1]"
                                onClick={() => {
                                    console.log(selectedItems);
                                }}
                            >
                                Check out
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
