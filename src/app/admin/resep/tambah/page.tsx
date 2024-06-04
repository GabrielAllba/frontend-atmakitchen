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
import ListResep from '../list/page';
//axios
import axios from 'axios';
import { Bahan } from '@/dummy_data/bahan';
import { ResepBahan } from '@/dummy_data/resep_bahan';
import { ProdukHampers } from '@/dummy_data/produk_hampers';
import { Alert } from '@mui/material';

export default function TambahResep() {
    const [filteredData, setFilteredData] = useState<Resep[]>(resep_data);
    const [alert, setAlert] = useState<boolean>(false);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(5);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const [openDetailModal, setOpenDetailModal] = useState<boolean>(false);
    const cancelButtonDetail = useRef(null);
    const [editDetail, setDetailResep] = useState<Resep>();
    const cancelButtonRef = useRef(null);

    //modal Edit
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const cancelButtonEdit = useRef(null);
    const [editResep, setEditResep] = useState<Resep>();
    const [resepModal, setResepModal] = useState<Resep>();

    // fetch data dari produk

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [productSelected, setProductSelected] = useState<Product>();
    const [productData, setProductData] = useState<Product[]>([]);
    const [editTitipan, setEditTitipan] = useState<ProductFetch>();

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
        fetchBahan();
    }, []);

    const [resep, setResep] = useState<Resep>({
        instruction: '',
        product_id: 0,
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const latestId = await getReturnLatestId();
        console.log(resep);

        const formData = new FormData();
        formData.append('id', latestId);
        formData.append('instruction', resep.instruction);
        formData.append('product_id', String(resep.product_id));

        console.log(formData);
        await axios({
            method: 'post',
            url: apiUrl + '/resep',
            data: formData,
        })
            .then((response) => {
                console.log(response);
                setResep({
                    instruction: '',
                    product_id: 0,
                });
                fetchResep();
            })
            .catch((err) => {
                console.log(err);
            });

        if (addBahan?.length! > 0) {
            for (let i = 0; i < addBahan!.length; i++) {
                const bahan = addBahan![i];
                const detailFormData = new FormData();
                console.log(bahan);
                detailFormData.append('bahan_id', String(bahan.bahan.id));
                detailFormData.append('quantity', String(bahan.quantity));
                detailFormData.append('unit', String(bahan.bahan.satuan));
                detailFormData.append('product_id', String(resep.product_id));

                await axios({
                    method: 'post',
                    url: apiUrl + '/resep/detail/' + bahan.recipe_id,
                    data: detailFormData,
                })
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }
        setAddBahan([]);
        setAlert(true);
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
            });
    };

    const [openModalTambahBahan, setopenModalTambahBahan] = useState<boolean>(false);
    const cancelButtonRefTambahBahan = useRef(null);

    const [bahan, setBahan] = useState<Bahan>();
    const [bahanData, setBahanData] = useState<Bahan[]>([]);

    const fetchBahan = () => {
        try {
            axios({
                method: 'get',
                url: `${apiUrl}/bahan`,
            }).then((response) => {
                setBahanData(response.data.bahan);
            });
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        setBahan(bahanData[0]);
    }, [bahanData]);

    const getReturnLatestId = async () => {
        try {
            const response = await axios({
                method: 'get',
                url: `${apiUrl}/resep/latest_id`,
            });
            return response.data.latest_resep_id + 1;
        } catch (error) {
            console.error('Error fetching resep:', error);
            throw error; // Throw error to handle it further
        }
    };

    const [kuantitasBahan, setKuantitasBahan] = useState<number>(0);
    const handleChangekuantitasBahan = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKuantitasBahan(Number(e.target.value));
    };

    const [unitBahan, setUnitBahan] = useState<string>('');

    const [addBahan, setAddBahan] = useState<ResepBahan[]>();

    async function handleTambahBahan(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const latestId = await getReturnLatestId();

        const newBahan: ResepBahan = {
            id: (addBahan?.length || 0) + 1,
            quantity: kuantitasBahan,
            unit: unitBahan,
            bahan: bahan!,
            recipe_id: latestId!,
        };

        setAddBahan((prevBahan) => [...(prevBahan || []), newBahan]);

        console.log(addBahan);
        console.log(resep);
    }

    const deleteItem = (index: number) => {
        setAddBahan((prevBahan) => prevBahan?.filter((_, i) => i !== index));
    };
    return (
        <div className="flex bg-[#FFFCFC] min-h-screen font-poppins text-black p-8">
            {alert && (
                <div className="flex justify-center w-screen fixed top-20 left-0 z-50">
                    <Alert
                        severity="success"
                        className="font-poppins mb-4"
                        onClose={() => {
                            setAlert(false);
                        }}
                    >
                        <p>Berhasil menambah resep!</p>
                    </Alert>
                </div>
            )}
            <div className="w-full">
                <div className="card bg-primary border pb-8 rounded">
                    <div className="card-body">
                        <div className="font-poppins">
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                <form className="h-min rounded-md border bg-white" onSubmit={handleSubmit}>
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
                                                    <Listbox.Button className="relative w-full bg-white border border-[#DADDE2] rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                        <span className="block truncate text-[#A5A5A5]">
                                                            {productSelected?.name || 'Select a product'}
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
                                                    <Listbox.Options className="absolute mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
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
                                                onChange={(e) => setResep({ ...resep, instruction: e.target.value })}
                                            ></textarea>
                                        </div>
                                        <div className="mt-4 flex w-full items-center">
                                            <button
                                                className="w-full rounded-lg bg-[#AA2B2B] px-5  py-2.5 text-center font-poppins text-sm font-medium text-white outline-none  hover:bg-[#832a2a]"
                                                type="submit"
                                            >
                                                Tambah Resep
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                <div className="rounded-md border bg-white">
                                    <div className="rounded-md border bg-white">
                                        <div className="border-b p-4">
                                            <p className=" text-[#AA2B2B] ">Data Bahan</p>
                                        </div>
                                        <div className="p-4">
                                            <div className="overflow-auto">
                                                <table className="table-auto w-full overflow-auto">
                                                    <thead>
                                                        <tr className="border">
                                                            <th className="p-8 border text-start font-semibold">ID</th>
                                                            <th className="p-8 border text-start font-semibold">
                                                                ID Resep
                                                            </th>
                                                            <th className="p-8 border text-start font-semibold">
                                                                Bahan
                                                            </th>
                                                            <th className="p-8 border text-start font-semibold">
                                                                Kuantitas
                                                            </th>
                                                            <th className="p-8 border text-start font-semibold">
                                                                Unit
                                                            </th>
                                                            <th className="p-8 border text-start font-semibold">
                                                                Aksi
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {addBahan?.map((item, index) => {
                                                            return (
                                                                <tr key={item.id} className="border text-[#7D848C]">
                                                                    <td className="p-4 border">{item.id}</td>
                                                                    <td className="p-4 border">{item.recipe_id}</td>
                                                                    <td className="p-4 border">{item.bahan?.nama}</td>
                                                                    <td className="p-4 border">{item.quantity}</td>
                                                                    <td className="p-4 border">{item.bahan?.satuan}</td>
                                                                    <td className="p-4 border">
                                                                        <div className="flex gap-2">
                                                                            <button
                                                                                onClick={() => {
                                                                                    deleteItem(index);
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

                                                <div className="mt-4 mb-8 flex w-full items-center">
                                                    <button
                                                        className="w-full rounded-lg bg-[#AA2B2B] px-5  py-2.5 text-center font-poppins text-sm font-medium text-white outline-none  hover:bg-[#832a2a]"
                                                        onClick={() => {
                                                            setopenModalTambahBahan(true);
                                                        }}
                                                    >
                                                        Tambah Bahan
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className="mt-4" />
                    </div>
                    <Transition.Root show={openModalTambahBahan} as={Fragment}>
                        <Dialog
                            as="div"
                            className="relative z-10"
                            initialFocus={cancelButtonRefTambahBahan}
                            onClose={setopenModalTambahBahan}
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
                                        <Dialog.Panel className="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                                <div className="sm:flex sm:items-start">
                                                    <form className="font-poppins w-full" onSubmit={handleTambahBahan}>
                                                        <div className="h-min rounded-md border bg-white">
                                                            <div className="border-b p-4">
                                                                <p className=" text-[#AA2B2B] ">Produk</p>
                                                            </div>

                                                            <div className="p-4">
                                                                <div className="mb-4">
                                                                    <label
                                                                        className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                                        htmlFor="kata_kunci"
                                                                    >
                                                                        Bahan
                                                                    </label>

                                                                    <Listbox
                                                                        value={bahan}
                                                                        onChange={(value: Bahan) => setBahan(value)}
                                                                    >
                                                                        <div className="relative mt-1">
                                                                            <Listbox.Button className="relative w-full bg-white border border-[#DADDE2] rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                                                <span className="block truncate text-[#A5A5A5]">
                                                                                    {bahan?.nama}
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
                                                                                {bahanData.map((opt) => (
                                                                                    <Listbox.Option
                                                                                        key={opt.id}
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
                                                                                                {opt.nama}
                                                                                            </span>
                                                                                        )}
                                                                                    </Listbox.Option>
                                                                                ))}
                                                                            </Listbox.Options>
                                                                        </div>
                                                                    </Listbox>
                                                                </div>
                                                                <div className="mb-4 ">
                                                                    <div>
                                                                        <label
                                                                            className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                                            htmlFor="foto_produk"
                                                                        >
                                                                            Quantity
                                                                        </label>
                                                                        <input
                                                                            className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                                            id="foto_titipan"
                                                                            placeholder="Quantity"
                                                                            required
                                                                            value={kuantitasBahan}
                                                                            onChange={handleChangekuantitasBahan}
                                                                            type="number"
                                                                        ></input>
                                                                    </div>
                                                                </div>
                                                                <div className="mb-4 ">
                                                                    <div>
                                                                        <label
                                                                            className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                                            htmlFor="foto_produk"
                                                                        >
                                                                            Unit
                                                                        </label>
                                                                        <input
                                                                            className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                                            id="foto_titipan"
                                                                            placeholder="Unit"
                                                                            required
                                                                            value={bahan?.satuan}
                                                                            type="text"
                                                                        ></input>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <hr className="mt-4" />
                                                        <div className="mt-4 flex w-full items-center">
                                                            <button
                                                                className="w-full rounded-lg bg-[#AA2B2B] px-5  py-2.5 text-center font-poppins text-sm font-medium text-white outline-none  hover:bg-[#912b2b]"
                                                                type="submit"
                                                            >
                                                                Tambah Bahan
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                <button
                                                    type="button"
                                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                    onClick={() => setopenModalTambahBahan(false)}
                                                    ref={cancelButtonRefTambahBahan}
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
    );
}
