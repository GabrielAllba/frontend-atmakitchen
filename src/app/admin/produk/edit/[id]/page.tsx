'use client';

import Image from 'next/image';
import { Listbox } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { ProductFetch, Product } from '@/dummy_data/product';
import axios from 'axios';
import { Alert } from '@mui/material';

const option = [{ status: 'Aktif' }, { status: 'Tidak Aktif' }];

export default function Page({ params }: { params: { id: number } }) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [imageUrls, setImageUrls] = useState<string>();
    const [status, setStatus] = useState<string>(option[0].status);
    const [loading, setLoading] = useState<boolean>(true);
    const [filteredData, setFilteredData] = useState<ProductFetch>();
    const [updateData, setUpdateData] = useState<Product>();
    const [isPosting, setIsPosting] = useState<boolean>(false);
    const [alert, setAlert] = useState<boolean>(false);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(apiUrl + '/product/' + params.id);
            setFilteredData(response.data.product);
            setUpdateData(response.data.product);
            const firstProduct = response.data.product;
            await fetchImage(firstProduct.photo);

            setLoading(false);
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
            setImageUrls(objectURL);
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleChange =
        (propertyName: string) => (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
            const value = e.target.value;
            setFilteredData((prevData) => ({ ...prevData!, [propertyName]: value }));
            setUpdateData((prevData) => ({ ...prevData!, [propertyName]: value }));
            console.log(updateData);
        };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            setUpdateData({ ...filteredData!, photo: file });
        }
        console.log(updateData);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(updateData);

        // Create FormData object
        const formData = new FormData();
        formData.append('name', updateData!.name);
        formData.append('price', String(updateData!.price));
        formData.append('description', updateData!.description);
        formData.append('stock', String(updateData!.stock));
        formData.append('daily_quota', String(updateData!.daily_quota));
        formData.append('status', updateData!.status);
        formData.append('product_type_id', String(updateData!.product_type_id));
        formData.append('consignation_id', String(updateData!.consignation_id));

        if (updateData!.photo) {
            formData.append('photo', updateData!.photo);
        }
        console.log(formData);
        setIsPosting(true);

        axios({
            method: 'put',
            url: apiUrl + '/product/' + params.id,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                console.log(response);
                setAlert(true);
                fetchProducts();
                const fileInput = document.getElementById('foto_produk') as HTMLInputElement;
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
            {alert && (
                <div className="flex justify-center w-screen fixed top-20 left-0 z-50">
                    <Alert
                        severity="success"
                        className="font-poppins mb-4"
                        onClose={() => {
                            setAlert(false);
                        }}
                    >
                        <p>Berhasil mengupdate produk!</p>
                    </Alert>
                </div>
            )}
            {loading && (
                <div className="w-full flex justify-center items-center font-poppins text-black text-center mt-4">
                    <span className="loading loading-ring loading-lg"></span>
                </div>
            )}
            {!loading && (
                <div className="w-full">
                    <div className="card bg-primary border pb-8 rounded ">
                        <form className="card-body" onSubmit={handleSubmit}>
                            <div className="bg-white">
                                <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-8 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
                                    <div className="grid grid-cols-1 grid-rows-1 ">
                                        {imageUrls && (
                                            <Image
                                                src={imageUrls}
                                                className="rounded-lg bg-gray-100"
                                                width={500}
                                                height={500}
                                                alt=""
                                            />
                                        )}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                                            Kue 1
                                        </h2>

                                        <p className="mt-4 text-gray-500">Harga</p>
                                        <p className="mt-4 text-[#AA2B2B] font-semibold text-xl md:text-4xl">
                                            Rp. 500.000
                                        </p>
                                        <dl className="mt-8 grid gap-x-6 gap-y-10 grid-cols-1 md:grid-cols-2">
                                            <div className="border-t border-gray-200 pt-4 w-full col-span-2 md:col-span-1">
                                                <dt className="font-medium text-gray-900">Foto Produk</dt>
                                                <input
                                                    className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 mt-4 font-poppins text-sm text-black outline-none"
                                                    id="foto_produk"
                                                    type="file"
                                                    onChange={handleFileChange}
                                                ></input>
                                            </div>
                                            <div className="border-t border-gray-200 pt-4 w-full col-span-2 md:col-span-1">
                                                <dt className="font-medium text-gray-900">Nama Produk</dt>
                                                <input
                                                    className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 mt-4 font-poppins text-sm text-black outline-none"
                                                    id="nama_produk"
                                                    required
                                                    type="text"
                                                    value={filteredData?.name}
                                                    onChange={handleChange('name')}
                                                ></input>
                                            </div>
                                            <div className="border-t border-gray-200 pt-4 w-full col-span-2 md:col-span-1">
                                                <dt className="font-medium text-gray-900">Harga</dt>
                                                <input
                                                    className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 mt-4 font-poppins text-sm text-black outline-none"
                                                    id="nama_produk"
                                                    required
                                                    type="text"
                                                    value={filteredData?.price}
                                                    onChange={handleChange('price')}
                                                ></input>
                                            </div>
                                            <div className="border-t border-gray-200 pt-4 w-full col-span-2 md:col-span-1">
                                                <dt className="font-medium text-gray-900">Description</dt>
                                                <textarea
                                                    className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 mt-4 font-poppins text-sm text-black outline-none"
                                                    id="kata_kunci"
                                                    placeholder="Deskripsi"
                                                    required
                                                    value={filteredData?.description}
                                                    onChange={handleChange('description')}
                                                ></textarea>
                                            </div>
                                            <div className="border-t border-gray-200 pt-4 w-full col-span-2 md:col-span-1">
                                                <dt className="font-medium text-gray-900">Ready Stock</dt>
                                                <input
                                                    className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 mt-4 font-poppins text-sm text-black outline-none"
                                                    id="stock"
                                                    required
                                                    type="number"
                                                    value={filteredData?.stock}
                                                    onChange={handleChange('stock')}
                                                ></input>
                                            </div>
                                            <div className="border-t border-gray-200 pt-4 w-full col-span-2 md:col-span-1">
                                                <dt className="font-medium text-gray-900">Jenis Produk</dt>
                                                <input
                                                    className="disabled:opacity-30 block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 mt-4 font-poppins text-sm text-black outline-none"
                                                    id="jenis_produk"
                                                    placeholder="Produk Toko"
                                                    value="Produk Toko"
                                                    disabled
                                                    type="text"
                                                ></input>
                                            </div>
                                            <div className="border-t border-gray-200 pt-4 w-full col-span-2 md:col-span-1">
                                                <dt className="font-medium text-gray-900">Quota Harian PO</dt>
                                                <input
                                                    className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 mt-4 font-poppins text-sm text-black outline-none"
                                                    id="quota"
                                                    placeholder="Quota Harian PO"
                                                    required
                                                    type="number"
                                                    value={filteredData?.daily_quota}
                                                    onChange={handleChange('daily_quota')}
                                                ></input>
                                            </div>
                                            <div className="border-t border-gray-200 pt-4 w-full col-span-2 md:col-span-1">
                                                <dt className="font-medium text-gray-900">Status Produk</dt>
                                                <Listbox
                                                    value={filteredData?.status}
                                                    onChange={(value: string) => {
                                                        setFilteredData((prevData) => ({
                                                            ...prevData!,
                                                            status: value,
                                                        }));
                                                        setUpdateData((prevData) => ({
                                                            ...prevData!,
                                                            status: value,
                                                        }));
                                                    }}
                                                >
                                                    <div className="relative mt-4">
                                                        <Listbox.Button className="relative w-full bg-white border border-[#DADDE2] rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                            <span className="block truncate text-[#A5A5A5]">
                                                                {filteredData?.status}
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
                                                        <Listbox.Options className=" absolute mt-1 w-max bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                            {option.map((opt) => (
                                                                <Listbox.Option
                                                                    key={opt.status}
                                                                    value={opt.status}
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
                                                                                selected
                                                                                    ? 'font-semibold'
                                                                                    : 'font-normal'
                                                                            } block truncate`}
                                                                        >
                                                                            {opt.status}
                                                                        </span>
                                                                    )}
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    </div>
                                                </Listbox>
                                            </div>
                                            <div>
                                                <button
                                                    className="w-full rounded-lg bg-[#AA2B2B] px-5  py-2.5 text-center font-poppins text-sm font-medium text-white outline-none  hover:bg-[#913a3a]"
                                                    type="submit"
                                                    disabled={isPosting}
                                                >
                                                    {isPosting ? 'Mengupdate Product...' : 'Update Product'}{' '}
                                                </button>
                                            </div>

                                            <div className=" border-gray-200 col-span-2"></div>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </form>
                        ;
                    </div>
                </div>
            )}
        </div>
    );
}
