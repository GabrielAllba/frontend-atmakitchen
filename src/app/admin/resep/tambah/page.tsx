'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Fragment } from 'react';
import { Dialog, Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
// import { Penitip, penitip_data } from '@/dummy_data/penitip';
// import { SatuanTitipan, satuan_titipan_data } from '@/dummy_data/satuan_titipan';
import { Resep, resep_data } from '@/dummy_data/resep';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Product, ProductFetch } from '@/dummy_data/product';
//axios
import axios from 'axios';



export default function TambahTitipan() {
    // const [penitipSelected, setPenitipSelected] = useState<Penitip>(penitip_data[0]);
    // const [satuanSelected, setSatuanSelected] = useState<SatuanTitipan>(satuan_titipan_data[0]);

    
    const [filteredData, setFilteredData] = useState<Resep[]>(resep_data);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(5);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // useEffect(() => {
    //     const filtered = resep_data.filter((item) => item.nama.toLowerCase().includes(searchQuery.toLowerCase()));
    //     setFilteredData(filtered);
    // }, [searchQuery]);

    // modal
    // const [openModal, setOpenModal] = useState<boolean>(false);
    // const cancelButtonRef = useRef(null);
    // const [editTitipan, setEditTitipan] = useState<Titipan>();
    // const [penitipModal, setPenitipModal] = useState<Penitip>();
    // const [satuanModal, setSatuanModal] = useState<Penitip>();

    // useEffect(() => {
    //     if (editTitipan) {
    //         const matchingPenitip = penitip_data.find((p) => p.id === editTitipan.id_penitip);
    //         const matchingSatuan = satuan_titipan_data.find((p) => p.nama === editTitipan.satuan);

    //         setPenitipModal(matchingPenitip);
    //         setSatuanModal(matchingSatuan);
    //     }
    // }, [editTitipan]);

    const [openDetailModal, setOpenDetailModal] = useState<boolean>(false);
    const cancelButtonDetail = useRef(null);
    const [editDetail, setDetailResep] = useState<Resep>();
    const cancelButtonRef = useRef(null);

    // useEffect(() => {
    //     if (editDetail) {
    //         const matchingResep = resep_data.find((p) => p.nomor === editDetail.nomor);

    //         setDetailResep(matchingResep);
    //     }
    // }, [editDetail]);

    //modal Edit
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const cancelButtonEdit = useRef(null);
    const [editResep, setEditResep] = useState<Resep>();
    const [resepModal, setResepModal] = useState<Resep>();
    // const [satuanModal, setSatuanModal] = useState<Penitip>();

    // useEffect(() => {
    //     if (editResep) {
    //         const matchingResep = resep_data.find((p) => p.nomor === editResep.nomor);

    //         setEditResep(matchingResep);
    //     }
    // }, [editResep]);

    // fetch data dari produk

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [productSelected, setProductSelected] = useState<Product>();
    const [productData, setProductData] = useState<Product[]>([]);
    const [editTitipan, setEditTitipan] = useState<ProductFetch>();
    
    // useEffect(() => {
    //     const fetchProduct = async () => {
    //         try {
    //             const response = await axios.get(apiUrl + '/product/');
    //             const productData = response.data.product_type;
    //             setProductData(productData);
    //         } catch (error) {
    //             console.error('Error fetching product:', error);
    //         }
    //     };
    //     fetchProduct();
    // }, []);

    //fetch data product dan resep
    const fetchResep = () => {
        try {
            
            axios({
                method: 'get',
                url: `${apiUrl}/resep`,
        
            }).then((response) => {
                setFilteredData(response.data.resep);
                
            });
        } catch (error) {
            console.error('Error fetching resep:', error);
        }
    };

    const fetchProduct = async () => {
        try {
            const response = await axios({
                method: 'get',
                url: `${apiUrl}/product/type`,
                params: {
                    query: 'Produk Toko',
                },
            });
            setProductData(response.data.product);
            setProductSelected(response.data.product[0]);
            const firstProduct = response.data.product[0];
            await fetchImage(firstProduct.photo);
            // if (penitipData.length > 0) {
            setResep({ ...resep, product_id: response.data.product[0].id });
            // }
            
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    //image
    const [imageUrls, setImageUrls] = useState<string>();

    const fetchImage = async (name: string) => {
        try {
            const response = await axios.get(apiUrl + name, {
                responseType: 'blob',
            });
            const blob = response.data;
            const objectURL = URL.createObjectURL(blob);
            setImageUrls(objectURL);
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    const [resep, setResep] = useState<Resep>({
        instruction: '',
        product_id: 0
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(resep);
        // Create FormData object
        const formData = new FormData();
        formData.append('instruction', resep.instruction);
        formData.append('product_id', String(resep.product_id));

        console.log(formData);

        axios({
            method: 'post',
            url: apiUrl + '/resep',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                console.log(response);
                setResep({
                    instruction: '',
                    product_id: 0
                });

            })
            .catch((err) => {
                console.log(err);
            })
    };

    // delete data
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const handleDelete = async (id: number) => {
        try {
            const response = await axios.delete(apiUrl + `/resep/${id}`);
            fetchResep();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    //list resep
    const [imageUrlsList, setImageUrlsList] = useState<{ [key: string]: string }>({});
    
    //modal
    const [deleteResep, setDeleteResep] = useState<Resep>();

    //update list
    const [submitEditResep, setSubmitEditResep] = useState<Resep>();

    const handleUpdate = (e: React.FormEvent<HTMLFormElement>, itemId: number) => {
        e.preventDefault();
        console.log(submitEditResep);

        // Create FormData object
        const formData = new FormData();
        formData.append('instruction', submitEditResep!.instruction);

        console.log(formData);

        axios({
            method: 'put',
            url: apiUrl + '/resep/' + itemId,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                console.log(response);
                fetchResep();
                
            })
            .catch((err) => {
                console.log(err);
            })
    };
    



    return (
        <div className="flex bg-[#FFFCFC] min-h-screen font-poppins text-black p-8">
            <div className="w-full">
                <div className="card bg-primary border pb-8 rounded">
                    <div className="card-body">
                        <form className="font-poppins">
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                <div className="h-min rounded-md border bg-white">
                                    <div className="border-b p-4">
                                        <p className=" text-[#AA2B2B]">Input Data Resep</p>
                                    </div>
                                    <div className="p-4">
                                    <div className="mb-4">
                                        <label
                                            className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                            htmlFor="nama_produk"
                                        >
                                            Nama Produk
                                        </label>
                                        <Listbox
                                            value={productSelected}
                                            onChange={(value: Product) => {
                                                setProductSelected(value);
                                                setResep({ ...resep, product_id: value.id! }); // Update the product_id in the resep state
                                            }}
                                        >
                                            <div className="relative mt-1">
                                                <Listbox.Button
                                                    className="relative w-full bg-white border border-[#DADDE2] rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                >
                                                    <span className="block truncate text-[#A5A5A5]">
                                                        {productSelected?.name || "Select a product"}
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
                                                <Listbox.Options
                                                    className="absolute mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                                                >
                                                    {productData.map((opt) => (
                                                        <Listbox.Option
                                                            key={opt?.name} // Use a unique key for each option
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
                                                                    {opt.name}
                                                                </span>
                                                            )}
                                                        </Listbox.Option>
                                                    ))}
                                                </Listbox.Options>
                                            </div>
                                        </Listbox>
                                    </div>
                                        <div className="mb-4 ">
                                            <label
                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                htmlFor="foto_produk"
                                            >
                                                Langkah Pembuatan
                                            </label>
                                            
                                            <textarea
                                                className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                id="deskripsi"
                                                required
                                                placeholder="Deskripsi"
                                                value={resep?.instruction}
                                                onChange={(e) =>
                                                    setResep({ ...resep, instruction: e.target.value })   
                                                }
                                                
                                            ></textarea>
                                        </div>
                                        <div className="mt-4 flex w-full items-center">
                                            <button
                                                className="w-full rounded-lg bg-[#AA2B2B] px-5  py-2.5 text-center font-poppins text-sm font-medium text-white outline-none  hover:bg-[#832a2a]"
                                                type="submit"
                                            >
                                                Tambah Produk
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-md border bg-white">
                                    <div className="border-b p-4">
                                        <p className=" text-[#AA2B2B] ">List Resep</p>
                                    </div>
                                    <div className="p-4">
                                        <div className="overflow-auto">
                                            <table className="table-auto w-full overflow-auto">
                                                <thead>
                                                    <tr className="border">
                                                        <th className="p-8 border text-start font-semibold">No.</th>
                                                        <th className="p-8 border text-start font-semibold">
                                                            Nama Produk
                                                        </th>
                                                        <th className="p-8 border text-start font-semibold">
                                                            Detail Resep & Cara Pembuatan
                                                        </th>
                                                        <th className="p-8 border text-start font-semibold">
                                                            Foto Produk
                                                        </th>
                                                        <th className="p-8 border text-start font-semibold">Aksi</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentItems.map((item) => (
                                                        <tr key={item.id} className="border text-[#7D848C]">
                                                            <td className="p-4 border">{item.id}</td>
                                                            <td className="p-4 border">{productData.find((product) => product.id === item.product_id)?.name || 'Product Not Found'}</td>
                                                            <td className="p-4 border text-[#AA2B2B]">
                                                                <button
                                                                    id="openResep"
                                                                    onClick={() => {
                                                                        setDetailResep(item);
                                                                        setOpenDetailModal(true);
                                                                    }}
                                                                    className="bg-[#FDE7E7] hover:bg-[#AA2B2B] text-[#AA2B2B] hover:text-[#FDE7E7] font-poppins py-2 px-4 rounded-full"
                                                                >
                                                                    Klik Untuk Lihat Resep
                                                                </button>
                                                            </td>
                                                            <td className="p-4 border">
                                                                {productData && productData.length > 0 && (
                                                                        <Image
                                                                            src={imageUrlsList[productData.find(product => product.id === item.product_id)?.photo!] || ''}
                                                                            width={100}
                                                                            height={50}
                                                                            alt={item.instruction}
                                                                        />
                                                                )}
                                                            </td>
                                                            <td className="p-4 border">
                                                                <div className="flex gap-2">
                                                                    <button
                                                                        onClick={() => {
                                                                            setEditResep(item);
                                                                            setOpenEditModal(true);
                                                                        }}
                                                                        className="flex items-center rounded-md bg-[#E7F9FD] px-4 py-1 font-poppins w-fit text-[#1D6786]"
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                    <button
                                                                        onClick={() => {
                                                                            setDeleteResep(item);
                                                                            setOpenDeleteModal(true);
                                                                        }}
                                                                        className="flex items-center rounded-md bg-[#FDE7E7] px-4 py-1 font-poppins w-fit text-[#AA2B2B]"
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
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
                            
                            <hr className="mt-4" />
                        
                        <Transition.Root show={openDetailModal} as={Fragment}>
                            <Dialog
                                as="div"
                                className="relative z-10"
                                initialFocus={cancelButtonRef}
                                onClose={setOpenDetailModal}
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
                                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                            <Dialog.Title
                                                                as="h3"
                                                                className="text-base text- font-semibold leading-6 text-[#AA2B2B]"
                                                            >
                                                                Resep {productData.find((product) => product.id === editDetail?.product_id)?.name || 'Product Not Found'}
                                                            </Dialog.Title>

                                                            <hr className='mx-2' />
                                                            <div className="mt-2 flex justify-center">
                                                                {productData && productData.length > 0 && (
                                                                    <Image
                                                                        src={imageUrlsList[productData.find(product => product.id === editDetail?.product_id)?.photo!] || ''}
                                                                        width={100}
                                                                        height={50}
                                                                        alt={editDetail?.instruction!}
                                                                    />
                                                                )}
                                                            </div>
                                                            <div>
                                                                <h3 className="text-poppins text-[#AA2B2B] mt-6 text-sm">Langkah Pembuatan :</h3>
                                                                <p className="text-sm text-poppins text-slate-700 mt-4">
                                                                    {editDetail?.instruction!|| 'Product Not Found'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                
                                                </div>
                                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                    <button
                                                        type="button"
                                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                                        onClick={() => setOpenDetailModal(false)}
                                                    >
                                                        Back
                                                    </button>
                                                </div>
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition.Root>

                        <Transition.Root show={openEditModal} as={Fragment}>
                            <Dialog
                                as="div"
                                className="relative z-10"
                                initialFocus={cancelButtonEdit}
                                onClose={setOpenEditModal}
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
                                                        <form className="font-poppins" onSubmit={(e) => handleUpdate(e, editResep?.id!)}>
                                                            <div className="grid grid-cols-1 gap-4">
                                                                <div className="h-min rounded-md border bg-white">
                                                                  
                                                                    <div className="border-b p-4">
                                                                        <p className=" text-[#AA2B2B] ">
                                                                        Edit Resep {productData.find((product) => product.id === editResep?.product_id)?.name || 'Product Not Found'}
                                                                        </p>
                                                                    </div>
                                                                    <div className="p-4 overflow-auto">
                                                                        <div className="mb-4">
                                                                            <label
                                                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                                                htmlFor="nama"
                                                                            >
                                                                                Nama Produk
                                                                            </label>
                                                                            <input
                                                                                className="h- block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                                                id="foto_titipan"
                                                                                placeholder="foto_titipan"
                                                                                required
                                                                                type="description"
                                                                                value={productData.find((product) => product.id === editResep?.product_id)?.name || 'Product Not Found'}
                                                                            ></input>
                                                                        </div>
                                                                        <div className="mb-4 ">
                                                                            <label
                                                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                                                htmlFor="nama_produk"
                                                                            >
                                                                                Foto Produk
                                                                            </label>
                                                                            <div className="flex justify-center m-4">
                                                                                {productData && productData.length > 0 && (
                                                                                    <Image
                                                                                        src={imageUrlsList[productData.find(product => product.id === editResep?.product_id)?.photo!] || ''}
                                                                                        width={100}
                                                                                        height={50}
                                                                                        alt='gambar doang'
                                                                                    />
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-4">
                                                                            <label
                                                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                                                htmlFor="foto_produk"
                                                                            >
                                                                                Langkah Pembuatan:
                                                                            </label>
                                                                            <textarea
                                                                                className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                                                id="deskripsi"
                                                                                required
                                                                                placeholder="Deskripsi"
                                                                                value={submitEditResep?.instruction}
                                                                                onChange={(e) => {
                                                                                    const { value } = e.target;
                                                                                    
                                                                                    setSubmitEditResep({
                                                                                        ...submitEditResep!,
                                                                                        instruction: value,
                                                                                    });
                                                                                }}
                                                                            ></textarea>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                            <button
                                                                className=" rounded-md bg-[#AA2B2B] px-5  py-2.5 text-center font-semibold font-poppins text-sm  text-white outline-none  hover:bg-[#832a2a]"
                                                                type="submit"
                                                                onClick={() => setOpenEditModal(false)}
                                                            >
                                                                Save
                                                            </button>

                                                            <button
                                                                className="mx-3 rounded-md bg-white px-5  py-2.5 text-center font-semibold font-poppins text-sm  text-[#AA2B2B] outline-none  hover:bg-gray-100 shadow-sm ring-2 ring-inset ring-[#AA2B2B]"
                                                                type="button"
                                                                onClick={() => setOpenEditModal(false)}
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

                        <Transition.Root show={openDeleteModal} as={Fragment}>
                            <Dialog
                                as="div"
                                className="relative z-10"
                                initialFocus={cancelButtonRef}
                                onClose={setOpenDeleteModal}
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
                                            
                                                <><div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                                    <div className="sm:flex sm:items-start">
                                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                            <ExclamationTriangleIcon
                                                                className="h-6 w-6 text-[#AA2B2B]"
                                                                aria-hidden="true" />
                                                        </div>
                                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                            <Dialog.Title
                                                                as="h3"
                                                                className="text-base font-semibold leading-6 text-gray-900"
                                                            >
                                                                Hapus Resep
                                                            </Dialog.Title>
                                                            <div className="mt-2">
                                                                <p className="text-sm text-gray-500">
                                                                    Apakah anda yakin ingin menghapus resep ini ?
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div><div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                        <button
                                                            type="button"
                                                            className="inline-flex w-full justify-center rounded-md bg-[#AA2B2B] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                                            onClick={() => {setOpenDeleteModal(false); handleDelete(deleteResep?.id!);}}
                                                        >
                                                            Hapus
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-[#AA2B2B] shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                            onClick={() => setOpenDeleteModal(false)}
                                                            ref={cancelButtonRef}
                                                        >
                                                            Batal
                                                        </button>
                                                    </div></>
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
