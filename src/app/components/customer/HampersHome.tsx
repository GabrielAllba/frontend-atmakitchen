'use client';

import { ProductFetch } from '@/dummy_data/product';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { BsCart3 } from 'react-icons/bs';
import { Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Listbox } from '@headlessui/react';
import { HampersFetch } from '@/dummy_data/hampers';

// start tabs

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

// end tabs

export default function HampersHome({ isAuth }: { isAuth: boolean }) {
    const today = new Date().toISOString().split('T')[0];

    const [deliveryDate, setDeliveryDate] = useState(today);

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDeliveryDate(event.target.value);
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
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [alertErrorAuth, setAlertErrorAuth] = useState<boolean>(false);

    const [filteredData, setFilteredData] = useState<HampersFetch[]>([]);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(5);
    const [opsiPengiriman, setOpsiPengiriman] = useState<string>(option[0].opsi);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const fetchProducts = () => {
        try {
            setLoading(true);
            axios({
                method: 'get',
                url: `${apiUrl}/hampers`,
            }).then((response) => {
                setFilteredData(response.data.hampers);
                fetchAllImages(response.data.hampers);
                console.log(imageUrls);
                setLoading(false);
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
        setImageUrls(imageUrls);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const [loadingPanelCheckout, setLoadingPanelCheckout] = useState<boolean>(true);
    const [productCheckout, setProductCheckout] = useState<ProductFetch>();

    const handleClickBeli = async (id: number) => {
        try {
            setLoadingPanelCheckout(true);
            const response = await axios.get(apiUrl + '/hampers/' + id);
            setProductCheckout(response.data.hampers);
            const firstProduct = response.data.hampers;
            await fetchImage(firstProduct.photo);
            setLoadingPanelCheckout(false);
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
            <p className="text-2xl text-[#5A5A5A]">Hampers</p>
            <div className="py-8 overflow-x-auto">
                <div className="flex space-x-4 md:space-x-6 lg:space-x-8">
                    {currentItems.map((product) => (
                        <div
                            key={product.id}
                            className="w-72 flex-shrink-0 card bg-base-100 rounded-md rounded-t-md border text-black"
                        >
                            <div className="max-h-40 overflow-hidden flex items-center justify-center rounded-t-md">
                                <Image
                                    src={imageUrls[product.photo!]}
                                    width={1000}
                                    height={1000}
                                    alt={product.hampers_name!}
                                />
                            </div>

                            <div className="card-body bg-white">
                                <h2 className="card-title">{product.hampers_name}</h2>
                                <div className="flex gap-2">
                                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                        Stock: {product.stock}
                                    </span>
                                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                        Quota Hari Ini: {product.daily_quota}
                                    </span>
                                </div>
                                <p className="text-sm text-[#6B7280]">{product.deskripsi}</p>
                                <p className="text-lg font-semibold ">Rp. {product.price}</p>
                                <div className="drawer drawer-end">
                                    <input id="my-drawer-6" type="checkbox" className="drawer-toggle" />

                                    <div
                                        className="drawer-content w-full flex"
                                        onClick={() => {
                                            handleClickBeli(product.id!);
                                        }}
                                    >
                                        <label
                                            htmlFor="my-drawer-6"
                                            className="w-full rounded-lg bg-[#ffca1b] px-2 py-2 text-center font-poppins text-sm font-semibold text-[#1c1c1c] outline-none hover:bg-[#f4be0e] cursor-pointer"
                                        >
                                            Beli
                                        </label>
                                    </div>

                                    <div className="drawer-side z-50">
                                        <label
                                            htmlFor="my-drawer-6"
                                            aria-label="close sidebar"
                                            className="drawer-overlay"
                                        ></label>
                                        <ul className="menu p-4 w-80 md:w-96 min-h-full  text-black font-poppins bg-white">
                                            {/* sidebar checkout */}
                                            {loadingPanelCheckout && (
                                                <div className="flex justify-center items-center font-poppins text-black text-center mt-4">
                                                    <span className="loading loading-ring loading-lg"></span>
                                                </div>
                                            )}
                                            {!loadingPanelCheckout && (
                                                <Box sx={{ width: '100%' }}>
                                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                        <Tabs
                                                            value={value}
                                                            onChange={handleChange}
                                                            aria-label="basic tabs example"
                                                        >
                                                            <Tab label="Ready Stock" {...a11yProps(0)} />
                                                            <Tab label="Pre-order" {...a11yProps(1)} />
                                                        </Tabs>
                                                    </Box>

                                                    {/* ready stock */}
                                                    <CustomTabPanel value={value} index={0}>
                                                        <p className="flex items-center rounded-md bg-purple-50 p-2 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 my-2 space-x-1 ">
                                                            <div>
                                                                <span>Jika memilih</span>
                                                                <span className="font-bold"> Ready Stock </span>
                                                                <span>, pesanan ini akan dikirim hari ini</span>
                                                            </div>
                                                        </p>

                                                        <Image
                                                            src={imageUrls[productCheckout!.photo!]}
                                                            width={1000}
                                                            height={1000}
                                                            alt={productCheckout!.name}
                                                        />

                                                        <div className="pt-4 lg:col-span-2 lg:border-gray-200 lg:pr-8">
                                                            <h1 className="font-bold  text-gray-900 text-xl">
                                                                {productCheckout!.name}
                                                            </h1>
                                                        </div>
                                                        <div className="pt-2">
                                                            <h3 className="sr-only">Description</h3>

                                                            <div className="space-y-6">
                                                                <p className="text-base text-gray-900">
                                                                    {productCheckout!.description}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="pt-2">
                                                            <h3 className="sr-only">Informasi</h3>

                                                            <div className="flex gap-2">
                                                                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                                    Stock: {productCheckout!.stock}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="pt-2">
                                                            <p className="text-lg font-semibold ">
                                                                Rp. {productCheckout!.price}
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
                                                                value={opsiPengiriman}
                                                                onChange={(value: string) => setOpsiPengiriman(value)}
                                                            >
                                                                <div className="relative mt-1">
                                                                    <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                                        <span className="block truncate">
                                                                            {opsiPengiriman}
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
                                                                {opsiPengiriman === 'Pickup Mandiri' &&
                                                                    'Tanggal Pengambilan'}
                                                                {opsiPengiriman === 'Dikirim Kurir' &&
                                                                    'Tanggal Pengiriman'}
                                                            </label>

                                                            <input
                                                                type="date"
                                                                className="block w-full rounded-lg border border-[#DADDE2] bg-white p-2.5 font-poppins text-sm text-black outline-none"
                                                                placeholder="Tanggal Pengiriman"
                                                                name="tanggal_pengiriman"
                                                                value={deliveryDate}
                                                                min={today}
                                                                max={today}
                                                                onChange={handleDateChange}
                                                            />
                                                        </div>

                                                        <div className="pt-4 flex flex-col gap-2">
                                                            <button
                                                                className="flex items-center justify-center border bg-[#AA2B2B] ml-1 text-white rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
                                                                onClick={() => {
                                                                    !isAuth && router.push('/login');
                                                                }}
                                                            >
                                                                Tambah ke cart
                                                                <span className="ml-1">
                                                                    <BsCart3></BsCart3>
                                                                </span>
                                                            </button>

                                                            <label
                                                                htmlFor="my-drawer-6"
                                                                className="flex items-center justify-center border border-[#AA2B2B] ml-1 bg-white text-[#AA2B2B] rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
                                                            >
                                                                Close
                                                            </label>
                                                        </div>
                                                    </CustomTabPanel>

                                                    {/* pre order */}
                                                    <CustomTabPanel value={value} index={1}>
                                                        <p className="flex items-center rounded-md bg-purple-50 p-2 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 my-2 space-x-1 ">
                                                            <div>
                                                                <span>Jika memilih</span>
                                                                <span className="font-bold"> Pre-order </span>
                                                                <span>
                                                                    , pesanan ini akan dikirim sesuai tanggal yang
                                                                    dipilih
                                                                </span>
                                                            </div>
                                                        </p>

                                                        <Image
                                                            src={imageUrls[productCheckout!.photo!]}
                                                            width={1000}
                                                            height={1000}
                                                            alt={productCheckout!.name}
                                                        />

                                                        <div className="pt-4 lg:col-span-2 lg:border-gray-200 lg:pr-8">
                                                            <h1 className="font-bold  text-gray-900 text-xl">
                                                                {productCheckout!.name}
                                                            </h1>
                                                        </div>
                                                        <div className="pt-2">
                                                            <h3 className="sr-only">Description</h3>

                                                            <div className="space-y-6">
                                                                <p className="text-base text-gray-900">
                                                                    {productCheckout!.description}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="pt-2">
                                                            <p className="text-lg font-semibold ">
                                                                Rp. {productCheckout!.price}
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
                                                                value={opsiPengiriman}
                                                                onChange={(value: string) => setOpsiPengiriman(value)}
                                                            >
                                                                <div className="relative mt-1">
                                                                    <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                                        <span className="block truncate">
                                                                            {opsiPengiriman}
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
                                                                {opsiPengiriman === 'Pickup Mandiri' &&
                                                                    'Tanggal Pengambilan'}
                                                                {opsiPengiriman === 'Dikirim Kurir' &&
                                                                    'Tanggal Pengiriman'}
                                                            </label>
                                                            <span className="mb-2 inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                                                Quota {formatDate(deliveryDate)} :
                                                                {productCheckout!.daily_quota}
                                                            </span>
                                                            <input
                                                                type="date"
                                                                className="block w-full rounded-lg border border-[#DADDE2] bg-white p-2.5 font-poppins text-sm text-black outline-none"
                                                                placeholder="Tanggal Pengiriman"
                                                                name="tanggal_pengiriman"
                                                                value={deliveryDate}
                                                                min={today}
                                                                onChange={handleDateChange}
                                                            />
                                                        </div>

                                                        <div className="pt-4 flex flex-col gap-2">
                                                            <button
                                                                className="flex items-center justify-center border bg-[#AA2B2B] ml-1 text-white rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
                                                                onClick={() => {
                                                                    !isAuth && router.push('/login');
                                                                }}
                                                            >
                                                                Tambah ke cart
                                                                <span className="ml-1">
                                                                    <BsCart3></BsCart3>
                                                                </span>
                                                            </button>

                                                            <label
                                                                htmlFor="my-drawer-6"
                                                                className="flex items-center justify-center border border-[#AA2B2B] ml-1 bg-white text-[#AA2B2B] rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
                                                            >
                                                                Close
                                                            </label>
                                                        </div>
                                                    </CustomTabPanel>
                                                </Box>
                                            )}
                                        </ul>
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
