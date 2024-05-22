'use client';

import { ProductFetch } from '@/dummy_data/product';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Box from '@mui/material/Box';
import { BsCart3 } from 'react-icons/bs';

import { useRouter } from 'next/navigation';
import { Listbox } from '@headlessui/react';

// start tabs

interface TabPanelPropsTitipan {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function a22Props(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function CustomTabPanelTitipan(props: TabPanelPropsTitipan) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

// end tabs

export default function TitipanHome({ isAuthTitipan }: { isAuthTitipan: boolean }) {
    const today = new Date().toISOString().split('T')[0];

    const [deliveryDateTitipan, setDeliveryDateTitipan] = useState(today);

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDeliveryDateTitipan(event.target.value);
    };
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const option = [{ opsi: 'Dikirim Kurir' }, { opsi: 'Pickup Mandiri' }];
    const router = useRouter();
    // tabs
    const [valueTitipan, setValueTitipan] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValueTitipan(newValue);
    };
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [imageUrlsTitipan, setImageUrlsTitipan] = useState<{ [key: string]: string }>({});
    const [loadingAwal, setLoadingAwal] = useState<boolean>(true);
    const [alertErrorAuth, setAlertErrorAuth] = useState<boolean>(false);

    const [filteredDataTitipan, setFilteredDataTitipan] = useState<ProductFetch[]>([]);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(5);
    const [opsiPengirimanTitipan, setOpsiPengirimanTitipan] = useState<string>(option[0].opsi);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItemsTitipan = filteredDataTitipan.slice(indexOfFirstItem, indexOfLastItem);

