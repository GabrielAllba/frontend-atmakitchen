'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { PiTrashLight } from 'react-icons/pi';
import { Hampers, HampersFetch } from '@/dummy_data/hampers';
import { Product, ProductFetch } from '@/dummy_data/product';
import axios from 'axios';
import { CiLocationOn } from 'react-icons/ci';
import { Transaction, TransactionFetch } from '@/dummy_data/transaction';
import { Listbox } from '@headlessui/react';
import { TransactionDetail } from '@/dummy_data/transaction_detaill';
import { Cart } from '@/dummy_data/cart';
import { useRouter } from 'next/navigation';
import { User } from '@/dummy_data/user';

const option_pengiriman = [{ opsi: 'Dikirim Kurir' }, { opsi: 'Pickup Mandiri' }];

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
const getToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-indexed
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
const isWithinBirthdayRange = (bornDateStr: string) => {
    const today = new Date();
    const bornDate = new Date(bornDateStr);

    // Normalize today's year to the born date year for comparison
    const thisYearBornDate = new Date(today.getFullYear(), bornDate.getMonth(), bornDate.getDate());

    const bornDateMinus3Days = new Date(thisYearBornDate);
    bornDateMinus3Days.setDate(bornDateMinus3Days.getDate() - 3);

    const bornDatePlus3Days = new Date(thisYearBornDate);
    bornDatePlus3Days.setDate(bornDatePlus3Days.getDate() + 3);

    return today >= bornDateMinus3Days && today <= bornDatePlus3Days;
};
export default function CartPage({ isAuth }: { isAuth: boolean }) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();

    const [opsiPengiriman, setOpsiPengiriman] = useState<string>(option_pengiriman[0].opsi);

    const [fetchItems, setFetchItems] = useState<Cart[]>([]);
    const [selectedItems, setSelectedItems] = useState<Cart[]>([]);
    const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false);

    const [namaPenerima, setNamaPenerima] = useState<string>('');
    const [noTelpPenerima, setNoTelpPenerima] = useState<string>('');
    const [alamatPengiriman, setAlamatPengiriman] = useState<string>('');

    const [totalPriceTransaction, setTotalPriceTransaction] = useState<number>(0);
    const [userFetch, setUserFetch] = useState<User>();

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const handleCheckboxChange = (item: Cart) => {
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
            setTotalPriceTransaction(0);
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
        const newTotalPrice = selectedItems.reduce((sum, selectedItem) => sum + selectedItem.total_price, 0);
        setTotalPriceTransaction(newTotalPrice);
    }, [selectedItems]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        try {
            axios({
                method: 'get',
                url: `${apiUrl}/cart/user/` + user.id,
            }).then((response) => {
                setFetchItems(response.data.carts);
                setSelectedItems(response.data.carts);
            });
        } catch (error) {
            console.error('Error fetching carts:', error);
        }

        try {
            axios({
                method: 'get',
                url: `${apiUrl}/users/` + user.id,
            }).then((response) => {
                setUserFetch(response.data.user);
            });
        } catch (error) {
            console.error('Error fetching carts:', error);
        }
    }, []);

    const handleQuantityChange = (id: number, newQuantity: number) => {
        console.log(selectedItems[0]);
        setSelectedItems((prevSelectedItems) => {
            const newSelectedItems = prevSelectedItems.map((item) => {
                if (item.id === id) {
                    let price = 0;
                    if (item.jenis_item == 'Hampers') {
                        price = item.hampers?.price!;
                    } else {
                        price = item.product?.price!;
                    }
                    return { ...item, quantity: newQuantity, total_price: newQuantity * price };
                }
                return item;
            });

            const newTotalPrice = newSelectedItems.reduce((sum, selectedItem) => sum + selectedItem.total_price, 0);
            setTotalPriceTransaction(newTotalPrice);

            return newSelectedItems;
        });

        setFetchItems((prevFetchItems) => {
            const newSelectedItems = prevFetchItems.map((item) => {
                if (item.id === id) {
                    let price = 0;
                    if (item.jenis_item == 'Hampers') {
                        price = item.hampers?.price!;
                    } else {
                        price = item.product?.price!;
                    }
                    return { ...item, quantity: newQuantity, total_price: newQuantity * price };
                }
                return item;
            });

            const newTotalPrice = newSelectedItems.reduce((sum, selectedItem) => sum + selectedItem.total_price, 0);
            setTotalPriceTransaction(newTotalPrice);

            return newSelectedItems;
        });
    };

    const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Retrieve user data from localStorage
        const user = JSON.parse(localStorage.getItem('user') || '{}');

        // Calculate the total price of the selected items
        let totalPriceFix = selectedItems.reduce((sum, item) => sum + item.total_price, 0);

        // Generate a unique invoice number
        const invoiceNumber = await axios({
            method: 'post',
            url: apiUrl + '/invoice_number',
        })
            .then((response) => response.data.invoice_number)
            .catch((error) => {
                console.error('Failed to generate invoice number:', error);
                return ''; // Return an empty string if there's an error
            });

        console.log(invoiceNumber);

        const poinnominal = 100;
        const user_poin = userFetch?.total_point || 0; // Ensure user_poin is 0 if undefined
        const user_poin_nominal = poinnominal * user_poin;

        // Apply points to the total price
        let nominal_pemakaian_poin;
        let sisa_poin;

        if (totalPriceFix > user_poin_nominal) {
            nominal_pemakaian_poin = user_poin_nominal;
            sisa_poin = 0;
        } else {
            nominal_pemakaian_poin = totalPriceFix;
            sisa_poin = (user_poin_nominal - nominal_pemakaian_poin) / poinnominal;
        }

        let totalPriceFixReal = totalPriceFix;

        let earnedPoints = 0;

        // Calculate points for each segment
        if (totalPriceFixReal >= 1000000) {
            earnedPoints += Math.floor(totalPriceFixReal / 1000000) * 200;
            totalPriceFixReal %= 1000000;
        }
        if (totalPriceFixReal >= 500000) {
            earnedPoints += Math.floor(totalPriceFixReal / 500000) * 75;
            totalPriceFixReal %= 500000;
        }
        if (totalPriceFixReal >= 100000) {
            earnedPoints += Math.floor(totalPriceFixReal / 100000) * 15;
            totalPriceFixReal %= 100000;
        }
        if (totalPriceFixReal >= 10000) {
            earnedPoints += Math.floor(totalPriceFixReal / 10000);
            totalPriceFixReal %= 10000;
        }

        if (isWithinBirthdayRange(userFetch?.born_date!)) {
            earnedPoints *= 2;
        }

        let point_user_skrg = 0;
        point_user_skrg = userFetch?.total_point! + earnedPoints;

        await axios({
            method: 'put',
            url: `${apiUrl}/users/update-points/${userFetch?.id!}/${
                userFetch?.total_point! + earnedPoints - nominal_pemakaian_poin / 100
            }`,
        });

        const newTransaction: Transaction = {
            user_id: user.id,
            alamat_penerima: alamatPengiriman,
            nama_penerima: namaPenerima,
            no_telp_penerima: noTelpPenerima,
            delivery: opsiPengiriman,
            delivery_fee: null,
            distance: null,
            lunas_pada: null,
            point_income: earnedPoints,
            transfer_nominal: totalPriceFix - (nominal_pemakaian_poin / 100) * 100,
            transaction_status: 'Menunggu Jarak',
            total_price: totalPriceFix,
            invoice_number: invoiceNumber,
            payment_date: null,
            payment_proof: null,
            point_used: nominal_pemakaian_poin / 100,
            total_poin_user: userFetch?.total_point! + earnedPoints - nominal_pemakaian_poin / 100,
            tanggal_pemesanan: getToday(),
        };

        // Create the transaction details based on selected items
        const transactionDetails: TransactionDetail[] = selectedItems.map((item) => {
            let detail: TransactionDetail = {
                invoice_number: invoiceNumber,
                product_id: item.product?.id === 0 ? null : item.product?.id,
                product_quantity: item.jenis_item === 'Produk Toko' ? item.quantity : null,
                product_price: item.jenis_item === 'Produk Toko' ? item.product?.price : null,
                hampers_id: item.hampers?.id === 0 ? null : item.hampers?.id,
                hampers_quantity: item.jenis_item === 'Hampers' ? item.quantity : null,
                hampers_price: item.jenis_item === 'Hampers' ? item.hampers?.price : null,
                jenis: item.jenis,
                tanggal_pengiriman: item.tanggal_pengiriman,
                transaction_status: 'Menunggu Jarak',
                jenis_item: item.jenis_item,
            };

            if (item.jenis_item == 'Titipan') {
                detail.product_quantity = item.quantity;
                detail.product_price = item.product?.price;
            }
            return detail;
        });

        try {
            // Save the new transaction
            const transactionResponse = await axios({
                method: 'post',
                url: apiUrl + '/transactions',
                data: newTransaction,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
            });

            console.log('Transaction saved:', transactionResponse.data);

            // Save the transaction details
            const detailPromises = transactionDetails.map((detail) => {
                return axios({
                    method: 'post',
                    url: apiUrl + '/transaction_details',
                    data: detail,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                    },
                });
            });

            await Promise.all(detailPromises);
            console.log('Transaction details saved:', transactionDetails);

            // Clear the selected items from cart
            selectedItems.map((item) => {
                return axios({
                    method: 'delete',
                    url: apiUrl + '/cart/' + item.id,
                });
            });

            // Redirect to transactions page
            router.push('/transaksi');
        } catch (error) {
            console.error('Failed to save transaction:', error);
        }
    };

    return (
        <>
            <div className="mx-auto max-w-6xl justify-center px-6 md:flex md:space-x-6 xl:px-0 font-poppins">
                <form className="rounded-lg w-full">
                    <div className="justify-between mb-2 rounded-lg bg-white pb-4 sm:flex sm:justify-start">
                        <h2 className="text-4xl font-bold text-gray-900">Keranjang Belanja</h2>
                    </div>
                    <div className="py-2 mb-8 flex gap-2 ">
                        <div className="border rounded-lg p-8 shadow-sm mt-4 font-poppins w-full">
                            <h2 className="text-lg font-bold text-red-500 flex items-center">
                                <CiLocationOn className="hidden md:flex h-5 w-5 mr-2 text-red-500"></CiLocationOn>
                                Alamat Pengiriman
                            </h2>

                            <hr className="my-4" />
                            <div className="flex justify-start items-center mb-2 gap-4 flex-wrap">
                                <div className="pt-2">
                                    <label
                                        className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                        htmlFor="nama_produk"
                                    >
                                        Nama Penerima
                                    </label>
                                    <input
                                        className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                        id="nama_penerima"
                                        placeholder="Nama Penerima"
                                        required
                                        type="text"
                                        value={namaPenerima}
                                        onChange={(e) => {
                                            setNamaPenerima(e.target.value);
                                        }}
                                    ></input>
                                </div>
                                <div className="pt-2">
                                    <label
                                        className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                        htmlFor="no_telp_penerima"
                                    >
                                        No Telp Penerima
                                    </label>
                                    <input
                                        className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                        id="no_telp_penerima"
                                        placeholder="No Telp Penerima"
                                        required
                                        type="text"
                                        value={noTelpPenerima}
                                        onChange={(e) => {
                                            setNoTelpPenerima(e.target.value);
                                        }}
                                    ></input>
                                </div>
                                <div className="pt-2">
                                    <label
                                        className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                        htmlFor="alamat_pengiriman"
                                    >
                                        Alamat Pengiriman
                                    </label>
                                    <input
                                        className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                        id="alamat_pengiriman"
                                        placeholder="Alamat Pengiriman"
                                        required
                                        type="text"
                                        value={alamatPengiriman}
                                        onChange={(e) => {
                                            setAlamatPengiriman(e.target.value);
                                        }}
                                    ></input>
                                </div>

                                <div className="pt-2">
                                    <p className="mb-2 block font-poppins text-sm font-medium text-[#111827]">
                                        Opsi Pengiriman
                                    </p>
                                    <Listbox
                                        value={opsiPengiriman}
                                        onChange={(value: string) => setOpsiPengiriman(value)}
                                    >
                                        <div className="relative">
                                            <Listbox.Button className="relative w-max bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                <span className="block truncate text-black">{opsiPengiriman}</span>
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
                                                {option_pengiriman.map((opt) => (
                                                    <Listbox.Option
                                                        key={opt.opsi}
                                                        value={opt.opsi}
                                                        className={({ active, selected }) =>
                                                            `${active ? 'text-white bg-indigo-600' : 'text-gray-900'}
                                        cursor-default select-none relative p-2`
                                                        }
                                                    >
                                                        {({ selected }) => (
                                                            <span
                                                                className={`${
                                                                    selected ? 'font-semibold' : 'font-normal'
                                                                } block truncate`}
                                                            >
                                                                {opt.opsi}
                                                            </span>
                                                        )}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </div>
                                    </Listbox>
                                </div>
                            </div>
                        </div>
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
                                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between ">
                                        <div className="mt-5 sm:mt-0">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-10">
                                                <div className="mx-4 text-wrap">
                                                    {item.jenis_item === 'Produk Toko' && (
                                                        <h2 className="text-base font-bold text-black">
                                                            {item.product?.name}
                                                        </h2>
                                                    )}
                                                    {item.jenis_item === 'Titipan' && (
                                                        <h2 className="text-base font-bold text-black">
                                                            {item.product?.name}
                                                        </h2>
                                                    )}
                                                    {item.jenis_item === 'Hampers' && (
                                                        <h2 className="text-base font-bold text-black">
                                                            {item.hampers?.hampers_name}
                                                        </h2>
                                                    )}

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

                                                    {item.jenis_item === 'Produk Toko' && (
                                                        <p className="mt-1 text-xs text-gray-700 lg:min-w-40">
                                                            {item.product?.description}
                                                        </p>
                                                    )}
                                                    {item.jenis_item === 'Titipan' && (
                                                        <p className="mt-1 text-xs text-gray-700 lg:lg:min-w-40">
                                                            {item.product?.description}
                                                        </p>
                                                    )}
                                                    {item.jenis_item === 'Hampers' && (
                                                        <p className="mt-1 text-xs text-gray-700 lg:min-w-40">
                                                            {item.hampers?.deskripsi}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="flex items-start gap-2 flex-col">
                                                    <p className="text-xs text-black">Jenis Order</p>

                                                    {item.jenis == 'pre-order' && (
                                                        <p className="flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                                            {item.jenis}
                                                        </p>
                                                    )}
                                                    {item.jenis == 'ready-stock' && (
                                                        <p className="flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                            {item.jenis}
                                                        </p>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-xs text-black">Tanggal Pengiriman :</p>
                                                    <p className="text-xs text-black">
                                                        {item.tanggal_pengiriman && (
                                                            <b>{formatDate(item.tanggal_pengiriman!)}</b>
                                                        )}
                                                        {!item.tanggal_pengiriman && <b>Hari ini / besok</b>}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-black ">Harga Satuan :</p>
                                                    <p className="text-xs text-black ">
                                                        {item.jenis_item === 'Produk Toko' && (
                                                            <b>Rp. {item.product?.price.toLocaleString('id-ID')}</b>
                                                        )}
                                                        {item.jenis_item === 'Titipan' && (
                                                            <b>Rp. {item.product?.price.toLocaleString('id-ID')}</b>
                                                        )}
                                                        {item.jenis_item === 'Hampers' && (
                                                            <b>Rp. {item.hampers?.price!.toLocaleString('id-ID')}</b>
                                                        )}
                                                    </p>
                                                </div>
                                                <div className="justify-between sm:space-y-6 sm:mt-0 sm:block text-black flex-wrap gap-4">
                                                    <div className="flex items-center border-gray-100">
                                                        <span
                                                            className="cursor-pointer rounded-l py-1 px-3 duration-100 text-black border"
                                                            onClick={() =>
                                                                handleQuantityChange(
                                                                    item!.id!,
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
                                                                handleQuantityChange(
                                                                    item!.id!,
                                                                    parseInt(e.target.value),
                                                                );
                                                            }}
                                                            readOnly
                                                            min="1"
                                                        />
                                                        <span
                                                            className="cursor-pointer rounded-r py-1 px-3 duration-100 text-black border"
                                                            onClick={() =>
                                                                handleQuantityChange(item!.id!, item.quantity + 1)
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

                        <div className="pt-2">
                            <label
                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                htmlFor="alamat_pengiriman"
                            >
                                Opsi Pengambilan
                            </label>
                        </div>
                        {selectedItems.length !== 0 && (
                            <button
                                className="mt-6 w-full rounded-md bg-[#ffca1b] py-1.5  text-black hover:bg-[#ffca1bf1]"
                                onClick={(e: any) => {
                                    handleCheckout(e);
                                }}
                            >
                                Check out
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
}
