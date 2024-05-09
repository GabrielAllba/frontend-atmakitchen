
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Fragment } from 'react';
import { Dialog, Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Penitip } from '@/dummy_data/penitip';
import { SatuanTitipan, satuan_titipan_data } from '@/dummy_data/satuan_titipan';
import axios from 'axios';
import { ProductType } from '@/dummy_data/product_type';
import { Product, ProductFetch } from '@/dummy_data/product';

export default function TambahTitipan() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [productType, setProductType] = useState<ProductType[]>([]);

    const [penitipData, setPenitipData] = useState<Penitip[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [alert, setAlert] = useState<boolean>(false);
    const [penitipSelected, setPenitipSelected] = useState<Penitip>();
    const [satuanSelected, setSatuanSelected] = useState<SatuanTitipan>(satuan_titipan_data[0]);

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredData, setFilteredData] = useState<ProductFetch[]>([]);
    const [isPosting, setIsPosting] = useState<boolean>(false);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(5);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});
    const [editImageUrls, setEditImageUrls] = useState<string>();

    // useEffect(() => {
    //     const filtered = currentItems.filter(
    //         (item) =>
    //             item?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //             item?.harga?.toString().toLowerCase().includes(searchQuery.toLowerCase()),
    //     );
    //     setFilteredData(filtered);
    // }, [searchQuery]);

    // modal
    const [openModal, setOpenModal] = useState<boolean>(false);
    const cancelButtonRef = useRef(null);

    const [editTitipan, setEditTitipan] = useState<ProductFetch>();
    const [submitEditTitipan, setSubmitEditTitipan] = useState<Product>();
    const [penitipModal, setPenitipModal] = useState<Penitip>({});
    const [satuanModal, setSatuanModal] = useState<Penitip>();

    useEffect(() => {
        penitipData.forEach((i) => {
            if (i.id === editTitipan?.consignation_id) {
                setPenitipModal(i);
                fetchImageEdit(editTitipan?.photo!);
                setSubmitEditTitipan({ ...editTitipan!, photo: null });
                return;
            }
        });
    }, [penitipData, editTitipan]);

    const [product, setProduct] = useState<Product>({
        name: '',
        price: 0,
        description: '',
        stock: 0,
        daily_quota: 0,
        status: 'Aktif',
        product_type_id: 0,
        consignation_id: null,
        photo: null,
    });

    useEffect(() => {
        const fetchProductType = async () => {
            try {
                const response = await axios.get(apiUrl + '/product_type/');
                const productTypeData = response.data.product_type;
                setProductType(productTypeData);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductType();
    }, []);

    useEffect(() => {
        setProduct({
            ...product,
            product_type_id: productType.find((type) => type.name == 'Titipan')?.id || 0,
        });
    }, [productType]);

    const fetchPenitip = async () => {
        try {
            setLoading(true);
            const response = await axios(apiUrl + '/consignation');
            setPenitipData(response.data.consignation);
            setPenitipSelected(response.data.consignation[0]);
            // if (penitipData.length > 0) {
            setProduct({ ...product, consignation_id: response.data.consignation[0].id });
            // }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching consignation:', error);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            setProduct({ ...product, photo: file });
        }
    };

    const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            setSubmitEditTitipan({ ...editTitipan!, photo: file! });
        }
        console.log(editTitipan);
    };

    useEffect(() => {
        fetchPenitip();
    }, []);

    const fetchTitipan = () => {
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
            console.error('Error fetching titipan:', error);
        }
    };

    useEffect(() => {
        fetchTitipan();
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
    const fetchImageEdit = async (name: string) => {
        try {
            const response = await axios.get(apiUrl + name, {
                responseType: 'blob',
            });
            const blob = response.data;
            const objectURL = URL.createObjectURL(blob);
            setEditImageUrls(objectURL);
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
    const handleTambahTitipan = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(product);
        // Create FormData object
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('price', String(product.price));
        formData.append('description', product.description);
        formData.append('stock', String(product.stock));
        formData.append('daily_quota', String(product.daily_quota));
        formData.append('status', product.status);
        formData.append('product_type_id', String(product.product_type_id));
        formData.append('consignation_id', String(product.consignation_id));

        if (product.photo) {
            formData.append('photo', product.photo);
        }
        console.log(formData);

        axios({
            method: 'post',
            url: apiUrl + '/product',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                console.log(response);
                setProduct({
                    name: '',
                    price: 0,
                    description: '',
                    stock: 0,
                    daily_quota: 0,
                    status: 'Aktif',
                    product_type_id: 0,
                    consignation_id: null,
                    photo: null,
                });

                const fileInput = document.getElementById('foto_titipan') as HTMLInputElement;
                if (fileInput) {
                    fileInput.value = '';
                }
                setAlert(true);
                fetchTitipan();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        const fetchSearchResults = async () => {
            setFilteredData([]);
            setLoading(true);

            try {
                const response = await axios.get(apiUrl + '/product/type/search', {
                    params: {
                        query: 'Titipan',
                        search_query: searchQuery,
                    },
                });
                setFilteredData(response.data.products);
            } catch (error) {
                console.error('Error fetching titipan:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSearchResults();
    }, [searchQuery]);

    const handleDelete = async (id: number) => {
        try {
            const response = await axios.delete(apiUrl + `/product/${id}`);
            fetchTitipan();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(submitEditTitipan);

        const formData = new FormData();
        formData.append('name', submitEditTitipan!.name);
        formData.append('price', String(submitEditTitipan!.price));
        formData.append('description', submitEditTitipan!.description);
        formData.append('stock', String(submitEditTitipan!.stock));
        formData.append('daily_quota', String(submitEditTitipan!.daily_quota));
        formData.append('status', submitEditTitipan!.status);
        formData.append('product_type_id', String(submitEditTitipan!.product_type_id));
        formData.append('consignation_id', String(submitEditTitipan!.consignation_id));

        if (submitEditTitipan!.photo) {
            formData.append('photo', submitEditTitipan!.photo);
        }
        console.log(formData);
        setIsPosting(true);

        axios({
            method: 'put',
            url: apiUrl + '/product/' + submitEditTitipan?.id,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                console.log(response);
                setAlert(true);
                fetchTitipan();
                setOpenModal(false);

                const fileInput = document.getElementById('foto_titipan') as HTMLInputElement;
                if (fileInput) {
                    fileInput.value = '';
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsPosting(false);
            });
    };

    return (
        <div className="flex bg-[#FFFCFC] min-h-screen font-poppins text-black p-8">
            <div className="w-full">
                <div className="card bg-primary border pb-8 rounded">
                    <div className="card-body">
                        <form className="font-poppins" onSubmit={handleTambahTitipan}>
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                <div className="h-min rounded-md border bg-white">
                                    <div className="border-b p-4">
                                        <p className=" text-[#AA2B2B]">Data Titipan</p>
                                    </div>
                                    <div className="p-4">
                                        <div className="mb-4">
                                            <label
                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                htmlFor="nama_produk"
                                            >
                                                Tipe Produk
                                            </label>
                                            <input
                                                className="block w-full rounded-lg border border-[#DADDE2] bg-white p-2.5 font-poppins text-sm text-black outline-none"
                                                id="tipe_produk"
                                                required
                                                type="text"
                                                value={productType.find((type) => type.name == 'Titipan')?.name || ''}
                                                readOnly
                                                onChange={(e) => {
                                                    setProduct({
                                                        ...product,
                                                        product_type_id:
                                                            productType.find((type) => type.name == 'Titipan')?.id || 0,
                                                    });
                                                }}
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label
                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                htmlFor="nama_produk"
                                            >
                                                Penitip
                                            </label>
                                            <Listbox
                                                value={penitipSelected}
                                                onChange={(value: Penitip) => {
                                                    setPenitipSelected(value);
                                                    setProduct({ ...product, consignation_id: value.id! });
                                                }}
                                            >
                                                <div className="relative mt-1">
                                                    <Listbox.Button className="relative w-full bg-white border border-[#DADDE2] rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                        <span className="block truncate text-[#A5A5A5]">
                                                            {penitipSelected?.name}
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
                                                        {penitipData.map((opt) => (
                                                            <Listbox.Option
                                                                key={opt?.name}
                                                                value={opt}
                                                                className={({ active, selected }) =>
                                                                    `${
                                                                        active
                                                                            ? 'text-white bg-indigo-600'
                                                                            : 'text-gray-900'
                                                                    }
                                        cursor-default select-none relative py-2 pl-3 pr-9`
                                                                }
                                                            >
                                                                {({ selected }) => (
                                                                    <span
                                                                        className={`${
                                                                            selected ? 'font-semibold' : 'font-normal'
                                                                        } block truncate`}
                                                                    >
                                                                        {opt?.name}
                                                                    </span>
                                                                )}
                                                            </Listbox.Option>
                                                        ))}
                                                    </Listbox.Options>
                                                </div>
                                            </Listbox>
                                        </div>
                                        <div className="mb-4">
                                            <label
                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                htmlFor="nama_produk"
                                            >
                                                Nama Titipan
                                            </label>
                                            <input
                                                className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                id="nama_titipan"
                                                placeholder="Nama Titipan"
                                                required
                                                type="text"
                                                value={product.name}
                                                onChange={(e) => {
                                                    setProduct({ ...product, name: e.target.value });
                                                }}
                                            ></input>
                                        </div>
                                        <div className="mb-4">
                                            <label
                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                htmlFor="deskripsi"
                                            >
                                                Deskripsi
                                            </label>
                                            <textarea
                                                className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                id="deskripsi"
                                                required
                                                placeholder="Deskripsi"
                                                value={product.description}
                                                onChange={(e) => {
                                                    setProduct({ ...product, description: e.target.value });
                                                }}
                                            ></textarea>
                                        </div>
                                        <div className="mb-4">
                                            <label
                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                htmlFor="foto_titipan"
                                            >
                                                Foto Titipan
                                            </label>
                                            <input
                                                className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                id="foto_titipan"
                                                placeholder="foto_titipan"
                                                required
                                                type="file"
                                                onChange={handleFileChange}
                                            ></input>
                                        </div>
                                        <div className="mb-4">
                                            <label
                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                htmlFor="price"
                                            >
                                                Harga
                                            </label>
                                            <input
                                                className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                id="price"
                                                required
                                                type="number"
                                                value={product.price}
                                                onChange={(e) => {
                                                    setProduct({ ...product, price: parseFloat(e.target.value) });
                                                }}
                                            ></input>
                                        </div>
                                        <div className="mb-4">
                                            <label
                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                htmlFor="ready_stock"
                                            >
                                                Ready Stock
                                            </label>
                                            <input
                                                className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                id="foto_titipan"
                                                required
                                                type="number"
                                                value={product.stock}
                                                onChange={(e) => {
                                                    setProduct({ ...product, stock: parseFloat(e.target.value) });
                                                }}
                                            ></input>
                                        </div>
                                        <div className="mt-4 flex w-full items-center">
                                            <button
                                                className="w-full rounded-lg bg-[#AA2B2B] px-5  py-2.5 text-center font-poppins text-sm font-medium text-white outline-none  hover:bg-[#832a2a]"
                                                type="submit"
                                            >
                                                Tambah Titipan
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-md border bg-white">
                                    <div className="border-b p-4">
                                        <p className=" text-[#AA2B2B] ">List Titipan</p>
                                    </div>
                                    <div className="p-4">
                                        <input
                                            type="text"
                                            placeholder="Search By Name, Description, Price "
                                            className="search bg-white border p-2 outline-none w-full sm:w-full mb-4"
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                        />

                                        <div className="overflow-auto">
                                            <table className="table-auto w-full overflow-auto">
                                                <thead>
                                                    <tr className="border">
                                                        <th className="p-8 border text-start font-semibold">ID</th>
                                                        <th className="p-8 border text-start font-semibold">Titipan</th>
                                                        <th className="p-8 border text-start font-semibold">Penitip</th>
                                                        <th className="p-8 border text-start font-semibold">
                                                            Ready Stock
                                                        </th>
                                                        <th className="p-8 border text-start font-semibold">Harga</th>
                                                        <th className="p-8 border text-start font-semibold">Aksi</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentItems.map((item) => {
                                                        return (
                                                            <tr key={item.id} className="border text-[#7D848C]">
                                                                <td className="p-4 border">{item.id}</td>
                                                                <td className="p-4 border">{item.name}</td>

                                                                {penitipData.map((i) => {
                                                                    if (i.id == item.consignation_id) {
                                                                        return (
                                                                            <td key={i.id} className="p-4 border">
                                                                                {i.name}
                                                                            </td>
                                                                        );
                                                                    }
                                                                })}

                                                                <td className="p-4 border text-[#AA2B2B]">
                                                                    {item.stock}
                                                                </td>
                                                                <td className="p-4 border text-[#AA2B2B]">
                                                                    Rp. {item.price}
                                                                </td>

                                                                <td className="p-4 border">
                                                                    <div className="flex gap-2">
                                                                        <button
                                                                            onClick={() => {
                                                                                setEditTitipan(item);
                                                                                setOpenModal(true);
                                                                            }}
                                                                            className="flex items-center rounded-md bg-[#E7F9FD] px-4 py-1 font-poppins w-fit text-[#1D6786]"
                                                                        >
                                                                            Edit
                                                                        </button>
                                                                        <button
                                                                            onClick={() => {
                                                                                handleDelete(item.id!);
                                                                            }}
                                                                            className="flex items-center rounded-md bg-[#FDE7E7] px-4 py-1 font-poppins w-fit text-[#AA2B2B]"
                                                                        >
                                                                            Hapus
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                            <div className="flex justify-end my-8">
                                                <button
                                                    onClick={() => paginate(currentPage - 1)}
                                                    disabled={currentPage === 1}
                                                    className="p-4 border"
                                                >
                                                    Previous
                                                </button>
                                                {[...Array(Math.ceil(filteredData.length / itemsPerPage))].map(
                                                    (_, index) => (
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
                                                    ),
                                                )}
                                                <button
                                                    onClick={() => paginate(currentPage + 1)}
                                                    disabled={
                                                        currentPage === Math.ceil(filteredData.length / itemsPerPage)
                                                    }
                                                    className="p-4 border"
                                                >
                                                    Next
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <Transition.Root show={openModal} as={Fragment}>
                            <Dialog
                                as="div"
                                className="relative z-10"
                                initialFocus={cancelButtonRef}
                                onClose={setOpenModal}
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
                                                    <div className="sm:flex sm:items-start">
                                                        <form className="font-poppins" onSubmit={handleUpdate}>
                                                            <div className="grid grid-cols-1 gap-4">
                                                                <div className="h-min rounded-md border bg-white">
                                                                    <div className="border-b p-4">
                                                                        <p className=" text-[#AA2B2B] ">Data Titipan</p>
                                                                    </div>
                                                                    <div className="p-4">
                                                                        <div className="mb-4">
                                                                            <label
                                                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                                                htmlFor="nama_produk"
                                                                            >
                                                                                Penitip
                                                                            </label>
                                                                            <Listbox
                                                                                value={penitipModal}
                                                                                onChange={(value: Penitip) => {
                                                                                    // Update penitipModal state
                                                                                    setPenitipModal(value);
                                                                                    setSubmitEditTitipan(
                                                                                        (prevData) => ({
                                                                                            ...prevData!,
                                                                                            consignation_id: value.id!,
                                                                                        }),
                                                                                    );
                                                                                }}
                                                                            >
                                                                                <div className="relative mt-1">
                                                                                    <Listbox.Button className="relative w-full bg-white border border-[#DADDE2] rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                                                        <span className="block truncate text-[#A5A5A5]">
                                                                                            {penitipModal?.name}
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
                                                                                        {penitipData.map((opt) => (
                                                                                            <Listbox.Option
                                                                                                key={opt?.name}
                                                                                                value={opt}
                                                                                                className={({
                                                                                                    active,
                                                                                                    selected,
                                                                                                }) =>
                                                                                                    `${
                                                                                                        active
                                                                                                            ? 'text-white bg-indigo-600'
                                                                                                            : 'text-gray-900'
                                                                                                    }
                                        cursor-default select-none relative py-2 pl-3 pr-9`
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
                                                                                                        {opt?.name}
                                                                                                    </span>
                                                                                                )}
                                                                                            </Listbox.Option>
                                                                                        ))}
                                                                                    </Listbox.Options>
                                                                                </div>
                                                                            </Listbox>
                                                                        </div>
                                                                        <div className="mb-4">
                                                                            <label
                                                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                                                htmlFor="nama_produk"
                                                                            >
                                                                                Nama Titipan
                                                                            </label>
                                                                            <input
                                                                                className="block w-full rounded-lg border border-[#DADDE2] bg-white p-2.5 font-poppins text-sm text-black outline-none"
                                                                                id="harga_produk"
                                                                                placeholder="Nama Titipan"
                                                                                required
                                                                                value={submitEditTitipan?.name}
                                                                                onChange={(e) => {
                                                                                    const { value } = e.target;
                                                                                    // setEditTitipan({
                                                                                    //     ...editTitipan!,
                                                                                    //     name: value,
                                                                                    // });
                                                                                    setSubmitEditTitipan({
                                                                                        ...submitEditTitipan!,
                                                                                        name: value,
                                                                                    });
                                                                                }}
                                                                                type="text"
                                                                            />
                                                                        </div>
                                                                        <div className="mb-4">
                                                                            <label
                                                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                                                htmlFor="deskripsi"
                                                                            >
                                                                                Deskripsi
                                                                            </label>
                                                                            <textarea
                                                                                className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                                                id="deskripsi"
                                                                                required
                                                                                placeholder="Deskripsi"
                                                                                value={submitEditTitipan?.description}
                                                                                onChange={(e) => {
                                                                                    const { value } = e.target;
                                                                                    // setEditTitipan({
                                                                                    //     ...editTitipan!,
                                                                                    //     description: value,
                                                                                    // });
                                                                                    setSubmitEditTitipan({
                                                                                        ...submitEditTitipan!,
                                                                                        description: value,
                                                                                    });
                                                                                }}
                                                                            ></textarea>
                                                                        </div>
                                                                        <div className="mb-4">
                                                                            <label
                                                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                                                htmlFor="foto_titipan"
                                                                            >
                                                                                Foto Titipan
                                                                            </label>
                                                                            <input
                                                                                className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                                                id="foto_titipan"
                                                                                placeholder="foto_titipan"
                                                                                type="file"
                                                                                onChange={handleEditFileChange}
                                                                            ></input>
                                                                            {editTitipan?.photo && (
                                                                                <div className="my-4">
                                                                                    {imageUrls && (
                                                                                        <Image
                                                                                            src={editImageUrls!}
                                                                                            className="rounded-lg bg-gray-100"
                                                                                            width={500}
                                                                                            height={500}
                                                                                            alt=""
                                                                                        />
                                                                                    )}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                        <div className="mb-4">
                                                                            <label
                                                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                                                htmlFor="harga"
                                                                            >
                                                                                Harga
                                                                            </label>
                                                                            <input
                                                                                className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                                                id="foto_titipan"
                                                                                placeholder="Harga"
                                                                                required
                                                                                value={submitEditTitipan?.price}
                                                                                type="number"
                                                                                onChange={(e) => {
                                                                                    const { value } = e.target;
                                                                                    // setEditTitipan({
                                                                                    //     ...editTitipan!,
                                                                                    //     price: parseFloat(value),
                                                                                    // });
                                                                                    setSubmitEditTitipan({
                                                                                        ...submitEditTitipan!,
                                                                                        price: parseFloat(value),
                                                                                    });
                                                                                }}
                                                                            ></input>
                                                                        </div>
                                                                        <div className="mb-4">
                                                                            <div>
                                                                                <label
                                                                                    className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                                                    htmlFor="ready_stock"
                                                                                >
                                                                                    Ready Stock
                                                                                </label>
                                                                                <input
                                                                                    className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                                                    id="foto_titipan"
                                                                                    placeholder="Kuantitas"
                                                                                    required
                                                                                    value={submitEditTitipan?.stock}
                                                                                    type="number"
                                                                                    onChange={(e) => {
                                                                                        const { value } = e.target;
                                                                                        // setEditTitipan({
                                                                                        //     ...editTitipan!,
                                                                                        //     stock: parseFloat(value),
                                                                                        // });
                                                                                        setSubmitEditTitipan({
                                                                                            ...submitEditTitipan!,
                                                                                            stock: parseFloat(value),
                                                                                        });
                                                                                    }}
                                                                                ></input>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <hr className="mt-4" />
                                                            <div className="mt-4 flex w-full items-center">
                                                                <button
                                                                    className="w-full rounded-lg bg-[#AA2B2B] px-5  py-2.5 text-center font-poppins text-sm font-medium text-white outline-none  hover:bg-[#832a2a]"
                                                                    type="submit"
                                                                >
                                                                    Edit Titipan
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                    <button
                                                        type="button"
                                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                        onClick={() => setOpenModal(false)}
                                                        ref={cancelButtonRef}
                                                    >
                                                        Cancel
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
}