    const fetchProducts = () => {
        try {
            setLoadingAwal(true);
            axios({
                method: 'get',
                url: `${apiUrl}/product/type`,
                params: {
                    query: 'Titipan',
                },
            }).then((response) => {
                setFilteredDataTitipan(response.data.product);
                fetchAllImages(response.data.product);
                console.log(imageUrlsTitipan);
                setLoadingAwal(false);
            });
        } catch (error) {
            console.error('Error fetching products:', error);
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

    const fetchAllImages = async (products: ProductFetch[]) => {
        const imageUrls: { [key: string]: string } = {};
        for (const product of products) {
            if (product.photo) {
                const imageUrl = await fetchImage(product.photo);
                imageUrls[product.photo] = imageUrl;
            }
        }
        setImageUrlsTitipan(imageUrls);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const [loadingPanelCheckoutTitipan, setLoadingPanelCheckoutTitipan] = useState<boolean>(true);
    const [productCheckoutTitipan, setProductCheckoutTitipan] = useState<ProductFetch>();

    const handleClickBeli = async (id: number) => {
        try {
            setLoadingPanelCheckoutTitipan(true);
            const response = await axios.get(apiUrl + '/product/' + id);
            setProductCheckoutTitipan(response.data.product);
            const firstProduct = response.data.product;
            await fetchImage(firstProduct.photo);
            setLoadingPanelCheckoutTitipan(false);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const getCurrentDate = (): string => {
        const today = new Date();
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return today.toLocaleDateString('en-US', options);
    };

    return (
        <div className="font-poppins pb-8">
            <p className="text-2xl text-[#5A5A5A]">Lainnya</p>
            <div className="py-8 overflow-x-auto">
                <div className="flex space-x-4 md:space-x-6 lg:space-x-8">
                    {currentItemsTitipan.map((product) => (
                        <div
                            key={product.id}
                            className="w-72 flex-shrink-0 card bg-base-100 rounded-md rounded-t-md border text-black"
                        >
                            <div className="max-h-40 overflow-hidden flex items-center justify-center rounded-t-md">
                                <Image
                                    src={imageUrlsTitipan[product.photo!]}
                                    width={1000}
                                    height={1000}
                                    alt={product.name}
                                />
                            </div>

                            <div className="card-body bg-white">
                                <h2 className="card-title">{product.name}</h2>
                                <div className="flex gap-2">
                                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                        Stock: {product.stock}
                                    </span>
                                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                        Quota Hari Ini: {product.daily_quota}
                                    </span>
                                </div>
                                <p className="text-sm text-[#6B7280]">{product.description}</p>
                                <p className="text-lg font-semibold ">Rp. {product.price}</p>
                                <div className="drawer drawer-end">
                                    <input id="my-drawer-5" type="checkbox" className="drawer-toggle" />

                                    <div
                                        className="drawer-content w-full flex"
                                        onClick={() => {
                                            handleClickBeli(product.id!);
                                        }}
                                    >
                                        <label
                                            htmlFor="my-drawer-5"
                                            className="w-full rounded-lg bg-[#ffca1b] px-2 py-2 text-center font-poppins text-sm font-semibold text-[#1c1c1c] outline-none hover:bg-[#f4be0e] cursor-pointer"
                                        >
                                            Beli
                                        </label>
                                    </div>

                                    <div className="drawer-side z-50">
                                        <label
                                            htmlFor="my-drawer-5"
                                            aria-label="close sidebar"
                                            className="drawer-overlay"
                                        ></label>
                                        <div className="menu p-4 w-80 md:w-96 min-h-full text-black font-poppins bg-white">
                                            {/* sidebar checkout */}
                                            {loadingPanelCheckoutTitipan && (
                                                <div className="flex justify-center items-center font-poppins text-black text-center mt-4">
                                                    <span className="loading loading-ring loading-lg"></span>
                                                </div>
                                            )}
                                            {!loadingPanelCheckoutTitipan && (
                                                <Box sx={{ width: '100%' }}>
                                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                        <Tabs
                                                            value={valueTitipan}
                                                            onChange={handleChange}
                                                            aria-label="basic tabs example"
                                                        >
                                                            <Tab label="Ready Stock" {...a22Props(0)} />
                                                        </Tabs>
                                                    </Box>

                                                    {/* ready stock */}
                                                    <CustomTabPanelTitipan value={valueTitipan} index={0}>
                                                        <Image
                                                            src={imageUrlsTitipan[productCheckoutTitipan!.photo!]}
                                                            width={1000}
                                                            height={1000}
                                                            alt={productCheckoutTitipan!.name}
                                                        />

                                                        <div className="pt-4 lg:col-span-2 lg:border-gray-200 lg:pr-8">
                                                            <h1 className="font-bold  text-gray-900 text-xl">
                                                                {productCheckoutTitipan!.name}
                                                            </h1>
                                                        </div>
                                                        <div className="pt-2">
                                                            <h3 className="sr-only">Description</h3>

                                                            <div className="space-y-6">
                                                                <span className="text-base text-gray-900">
                                                                    {productCheckoutTitipan!.description}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="pt-2">
                                                            <h3 className="sr-only">Informasi</h3>

                                                            <div className="flex gap-2">
                                                                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                                    Stock: {productCheckoutTitipan!.stock}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="pt-2">
                                                            <p className="text-lg font-semibold ">
                                                                Rp. {productCheckoutTitipan!.price}
                                                            </p>
                                                        </div>

                                                        <div className="pt-2">
                                                            <label
                                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                                htmlFor="nama_produk"
                                                            >
                                                                Jumlah :
                                                            </label>
                                                            <input
                                                                className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                                id="jumlah"
                                                                placeholder="Jumlah"
                                                                required
                                                                type="number"
                                                            ></input>
                                                        </div>

                                                        <div className="pt-2">
                                                            <label
                                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                                htmlFor="alamat_pengiriman"
                                                            >
                                                                Opsi Pengambilan
                                                            </label>
                                                            <Listbox
                                                                value={opsiPengirimanTitipan}
                                                                onChange={(value: string) =>
                                                                    setOpsiPengirimanTitipan(value)
                                                                }
                                                            >
                                                                <div className="relative mt-1">
                                                                    <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                                        <span className="block truncate">
                                                                            {opsiPengirimanTitipan}
                                                                        </span>
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
                                                                        {option.map((opt) => (
                                                                            <Listbox.Option
                                                                                key={opt.opsi}
                                                                                value={opt.opsi}
                                                                                className={({ active, selected }) =>
                                                                                    `${
                                                                                        active
                                                                                            ? 'text-white bg-indigo-600'
                                                                                            : 'text-gray-900'
                                                                                    }
                                        cursor-default select-none relative`
                                                                                }
                                                                            >
                                                                                {({ selected }) => (
                                                                                    <span
                                                                                        className={`${
                                                                                            selected
                                                                                                ? 'font-semibold'
                                                                                                : 'font-normal'
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
                                                        <div className="pt-2">
                                                            <label
                                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                                htmlFor="alamat_pengiriman"
                                                            >
                                                                {opsiPengirimanTitipan === 'Pickup Mandiri' &&
                                                                    'Tanggal Pengambilan'}
                                                                {opsiPengirimanTitipan === 'Dikirim Kurir' &&
                                                                    'Tanggal Pengiriman'}
                                                            </label>

                                                            <input
                                                                type="date"
                                                                className="block w-full rounded-lg border border-[#DADDE2] bg-white p-2.5 font-poppins text-sm text-black outline-none"
                                                                placeholder="Tanggal Pengiriman"
                                                                name="tanggal_pengiriman"
                                                                value={deliveryDateTitipan}
                                                                min={today}
                                                                onChange={handleDateChange}
                                                            />
                                                        </div>

                                                        <div className="pt-4 flex flex-col gap-2">
                                                            <button
                                                                className="flex items-center justify-center border bg-[#AA2B2B] ml-1 text-white rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
                                                                onClick={() => {
                                                                    !isAuthTitipan && router.push('/login');
                                                                }}
                                                            >
                                                                Tambah ke cart
                                                                <span className="ml-1">
                                                                    <BsCart3></BsCart3>
                                                                </span>
                                                            </button>

                                                            <label
                                                                htmlFor="my-drawer-5"
                                                                className="flex items-center justify-center border border-[#AA2B2B] ml-1 bg-white text-[#AA2B2B] rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
                                                            >
                                                                Close
                                                            </label>
                                                        </div>
                                                    </CustomTabPanelTitipan>
                                                </Box>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
