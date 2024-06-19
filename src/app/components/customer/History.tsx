'use client';

import axios from 'axios';
import { Fragment } from 'react';
import Alert from '@mui/material/Alert';
import { useRouter } from 'next/navigation';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { Dialog, Transition } from '@headlessui/react';
import React, { useState, useEffect, useRef } from 'react';
import { User } from '@/dummy_data/user';
import { TransactionDetail } from '@/dummy_data/transaction_detaill';
import { Product } from '@/dummy_data/product';
import { IoIosSearch } from "react-icons/io";
import { MdShoppingBag } from "react-icons/md";
import { ProductFetch } from '@/dummy_data/product';
import Image from 'next/image';
import { TransactionFetch } from '@/dummy_data/transaction';

interface Customer {
    id: number;
    born_date: string;
    email: string;
    name: string;
    password: string;
    phone_number: string;
    role: { id: number; name: string; gaji_harian: number };
    role_id: number;
    total_point: number;
    username: string;
}

export default function AdminLogin() {
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const handleSubmitPost = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    // Modal state
    const [openUpdateModal, setopenUpdateModal] = useState<boolean>(false);
    const [updateModal, setUpdateModal] = useState<User>();
    const cancelButtonEdit = useRef(null);

    const [fetchTransactionDetail, setFetchTransactionDetail] = useState<TransactionDetail[]>([]);
    const [fetchProduct, setFetchProduct] = useState<ProductFetch[]>([]);

    // Get user from login
    const [customer, setCustomer] = useState<Customer>({
        id: 0,
        born_date: '',
        email: '',
        name: '',
        password: '',
        phone_number: '',
        role: { id: 0, name: '', gaji_harian: 0 },
        role_id: 0,
        total_point: 0,
        username: '',
    });


    useEffect(() => {
        const customer = localStorage.getItem('user');
        if (customer) {
            setCustomer(JSON.parse(customer));
        }
    }, []);


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
    const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});

    const fetchAllImages = async (item: []) => {
        const imageUrls: { [key: string]: string } = {};

        for (let i = 0; i < item.length; i++) {
            const imageUrl = await fetchImage(item[i]);
            imageUrls[i] = imageUrl;
        }

        setImageUrls(imageUrls);
    };

    useEffect(() => {
        if (customer.id !== 0) {
            try {
                axios({
                    method: 'get',
                    url: `${apiUrl}/transaction_details/user/` + customer.id,
                }).then((response) => {
                    setFetchTransactionDetail(response.data.transaction_details);
                    setFilteredData(response.data.transaction_details);
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
                    url: `${apiUrl}/transaction_details/invoice/photos/user/` + customer.id,
                }).then((response) => {
                    if (response.data.photos) {
                        fetchAllImages(response.data.photos);
                    }
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }, [customer.id]);

    // Update customer
    const [submitEditUser, setSubmitEditUser] = useState<User>();

    const handleUpdate = (e: React.FormEvent<HTMLFormElement>, email: string) => {
        e.preventDefault();
        axios({
            method: 'put',
            url: `${apiUrl}/users/updateUser/${email}`,
            data: submitEditUser,
        })
            .then((response) => {
                console.log(response);
                setopenUpdateModal(false);
                // fetchCustomerData(email);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const [saveClicked, setSaveClicked] = useState<boolean>(false);

    const getProductNameById = (productId: number | null | undefined) => {
        if (!fetchProduct || fetchProduct.length === 0) return 'Loading...';
        const product = fetchProduct.find((product) => product.id === productId);
        return product ? product.name : 'Product Name Not Found';
    };

    const formatDate = (dateString: string) => {
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const months = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];

        const date = new Date(dateString);
        const dayName = days[date.getDay()];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${dayName}, ${day} ${month} ${year}`;
    };


    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredData, setFilteredData] = useState<TransactionFetch[]>([]);
    useEffect(() => {
        const fetchSearchResults = async () => {
            setFilteredData([]);

            try {
                const response = await axios.get(apiUrl + '/transaction_details/search', {
                    params: {
                        search_query: searchQuery,
                    },
                });
                setFilteredData(response.data.transactionDetails);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
            }
        };
        fetchSearchResults();
    }, [searchQuery]);

    // const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.get(`${apiUrl}/transaction_details/search`, {
    //             params: { query: searchQuery } // Ensure 'query' matches your Go handler's query parameter name
    //         });
    //         setFilteredData(response.data.transactionDetails);
    //     } catch (error) {
    //         console.error('Error fetching search results:', error);
    //     }
    // }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchQuery(e.target.value);
        if (searchQuery == '') {
        }
    };
    

    return (
        <div className="container ">
            <div className="flex flex-wrap justify-center">
                <div className="card bg-white shadow-md m-2 p-4 border border-slate-200" style={{ width: '90%', height: 'auto' }}>
                    <div className='p-3'>
                        <h1 className='text-slate-900 font-poppins font-bold text-3xl'>History Pemesanan</h1>
                    </div>
                    <div className='flex justify-end'>
                        <form className="max-w-mx-auto">
                            <div className="relative text-gray-600">
                                <input type="search" name="search" placeholder="Search History" className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none border border-slate-200" 
                                value={searchQuery}
                                onChange={handleSearchChange}
                                />
                                <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                                    <IoIosSearch style={{ width: '20px', height: '20px' }} />
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className='p-5 mt-3'>
                        {fetchTransactionDetail.map((order,index) => (
                            <div key={order.id} className="border rounded-lg p-7 mb-4 bg-white font-poppins shadow-md">
                                <div className="flex justify-between items-center mb-2">
                                    <div className='flex items-center justify-between '>
                                        <MdShoppingBag style={{ width: '20px', height: '20px', color: '#AA2B2B' }} />
                                        <span className="text-slate-950 mx-3">{formatDate(order.tanggal_pemesanan!)}</span>
                                    </div>

                                    <span className="bg-[#f6dede] text-[#AA2B2B] font-bold py-1 px-3 rounded-full">{order.transaction_status}</span>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className='text-gray-600 '> No. Transaksi : <span className='text-[#AA2B2B]'>{order.invoice_number}</span></span>
                                </div>
                                <div className="flex">
                                        <Image
                                            className="rounded"
                                            src={imageUrls[index]}
                                            height={100}
                                            width={100}
                                            alt={'image-' + index}
                                        />
                                    <div className='ml-4'>
                                        <h2 className="font-bold text-lg text-slate-800">{getProductNameById(order.product_id)}</h2>
                                        <p className="text-gray-600">Atma Kitchen</p>
                                        <p className="text-gray-600">{order.product_quantity} barang x {order.product_price}</p>
                                    </div>
                                    <div className="ml-auto text-right">
                                        <p className="text-gray-600">Total Belanja</p>
                                        <p className="font-bold text-lg text-slate-800">{order?.product_quantity! * order?.product_price!}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
