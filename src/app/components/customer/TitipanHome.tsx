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
import { Cart } from '@/dummy_data/cart';

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

const getNext2Day = (): string => {
    const today = new Date();
    today.setDate(today.getDate() + 2);
    return today.toISOString().split('T')[0];
};
export default function TitipanHome({ isAuth }: { isAuth: boolean }) {
    const today = new Date().toISOString().split('T')[0];
    const [next2today, setNext2today] = useState<string>(getNext2Day());

    const [deliveryDate, setDeliveryDate] = useState(today);
    const [deliveryDateNext2Day, setDeliveryDateNext2Day] = useState(next2today);

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDeliveryDateNext2Day(event.target.value);
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
    const [alert, setAlert] = useState<boolean>(false);

    const [filteredData, setFilteredData] = useState<ProductFetch[]>([]);

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
                url: `${apiUrl}/product/type`,
                params: {
                    query: 'Titipan',
                },
            }).then((response) => {
                setFilteredData(response.data.product);
                fetchAllImages(response.data.product);
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
            const response = await axios.get(apiUrl + '/product/' + id);
            setProductCheckout(response.data.product);
            const firstProduct = response.data.product;
            await fetchImage(firstProduct.photo);
            setLoadingPanelCheckout(false);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        setNext2today(getNext2Day());
        setDeliveryDateNext2Day(getNext2Day());
    }, []);

    const [jumlahBeli, setJumlahBeli] = useState<number>(0);

    const handleTambahKeCart = async (e: React.FormEvent<HTMLFormElement>, jenis: string) => {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem('user') || '{}');
        let newCart: Cart = {
            user_id: user.id,
            product_id: productCheckout?.id,
            jenis_item: 'Titipan',
            quantity: jumlahBeli,
            total_price: productCheckout?.price! * jumlahBeli,
            status: productCheckout?.status!,
            jenis: jenis,

            tanggal_pengiriman: null,
        };
        if (jenis == 'pre-order') {
            newCart = {
                user_id: user.id,
                product_id: productCheckout?.id,
                jenis_item: 'Titipan',
                quantity: jumlahBeli,
                total_price: productCheckout?.price! * jumlahBeli,
                status: productCheckout?.status!,
                jenis: jenis,

                tanggal_pengiriman: deliveryDateNext2Day,
            };
        } else {
            newCart = {
                user_id: user.id,
                product_id: productCheckout?.id,
                jenis_item: 'Titipan',
                quantity: jumlahBeli,
                total_price: productCheckout?.price! * jumlahBeli,
                status: productCheckout?.status!,
                jenis: jenis,

                tanggal_pengiriman: null,
            };
        }

        const cartResponse = await axios.post(`${apiUrl}/cart`, newCart, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        });

        console.log('asdfklasdfadsf');
        const cart = cartResponse.data.cart;
        const product = cartResponse.data.cart.product;

        const updatedStock = product.stock - jumlahBeli;
        const stockResponse = await axios.put(
            `${apiUrl}/product/stock/${product.id}`,
            {
                stock: updatedStock,
            },
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
            },
        );

        console.log(newCart);
        setAlert(true);
    };

    return (
        <div className="font-poppins pb-8">
            <p className="text-2xl text-[#5A5A5A]">Titipan</p>
            <div className="py-8 overflow-x-auto">
                <div className="flex space-x-4 md:space-x-6 lg:space-x-8">
                    {currentItems.map((product) => (
                        <div
                            key={product.id}
                            className="w-72 flex-shrink-0 card bg-base-100 rounded-md rounded-t-md border text-black"
                        >
                            <div className="max-h-40 overflow-hidden flex items-center justify-center rounded-t-md">
                                <Image src={imageUrls[product.photo!]} width={1000} height={1000} alt={product.name} />
                            </div>

                            <div className="card-body bg-white">
                                <h2 className="card-title">{product.name}</h2>
                                <div className="flex gap-2">
                                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                        Stock: {product.stock}
                                    </span>
                                </div>
                                <p className="text-sm text-[#6B7280]">{product.description}</p>
                                <p className="text-lg font-semibold ">Rp. {product.price}</p>
                                <div className="drawer drawer-end">
                                    <input id="my-drawer-titipan" type="checkbox" className="drawer-toggle" />

                                    <div
                                        className="drawer-content w-full flex"
                                        onClick={() => {
                                            handleClickBeli(product.id!);
                                        }}
                                    >
                                        <label
                                            htmlFor="my-drawer-titipan"
                                            className="w-full rounded-lg bg-[#ffca1b] px-2 py-2 text-center font-poppins text-sm font-semibold text-[#1c1c1c] outline-none hover:bg-[#f4be0e] cursor-pointer"
                                        >
                                            Beli
                                        </label>
                                    </div>

                                    <div className="drawer-side z-50">
                                        <label
                                            htmlFor="my-drawer-titipan"
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
                                                                value={jumlahBeli}
                                                                onChange={(e) => {
                                                                    setJumlahBeli(parseFloat(e.target.value));
                                                                }}
                                                                type="number"
                                                            ></input>
                                                        </div>

                                                        <div className="pt-4 flex flex-col gap-2">
                                                            <button
                                                                className="flex items-center justify-center border bg-[#AA2B2B] ml-1 text-white rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
                                                                onClick={(e: any) => {
                                                                    !isAuth && router.push('/login');
                                                                    isAuth && handleTambahKeCart(e, 'ready-stock');
                                                                }}
                                                            >
                                                                Tambah ke cart
                                                                <span className="ml-1">
                                                                    <BsCart3></BsCart3>
                                                                </span>
                                                            </button>

                                                            <label
                                                                htmlFor="my-drawer-titipan"
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
